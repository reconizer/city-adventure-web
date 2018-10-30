<template lang="pug">
  .adventure-point-list
    .adventure-point-list__line

    .adventure-point-wrapper(v-if="startingPoint" :id="elementId(startingPoint)")
      .adventure-point.adventure-point--start
        .adventure-point__name.button.button--pink(@click="goToPoint(startingPoint)") Start

      AdventurePointClueList(
        :point="startingPoint",
        :isLast="false"
      )

    .adventure-point-wrapper(
      v-for="(point, pointIndex) in puzzlePoints"
      :key="point.id"
      :id="elementId(point)"
    )
      .adventure-point
        .button.button--gray.adventure-point__name(@click="goToPoint(point)")
          span {{ pointIndex + 1 }}
          .icon.icon--eye-inactive.icon--pad-left(v-if="point.hidden")
          .icon.icon--eye.icon--pad-left(v-if="!point.hidden")
          .icon.icon--lock-white.icon--pad-left(v-if="hasPassword(point)")
          .icon.icon--clock.icon--pad-left(v-if="hasTimeConstraint(point)")

        .adventure-point__controls
          router-link.button.button--blue.adventure-point__control(
            :to="{ name: 'adventurePoint', params: { adventureId: adventure.id, pointId: point.id } }"
          )
            .icon.icon--sm.icon--pencil-white.icon--pad-right
            span Edit

          .button.button--blue.adventure-point__control
            .icon.icon--sm.icon--close-white.icon--pad-right
            span Remove

      AdventurePointClueList(
        :point="point",
        :isLast="pointIndex + 1 == puzzlePoints.length"
      )

    .adventure-point-wrapper
      .adventure-point.adventure-point--new
        .button.button--blue.adventure-point__name(@click="addNewPuzzle()")
          .icon.icon--add-white.icon--pad-right
          span Add new puzzle
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
    elementId (point) {
      return `point-${point.id}`;
    },
    hasPassword (point) {
      return point.answers.filter((el) => {
        return el.type == "password"
      }).length > 0;
    },
    hasTimeConstraint (point) {
      return point.answers.filter((el) => {
        return el.type == "time"
      }).length > 0;
    },
    //TODO location as a component?
    goToPoint (point) {
      // Handle map centering in AdventureMap component
      this.$root.$emit('center-camera', point.position);
    },
    addNewPuzzle () {
      // Handle new point creation in AdventureMap component
      this.$root.$emit('add-new-point');
    }
  }
}
</script>
