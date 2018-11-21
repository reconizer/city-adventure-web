<template lang="pug">
  div
    .overlay-loader(v-if="loading")
      .overlay-loader__spinner

    .adventure-structure(:class="{ 'adventure-structure--expanded': this.expanded }")
      .adventure-structure__header
        router-link.adventure-structure__title(
          v-if="adventure.id"
          :to="{ name: 'adventureMap', params: { adventureId: adventure.id } }"
        ) {{ adventure.name }}

        router-link.adventure-structure__edit(
          v-if="adventure.id"
          :to="{ name: 'adventureSettings', params: { adventureId: adventure.id } }"
        )
          .icon.icon--settings


      AdventurePointList

    //.adventure-structure-expander(@click="toggleExpand")
      span Expand

    AdventureMap

    router-view(:key="$route.fullPath")
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
  data () {
    return {
      expanded: true
    }
  },
  computed: mapState({
    adventure: state => state.adventure.item,
    points: state => state.adventure.points,

    loading: state => state.adventure.loading,
    error: state => state.adventure.error
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURE}`, { id: this.$route.params.adventureId });
  },
  methods: {
    toggleExpand () {
      this.expanded = !this.expanded;
    }
  }
}
</script>
