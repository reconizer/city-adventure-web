<template lang="pug">
  div
    TopMenu

    router-view
</template>

<script>
import TopMenu from '@/components/creator/TopMenu'

export default {
  name: 'BaseLayout',
  components: {
    TopMenu
  }
}
</script>
