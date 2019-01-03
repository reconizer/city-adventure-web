<template lang="pug">
  .adventure-settings
    .adventure-panel__header
      router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      .adventure-panel__title {{ $t("adventure_publishing.title") }}

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'AdventurePublishing',
  computed: {
    ...mapState({
      loading: state => state.adventure.loading,
      error: state => state.adventure.error,
      adventure: state => state.adventure.item
    })
  }
}
</script>
