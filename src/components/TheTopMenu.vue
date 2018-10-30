<template lang="pug">
  nav.top-menu
    router-view(name="top_menu_extra")

    .top-menu__links
      router-link.top-menu__link(to="/")
        .icon.icon--list-b.icon--pad-right
        span Adventures

      router-link.top-menu__link(to="/account")
        .icon.icon--settings.icon--pad-right
        span Settings

      router-link(to="/login" class="top-menu__link") Logout
</template>

<script>
export default {
  name: 'TheTopMenu'
}
</script>
