<template lang="pug">
  .puzzle-component
    .puzzle-component__header
      .puzzle-component__name {{ $t("adventure_point.password_required") }}

      .form-checkbox(
        :class="{ 'form-checkbox--active': passwordRequired, 'form-checkbox--disabled': !editable }"
        @click="$emit('toggle-password')"
      )
        .form-checkbox__toggle

    div(v-if="passwordRequired")
      .form-control
        .form-label {{ $t("adventure_point.password_type") }}
        v-select(
          :placeholder="$t('adventure_point.password_type')"
          :clearable="false"
          :value="passwordType"
          :options="passwordTypes"
          :disabled="!editable"
          @input="updatePasswordType($event)"
        )

      .form-control
        .puzzle-preview
          transition
            img(
              :src="passwordType.image_url"
              v-show="previewLoaded"
              @load="passwordPreviewLoaded"
            )

      .form-control(v-if="!isDirectionPassword")
        .form-label.form-label--required {{ $t("adventure_point.enter_password") }}
        label.error-label(v-if="passwordError || passwordAnswer.password.length == 0") {{ $t("adventure_point.password_invalid") }}
        input.form-input(
          type="text"
          :placeholder="$t('adventure_point.password_placeholder')"
          :maxlength="passwordLength"
          :pattern="passwordPattern.source"
          :disabled="!editable"
          v-model="passwordAnswer.password"
        )

      .form-control(v-if="isDirectionPassword")
        .form-control
          .form-label.form-label--required {{ $t("adventure_point.password_by_buttons") }}
          .error-label(v-if="passwordError") {{ $t("adventure_point.password_invalid") }}

        .form-control
          .row
            .col-1-2
              button.button.button--circle.button--blue(
                :class="{ 'button--disabled': !editable }"
                @click="onArrow('l')"
              ) ←
              button.button.button--circle.button--blue(
                :class="{ 'button--disabled': !editable }"
                @click="onArrow('u')"
              ) ↑
              button.button.button--circle.button--blue(
                :class="{ 'button--disabled': !editable }"
                @click="onArrow('d')"
              ) ↓
              button.button.button--circle.button--blue(
                :class="{ 'button--disabled': !editable }"
                @click="onArrow('r')"
              ) →

            .col-1-2.text-right
              button.button.button--pink(@click="clearArrows()") {{ $t("adventure_point.password_clear") }}

        .form-control
          span {{ $t("adventure_point.transformed_password", { password: transformedPassword }) }}

    .puzzle-component-filler(v-else)
      .puzzle-component-filler__header {{ $t("adventure_point.no_password_required") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { PASSWORD_TYPES } from '@/config'

import { arrowUnicodeToChar, charToArrowUnicode } from '@/utils'

import vSelect from 'vue-select'

export default {
  name: 'AdventurePointFormPassword',
  components: {
    vSelect
  },
  props: {
    passwordAnswer: {
      type: Object,
      default: null
    },
    passwordRequired: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      transformedPassword: "",
      previewLoaded: false
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item
    }),
    ...mapGetters('adventure', {
      editable: 'editable'
    }),

    passwordTypes () {
      return PASSWORD_TYPES.map(type => {
        type.label = this.$t(`password_type.${type.value}`);

        return type;
      });
    },
    passwordType () {
      let answer = this.passwordAnswer;

      if(answer && answer.type) {
        return this.passwordTypes.find(passwordType => passwordType.value == answer.type);
      } else {
        return this.passwordTypes[0];
      }
    },
    isDirectionPassword () {
      let passwordType = this.passwordType;

      return passwordType.value == 'direction_lock_4' ||
        passwordType.value == 'direction_lock_6' ||
        passwordType.value == 'direction_lock_8'
    },
    passwordLength () {
      let answer = this.passwordAnswer;

      if(answer) {
        return this.passwordType.length;
      } else {
        return null;
      }
    },
    passwordError () {
      let answer = this.passwordAnswer;

      if(answer && answer.password) {
        if(answer.type.match(/direction_lock/)) {
          return !this.transformedPassword.match(this.passwordPattern);
        } else {
          return !answer.password.match(this.passwordPattern);
        }
      } else {
        return false;
      }
    },
    passwordPattern () {
      let answer = this.passwordAnswer;

      if(answer && answer.type) {
        let type = answer.type;

        if(type == 'text') {
          return new RegExp(`.{1,${this.passwordLength}}`);
        } else if(type.match(/number_lock/)) {
          return new RegExp(`[0-9]{${this.passwordLength}}`);
        } else if(type.match(/number_push_lock/)) {
          // Unique N digits from a set via regex. Cute
          if(type.match(/number_push_lock_3/)) {
            return new RegExp(`^(?!.*(.).*\\1)[1-6]{${this.passwordLength}}`);
          } else if(type.match(/number_push_lock_4/)) {
            return new RegExp(`^(?!.*(.).*\\1)[1-8]{${this.passwordLength}}`);
          } else {
            return new RegExp(`^(?!.*(.).*\\1)[0-9]{${this.passwordLength}}`);
          }
        } else if(type.match(/cryptex_lock/)) {
          return new RegExp(`[a-zA-Z]{${this.passwordLength}}`);
        } else if(type.match(/direction_lock/)) {
          return new RegExp(`[←↑↓→]{${this.passwordLength}}`);
        } else {
          return new RegExp('.*') || "";
        }
      }
    },
  },
  mounted () {
    if(this.passwordAnswer && this.passwordType.value.match(/direction_lock/)) {
      this.transformedPassword = this.decodeDirectionPassword(this.passwordAnswer.password);
    }
  },
  methods: {
    updatePasswordType (evt) {
      if(!evt) {
        return;
      }

      let answer = this.passwordAnswer;

      let previousType = answer.type;
      let currentType = evt.value;

      answer.type = currentType;

      if(this.passwordType.image_url !== evt.image_url) {
        this.previewLoaded = false;
      }

      // Handle direction lock separately
      if(currentType.match(/direction_lock/)) {
        // If it has same family type just trim it to proper length
        if(currentType.replace(/\d/, '') == previousType.replace(/\d/, '')) {
          this.transformedPassword = this.transformedPassword.substr(0, evt.length);
        } else {
          this.transformedPassword = "";
        }
      } else if(answer.password) {
        // If it has same family type just trim it to proper length
        if(currentType.replace(/\d/, '') == previousType.replace(/\d/, '')) {
          answer.password = answer.password.substr(0, evt.length);
        } else {
          // In case of coming back from direction lock type - clear the password to avoid 'lrdu' passwords presented
          if(previousType.match(/direction_lock/)) {
            answer.password = "";
          } else {
            // Try to infer password from exisiting one
            let match = answer.password.match(this.passwordPattern);

            if(match) {
              answer.password = match[0];
            } else {
              answer.password = "";
            }
          }
        }
      }
    },

    encodeDirectionPassword (password) {
      let str = '';

      for(let i = 0; i < password.length; i++) {
        str += arrowUnicodeToChar[password.charAt(i)];
      }

      return str;
    },

    onArrow (direction) {
      if(this.published) {
        return;
      }

      let answer = this.passwordAnswer;

      if(this.transformedPassword.length < this.passwordLength) {
        this.transformedPassword += charToArrowUnicode[direction];

        answer.password = this.encodeDirectionPassword(this.transformedPassword);
      }
    },

    clearArrows () {
      if(this.published) {
        return;
      }

      this.transformedPassword = "";
    },

    decodeDirectionPassword (password) {
      let str = '';

      for(let i = 0; i < password.length; i++) {
        str += charToArrowUnicode[password.charAt(i)];
      }

      return str;
    },

    passwordPreviewLoaded () {
      this.previewLoaded = true;
    }
  }
}
</script>
