<template lang="pug">
  nav.top-menu
    router-view(name="top_menu_extra")

    .top-menu__links
      router-link(to="/" class="top-menu__link") Adventures

      router-link(to="/account" class="top-menu__link") Settings

      router-link(to="/login" class="top-menu__link") Logout
</template>

<script>
export default {
  name: 'TheTopMenu'
}
</script>
