<template>
  <div class="wrapper">
    <div class="login">
      <div class="login__header">
        Log In
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-control">
          <label class="form-label form-label--required">
            Email
          </label>
          <input
            v-model="user.email"
            class="form-input"
            type="email"
            name="user[email]"
            placeholder="email@domain.com"
            required="true"
            autocomplete="off">
        </div>

        <div class="form-control">
          <label class="form-label form-label--required">
            Password
          </label>
          <input
            v-model="user.password"
            class="form-input"
            type="password"
            name="user[password]"
            placeholder="Password"
            required="true"
            autocomplete="off">
        </div>

        <div class="form-control">
          <input
             class="button button--blue button--full"
             type="submit"
             value="Submit">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { LOGOUT } from '@/store/action-types';

export default {
  name: 'Login',
  data: () => {
    return {
      user: { }
    }
  },
  methods: {
    handleSubmit () {
      console.log("test");
    }
  },
  created () {
    this.$store.dispatch(`authentication/${LOGOUT}`);
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
  border-color: 1px solid $black
  padding: 2rem 1rem
  box-shadow: 0px 2px 5px -3px rgba($black, 0.7)

  &__header
    font-size: 1.5rem
    font-weight: bold
    text-align: center
    padding-bottom: 2rem
</style>
