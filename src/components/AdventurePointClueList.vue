<template lang="pug">
  div
    draggable.adventure-point-clues(
      v-if="!isLast"
      v-model="point.clues"
      :options="{draggable: '.adventure-point-clue-wrapper', group: 'clues'}"
      @change="updateList($event)"
    )
      .adventure-point-clue-wrapper(v-for="(clue, index) in point.clues" :key="clue.id")
        .adventure-point-clue-wrapper__dot
        .adventure-point-clue-wrapper__line

        router-link.adventure-point-clue(
          :class="{ 'adventure-point-clue--image': clue.type == 'image' }"
          :to="{ name: 'adventureClue', params: { adventureId: adventure.id, pointId: point.id, clueId: clue.id } }"
        )
          .adventure-point-clue__thumb(v-if="clue.type == 'image'")
            img(:src="clue.details.url")

          .adventure-point-clue__text(v-else-if="clue.type == 'text'")
            .icon.icon--question-mark.icon--pad-right.icon--align-start
            .adventure-point-clue__content {{ clue.details.text }}

          .adventure-point-clue__text(v-else-if="clue.type == 'audio'")
            .icon.icon--audio.icon--pad-right
            .adventure-point-clue__content {{ clue.details.url }}

          .adventure-point-clue__text(v-else-if="clue.type == 'movie'")
            .icon.icon--video.icon--pad-right
            .adventure-point-clue__content {{ clue.details.url }}

    .adventure-point-new-clue-separator

    .adventure-point-new-clue(v-if="!isLast")
      .adventure-point-clue-wrapper__dot
      .adventure-point-clue-wrapper__line

      router-link.button.button--gray-dashed(
        :to="{ name: 'newAdventureClue', params: { adventureId: adventure.id, pointId: point.id } }"
      )
        .icon.icon--add.icon--pad-right
        span New clue
</template>

<script>
import { mapState } from 'vuex'

import { UPDATE_CLUES } from '@/store/action-types'

import draggable from 'vuedraggable'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventurePointClueList',
  components: {
    draggable
  },
  props: {
    point: {
      type: Object,
      default: () => {}
    },
    isLast: {
      type: Boolean,
      default: () => false
    }
  },
  computed: mapState({
    adventure: state => state.adventure.item
  }),
  methods: {
    updateList (evt) {
      if(evt.added || evt.moved) {
        let clues = this.point.clues.map( (clue, index) => {
          return {
            id: clue.id,
            point_id: this.point.id,
            order: index
          };
        });

        let payload = { clues };

        this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_CLUES}`, { payload });
      }
    },
  }
}
</script>
