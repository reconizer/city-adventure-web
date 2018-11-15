<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="point.id")
      .adventure-panel__header
        router-link.icon.icon--back.icon--pad-right.adventure-panel__back(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        span(v-if="puzzleIndex == 0") {{ $t("adventure_point.edit_start") }}
        span(v-else) {{ $t("adventure_point.edit") }}
        span(v-if="puzzleIndex > 0") &nbsp;\#{{ puzzleIndex }}

        a.button.button--pink.adventure-panel__remove(v-if="puzzleIndex > 0" @click="destroyPuzzle()") {{ $t("general.remove") }}

      .row(v-if="puzzleIndex == 0")
        .col-1-2
          .puzzle-component
            .puzzle-component__header
              .puzzle-component__name {{ $t("adventure_point.location") }}

            .form-control
              label.form-label.form-label--required
                span {{ $t("adventure_point.radius") }}

                .icon.icon--question-mark.icon--pad-left
                  .icon__tooltip-wrapper
                    .icon__tooltip {{ $t("adventure_point.radius_explanation") }}

              .slider-wrapper
                vue-slider(
                  v-model="point.radius"
                  v-bind="sliderOptions"
                )

      .row(v-else)
        .col-1-2
          .puzzle-component
            .puzzle-component__header
              .puzzle-component__name {{ $t("adventure_point.password_required") }}

              .form-checkbox(:class="{ 'form-checkbox--active': passwordRequired }" @click="togglePasswordRequired")
                .form-checkbox__toggle

            div(v-if="passwordRequired")
              .form-control
                .form-label {{ $t("adventure_point.password_type") }}
                v-select(:placeholder="$t('adventure_point.password_type')" :clearable="false" :value="passwordType" :options="passwordTypes" @input="updatePasswordType($event)")

              .form-control(
                :class="{ 'form-control--with-error': passwordError || passwordAnswer.details.password.length == 0 }"
                v-if="!this.passwordType.value.match(/direction_lock/)"
              )
                .form-label.form-label--required {{ $t("adventure_point.enter_password") }}
                label.error-label {{ $t("adventure_point.password_invalid") }}
                input.form-input(
                  type="text"
                  placeholder="Password"
                  :maxlength="passwordLength"
                  :pattern="passwordPattern.source"
                  v-model="passwordAnswer.details.password"
                )

              .form-control(v-if="this.passwordType.value.match(/direction_lock/)")
                .form-control(
                  :class="{ 'form-control--with-error': passwordError }"
                )
                  .form-label.form-label--required {{ $t("adventure_point.password_by_buttons") }}
                  .error-label {{ $t("adventure_point.password_invalid") }}
 
                .form-control
                  .row
                    .col-1-2
                      a.button.button--circle.button--blue(@click="onArrow('l')") ←
                      a.button.button--circle.button--blue(@click="onArrow('u')") ↑
                      a.button.button--circle.button--blue(@click="onArrow('d')") ↓
                      a.button.button--circle.button--blue(@click="onArrow('r')") →

                    .col-1-2.text-right
                      a.button.button--pink(@click="clearArrows()") {{ $t("adventure_point.password_clear") }}

                .form-control
                  span {{ $t("adventure_point.transformed_password", { password: transformedPassword }) }}

            .puzzle-component-filler(v-else)
              .puzzle-component-filler__header {{ $t("adventure_point.no_password_required") }}


        .col-1-2
          .puzzle-component
            .puzzle-component__header
              .puzzle-component__name {{ $t("adventure_point.location") }}

            .form-control
              .row.row--align-center
                .col-2-3
                  span {{ $t("adventure_point.location_hidden") }}
                .col-1-3
                  .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': point.hidden }" @click="updateHidden(!point.hidden)")
                    .form-checkbox__toggle

            .form-control
              label.form-label.form-label--required
                span {{ $t("adventure_point.radius") }}

                .icon.icon--question-mark.icon--pad-left
                  .icon__tooltip-wrapper
                    .icon__tooltip {{ $t("adventure_point.radius_explanation") }}

              .slider-wrapper
                vue-slider(
                  v-model="point.radius"
                  v-bind="sliderOptions"
                )

        .col-1
          .puzzle-component
            .puzzle-component__header
              .puzzle-component__name {{ $t("adventure_point.time_constraint") }}

              .form-checkbox(:class="{ 'form-checkbox--active': timeConstraint }" @click="toggleTimeConstraint")
                .form-checkbox__toggle

            .row(v-if="timeConstraint")
              .col-1-2
                .form-control
                  .form-label {{ $t("adventure_point.start_time") }}
                  .slider-wrapper.slider-wrapper--padded
                    vue-slider(
                      v-model="timeAnswer.details.starting_time"
                      v-bind="startingTimeSliderOptions"
                    )

              .col-1-2
                .form-control
                  .form-label {{ $t("adventure_point.end_time") }}
                  .slider-wrapper.slider-wrapper--padded
                    vue-slider(
                      v-model="timeAnswer.details.duration"
                      v-bind="durationSliderOptions"
                    )

            .puzzle-component-filler(v-else)
              .puzzle-component-filler__header {{ $t("adventure_point.no_time_constraint") }}

      .form-control-separator
      .row
        .col-1-2
          .form-control
            a.button.button--blue.button--large.button--full(@click="submit") {{ $t("general.submit") }}
</template>

<script>
import { mapState } from 'vuex'

import { UPDATE_POINT, DESTROY_POINT } from '@/store/action-types'

import { TIME_CONSTRAINT_OPTIONS, RADIUS_CONSTRAINTS, passwordTypes } from '@/config'

import { pad, arrowUnicodeToChar, charToArrowUnicode } from '@/utils'

import cloneDeep from 'lodash.clonedeep'

import vSelect from 'vue-select'
import vueSlider from 'vue-slider-component'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventurePointForm',
  components: {
    vSelect,
    vueSlider
  },
  data () {
    return {
      pointData: {
        id: null,
        radius: null,
        hidden: false,
        answers: []
      },
      timeConstraint: false,
      passwordRequired: false,
      transformedPassword: ""
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),

    sliderOptions () {
      return {
        min: RADIUS_CONSTRAINTS.MIN,
        max: RADIUS_CONSTRAINTS.MAX,
        interval: 1,
        formatter: (value) => {
          return `${value}m`;
        }
      }
    },

    passwordTypes () {
      return passwordTypes.map(type => {
        type.label = this.$t(`password_type.${type.value}`);

        return type;
      });
    },
    passwordType () {
      let answer = this.passwordAnswer;

      if(answer && answer.details.password_type) {
        return this.passwordTypes.find(passwordType => passwordType.value == answer.details.password_type);
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

      if(answer && answer.details) {
        return this.passwordType.length;
      } else {
        return null;
      }
    },
    passwordError () {
      let answer = this.passwordAnswer;

      if(answer && answer.details.password) {
        if(answer.details.password_type.match(/direction_lock/)) {
          return !this.transformedPassword.match(this.passwordPattern);
        } else {
          return !answer.details.password.match(this.passwordPattern);
        }
      } else {
        return false;
      }
    },
    passwordPattern () {
      let answer = this.passwordAnswer;

      if(answer && answer.details.password_type) {
        let type = answer.details.password_type;

        if(type == 'text') {
          return new RegExp(`.{1,${this.passwordLength}}`);
        } else if(type.match(/number_lock/) || type.match(/number_push_lock/)) {
          return new RegExp(`[0-9]{${this.passwordLength}}`);
        } else if(type.match(/cryptex_lock/)) {
          return new RegExp(`[a-zA-Z]{${this.passwordLength}}`);
        } else if(type.match(/direction_lock/)) {
          return new RegExp(`[←↑↓→]{${this.passwordLength}}`);
        } else {
          return new RegExp('.*') || "";
        }
      }
    },

    passwordAnswer () {
      return this.point.answers.find(answer => answer.type == 'password') || null;
    },
    timeAnswer () {
      return this.point.answers.find(answer => answer.type == 'time') || null;
    },

    puzzleIndex () {
      return this.$store.state.adventure.points.findIndex(point => point.id == this.$route.params.pointId);
    },
    point () {
      let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

      if(point && !this.pointData.id) {
        //eslint-disable-next-line
        this.pointData = cloneDeep(point);

        let passwordAnswer = this.pointData.answers.find(answer => answer.type == 'password');

        if(passwordAnswer) {
          //eslint-disable-next-line
          this.passwordRequired = true;

          if(passwordAnswer.details.password_type.match(/direction_lock/)) {
            //eslint-disable-next-line
            this.transformedPassword = this.decodeDirectionPassword(passwordAnswer.details.password);
          }
        }

        //eslint-disable-next-line
        this.timeConstraint = this.pointData.answers.findIndex(answer => answer.type == 'time') >= 0;
      }

      return this.pointData;
    },

    startingTimeSliderOptions () {
      return {
        min: 0,
        max: 24 * 60 * 60 - TIME_CONSTRAINT_OPTIONS.INTERVAL,
        interval: TIME_CONSTRAINT_OPTIONS.INTERVAL,
        formatter: (value) => {
          let hour = Math.floor(value / 3600) % 24;
          let minutes = (value % 3600) / TIME_CONSTRAINT_OPTIONS.INTERVAL * (TIME_CONSTRAINT_OPTIONS.INTERVAL / 60);

          return `${pad(hour, 2)}:${pad(minutes, 2)}`;
        }
      }
    },

    durationSliderOptions () {
      return {
        min: TIME_CONSTRAINT_OPTIONS.INTERVAL,
        max: 24 * 60 * 60 - TIME_CONSTRAINT_OPTIONS.INTERVAL,
        interval: TIME_CONSTRAINT_OPTIONS.INTERVAL,
        formatter: (value) => {
          let current = this.timeAnswer.details.starting_time + value;

          let hour = Math.floor(current / 3600) % 24;
          let minutes = (current % 3600) / TIME_CONSTRAINT_OPTIONS.INTERVAL * (TIME_CONSTRAINT_OPTIONS.INTERVAL / 60);

          return `${pad(hour, 2)}:${pad(minutes, 2)}`;
        }
      }
    }
  },
  mounted () {
    if(this.adventure.id && !this.loading) {
      if(!this.point.id) {
        this.$router.push({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
      }
    }
  },
  methods: {
    togglePasswordRequired () {
      this.passwordRequired = !this.passwordRequired;

      let answer = this.passwordAnswer;

      if(!answer) {
        this.point.answers.push({ type: 'password', details: { password_type: 'text', password: "" } });
      }
    },
    
    toggleTimeConstraint () {
      this.timeConstraint = !this.timeConstraint;

      let answer = this.timeAnswer;

      if(!answer) {
        this.point.answers.push({ type: 'time', details: { starting_time: 0, duration: TIME_CONSTRAINT_OPTIONS.INTERVAL } });
      }
    },

    updatePasswordType (evt) {
      if(!evt) {
        return;
      }

      let answer = this.passwordAnswer;

      let previousType = answer.details.password_type;
      let currentType = evt.value;

      answer.details.password_type = currentType;

      // Handle direction lock separately
      if(currentType.match(/direction_lock/)) {
        // If it has same family type just trim it to proper length
        if(currentType.replace(/\d/, '') == previousType.replace(/\d/, '')) {
          this.transformedPassword = this.transformedPassword.substr(0, evt.length);
        } else {
          this.transformedPassword = "";
        }
      } else if(answer.details.password) {
        // If it has same family type just trim it to proper length
        if(currentType.replace(/\d/, '') == previousType.replace(/\d/, '')) {
          answer.details.password = answer.details.password.substr(0, evt.length);
        } else {
          // In case of coming back from direction lock type - clear the password to avoid 'lrdu' passwords presented
          if(previousType.match(/direction_lock/)) {
            answer.details.password = "";
          } else {
            // Try to infer password from exisiting one
            let match = answer.details.password.match(this.passwordPattern);

            if(match) {
              answer.details.password = match[0];
            } else {
              answer.details.password = "";
            }
          }
        }
      }
    },

    updateHidden (value) {
      this.point.hidden = value;
    },

    updateRadius (evt) {
      if(evt.target.value.length == 0) {
        this.point.radius = null;
      } else {
        this.point.radius = +evt.target.value;
      }
    },

    updateStartingTime (evt) {
      if(!evt) {
        return;
      }

      let answer = this.timeAnswer;

      answer.details.starting_time = evt.value;
    },

    encodeDirectionPassword (password) {
      let str = '';

      for(let i = 0; i < password.length; i++) {
        str += arrowUnicodeToChar[password.charAt(i)];
      }

      return str;
    },

    onArrow (direction) {
      if(this.transformedPassword.length < this.passwordLength) {
        this.transformedPassword += charToArrowUnicode[direction];
      }
    },

    clearArrows () {
      this.transformedPassword = "";
    },

    decodeDirectionPassword (password) {
      let str = '';

      for(let i = 0; i < password.length; i++) {
        str += charToArrowUnicode[password.charAt(i)];
      }

      return str;
    },

    destroyPuzzle () {
      if(confirm(this.$t("adventure.remove_puzzle_confirm"))) {
        this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_POINT}`, { pointId: this.pointData.id });
      }
    },

    submit () {
      //TODO validate form
      let params = cloneDeep(this.pointData);

      let answerIndex = params.answers.findIndex(answer => answer.type == 'password');

      if(!this.passwordRequired) {
        if(answerIndex >= 0) {
          params.answers.splice(answerIndex, 1);
        }
      } else if(answerIndex >= 0) {
        if(params.answers[answerIndex].details.password_type.match(/direction_lock/)) {
          params.answers[answerIndex].details.password = this.encodeDirectionPassword(this.transformedPassword);
        }
      }

      if(!this.timeConstraint) {
        let answerIndex = params.answers.findIndex(answer => answer.type == 'time');

        if(answerIndex >= 0) {
          params.answers.splice(answerIndex, 1);
        }
      }

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_POINT}`, {
        adventureId: this.adventure.id,
        pointId: this.point.id,
        params: params
      })
    }
  }
}
</script>
