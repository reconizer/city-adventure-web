import axios from 'axios';

import { BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';
import adventureMock from './mock/adventure';
import adventurePointsMock from './mock/adventure_points';
import updatePointMock from './mock/update_point';
import updateCluesMock from './mock/update_clues';

export default {
  loadAdventures (page = 1) {
    return adventureListMock(page);
    // return axios.get(`${BASE_URL}/adventures`);
  },
  loadAdventure (adventureId) {
    return adventureMock(adventureId);
  },
  loadPoints (adventureId) {
    return adventurePointsMock(adventureId);
    // return axios.get(`${BASE_URL}/points`, { adventure_id: adventureId });
  },
  updatePoint (adventureId, pointId, params) {
    return updatePointMock(adventureId, pointId, params);
  },
  updateClues (payload) {
    return updateCluesMock(payload);
  }
}
