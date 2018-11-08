<template lang="pug">
  .login-wrapper
    .login
      LoginForm
</template>

<script>
import LoginForm from '@/components/LoginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  }
}
</script>
