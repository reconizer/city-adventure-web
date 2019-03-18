<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="adventure.id")
      .adventure-panel__header
        router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--back

        .adventure-panel__title {{ $t("clue.new") }}

      .row
        .col-1-2
          .form-control(:class="{ 'form-control--with-error': error && error.type }")
            .form-label {{ $t("clue.type") }}

            label.error-label(v-if="error && error.type") {{ error.type.join(', ') }}

            v-select(
              :placeholder="$t('clue.type')" 
              :clearable="false" 
              :value="clueType" 
              :options="clueTypes" 
              :disabled="!editable"
              @input="updateType($event)")

          .form-control(:class="{ 'form-control--with-error': error && error.url }" v-if="clue.type == 'url'")
            .form-label.form-label--required {{ $t("clue.url") }}

            label.error-label(v-if="error && error.url") {{ error.url.join(', ') }}

            input.form-input(v-model="clue.url" :disabled="!editable")

          .form-control(v-if="clue.type != 'text' && clue.type != 'url'")
            div(v-if="file")
              img.clue-preview(v-if="clue.type == 'image'" :src="mediaURL")

              video.clue-preview(v-if="clue.type == 'video'" controls)
                source(:src="mediaURL")

              div(v-if="clue.type == 'audio'") {{ file.name }}
              audio.clue-preview(v-if="clue.type == 'audio'" controls :src="mediaURL")

          .form-control(v-if="clue.type != 'text' && clue.type != 'url'")
            FileUpload.file-upload--full(
              @filesAdded="onFileAdded"
              :fileType="clue.type"
              :title="$t('general.choose_file')"
            )

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

          .form-control(v-if="editable")
            a.button.button--blue.button--large.button--full(@click="submit()") {{ $t("general.submit") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { CREATE_CLUE } from '@/store/action-types'
import { SET_ERROR } from '@/store/mutation-types'

import vSelect from 'vue-select'

import FileUpload from '@/components/shared/FileUpload.vue'

import { CLUE_TYPES } from '@/config'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureClueForm',
  components: {
    vSelect,

    FileUpload
  },
  data () {
    return {
      file: null,
      clueData: {
        id: null,
        type: 'text',
        tip: false,
        url: null,
        video_url: null,
        description: null,
        order: 0
      }
    };
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading,
      error: state => state.adventure.errors[CREATE_CLUE]
    }),
    ...mapGetters('adventure', {
      editable: 'editable'
    }),

    mediaURL () {
      if(this.file) {
        return URL.createObjectURL(this.file);
      } else {
        return null;
      }
    },
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
      return this.clueData;
    },
    clueType () {
      return this.clueTypes.find(clueType => clueType.value == this.clue.type);
    }
  },
  mounted () {
    this.$store.commit(`${ACTION_NAMESPACE}/${SET_ERROR}`, { key: CREATE_CLUE, error: null });

    if(this.adventure.id && !this.loading) {
      if(!this.point) {
        this.$router.replace({ name: 'adventureMap', params: { adventureId: this.adventure.id } });
      }
    }
  },
  methods: {
    updateType (evt) {
      this.clueData.type = evt.value;
      this.file = null;
    },
    onFileAdded (files) {
      this.file = null;

      //to force ui update
      setTimeout(() => {
        this.file = files[0];
      }, 0);
    },
    updateTip (value) {
      if(!this.editable) {
        return;
      }

      this.clueData.tip = value;
    },

    submit () {
      let data = this.clueData;

      data.order = this.point.clues.length

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_CLUE}`, {
        pointId: this.$route.params.pointId,
        data: data
      }).then( (response) => {
        setTimeout(() => {
          this.$router.replace({
            name: 'adventureClue',
            params: {
              adventureId: this.adventure.id,
              pointId: this.point.id,
              clueId: response.data.id
            }
          });
        }, 0);
      });
    }
  }
}
</script>
