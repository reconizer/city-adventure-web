import axios from 'axios';

import { BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';
import adventureMock from './mock/adventure';
import adventurePointsMock from './mock/adventure_points';

import updatePointMock from './mock/update_point';
import updateCluesMock from './mock/update_clues';
import updatePointsMock from './mock/update_points';
import createNewPointMock from './mock/create_new_point';

import createClueMock from './mock/create_clue';
import updateClueMock from './mock/update_clue';

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
  createPoint (adventureId, parentId, lat, lng) {
    return createNewPointMock(adventureId, parentId, lat, lng);
  },
  updatePoint (adventureId, pointId, params) {
    return updatePointMock(adventureId, pointId, params);
  },
  updateClues (payload) {
    return updateCluesMock(payload);
  },
  updatePoints (payload) {
    return updatePointsMock(payload);
  },

  createClue (pointId, data) {
    return createClueMock(pointId, data);
  },
  updateClue (pointId, clueId, data) {
    return updateClueMock(pointId, clueId, data);
  }
}
