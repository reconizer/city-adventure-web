<template lang="pug">
  form.login(@submit.prevent="handleSubmit")
    .login__header {{ $t("login.title") }}

    .form-control(v-if="error") {{ error }}

    .form-control
      label.form-label.form-label--required {{ $t("login.email") }}

      input.form-input(v-model="user.email" type="email" name="user[email]" :placeholder="$t('login.email_placeholder')" required="true" autocomplete="off")

    .form-control
      label.form-label.form-label--required {{ $t("login.password") }}

      input.form-input(v-model="user.password" type="password" name="user[password]" :placeholder="$t('login.password_placeholder')" required="true" autocomplete="off")

    .form-control
      input.button.button--blue.button--full(type="submit" :value="$t('general.submit')")
</template>

<script>
import { LOGIN, LOGOUT } from '@/store/action-types'

import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'authentication'

export default {
  name: 'LoginForm',
  data: () => {
    return {
      user: { }
    }
  },
  computed: {
    ...mapState({
      error: state => state.authentication.status.error
    }),
    title () {
      if(this.$appType == "creator") {
        return this.$t("login.title_creator");
      } else {
        return this.$t("login.title_admin");
      }
    }
  },
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOGOUT}`);
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${LOGIN}`, {
        email: this.user.email,
        password: this.user.password
      }).then( (response) => {
        this.$router.push('/');
      });
    }
  },
}
</script>
