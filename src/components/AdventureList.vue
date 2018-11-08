<template lang="pug">
  .adventure-list
    .adventure-list__header
      .row.row--align-center
        .col-1-2 Your Adventures
        .col-1-2.text-right
          router-link.button.button--blue(
            :to="{ name: 'newAdventure' }"
          ) Create New

    AdventureListItem(v-for="adventureItem in adventures" :key="adventureItem.id" :adventure="adventureItem")

    .overlay-loader(v-if="loading")
      .overlay-loader__spinner
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

    loading: state => state.adventures.loading
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`, { page: 1 });
  }
}
</script>
