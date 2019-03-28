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
</template>

<script>
export default {
  name: 'PlayerListItem',
  props: {
    player: {
      type: Object
    }
  }
}
</script>
