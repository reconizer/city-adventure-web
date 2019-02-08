<template lang="pug">
  form.login(@submit.prevent="handleSubmit")
    .login__header {{ $t("login.title") }}

    .form-control(:class="{ 'form-control--with-error': error && error.email }")
      label.form-label.form-label--required {{ $t("login.email") }}
      label.error-label(v-if="error && error.email") {{ error.email.join(', ') }}

      input.form-input(v-model="user.email" type="email" name="user[email]" :placeholder="$t('login.email_placeholder')" required="true" autocomplete="off")

    .form-control(:class="{ 'form-control--with-error': error && error.password }")
      label.form-label.form-label--required {{ $t("login.password") }}
      label.error-label(v-if="error && error.password") {{ error.password.join(', ') }}

      input.form-input(v-model="user.password" type="password" name="user[password]" :placeholder="$t('login.password_placeholder')" required="true" autocomplete="off")

    .form-control
      input.button.button--blue.button--full(type="submit" :value="$t('general.submit')")

    Loader(v-if="loading")
</template>

<script>
import { LOGIN } from '@/store/action-types'

import { mapState } from 'vuex'

import Loader from '@/views/Loader.vue'

const ACTION_NAMESPACE = 'authentication'

export default {
  name: 'LoginForm',
  components: {
    Loader
  },
  data: () => {
    return {
      user: { }
    }
  },
  computed: {
    ...mapState({
      error: state => state.authentication.error,
      loading: state => state.authentication.loading
    }),

    title () {
      if(this.$appType == "creator") {
        return this.$t("login.title_creator");
      } else {
        return this.$t("login.title_admin");
      }
    }
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
