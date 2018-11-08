<template lang="pug">
  div
    draggable.adventure-point-clues(
      v-model="point.clues"
      :options="{draggable: '.adventure-point-clue-wrapper', group: 'clues'}"
      @change="updateList($event)"
    )
      .adventure-point-clue-wrapper(
        v-for="(clue, index) in point.clues"
        :key="clue.id"
        :class="{ 'adventure-point-clue-wrapper--tip': clue.tip }"
      )
        .adventure-point-clue-wrapper__dot
        .adventure-point-clue-wrapper__line

        router-link.adventure-point-clue(
          :class="{ 'adventure-point-clue--image': clue.type == 'image' }"
          :to="{ name: 'adventureClue', params: { adventureId: adventure.id, pointId: point.id, clueId: clue.id } }"
          exact-active-class="adventure-point-clue--active"
        )
          .adventure-point-clue__thumb(v-if="clue.type == 'image'")
            img(:src="clue.url")

          .adventure-point-clue__text(v-else-if="clue.type == 'text'")
            .icon.icon--question-mark.icon--pad-right.icon--align-start
              .icon__tooltip-wrapper
                .icon__tooltip Text Clue

            .adventure-point-clue__content {{ clue.description }}

          .adventure-point-clue__text(v-else-if="clue.type == 'audio'")
            .icon.icon--audio.icon--pad-right
              .icon__tooltip-wrapper
                .icon__tooltip Audio Clip

            .adventure-point-clue__content {{ clue.description }}

          .adventure-point-clue__text(v-else-if="clue.type == 'video'")
            .icon.icon--video.icon--pad-right
              .icon__tooltip-wrapper
                .icon__tooltip Video

            .adventure-point-clue__content {{ clue.description }}

          .adventure-point-clue__text(v-else-if="clue.type == 'url'")
            .icon.icon--attachment.icon--pad-right
              .icon__tooltip-wrapper
                .icon__tooltip External URL

            .adventure-point-clue__content {{ clue.url }}

    .adventure-point-new-clue-separator

    .adventure-point-new-clue
      .adventure-point-clue-wrapper__dot
      .adventure-point-clue-wrapper__line

      router-link.button.button--gray-dashed(
        :to="{ name: 'newAdventureClue', params: { adventureId: adventure.id, pointId: point.id } }"
        exact-active-class="button--gray-dashed-active"
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

        let currentRoute = this.$router.currentRoute;

        //If user drags and drops clue which has currently opened form - fix url so we operate on real objects still

        if(currentRoute.name == "adventureClue" && evt.added && evt.added.element.id == currentRoute.params.clueId) {
          this.$router.replace({
            name: currentRoute.name,
            params: {
              adventureId: currentRoute.params.adventureId,
              clueId: currentRoute.params.clueId,
              pointId: this.point.id
            }
          });
        }

        let payload = { clues };

        this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_CLUES}`, { payload });
      }
    }
  }
}
</script>
