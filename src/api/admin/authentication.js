import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config';

import authMock from './mock/auth';

export default {
  login (email, password) {
    return axios.post(`${ADMIN_BASE_URL}/auth/login`, {
      email,
      password
    });
  },

  logout () {
    return axios.post(`${ADMIN_BASE_URL}/auth/logout`, {});
  }
}
