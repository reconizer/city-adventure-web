<template>
  <nav class="top-menu">
    <router-view name="top_menu_extra"/>

    <div class="top-menu__links">
      <router-link
        to="/"
        class="top-menu__link">
        Adventures
      </router-link>

      <router-link
        to="/account"
        class="top-menu__link">
        Settings
      </router-link>

      <router-link
        to="/login"
        class="top-menu__link">
        Logout
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheTopMenu'
}
</script>
