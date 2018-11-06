<template lang="pug">
  .adventure-panel
    .adventure-panel__inner(v-if="adventure.id")
      .adventure-panel__header
        router-link.icon.icon--back.icon--pad-right.adventure-panel__back(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        span Edit Adventure 

      .row
        .col-1-2
          .form-control
            label.form-label.form-label--required Name
            input.form-input(type="text" placeholder="Name" v-model="adventure.name")

          .form-control
            label.form-label.form-label--required Description
            textarea.form-input(placeholder="Description" v-model="adventure.description")

          .form-control
            label.form-label Duration
            .slider-wrapper
              vue-slider(
                ref="durationSlider"
                :value="duration"
                v-bind="sliderOptions"
              )

          .form-control
            label.form-label Difficulty
            v-select(placeholder="Difficulty" :clearable="false" :options="difficultyLevels" :value="difficulty" @input="changeDifficulty")

        .col-1-2
          .form-control
            label.form-label.form-label--required Cover Image
            input.form-input(type="text" placeholder="Cover Image URL" v-model="adventure.cover_url")

            .adventure-cover
              img(:src="adventure.cover_url")

      .form-control-separator
      .row
        .col-1-2
          .form-control
            a.button.button--blue.button--large.button--full(@click="submit") Submit
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
      }
    }
  },
  computed: {
    adventure () {
      let adventure = this.$store.state.adventure.item;

      if(adventure) {
        //eslint-disable-next-line
        this.adventureData = cloneDeep(adventure);
      }

      return this.adventureData;
    },
    sliderOptions () {
      return {
        min: ADVENTURE_DURATION_OPTIONS.MIN,
        max: ADVENTURE_DURATION_OPTIONS.MAX,
        interval: ADVENTURE_DURATION_OPTIONS.INTERVAL,
        formatter: (value) => {
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
        }
      }
    },
    duration () {
      return [this.adventure.duration.min, this.adventure.duration.max]
    },

    difficulty () {
      return this.difficultyLevels.find(level => level.value == this.adventure.difficulty);
    },
    difficultyLevels () {
      return DIFFICULTY_LEVELS;
    }
  },
  methods: {
    updateName (evt) {
      this.adventureData.name = evt.value;
    },

    changeDifficulty (evt) {
      this.adventureData.difficulty = evt.value;
    },

    submit () {
      let durationValue = this.$refs.durationSlider.getValue();

      this.adventureData.duration.min = durationValue[0];
      this.adventureData.duration.max = durationValue[1];

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_ADVENTURE}`, {
        adventureId: this.adventureData.id,
        params: this.adventureData
      });
      //TODO validate form
    }
  }
}
</script>
