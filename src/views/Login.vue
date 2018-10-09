<template>
  <div class="wrapper">
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

<style lang="sass" scoped>
.wrapper
  position: absolute
  left: 0
  right: 0
  top: 20vh

.login
  box-sizing: border-box
  margin: 0 auto
  width: 25.0rem
  background-color: $white
  border-radius: 0.25rem
  border: 1px solid $border-color
  padding: 2rem 1rem
  box-shadow: 0px 2px 5px -3px rgba($black, 0.7)
</style>
