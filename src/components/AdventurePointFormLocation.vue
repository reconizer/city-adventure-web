<template lang="pug">
  .puzzle-component
    .puzzle-component__header
      .puzzle-component__name {{ $t("adventure_point.location") }}

    .form-control(v-if="pointHideable")
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
</template>

<script>

import vueSlider from 'vue-slider-component'

import { RADIUS_CONSTRAINTS } from '@/config'

export default {
  name: "AdventurePointFormLocation",
  components: {
    vueSlider
  },
  props: {
    point: {
      type: Object,
      default: null
    },
    pointHideable: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
  },
  methods: {
    updateHidden (value) {
      this.point.hidden = value;
    }
  }
}
</script>
