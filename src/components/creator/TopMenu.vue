<template lang="pug">
  .top-menu-wrapper
    nav.top-menu
      .top-menu__links
        router-link.top-menu__link(
          to="/"
          exact-active-class="top-menu__link--active"
        )
          .icon.icon--list-b.icon--pad-right
          span {{ $t("top_menu.adventures") }}

        router-link.top-menu__link(to="/account")
          .icon.icon--wrench-white.icon--pad-right
          span {{ $t("top_menu.settings") }}

        .top-menu__link
          span {{ $t("top_menu.language") }}

          .top-menu__dropdown
            .top-menu__dropdown-option(@click="setLocale('pl')") PL
            .top-menu__dropdown-option(@click="setLocale('en')") EN

        a.top-menu__link(href="#" @click.prevent="logout") {{ $t("top_menu.logout") }}
</template>

<script>
import moment from 'moment'

const ACTION_NAMESPACE = 'authentication';

import { LOGOUT } from '@/store/action-types'

export default {
  name: 'TopMenu',
  methods: {
    setLocale (locale) {
      this.$i18n.locale = locale;

      localStorage.setItem('locale', locale);
      moment.locale(locale);

      this.$root.$emit('locale-changed', locale);
    },

    logout () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${LOGOUT}`).then( () => {
        this.$router.push('/login');
      });
    }
  }
}
</script>
