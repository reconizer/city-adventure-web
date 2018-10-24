<template lang="pug">
  .adventure-point-list
    .adventure-point-list__line

    .adventure-point-wrapper(v-if="startingPoint")
      .adventure-point.adventure-point--start
        .adventure-point__name.button.button--pink(@click="goToPoint(startingPoint)") Start

      AdventurePointClueList(
        :point="startingPoint",
        :isLast="false"
      )

    .adventure-point-wrapper(
      v-for="(point, pointIndex) in puzzlePoints"
      :key="point.id"
    )
      .adventure-point
        .button.button--gray.adventure-point__name(@click="goToPoint(point)") {{ pointIndex + 1 }}
        .adventure-point__controls
          router-link.button.button--blue.adventure-point__control(
            :to="{ name: 'adventurePoint', params: { adventureId: adventure.id, pointId: point.id } }"
          ) Edit

          .button.button--blue.adventure-point__control Remove

      AdventurePointClueList(
        :point="point",
        :isLast="pointIndex + 1 == puzzlePoints.length"
      )

    .adventure-point-wrapper
      .adventure-point.adventure-point--new
        .button.button--blue.adventure-point__name Add new puzzle
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import AdventurePointClueList from '@/components/AdventurePointClueList.vue'

export default {
  name: 'AdventurePointList',
  components: {
    AdventurePointClueList
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,

      loading: state => state.adventure.loading
    }),
    ...mapGetters('adventure', {
      puzzlePoints: 'puzzlePoints',
      startingPoint: 'startingPoint'
    })
  },
  methods: {
    goToPoint (point) {
      this.$root.$emit('center-camera', point.position);
    }
  }
}
</script>
