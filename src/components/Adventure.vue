<template lang="pug">
  div
    .adventure-loader(v-if="loading")
      .adventure-loader__spinner

    .adventure-structure
      AdventurePointList

    AdventureMap

    router-view
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURE } from '@/store/action-types'

import AdventureMap from '@/components/AdventureMap.vue'
import AdventurePointList from '@/components/AdventurePointList.vue'

const ACTION_NAMESPACE = 'adventure'

export default {
  name: 'Adventure',
  components: {
    AdventurePointList,
    AdventureMap
  },
  computed: mapState({
    adventure: state => state.adventure.item,
    points: state => state.adventure.points,

    loading: state => state.adventure.loading,
    error: state => state.adventure.error
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURE}`, { id: this.$route.params.adventureId });
  }
}
</script>
