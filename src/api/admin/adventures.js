import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';
import countersMock from './mock/counters';

import adventureMock from './mock/adventure';
import updateAdventureMock from './mock/update_adventure';
import adventurePointsMock from './mock/adventure_points';

import updatePointMock from './mock/update_point';
import updateCluesMock from './mock/update_clues';
import updatePointsMock from './mock/update_points';
import createNewPointMock from './mock/create_new_point';
import destroyPointMock from './mock/destroy_point';

import createClueMock from './mock/create_clue';
import updateClueMock from './mock/update_clue';
import destroyClueMock from './mock/destroy_clue';

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

export default {
  loadPublished (page = 1, query, sort) {
    return adventureListMock(ADVENTURES_PUBLISHED, page, query, sort);
    // return axios.get(`${BASE_URL}/adventures`);
  },

  loadInReview (page = 1, query, sort) {
    return adventureListMock(ADVENTURES_IN_REVIEW, page, query, sort);
  },

  loadUnpublished (page = 1, query, sort) {
    return adventureListMock(ADVENTURES_UNPUBLISHED, page, query, sort);
  },

  loadRejected (page = 1, query, sort) {
    return adventureListMock(ADVENTURES_REJECTED, page, query, sort);
  },

  loadCancelled (page = 1, query, sort) {
    return adventureListMock(ADVENTURES_CANCELLED, page, query, sort);
  },

  loadPending (page = 1, query, sort) {
    return adventureListMock(ADVENTURES_PENDING, page, query, sort);
  },

  loadCounters () {
    return countersMock();
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
  updateClues (adventureId, payload) {
    return updateCluesMock(adventureId, payload);
  },
  updatePoints (adventureId, payload) {
    return updatePointsMock(adventureId, payload);
  },
  destroyPoint (adventureId, pointId) {
    return destroyPointMock(adventureId, pointId);
  },

  createClue (adventureId, pointId, data) {
    return createClueMock(adventureId, pointId, data);
  },
  updateClue (adventureId, pointId, clueId, data) {
    return updateClueMock(adventureId, pointId, clueId, data);
  },
  destroyClue (adventureId, pointId, clueId) {
    return destroyClueMock(adventureId, pointId, clueId);
  }
}
