<template lang="pug">
  .login-wrapper
    img.login-brand(:src="logoURL")

    .login-title {{ title }}

    LoginForm
</template>

<script>
import LoginForm from '@/components/shared/LoginForm.vue'

import brandLogo from '@/assets/images/brand_logo.png'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  data () {
    return {
      logoURL: brandLogo
    }
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
