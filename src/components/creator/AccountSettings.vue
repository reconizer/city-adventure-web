<template lang="pug">
  .settings-panel
    .row(v-if="account.email")
      .col-1-3
        .settings-section
          .settings-section__header {{ $t("account_settings.change_email") }}

          .form-control
            label.form-label.form-label--required {{ $t("account_settings.new_email") }}

            label.error-label(v-if="emailChangeError && emailChangeError.email") {{ emailChangeError.email.join(', ') }}
            input.form-input(type="email" :placeholder="$t('account_settings.new_email')" v-model="emailChange.email")

          .form-control
            label.form-label.form-label--required {{ $t("account_settings.password") }}

            label.error-label(v-if="emailChangeError && emailChangeError.password") {{ emailChangeError.password.join(', ') }}
            input.form-input(type="password" :placeholder="$t('account_settings.password')" v-model="emailChange.password")

          button.button.button--submit.button--blue.button--large(@click="changeEmail") {{ $t('general.submit') }}

      .col-1-3
        .settings-section
          .settings-section__header {{ $t("account_settings.change_password") }}

          .form-control
            label.form-label.form-label--required {{ $t("account_settings.current_password") }}

            label.error-label(v-if="passwordChangeError && passwordChangeError.current_password") {{ passwordChangeError.current_password.join(', ') }}
            input.form-input(type="password" :placeholder="$t('account_settings.current_password')" v-model="passwordChange.current_password")

          .form-control
            label.form-label.form-label--required {{ $t("account_settings.new_password") }}

            label.error-label(v-if="passwordChangeError && passwordChangeError.new_password") {{ passwordChangeError.new_password.join(', ') }}
            input.form-input(type="password" :placeholder="$t('account_settings.new_password')" v-model="passwordChange.new_password")

          .form-control
            label.form-label.form-label--required {{ $t("account_settings.new_password_confirmation") }}

            label.error-label(v-if="passwordChangeError && passwordChangeError.new_password_confirmation") {{ passwordChangeError.new_password_confirmation.join(', ') }}
            input.form-input(type="password" :placeholder="$t('account_settings.new_password_confirmation')" v-model="passwordChange.new_password_confirmation")

          button.button.button--submit.button--blue.button--large(@click="changePassword") {{ $t('general.submit') }}
</template>

<script>
import { mapState } from 'vuex'

import cloneDeep from 'lodash.clonedeep'

import Loader from '@/views/Loader.vue'

import {
  LOAD_ACCOUNT,
  UPDATE_EMAIL,
  UPDATE_PASSWORD
} from '@/store/action-types'

const ACTION_NAMESPACE = 'accountSettings'

export default {
  name: 'AccountSettings',
  components: {
    Loader
  },
  data () {
    return {
      accountData: {
        email: null
      },

      passwordChange: {
        current_password: null,
        new_password: null,
        new_password_confirmation: null
      },

      emailChange: {
        email: null,
        password: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.accountSettings.loading,
      emailChangeError: state => state.accountSettings.errors[UPDATE_EMAIL],
      passwordChangeError: state => state.accountSettings.errors[UPDATE_PASSWORD]
    }),

    account () {
      let account = this.$store.state.accountSettings.account;

      if(account) {
        //eslint-disable-next-line
        this.accountData = cloneDeep(account);
        //eslint-disable-next-line
        this.emailChange.email = account.email;
      }

      return this.accountData;
    }
  },
  mounted () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ACCOUNT}`);
  },
  methods: {
    changeEmail () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_EMAIL}`, {
        payload: {
          password: this.emailChange.password,
          email: this.emailChange.email
        }
      });
    },

    changePassword () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_PASSWORD}`, {
        payload: {
          password: this.passwordChange.current_password,
          new_password: this.passwordChange.new_password,
          new_password_confirmation: this.passwordChange.new_password_confirmation
        }
      });
    }
  }
}
</script>

