<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

import{ LOGOUT } from '@/store/action-types'

export default {
  created () {
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if(err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(`authentication/${LOGOUT}`);
        }

        throw err;
      });
    });
  }
}
</script>
