<template lang="pug">
  .wrapper.wrapper--constrained
    .user
      .breadcrumbs(v-if="player")
        router-link.breadcrumb(
          :to="{ name: 'players' }"
        ) {{ $t("admin_users.players") }}

        .breadcrumb-separator

        .breadcrumb.breadcrumb--current {{ player.name }}

      .row(v-if="player")
        .col-1-2
          form(@submit.prevent="changeUserDetails")
            .form-header {{ $t("admin_users.change_profile_data") }}

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_name") }}

              label.error-label(v-if="error && error.name") {{ error.name.join(', ') }}

              input.form-input(type="text" :placeholder="$t('admin_users.user_name')" v-model="playerData.name" required)

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_email") }}

              label.error-label(v-if="error && error.email") {{ error.email.join(', ') }}

              input.form-input(type="email" :placeholder="$t('admin_users.user_email')" v-model="playerData.email" required)

            input.button.button--submit.button--blue.button--large(type="submit" :value="$t('general.submit')")

        .col-1-2
          form(@submit.prevent="changeUserPassword")
            .form-header {{ $t("admin_users.change_password") }}

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_password") }}

              label.error-label(v-if="error && error.password") {{ error.password.join(', ') }}

              input.form-input(type="password" :placeholder="$t('admin_users.user_password')" v-model="passwordData.password" required)

            .form-control
              label.form-label.form-label--required {{ $t("admin_users.user_password_confirmation") }}

              label.error-label(v-if="error && error.password_confirmation") {{ error.password_confirmation.join(', ') }}

              input.form-input(type="password" :placeholder="$t('admin_users.user_password_confirmation')" v-model="passwordData.passwordConfirmation" required)

            input.button.button--submit.button--blue.button--large(type="submit" :value="$t('general.submit')")

    Loader(v-if="loading")
</template>

<script>
import { mapState } from 'vuex'

import Loader from '@/views/Loader'

import { 
  LOAD_PLAYER,
  UPDATE_PLAYER
} from '@/store/action-types'

import { SET_ERROR } from '@/store/mutation-types'

const ACTION_NAMESPACE = 'players'

export default {
  name: 'PlayerCreateForm',
  components: {
    Loader,
  },
  data: () => {
    return {
      playerData: {
        email: null,
        name: null
      },

      passwordData: {
        password: null,
        passwordConfirmation: null
      }
    }
  },
  computed: {
    ...mapState({
      player: state => state.players.item,

      loading: state => state.players.loading,
      error: state => state.players.errors[UPDATE_PLAYER]
    })
  },
  mounted () {
    this.$store.commit(`${ACTION_NAMESPACE}/${SET_ERROR}`, { key: UPDATE_PLAYER, error: null });

    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PLAYER}`, { id: this.$route.params.playerId })
      .then( response => {
        this.playerData.email = response.data.email;
        this.playerData.name = response.data.name;
      });
  },
  methods: {
    changeUserDetails () {
      let params = this.playerData;

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_PLAYER}`, { params });
    },

    changeUserPassword () {
      let params = this.passwordData;

      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_PLAYER}`, { params });
    }
  }
}
</script>
