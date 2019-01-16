<template lang="pug">
  .puzzle-component
    .puzzle-component__header
      .puzzle-component__name {{ $t("adventure_point.time_constraint") }}

      .form-checkbox(
        :class="{ 'form-checkbox--active': timeConstraint, 'form-checkbox--disabled': !editable }"
        @click="$emit('toggle-time-constraint')"
      )
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
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import { TIME_CONSTRAINT_OPTIONS } from '@/config'

import { pad } from '@/utils'

import vueSlider from 'vue-slider-component'

export default {
  name: "AdventurePointFormTimeConstraint",
  components: {
    vueSlider
  },
  props: {
    timeAnswer: {
      type: Object,
      default: null
    },
    timeConstraint: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item
    }),
    ...mapGetters('adventure', {
      editable: 'editable'
    }),

    startingTimeSliderOptions () {
      return {
        min: 0,
        max: 24 * 60 * 60 - TIME_CONSTRAINT_OPTIONS.INTERVAL,
        interval: TIME_CONSTRAINT_OPTIONS.INTERVAL,
        disabled: !this.editable,
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
        disabled: !this.editable,
        formatter: (value) => {
          let current = this.timeAnswer.details.starting_time + value;

          let hour = Math.floor(current / 3600) % 24;
          let minutes = (current % 3600) / TIME_CONSTRAINT_OPTIONS.INTERVAL * (TIME_CONSTRAINT_OPTIONS.INTERVAL / 60);

          return `${pad(hour, 2)}:${pad(minutes, 2)}`;
        }
      }
    }
  }
}
</script>
