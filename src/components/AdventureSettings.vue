<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="adventure.id")
      .adventure-panel__header
        router-link.icon.icon--back.icon--pad-right.adventure-panel__back(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        span {{ $t('adventure.edit_adventure') }}

        a.button.button--blue.adventure-panel__submit(@click="submit()") {{ $t('general.submit') }}

      .row
        .col-1-2
          .form-control
            label.form-label.form-label--required {{ $t('general.name') }}
            input.form-input(type="text" :placeholder="$t('general.name')" v-model="adventure.name")

          .form-control
            label.form-label.form-label--required {{ $t("general.description") }}
            textarea.form-input(:placeholder="$t('general.description')" v-model="adventure.description")

          .form-control
            .row.row--align-center
              .col-2-3
                span {{ $t("adventure.estimated_duration") }}
                .icon.icon--question-mark.icon--pad-left
                  .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
                    .icon__tooltip {{ $t("adventure.estimated_duration_explanation") }}
              .col-1-3
                .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': specifiedDuration }" @click="updateSpecifiedDuration(!specifiedDuration)")
                  .form-checkbox__toggle

            .slider-wrapper.slider-wrapper--padded(v-if="specifiedDuration")
              vue-slider(
                ref="durationSlider"
                :value="duration"
                v-bind="sliderOptions"
                @callback="sliderCallback"
              )

          .form-control
            label.form-label {{ $t("adventure.difficulty") }}
            v-select(:placeholder="$t('adventure.difficulty')" :clearable="false" :options="difficultyLevels" :value="difficulty" @input="changeDifficulty")

          .form-control
            .row.row--align-center
              .col-2-3
                span {{ $t("adventure.adventure_hidden") }}
                .icon.icon--question-mark.icon--pad-left
                  .icon__tooltip-wrapper.icon__tooltip-wrapper--multiline
                    .icon__tooltip {{ $t("adventure.adventure_hidden_explanation") }}
              .col-1-3
                .form-checkbox.form-checkbox--small(:class="{ 'form-checkbox--active': adventure.hidden }" @click="updateHidden(!adventure.hidden)")
                  .form-checkbox__toggle

        .col-1-2
          .form-control
            label.form-label.form-label--required {{ $t("adventure.cover_image") }}
            input.form-input(type="text" :placeholder="$t('adventure.cover_image')" v-model="adventure.cover_url")

            .adventure-cover
              img(:src="adventure.cover_url")

          .form-control
            label.form-label {{ $t("adventure.promo_images") }}

          .form-control
            draggable(
              v-model="adventure.images"
              @change="updateList"
            )
              .adventure-promo-image(
                v-for="image in adventure.images"
                :key="image.id"
              )
                img(:src="image.url")
</template>

<script>
import { mapState } from 'vuex'

import draggable from 'vuedraggable'

import cloneDeep from 'lodash.clonedeep'

import vueSlider from 'vue-slider-component'
import vSelect from 'vue-select'

import { ADVENTURE_DURATION_OPTIONS, DIFFICULTY_LEVELS } from '@/config'

import { UPDATE_ADVENTURE } from '@/store/action-types'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureSettings',
  components: {
    draggable,
    vueSlider,
    vSelect
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
      specifiedDuration: true
    }
  },
  computed: {
    ...mapState({
      loading: state => state.adventures.loading,
      error: state => state.adventure.error
    }),
    adventure () {
      let adventure = this.$store.state.adventure.item;

      if(adventure.id) {
        //eslint-disable-next-line
        this.adventureData = cloneDeep(adventure);

        if(adventure.duration.min == null || adventure.duration.max == null) {
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
        formatter: (value) => {
          return this.formatSliderLabel(value);
        },
        "merge-formatter": (v1, v2) => {
          if(v1 == v2) {
            return `Around ${this.formatSliderLabel(v1)}`;
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
  methods: {
    formatSliderLabel (value) {
      if(value < 60) {
        return `${value}min`;
      } else {
        let minutes = value % 60;
        let hours = Math.floor(value / 60);

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
      this.specifiedDuration = value;

      if(this.specifiedDuration) {
        if(this.adventureData.duration.min == null || this.adventureData.duration.max == null) {
          this.adventureData.duration = {
            min: ADVENTURE_DURATION_OPTIONS.MIN,
            max: Math.min(ADVENTURE_DURATION_OPTIONS.MIN + 60, ADVENTURE_DURATION_OPTIONS.MAX)
          }
        }
      }
    },

    updateHidden (value) {
      this.adventureData.hidden = value;
    },

    updateList (evt) {
      this.adventureData.images.forEach( (image, index) => {
        image.order = index;
      });
    },

    submit () {
      let params = cloneDeep(this.adventureData);

      if(!this.specifiedDuration) {
        params.duration.min = null;
        params.duration.max = null;
      }

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_ADVENTURE}`, {
        adventureId: this.adventureData.id,
        params: params
      });
      //TODO validate form
    }
  }
}
</script>
