<template lang="pug">
  .adventure-panel
    .adventure-panel__header
      span(v-if="isNewClue") Edit Clue
      span(v-else) New Clue

      router-link.icon.icon--close.icon--pad-right.adventure-panel__back(:to="{ name: 'adventureMap', params: { adventureId: adventureId } }")

    .row
      .col-1-2
        span t
</template>

<script>
import { mapState } from 'vuex'

import { CREATE_CLUE, UPDATE_CLUE } from '@/store/action-types'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'AdventureClueForm',
  data () {
    return {
      newClue: { }
    };
  },
  computed: {
    ...mapState({
      adventureId: state => state.adventure.item.id,

      loading: state => state.adventure.loading,
      error: state => state.adventure.error
    }),
    clue () {
      if(this.$route.params.clueId) {
        let point = this.$store.state.adventure.points.find(point => point.id == this.$route.params.pointId);

        if(!point) {
          return { };
        } else {
          return point.clues.find(clue => clue.id == this.$route.params.clueId);
        }
      } else {
        return { };
      }
    },
    isNewClue () {
      return this.clue.id != undefined;
    }
  }
}
</script>
