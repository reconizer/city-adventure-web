<template lang="pug">
  .wrapper.wrapper--constrained
    Loader(v-if="loading")

    .account-settings
      .account-settings__header {{ $t("account_settings.title") }}

      .row(v-if="account.name")
        .col-1-2
          .row
            .col-1-3
              .form-control
                label.form-label {{ $t("account_settings.profile_picture") }}

                FileUpload.file-upload--square(@filesAdded="avatarChanged" :title="$t('account_settings.add_profile_picture')")
                  img.file-upload__image(slot="placeholder" v-if="account.avatar_url" :src="account.avatar_url")

            .col-2-3
              .form-control
                label.form-label.form-label--required {{ $t("account_settings.name") }}
                label.error-label(v-if="error && error.name") {{ error.name.join(', ') }}
                input.form-input(type="text" :placeholder="$t('account_settings.name')" v-model="account.name")

              .form-control
                label.form-label {{ $t("account_settings.description") }}
                label.error-label(v-if="error && error.description") {{ error.description.join(', ') }}
                textarea.form-input(:placeholder="$t('account_settings.description')" v-model="account.description")

          .row
            .col-2-3.col-offset-1-3
              .form-control
                button.button.button--submit.button--blue.button--large.button--full(@click="submit") {{ $t('general.submit') }}

        .col-1-2
</template>

<script>
import { mapState } from 'vuex'

import cloneDeep from 'lodash.clonedeep'

import FileUpload from '@/components/shared/FileUpload.vue'
import Loader from '@/views/Loader.vue'

import {
  LOAD_ACCOUNT, UPDATE_ACCOUNT
} from '@/store/action-types'

const ACTION_NAMESPACE = 'accountSettings'

export default {
  name: 'AccountSettings',
  components: {
    FileUpload,
    Loader
  },
  data () {
    return {
      accountData: {
        name: null,
        description: null,
        avatar_url: null
      }
    }
  },
  computed: {
    ...mapState({
      account: state => state.accountSettings.account,
      loading: state => state.accountSettings.loading,
      error: state => state.accountSettings.error
    }),

    account () {
      let account = this.$store.state.accountSettings.account;

      if(account) {
        //eslint-disable-next-line
        this.accountData = cloneDeep(account);
      }

      return this.accountData;
    }
  },
  mounted () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ACCOUNT}`);
  },
  methods: {
    avatarChanged (files) {
      this.accountData.avatar_url = URL.createObjectURL(files[0]);
    },
    submit () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_ACCOUNT}`, {
        payload: this.accountData
      });
    }
  }
}
</script>

