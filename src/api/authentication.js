import axios from 'axios';

import { BASE_URL } from '@/config';

import authMock from './mock/auth';

export default {
  login (email, password) {
    return authMock(email, password);

    //return axios.post(`${BASE_URL}/login`, {
    //  email,
    //  password
    //});
  }
}
