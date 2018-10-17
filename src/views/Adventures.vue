<template lang="pug">
  .wrapper
    span Hello
</template>

<script>
import { mapState } from 'vuex'

import { LOAD_ADVENTURES } from '@/store/action-types'

const ACTION_NAMESPACE = 'adventures'

export default {
  name: 'Adventures',
  computed: mapState({
    adventures: state => state.adventures,
  }),
  created () {
    this.$store.dispatch(`${ACTION_NAMESPACE}/${LOAD_ADVENTURES}`);
  }
}
</script>
