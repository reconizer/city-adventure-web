<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="adventure.id")
      .adventure-panel__header
        router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--back

        .adventure-panel__title
          span(v-if="!editable") {{ $t("clue.show_title") }}
          span(v-else) {{ $t("clue.edit_title") }}

        button.button.button--pink.adventure-panel__remove(v-if="editable" @click="confirmDestroy") {{ $t("general.remove") }}

      .row
        .col-1-2
          .form-control(v-if="clue.type != 'text' && clue.type != 'url'")
            .clue-preview-container(v-if="clue.type == 'image'")
              img.clue-preview(:src="clue.url")

              a.button.button--icon-sm.button--blue.clue-preview-button(v-if="clue.url && !clue.url.startsWith('blob')" :href="clue.url" target="_blank")
                .icon.icon--sm.icon--eye
                  .icon__tooltip-wrapper
                    .icon__tooltip {{ $t("general.preview") }}

            video.clue-preview(v-if="clue.type == 'video'" :poster="clue.url" controls)
              source(:src="clue.video_url")

            audio.clue-preview(v-if="clue.type == 'audio'" controls :src="clue.url")

          .form-control
            .row.row--align-center
              .col-1-2
                label.form-label
                  span {{ $t("clue.is_tip") }}
                  .icon.icon--question-mark.icon--pad-left
                    .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
                      .icon__tooltip {{ $t("clue.is_tip_explanation") }}
              .col-1-2
                .form-checkbox.form-checkbox--small(
                  :class="{ 'form-checkbox--active': clue.tip, 'form-checkbox--disabled': !editable }"
                  @click="updateTip(!clue.tip)"
                )
                  .form-checkbox__toggle

          .form-control(:class="{ 'form-control--with-error': error && error.description }")
            .form-label.form-label--required(v-if="clue.type == 'text'") {{ $t("clue.content") }}
            .form-label(v-else) {{ $t("general.description") }}

            label.error-label(v-if="error && error.description") {{ error.description.join(', ') }}

            textarea.form-input(v-model="clue.description" :disabled="!editable")

          .form-control(:class="{ 'form-control--with-error': error && error.url }" v-if="clue.type == 'url'")
            .form-label.form-label--required {{ $t("clue.url") }}

            label.error-label(v-if="error && error.url") {{ error.url.join(', ') }}

            input.form-input(v-model="clue.url" :placeholder="$t('clue.url')" :disabled="!editable")

          .form-control(v-if="editable")
            button.button.button--blue.button--large.button--full(@click="submit()") {{ $t("general.submit") }}

      Modal(v-if="removeConfirmModalShown" @close="closeModals")
        div(slot="header") {{ $t("clue.remove") }}

        p {{ $t("clue.remove_confirm") }}

        .text-center
          button.button.button--blue(@click="destroyClue") {{ $t("general.confirm_remove") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { UPDATE_CLUE, DESTROY_CLUE } from '@/store/action-types'
import { SET_ERROR } from '@/store/mutation-types'

import vSelect from 'vue-select'

import Modal from '@/components/shared/Modal.vue'

import { CLUE_TYPES } from '@/config'

import cloneDeep from 'lodash.clonedeep'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureClueForm',
  components: {
    Modal,
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
      },
      removeConfirmModalShown: false
    };
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.errors[UPDATE_CLUE]
    }),
    ...mapGetters('adventure', {
      editable: 'editable'
    }),

    clueTypes() {
      return CLUE_TYPES.map(type => {
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
    }
  },
  mounted () {
    this.$store.commit(`${ACTION_NAMESPACE}/${SET_ERROR}`, { key: UPDATE_CLUE, error: null });

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
      if(!this.editable) {
        return;
      }

      this.clueData.tip = value;
    },

    closeModals () {
      this.removeConfirmModalShown = false;
    },

    submit () {
      let id = this.clueData.id;
      let data = this.clueData;

      delete data['id'];
      delete data['order']; //no need to set order in currently edited clue

      if(this.clueData.tip != 'url') {
        delete data['url'];
      }

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_CLUE}`, {
        pointId: this.$route.params.pointId,
        clueId: id,
        data: data
      });
    },

    confirmDestroy () {
      this.removeConfirmModalShown = true;
    },

    destroyClue () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_CLUE}`, {
        pointId: this.$route.params.pointId,
        clueId: this.clue.id
      }).then( (response) => {
        this.removeConfirmModalShown = false;

        setTimeout(() => {
          this.$router.replace({
            name: 'adventureMap',
            params: {
              adventureId: this.clue.id,
            }
          });
        }, 0);
      });
    }
  }
}
</script>
