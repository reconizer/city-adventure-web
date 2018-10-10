<template>
  <div class="login-wrapper">
    <div class="login">
      <LoginForm />
    </div>
  </div>
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
