<template lang="pug">
  .wrapper.wrapper--constrained
    .account-settings
      .row
        .col-1-2
          h1 Locale Test
          button(@click="setLocale('pl')") PL
          button(@click="setLocale('en')") EN

</template>

<script>
import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'account'

export default {
  name: 'AccountSettings',
  computed: mapState({
    user: state => state.authentication.user
  }),
  methods: {
    setLocale (locale) {
      this.$i18n.locale = locale;

      localStorage.setItem('locale', locale);
    }
  }
}
</script>
