import axios from 'axios';

import { BASE_URL } from '@/config';

export default {
  login (email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = {
          data: {
            token: "TEST_TOKEN"
          }
        };

        resolve(user);
      }, 500);
    });
    //return axios.post(`${BASE_URL}/login`, {
    //  email,
    //  password
    //});
  }
}
