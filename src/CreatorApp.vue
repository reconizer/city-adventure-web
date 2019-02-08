<template lang="pug">
  #app
    router-view
</template>

<script>
import axios from 'axios';

import{ LOGOUT } from '@/store/action-types'

export default {
  created () {
    axios.interceptors.response.use(undefined, (err) => {
      return new Promise(() => {
        if(err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
          localStorage.removeItem('user');
          delete axios.defaults.headers.common['Authorization'];

          this.$router.push('/login');
        }

        throw err;
      });
    });
  }
}
</script>
