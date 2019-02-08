import axios from 'axios';

import { BASE_URL } from '@/config';

export default {
  login (email, password) {
    return axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    });
  },

  logout () {
    return axios.post(`${BASE_URL}/auth/logout`, {});
  }
}
