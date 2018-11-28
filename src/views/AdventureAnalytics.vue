<template lang="pug">
  .adventure-statistics
    .adventure-panel__header.adventure-panel__header--over-tabs
      router-link.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      .adventure-panel__title {{ $t("adventure_analytics.title") }}

    .tabs.tabs--analytics
      router-link.tabs__item(
        exact-active-class="tabs__item--active"
        :to="{ name: 'adventureAnalytics', params: { adventureId: adventure.id } }"
      ) {{ $t("adventure_analytics.overview") }}

      router-link.tabs__item(
        exact-active-class="tabs__item--active"
        :to="{ name: 'adventureAnalyticsCompletion', params: { adventureId: adventure.id } }"
      ) {{ $t("adventure_analytics.completion") }}

      router-link.tabs__item(
        exact-active-class="tabs__item--active"
        :to="{ name: 'adventureAnalyticsProgression', params: { adventureId: adventure.id } }"
      ) {{ $t("adventure_analytics.progression") }}

    router-view(:key="$route.fullPath")
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AdventureAnalytics',
  computed: mapState({
    adventure: state => state.adventure.item
  })
}
</script>
