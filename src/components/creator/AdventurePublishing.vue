<template lang="pug">
  .adventure-publishment
    .adventure-panel__header
      router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      .adventure-panel__title {{ $t("adventure_publishing.title") }}

    .adventure-publishment__history(v-if="history.length")
      PublishingHistoryItem(v-for="historyItem in history" :key="historyItem.id" :historyItem="historyItem")
</template>

<script>
import { mapState, mapGetters } from 'vuex'

const ACTION_NAMESPACE = 'publishment'

import { LOAD_PUBLISHMENT_HISTORY } from '@/store/action-types'

import PublishingHistoryItem from '@/components/creator/PublishingHistoryItem'

export default {
  name: 'AdventurePublishing',
  components: {
    PublishingHistoryItem
  },
  computed: {
    ...mapState({
      adventure: state => state.adventure.item,
      history: state => state.publishment.history,

      loading: state => state.publishment.loading,
      error: state => state.publishment.error
    })
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PUBLISHMENT_HISTORY}`, { adventureId: this.$route.params.adventureId });
  }
}
</script>
