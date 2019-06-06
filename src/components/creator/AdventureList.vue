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

    .adventure-list__empty(v-if="adventures.length === 0 && !loading") {{ $t("adventures.empty") }}

    Modal(v-if="showConfirmRemove" @close="closeConfirmRemoveModal")
      div(slot="header") {{ $t("adventure.remove") }}

      p {{ $t("adventure.remove_confirm") }}

      .text-center
        button.button.button--blue(@click="removeAdventure") {{ $t("general.confirm_remove") }}

    Loader(v-if="loading")
</template>

<script>
import { mapState } from 'vuex'

import {
  LOAD_ADVENTURES,
  REMOVE_ADVENTURE
} from '@/store/action-types'

import AdventureListItem from '@/components/creator/AdventureListItem'

import Loader from '@/views/Loader.vue'
import Modal from '@/components/shared/Modal.vue'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'AdventureList',
  components: {
    AdventureListItem,

    Modal,
    Loader
  },
  data () {
    return {
      showConfirmRemove: false,
      removableId: null
    }
  },
  computed: mapState({
    adventures: state => state.adventures.list,

    loading: state => state.adventures.loading
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`, { page: 1 });

    this.$root.$on('confirm-remove', (id) => {
      this.removableId = id;
      this.showConfirmRemove = true;
    });
  },
  methods: {
    removeAdventure () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${REMOVE_ADVENTURE}`, { id: this.removableId });

      this.showConfirmRemove = false;
    },

    closeConfirmRemoveModal () {
      this.showConfirmRemove = false;
    }
  }
}
</script>
