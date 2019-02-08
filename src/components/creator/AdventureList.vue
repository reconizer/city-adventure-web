<template lang="pug">
  .adventure-list
    .adventure-list__header
      .row.row--align-center
        .col-1-2 {{ $t("adventures.list_title") }}
        .col-1-2.text-right
          router-link.button.button--blue(
            :to="{ name: 'newAdventure' }"
          ) {{ $t("adventures.create_new") }}

    AdventureListItem(v-for="adventureItem in adventures" :key="adventureItem.id" :adventure="adventureItem")

    Loader(v-if="loading")
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURES } from '@/store/action-types'

import AdventureListItem from '@/components/creator/AdventureListItem'

import Loader from '@/views/Loader.vue'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'AdventureList',
  components: {
    AdventureListItem,

    Loader
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
