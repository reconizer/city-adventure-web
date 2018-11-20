<template lang="pug">
  .adventure-panel
    .adventure-panel__inner(v-if="adventure.id")
      .adventure-panel__header
        router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--back

        .adventure-panel__title
          span(v-if="existingClue")
            span(v-if="adventure.published") {{ $t("clue.show_title") }}
            span(v-else) {{ $t("clue.edit_title") }}
          span(v-else) {{ $t("clue.new") }}

        a.button.button--pink.adventure-panel__remove(v-if="existingClue && !adventure.published" @click="destroyClue()") {{ $t("general.remove") }}

      .row
        .col-1-2
          .form-control
            .form-label {{ $t("clue.type") }}
            v-select(
              :placeholder="$t('clue.type')" 
              :clearable="false" 
              :value="clueType" 
              :options="clueTypes" 
              :disabled="adventure.published"
              @input="updateType($event)")

          .form-control
            .row.row--align-center
              .col-1-2
                label.form-label
                  span {{ $t("clue.is_tip") }}
                  .icon.icon--question-mark.icon--pad-left
                    .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
                      .icon__tooltip {{ $t("clue.is_tip_explanation") }}
              .col-1-2
                .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': clue.tip }" @click="updateTip(!clue.tip)")
                  .form-checkbox__toggle

          .form-control(v-if="clue.type != 'image'")
            .form-label.form-label--required(v-if="clue.type == 'text'") {{ $t("clue.content") }}
            .form-label(v-else) {{ $t("general.description") }}
            textarea.form-input(v-model="clue.description" :disabled="adventure.published")

          //TODO file upload
          .form-control(v-if="clue.type != 'text'")
            .form-label.form-label--required {{ $t("clue.url") }}
            input.form-input(v-model="clue.url" :disabled="adventure.published")

          .form-control(v-if="!adventure.published")
            a.button.button--blue.button--large.button--full(@click="submit()") {{ $t("general.submit") }}
</template>

<script>
import { mapState } from 'vuex'

import { CREATE_CLUE, UPDATE_CLUE, DESTROY_CLUE } from '@/store/action-types'

import vSelect from 'vue-select'

import { clueTypes } from '@/config'

import cloneDeep from 'lodash.clonedeep'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureClueForm',
  components: {
    vSelect
  },
  data () {
    return {
      clueData: {
        id: null,
        type: 'text',
        tip: false,
        url: null,
        description: null,
        order: 0
      }
    };
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),
    clueTypes() {
      return clueTypes.map(type => {

        return {
          value: type,
          label: this.$t(`clue_type.${type}`)
        }
      });
    },
    point () {
      return this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);
    },
    clue () {
      if(this.$route.params.clueId) {
        if(this.point) {
          let clueObject = this.point.clues.find(clue => clue.id == this.$route.params.clueId);

          if(clueObject) {
            //eslint-disable-next-line
            this.clueData = cloneDeep(clueObject);
          }
        }
      }
      return this.clueData;
    },
    clueType () {
      return this.clueTypes.find(clueType => clueType.value == this.clue.type);
    },
    existingClue () {
      return this.clue.id != null;
    }
  },
  mounted () {
    if(this.adventure.id && !this.loading) {
      if(!this.point || (this.$route.params.clueId && !this.clue.id)) {
        this.$router.replace({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
      }
    }
  },
  methods: {
    updateType (evt) {
      this.clueData.type = evt.value;
    },
    updateTip (value) {
      this.clueData.tip = value;
    },

    submit () {
      let id = this.clueData.id;
      let data = this.clueData;

      delete data['id'];

      if(id) {
        delete data['order']; //no need to set order in currently edited clue

        this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_CLUE}`, {
          pointId: this.$route.params.pointId,
          clueId: id,
          data: data
        });
      } else {
        let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

        data.order = point.clues.length

        this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_CLUE}`, {
          pointId: this.$route.params.pointId,
          data: data
        });
      }
    },

    destroyClue () {
      if(this.clue.id) {
        if(confirm(this.$t("clue.remove_confirm"))) {
          this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_CLUE}`, {
            pointId: this.$route.params.pointId,
            clueId: this.clue.id
          });
        }
      }
    }
  }
}
</script>
