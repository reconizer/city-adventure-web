<template>
  <div>
    <TheTopMenu />
    <router-view />
  </div>
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
