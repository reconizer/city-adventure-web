<template lang="pug">
  .top-menu-wrapper
    nav.top-menu
      .top-menu__links
        router-link.top-menu__link(to="/")
          .icon.icon--list-b.icon--pad-right
          span {{ $t("top_menu.adventures") }}

        router-link.top-menu__link(to="/account")
          .icon.icon--settings.icon--pad-right
          span {{ $t("top_menu.settings") }}

        router-link(to="/login" class="top-menu__link") {{ $t("top_menu.logout") }}
</template>

<script>
export default {
  name: 'TheTopMenu'
}
</script>
