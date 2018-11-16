<template lang="pug">
  .adventure-panel.adventure-panel--scrollable
    .adventure-panel__inner(v-if="adventure.id")
      .tabs
        router-link.tabs__button.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
          .icon.icon--back

        router-link.tabs__item(
          :to="{ name: 'adventureSettings', params: { adventureId: adventure.id } }"
          exact-active-class="tabs__item--active"
        ) {{ $t('adventure.edit_adventure') }}

        router-link.tabs__item(
          :to="{ name: 'adventurePublishing', params: { adventureId: adventure.id } }"
          exact-active-class="tabs__item--active"
        ) {{ $t('adventure_publishing.title') }}

        router-link.tabs__item(
          :to="{ name: 'adventureAnalytics', params: { adventureId: adventure.id } }"
          exact-active-class="tabs__item--active"
        ) {{ $t('adventure_analytics.title') }}

        router-link.tabs__item(
          :to="{ name: 'adventureTesting', params: { adventureId: adventure.id } }"
          exact-active-class="tabs__item--active"
        ) {{ $t('adventure_testing.title') }}

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

