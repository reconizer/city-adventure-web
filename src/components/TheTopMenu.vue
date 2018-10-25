<template lang="pug">
  nav.top-menu
    router-view(name="top_menu_extra")

    .top-menu__links
      router-link.top-menu__link.top-menu__link--adventures(to="/") Adventures

      router-link.top-menu__link.top-menu__link--settings(to="/account") Settings

      router-link(to="/login" class="top-menu__link") Logout
</template>

<script>
export default {
  name: 'TheTopMenu'
}
</script>
