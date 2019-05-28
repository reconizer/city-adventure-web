<template lang="pug">
  .wrapper.wrapper--constrained
    .users
      .users__header
        span {{ $t("top_menu.users") }}

        .users__new
          .button.button--blue(@click="toggleSubmenu")
            .icon.icon--add-white.icon--pad-right
            span {{ $t("admin_users.new_user") }}

          transition(name="submenu" v-if="showSubmenu")
            div(@click="closeSubmenu")
              .users-submenu-mask
              .users-submenu
                router-link.users-submenu__item(:to="{ name: 'newPlayer' }") {{ $t("admin_users.new_player") }}
                router-link.users-submenu__item(:to="{ name: 'newAuthor' }") {{ $t("admin_users.new_author") }}

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
  data: () => {
    return {
      showSubmenu: false
    }
  },
  computed: {
    ...mapState({
      loading: state => state.players.loading
    })
  },
  methods: {
    toggleSubmenu () {
      this.showSubmenu = !this.showSubmenu;
    },

    closeSubmenu () {
      this.showSubmenu = false;
    }
  }
}
</script>
