<template lang="pug">
  .wrapper.wrapper--constrained
    .user
      .breadcrumbs
        router-link.breadcrumb(
          :to="{ name: 'players' }"
        ) {{ $t("admin_users.players") }}

        .breadcrumb-separator

        .breadcrumb.breadcrumb--current {{ $t("admin_users.new_player") }}

      .row
        .col-1-2
          form(@submit.prevent="submit")
            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_email") }}

              label.error-label(v-if="error && error.email") {{ error.email.join(', ') }}

              input.form-input(type="email" :placeholder="$t('admin_users.user_email')" v-model="email" required)

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_name") }}

              label.error-label(v-if="error && error.name") {{ error.name.join(', ') }}

              input.form-input(type="text" :placeholder="$t('admin_users.user_name')" v-model="name" required)

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_password") }}

              label.error-label(v-if="error && error.password") {{ error.password.join(', ') }}

              input.form-input(type="password" :placeholder="$t('admin_users.user_password')" v-model="password" required)

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_password_confirmation") }}

              label.error-label(v-if="error && error.password_confirmation") {{ error.password_confirmation.join(', ') }}

              input.form-input(type="password" :placeholder="$t('admin_users.user_password_confirmation')" v-model="passwordConfirmation" required)

            input.button.button--submit.button--blue.button--large(type="submit" :value="$t('general.submit')")

    Loader(v-if="loading")
</template>

<script>
import { mapState } from 'vuex'

import Loader from '@/views/Loader'

import { CREATE_PLAYER } from '@/store/action-types'

import { SET_ERROR } from '@/store/mutation-types'

const ACTION_NAMESPACE = 'players'

export default {
  name: 'PlayerCreateForm',
  components: {
    Loader,
  },
  data: () => {
    return {
      email: null,
      name: null,
      password: null,
      passwordConfirmation: null
    }
  },
  computed: {
    ...mapState({
      loading: state => state.players.loading,
      error: state => state.players.errors[CREATE_PLAYER]
    })
  },
  mounted () {
    this.$store.commit(`${ACTION_NAMESPACE}/${SET_ERROR}`, { key: CREATE_PLAYER, error: null });
  },
  methods: {
    submit () {
      let params = {
        email: this.email,
        name: this.name,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };

      this.$store.dispatch(`${ACTION_NAMESPACE}/${CREATE_PLAYER}`, { params })
        .then( response => {
          this.$router.push({
            name: 'player',
            params: { playerId: response.data.id }
          })
        });
    }
  }
}
</script>
