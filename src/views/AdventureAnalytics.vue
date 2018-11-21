<template lang="pug">
  .adventure-statistics
    .tabs.tabs--analytics
      router-link.tabs__button.button.button--icon(:to="{ name: 'adventureMap', params: { adventureId: adventure.id } }")
        .icon.icon--back

      router-link.tabs__item(
        exact-active-class="tabs__item--active"
        :to="{ name: 'adventureAnalytics', params: { adventureId: adventure.id } }"
      ) Overview

      router-link.tabs__item(
        exact-active-class="tabs__item--active"
        :to="{ name: 'adventureAnalyticsProgression', params: { adventureId: adventure.id } }"
      ) User Progression

      router-link.tabs__item(
        exact-active-class="tabs__item--active"
        :to="{ name: 'adventureAnalyticsMonetization', params: { adventureId: adventure.id } }"
      ) Monetization

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
