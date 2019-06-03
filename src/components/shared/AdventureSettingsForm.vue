<template lang="pug">
  .adventure-settings
    .adventure-panel__header
      router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      .adventure-panel__title
        span(v-if="!editable") {{ $t("adventure.adventure_details") }}
        span(v-else) {{ $t("adventure.edit_adventure") }}

    .row
      .col-1-2
        .form-control(:class="{ 'form-control--with-error': error && error.name }")
          label.form-label.form-label--required {{ $t('general.name') }}
          label.error-label(v-if="error && error.name") {{ error.name.join(', ') }}
          input.form-input(type="text" :disabled="!editable" :placeholder="$t('general.name')" v-model="adventure.name")

        .form-control(:class="{ 'form-control--with-error': error && error.description }")
          label.form-label {{ $t("general.description") }}
          label.error-label(v-if="error && error.description") {{ error.description.join(', ') }}
          textarea.form-input(:placeholder="$t('general.description')" :disabled="!editable" v-model="adventure.description")

        .form-control
          .row.row--align-center
            .col-2-3
              span {{ $t("adventure.estimated_duration") }}
              .icon.icon--question-mark.icon--pad-left
                .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
                  .icon__tooltip {{ $t("adventure.estimated_duration_explanation") }}
            .col-1-3
              .form-checkbox.form-checkbox--small(
                :class="{ 'form-checkbox--active': specifiedDuration, 'form-checkbox--disabled': !editable }" 
                @click="updateSpecifiedDuration(!specifiedDuration)"
              )
                .form-checkbox__toggle

          .form-control(:class="{ 'form-control--with-error': error && (error.min_time || error.max_time) }")
            label.error-label(v-if="error && error.min_time") {{ error.min_time.join(', ') }}
            label.error-label(v-if="error && error.max_time") {{ error.max_time.join(', ') }}

          .slider-wrapper.slider-wrapper--padded(v-if="specifiedDuration")
            vue-slider(
              ref="durationSlider"
              :value="duration"
              v-bind="sliderOptions"
              @callback="sliderCallback"
            )

        .form-control
          label.form-label {{ $t("adventure.difficulty") }}
          v-select(
            :placeholder="$t('adventure.difficulty')" 
            :clearable="false" 
            :options="difficultyLevels" 
            :value="difficulty" 
            :disabled="!editable"
            @input="changeDifficulty"
          )

        .form-control
          .row.row--align-center
            .col-2-3
              span {{ $t("adventure.adventure_hidden") }}
              .icon.icon--question-mark.icon--pad-left
                .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
                  .icon__tooltip {{ $t("adventure.adventure_hidden_explanation") }}
            .col-1-3
              .form-checkbox.form-checkbox--small(
                :class="{ 'form-checkbox--active': !adventure.shown, 'form-checkbox--disabled': !editable }" 
                @click="updateShown(!adventure.shown)"
              )
                .form-checkbox__toggle

        .form-control(v-if="editable")
          button.button.button--submit.button--blue.button--large.button--full(@click="submit()") {{ $t('general.submit') }}

      .col-1-2
        .form-control
          label.form-label.form-label--required {{ $t("adventure.cover_image") }}

          .form-control
            FileUpload.file-upload--big(
              :title="$t('adventure.add_cover_image')"
              :enabled="editable"
              @filesAdded="onCoverAdded"
            )
              img.file-upload__image(slot="placeholder" v-if="adventure.cover_url" :src="adventure.cover_url")

        .form-control
          label.form-label {{ $t("adventure.promo_images") }}

          FileUpload.file-upload--wide(
            v-if="editable"
            :multiple="true"
            :title="$t('adventure.add_promo_images')"
            @filesAdded="onPromoImagesAdded"
          )

          draggable(
            v-model="adventure.images"
            :options="{ disabled: !editable }"
            @change="updateList"
          )
            .adventure-promo-image(
              v-for="image in adventure.images"
              :key="image.id"
            )
              img(:src="image.url")

              button.button.button--icon-sm.button--blue.adventure-promo-image__remove-button(@click="confirmRemoveImage(image)")
                .icon.icon--sm.icon--close-white
                  .icon__tooltip-wrapper
                    .icon__tooltip {{ $t("general.remove") }}

              a.button.button--icon-sm.button--blue.adventure-promo-image__preview-button(:href="image.url" target="_blank")
                .icon.icon--sm.icon--eye
                  .icon__tooltip-wrapper
                    .icon__tooltip {{ $t("general.preview") }}

    UploadProgress(:upload="upload")

    Modal(v-if="imageToRemove" @close="closeModal")
      div(slot="header") {{ $t("general.remove") }}

      p {{ $t("image.remove_confirm") }}

      .text-center
        a.button.button--blue(@click="removeImage") {{ $t("general.submit") }}
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import draggable from 'vuedraggable'

import cloneDeep from 'lodash.clonedeep'

import vueSlider from 'vue-slider-component'
import vSelect from 'vue-select'

import FileUpload from '@/components/shared/FileUpload.vue'
import UploadProgress from '@/components/shared/UploadProgress.vue'

import Modal from '@/components/shared/Modal.vue'

import { ADVENTURE_DURATION_OPTIONS, DIFFICULTY_LEVELS } from '@/config'

