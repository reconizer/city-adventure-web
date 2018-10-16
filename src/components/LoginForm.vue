<template>
  <form @submit.prevent="handleSubmit">
    <div class="login-header">
      Log In
    </div>

    <div
      v-if="error"
      class="form-control">
      {{ error }}
    </div>

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
</template>

<script>
import { LOGIN, LOGOUT } from '@/store/action-types'

const ACTION_NAMESPACE = 'authentication'

export  default {
  name: 'LoginForm',
  data: () => {
    return {
      user: { }
    }
  },
  computed: {
    error () {
      return this.$store.state.authentication.status.error;
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOGOUT}`);
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${LOGIN}`, this.user.email, this.user.password);
    }
  },
}
</script>
