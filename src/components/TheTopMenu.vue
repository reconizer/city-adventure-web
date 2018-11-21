<template lang="pug">
  .top-menu-wrapper
    nav.top-menu
      .top-menu__links
        router-link.top-menu__link(to="/")
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

        router-link(to="/login" class="top-menu__link") {{ $t("top_menu.logout") }}
</template>

<script>
import moment from 'moment'

export default {
  name: 'TheTopMenu',
  methods: {
    setLocale (locale) {
      this.$i18n.locale = locale;

      localStorage.setItem('locale', locale);
      moment.locale(locale);
    }
  }
}
</script>
