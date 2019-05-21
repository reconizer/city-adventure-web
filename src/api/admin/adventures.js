import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';
import countersMock from './mock/counters';

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
    return axios.get(`${ADMIN_BASE_URL}/adventures/${adventureId}`);
  },
  updateAdventure (adventureId, params) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      description: params.description,
      difficulty_level: params.difficulty,
      min_time: params.duration ? params.duration.min : null,
      max_time: params.duration ? params.duration.max : null,
      name: params.name,
      show: params.shown
    });
  },
  loadPoints (adventureId) {
    return axios.get(`${ADMIN_BASE_URL}/points?adventure_id=${adventureId}`);
  },
  createPoint (adventureId, parentId, lat, lng) {
    return axios.post(`${ADMIN_BASE_URL}/points`, {
      adventure_id: adventureId,
      parent_point_id: parentId,
      position: { lat, lng }
    });
  },
  updatePoint (adventureId, pointId, params) {
    return axios.patch(`${ADMIN_BASE_URL}/points`, {
      id: pointId,
      adventure_id: adventureId,
      parent_point_id: params.parent_id,

      position: params.position,
      radius: params.radius,

      show: params.shown,

      time_answer: params.time_answer,
      password_answer: params.password_answer
    });
  },
  updateClues (adventureId, payload) {
    return axios.patch(`${ADMIN_BASE_URL}/clues/reorder`, {
      adventure_id: adventureId,
      clue_order: payload.clues.map((item) => {
        return {
          id: item.id,
          point_id: item.point_id,
          sort: item.order
        }
      })
    });
  },
  updatePoints (adventureId, payload) {
    return axios.patch(`${ADMIN_BASE_URL}/points/reorder`, {
      adventure_id: adventureId,
      point_order: payload.map((item) => {
        return {
          id: item.id,
          parent_point_id: item.parent_id
        };
      })
    });
  },
  destroyPoint (adventureId, pointId) {
    return axios.delete(`${ADMIN_BASE_URL}/points?id=${pointId}&adventure_id=${adventureId}`);
  },

  createClue (adventureId, pointId, data) {
    return axios.post(`${ADMIN_BASE_URL}/clues`, {
      adventure_id: adventureId,
      point_id: pointId,
      type: data.type,
      description: data.description,
      tip: data.tip,
      url: data.url
    });
  },
  getClueAssetUploadURL (adventureId, clueId, clueType, file) {
    if(file != null && clueType != 'text' && clueType != 'url') {
      return axios.post(`${BASE_URL}/clues/upload_asset`, {
        adventure_id: adventureId,
        clue_id: clueId,
        type: clueType,
        name: file.name.split('.')[0],
        extension: file.name.split('.')[1]
      });
    } else {
      return new Promise((resolve) => {
        resolve({ data: { } });
      });
    }
  },
  uploadClueAsset (file, uploadURL) {
    if(file != null && uploadURL != null) {
      let options = {
        headers: {
          'Content-Type': file.type
        }
      };
      
      return axios.put(uploadURL, file, options);
    } else {
      return new Promise((resolve) => {
        resolve({});
      });
    }
  },
  updateClue (adventureId, pointId, clueId, data) {
    return axios.patch(`${ADMIN_BASE_URL}/clues`, {
      id: clueId,
      adventure_id: adventureId,
      description: data.description,
      tip: data.tip,
      url: data.url
    });
  },
  destroyClue (adventureId, pointId, clueId) {
    return axios.delete(`${ADMIN_BASE_URL}/clues?id=${clueId}&adventure_id=${adventureId}`);
  }
}
