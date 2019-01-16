<template lang="pug">
  .login-wrapper
    .login-title {{ title }}
    LoginForm
</template>

<script>
import LoginForm from '@/components/shared/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  computed: {
    title () {
      if(this.$appType == "creator") {
        return this.$t("login.title_creator");
      } else {
        return this.$t("login.title_admin");
      }
    }
  }
}
</script>
