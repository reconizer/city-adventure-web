<template lang="pug">
  .adventure-list
    .adventure-list__header Your Adventures

    AdventureListItem(v-for="adventureItem in adventures" :key="adventureItem.id" :adventure="adventureItem")

</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURES } from '@/store/action-types'

import AdventureListItem from '@/components/AdventureListItem'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'AdventureList',
  components: {
    AdventureListItem
  },
  computed: mapState({
    adventures: state => state.adventures.list,
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`, { page: 1 });
  }
}
</script>
