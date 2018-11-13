<template lang="pug">
  .wrapper.wrapper--constrained
    .account-settings
      .row
        .col-1-2
          h1 Test
</template>

<script>
import { mapState } from 'vuex'

const ACTION_NAMESPACE = 'account'

export default {
  name: 'AccountSettings',
  computed: mapState({
    user: state => state.authentication.user
  })
}
</script>
