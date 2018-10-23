<template lang="pug">
  .adventure-point-list
    .adventure-point-list__line

    .adventure-point-wrapper(v-if="startingPoint")
      .adventure-point.adventure-point--start
        .adventure-point__name Start

      .adventure-point-clues
        .adventure-point-clue-wrapper
          .adventure-point-clue-wrapper__dot

          .adventure-point-clue-wrapper__line

          router-link.adventure-point-clue.adventure-point-clue--new(
            :to="{ name: 'newAdventureClue', params: { adventureId: adventure.id, pointId: startingPoint.id } }"
          )
            span Add new clue

    .adventure-point-wrapper(
      v-for="(point, pointIndex) in puzzlePoints"
      :key="point.id"
    )
      router-link.adventure-point(
        :to="{ name: 'adventurePoint', params: { adventureId: adventure.id, pointId: point.id } }"
      )
        .adventure-point__name {{ pointIndex }}

      .adventure-point-clues
        .adventure-point-clue-wrapper(v-for="(clue, index) in point.clues" :key="clue.id")
          .adventure-point-clue-wrapper__dot

          .adventure-point-clue-wrapper__line

          router-link.adventure-point-clue(
            :class="{ 'adventure-point-clue--image': clue.type == 'image' }"
            :to="{ name: 'adventureClue', params: { adventureId: adventure.id, pointId: point.id, clueId: clue.id } }"
          )
            .adventure-point-clue__thumb(v-if="clue.type == 'image'")
              img(:src="clue.details.url")

            .adventure-point-clue__text(v-else="clue.type == 'text'")
              .adventure-point-clue__icon
              .adventure-point-clue__content {{ clue.details.text }}

            .adventure-point-clue__audio(v-else="clue.type == 'audio'")

        .adventure-point-clue-wrapper(v-if="pointIndex + 1 < puzzlePoints.length")
          .adventure-point-clue-wrapper__dot

          .adventure-point-clue-wrapper__line

          router-link.adventure-point-clue.adventure-point-clue--new(
            :to="{ name: 'newAdventureClue', params: { adventureId: adventure.id, pointId: point.id } }"
          )
            span Add new clue

    .adventure-point-wrapper
      .adventure-point.adventure-point--new
        .adventure-point__name Add new puzzle
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AdventurePointList',
  computed: {
    ...mapState({
      adventure: state => state.adventures.item,

      loading: state => state.adventures.loading
    }),
    ...mapGetters('adventures', {
      puzzlePoints: 'puzzlePoints',
      startingPoint: 'startingPoint'
    })
  }
}
</script>
