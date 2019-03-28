<template lang="pug">
  .wrapper.wrapper--constrained
    .adventure-list
      .adventure-list__header {{ $t("top_menu.users") }}

      .tabs.tabs--simple
        router-link.tabs__item(
          active-class="tabs__item--active"
          :to="{ name: 'players' }"
        ) {{ $t("admin_users.players") }}

        router-link.tabs__item(
          active-class="tabs__item--active"
          :to="{ name: 'authors' }"
        ) {{ $t("admin_users.authors") }}

      router-view(:key="$route.fullPath")

    Loader(v-if="loading")
</template>

<script>
import { mapState } from 'vuex'

import Loader from '@/views/Loader'

export default {
  name: 'Users',
  components: {
    Loader
  },
  computed: {
    ...mapState({
      loading: state => state.players.loading
    })
  }
}
</script>
