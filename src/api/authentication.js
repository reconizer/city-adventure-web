import axios from 'axios';

const BASE_URL = process.env.VUE_APP_API_URL;

export default {
  login (email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let user = {
          token: "TEST_TOKEN"
        };

        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      }, 500);
    });
    //return axios.post(`${BASE_URL}/login`, {
    //  email,
    //  password
    //});
  }
}
