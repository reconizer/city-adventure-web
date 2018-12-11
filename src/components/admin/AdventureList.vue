<template lang="pug">
  div
    .adventure-list__header

    AdventureListItem(
      v-for="adventureItem in adventures"
      :key="adventureItem.id"
      :adventure="adventureItem"
    )
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURES } from '@/store/action-types'

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED
} from '@/config'

import AdventureListItem from '@/components/admin/AdventureListItem.vue'
import Loader from '@/views/Loader.vue'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'AdventureList',
  components: {
    AdventureListItem,

    Loader
  },
  props: {
    listType: {
      type: String,
      required: true,
      validator: (value) => {
        return [
          ADVENTURES_PUBLISHED,
          ADVENTURES_IN_REVIEW,
          ADVENTURES_UNPUBLISHED
        ].indexOf(value) != -1
      }
    }
  },
  computed: mapState({
    adventures: state => state.adventures.list,

    loading: state => state.adventures.loading,
    error: state => state.adventures.error
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`, {
      adventureType: this.listType,
      page: this.page,
      query: this.query,
      sort: this.sort
    });
  }
}
</script>
