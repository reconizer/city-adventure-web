<template lang="pug">
  div
    .adventure-structure
      AdventurePointList

    .adventure-content
      router-view
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURE } from '@/store/action-types'

import AdventurePointList from '@/components/AdventurePointList.vue'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'Adventure',
  components: {
    AdventurePointList
  },
  computed: mapState({
    adventure: state => state.adventures.item,
    points: state => state.adventures.points,

    loading: state => state.adventures.loading,
    error: state => state.adventures.error
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURE}`, { id: this.$route.params.adventureId });
  }
}
</script>