import {
  UPDATE_ADVENTURE,
  
  UPLOAD_MAIN_IMAGE, CREATE_GALLERY_IMAGES,
  UPDATE_GALLERY_IMAGES, DESTROY_GALLERY_IMAGE
} from '@/store/action-types'

import { SET_ERROR } from '@/store/mutation-types'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureSettings',
  components: {
    draggable,
    vueSlider,
    vSelect,

    FileUpload,
    UploadProgress,

    Modal
  },
  data () {
    return {
      adventureData: {
        id: null,
        name: null,
        cover_url: null,
        status: null,
        duration: {
          min: ADVENTURE_DURATION_OPTIONS.MIN,
          max: Math.min(ADVENTURE_DURATION_OPTIONS.MIN + 60, ADVENTURE_DURATION_OPTIONS.MAX)
        },
        description: null,
        images: []
      },
      specifiedDuration: true,
      imageToRemove: null
    }
  },
  computed: {
    ...mapState({
      upload: state => state.adventure.upload,

      loading: state => state.adventure.loading,
      error: state => state.adventure.errors[UPDATE_ADVENTURE]
    }),
    ...mapGetters('adventure', {
      editable: 'editable'
    }),

    adventure () {
      let adventure = this.$store.state.adventure.item;

      if(adventure.id) {
        //eslint-disable-next-line
        this.adventureData = cloneDeep(adventure);

        if(adventure.duration == null) {
          //eslint-disable-next-line
          this.specifiedDuration = false;
        }
      }

      return this.adventureData;
    },
    sliderOptions () {
      return {
        min: ADVENTURE_DURATION_OPTIONS.MIN,
        max: ADVENTURE_DURATION_OPTIONS.MAX,
        interval: ADVENTURE_DURATION_OPTIONS.INTERVAL,
        disabled: !this.editable,
        formatter: (value) => {
          return this.formatSliderLabel(value);
        },
        "merge-formatter": (v1, v2) => {
          if(v1 == v2) {
            return this.$t("general.around", { value: this.formatSliderLabel(v1) });
          } else {
            return `${this.formatSliderLabel(v1)} - ${this.formatSliderLabel(v2)}`;
          }
        },
        processDragable: true //yes, it has to be a typo and not 'draggable'
      }
    },
    duration () {
      return [this.adventure.duration.min, this.adventure.duration.max]
    },

    difficulty () {
      return this.difficultyLevels.find(level => level.value == this.adventure.difficulty);
    },
    difficultyLevels () {
      return DIFFICULTY_LEVELS.map(level => {
        return {
          value: level,
          label: this.$t(`adventure.difficulty_${level}`)
        }
      });
    }
  },
  mounted () {
    this.$store.commit(`${ACTION_NAMESPACE}/${SET_ERROR}`, { key: UPDATE_ADVENTURE, error: null });
  },
  methods: {
    formatSliderLabel (value) {
      if(value < 3600) {
        return `${value / 60}min`;
      } else {
        let minutes = (value % 3600) / 60;
        let hours = Math.floor(value / 3600);

        if(minutes == 0) {
          return `${hours}h`;
        } else {
          return `${hours}h ${minutes}min`;
        }
      }
    },
    sliderCallback (value) {
      this.adventureData.duration.min = value[0];
      this.adventureData.duration.max = value[1];
    },

    updateName (evt) {
      this.adventureData.name = evt.value;
    },
    changeDifficulty (evt) {
      this.adventureData.difficulty = evt.value;
    },

    updateSpecifiedDuration (value) {
      if(!this.editable) {
        return;
      }

      this.specifiedDuration = value;

      if(this.specifiedDuration) {
        if(this.adventureData.duration == null) {
          this.adventureData.duration = {
            min: ADVENTURE_DURATION_OPTIONS.MIN,
            max: Math.min(ADVENTURE_DURATION_OPTIONS.MIN + ADVENTURE_DURATION_OPTIONS.INTERVAL, ADVENTURE_DURATION_OPTIONS.MAX)
          }
        }
      } else {
        this.adventureData.duration = null;
      }
    },

    updateShown (value) {
      if(!this.editable) {
        return;
      }

      this.adventureData.shown = value;
    },

    updateList () {
      let images = this.adventureData.images.map( (image, index) => {
        return {
          id: image.id,
          order: index
        };
      });

      let payload = { images };

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_GALLERY_IMAGES}`, { payload });
    },

    onCoverAdded (files) {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPLOAD_MAIN_IMAGE}`, {
        file: files[0]
      });
    },

    onPromoImagesAdded (files) {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_GALLERY_IMAGES}`, { files });
    },

    confirmRemoveImage (image) {
      this.imageToRemove = image;
    },

    closeModal () {
      this.imageToRemove = null;
    },

    removeImage () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_GALLERY_IMAGE}`, { imageId: this.imageToRemove.id })
        .then( () => {
          this.imageToRemove = null;
        })
        .catch( error => {
          this.imageToRemove = null;
        });
    },

    submit () {
      let params = cloneDeep(this.adventureData);

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_ADVENTURE}`, {
        params: params
      });
      //TODO validate form
    }
  }
}
</script>
