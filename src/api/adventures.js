import axios from 'axios';

import { BASE_URL } from '@/config';

export default {
  loadAdventures () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let adventures = {
          data: [
            {
              id: 1,
              name: "Sekrety Starówki"
            },
            {
              id: 2,
              name: "Przygoda Dwa"
            }
          ]
        };

        resolve(adventures);
      }, 500);
    });
    // return axios.get(`${BASE_URL}/adventures`);
  }
}
