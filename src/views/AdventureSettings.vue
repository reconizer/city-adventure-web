<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="adventure.id")
      router-view(:key="$route.fullPath")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdventureSettings',
  computed: mapState({
    adventure: state => state.adventure.item
  })
}
</script>

