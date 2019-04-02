<template lang="pug">
  .settings-panel
    .row(v-if="profile.name")
      .col-1-2
        .row
          .col-1-3
            .form-control
              label.form-label {{ $t("profile_settings.profile_picture") }}

              FileUpload.file-upload--square(@filesAdded="avatarChanged" :title="$t('profile_settings.add_profile_picture')")
                img.file-upload__image(slot="placeholder" v-if="profile.avatar_url" :src="profile.avatar_url")

          .col-2-3
            .form-control
              label.form-label.form-label--required {{ $t("profile_settings.name") }}
              label.error-label(v-if="error && error.name") {{ error.name.join(', ') }}
              input.form-input(type="text" :placeholder="$t('profile_settings.name')" v-model="profile.name")

            .form-control
              label.form-label {{ $t("profile_settings.description") }}
              label.error-label(v-if="error && error.description") {{ error.description.join(', ') }}
              textarea.form-input(:placeholder="$t('profile_settings.description')" v-model="profile.description")

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
  LOAD_PROFILE, UPDATE_PROFILE
} from '@/store/action-types'

const ACTION_NAMESPACE = 'profileSettings'

export default {
  name: 'ProfileSettings',
  components: {
    FileUpload,
    Loader
  },
  data () {
    return {
      profileData: {
        name: null,
        description: null,
        avatar_url: null
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.profileSettings.loading,
      error: state => state.profileSettings.errors[UPDATE_PROFILE]
    }),

    profile () {
      let profile = this.$store.state.profileSettings.profile;

      if(profile) {
        //eslint-disable-next-line
        this.profileData = cloneDeep(profile);
      }

      return this.profileData;
    }
  },
  mounted () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_PROFILE}`);
  },
  methods: {
    avatarChanged (files) {
      this.profileData.avatar_url = URL.createObjectURL(files[0]);
    },
    submit () {
      this.$store.dispatch(`${ACTION_NAMESPACE}/${UPDATE_PROFILE}`, {
        payload: this.profileData
      });
    }
  }
}
</script>

