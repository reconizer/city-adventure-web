<template lang="pug">
  div
    TopMenu

    router-view
</template>

<script>
import TopMenu from '@/components/admin/TopMenu'

export default {
  name: 'BaseLayout',
  components: {
    TopMenu
  }
}
</script>
