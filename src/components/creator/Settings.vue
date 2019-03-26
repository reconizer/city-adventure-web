<template lang="pug">
  .wrapper.wrapper--constrained
    Loader(v-if="loading")

    .settings
      .settings__header {{ $t("settings.title") }}

      .tabs.tabs--simple
        router-link.tabs__item(
          exact-active-class="tabs__item--active"
          :to="{ name: 'profileSettings' }"
        ) {{ $t("profile_settings.title") }}

        router-link.tabs__item(
          exact-active-class="tabs__item--active"
          :to="{ name: 'accountSettings' }"
        ) {{ $t("account_settings.title") }}

      router-view(:key="$route.fullPath")
</template>

<script>
import { mapState } from 'vuex'

import Loader from '@/views/Loader.vue'

export default {
  name: 'Settings',
  components: {
    Loader
  },
  computed: mapState({
    loading: state => state.accountSettings.loading || state.profileSettings.loading,
  })
}
</script>

