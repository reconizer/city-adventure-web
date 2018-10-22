import axios from 'axios';

import { BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';
import adventureMock from './mock/adventure';
import adventurePointsMock from './mock/adventure_points';

export default {
  loadAdventures (page = 1) {
    return adventureListMock;
    // return axios.get(`${BASE_URL}/adventures`);
  },
  loadAdventure (adventureId) {
    return adventureMock;
  },
  loadPoints (adventureId) {
    return adventurePointsMock;
    // return axios.get(`${BASE_URL}/points`, { adventure_id: adventureId });
  }
}
