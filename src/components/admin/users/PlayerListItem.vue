<template lang="pug">
  .user-list-item
    .user-list-item__avatar
      img(:src="player.avatar_url")

    .user-list-item__name {{ player.name }}

    .user-list-item__email {{ player.email }}

    .user-list-item__actions
      router-link.button.button--icon(:to="{ name: 'player', params: { playerId: player.id } }")
        .icon.icon--pencil
          .icon__tooltip-wrapper
            .icon__tooltip {{ $t("general.edit") }}

      .button.button--icon(@click="showConfirmRemoveModal")
        .icon.icon--close
          .icon__tooltip-wrapper
            .icon__tooltip {{ $t("general.remove") }}

    Modal(v-if="showConfirmRemove" @close="closeConfirmRemoveModal")
      div(slot="header") {{ $t("admin_users.remove") }}

      p {{ $t("admin_users.remove_confirm", { userName: player.name }) }}

      .text-center
        button.button.button--blue(@click="removeUser") {{ $t("general.confirm_remove") }}
</template>

<script>

import Modal from '@/components/shared/Modal.vue'

import { DESTROY_PLAYER } from '@/store/action-types'

const ACTION_NAMESPACE = 'players'

export default {
  name: 'PlayerListItem',
  components: {
    Modal
  },
  props: {
    player: {
      type: Object,
      default: () => {}
    }
  },
  data: () => {
    return {
      showConfirmRemove: false
    }
  },
  methods: {
    closeConfirmRemoveModal () {
      this.showConfirmRemove = false;
    },

    showConfirmRemoveModal () {
      this.showConfirmRemove = true;
    },

    removeUser () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${DESTROY_PLAYER}`, { id: this.player.id });
    }
  }
}
</script>
