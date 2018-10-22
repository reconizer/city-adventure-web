<template lang="pug">
  div
    .adventure-structure
      div(v-for="(point, index) in points" :key="point.id")
        span {{ index }} {{ point.id }}
    .adventure-content
      router-view
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURE } from '@/store/action-types'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'Adventure',
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
