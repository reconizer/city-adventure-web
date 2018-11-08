<template lang="pug">
  .wrapper.wrapper--constrained
    AdventureList
</template>

<script>
import AdventureList from '@/components/AdventureList.vue'

export default {
  name: 'Adventures',
  components: {
    AdventureList
  }
}
</script>
