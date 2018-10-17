<template lang="pug">
  div
    TheTopMenu

    router-view
</template>

<script>
import TheTopMenu from '@/components/TheTopMenu'

export default {
  name: 'BaseLayout',
  components: {
    TheTopMenu
  }
}
</script>
