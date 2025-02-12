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
  /**
   * ADVENTURES
   */
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
      min_time: params.duration && params.duration.min,
      max_time: params.duration && params.duration.max,
      name: params.name,
      show: params.shown
    });
  },

  /**
   * ADVENTURE IMAGES
   */
  updateAdventureImages (adventureId, payload) {
    return axios.post(`${ADMIN_BASE_URL}/adventures/gallery_image/reorder`, {
      adventure_id: adventureId,
      image_order: payload.images
    });
  },
  getAdventureMainImageUploadURL (adventureId, file) {
    if(file != null) {
      return axios.post(`${ADMIN_BASE_URL}/adventures/main_image_url`, {
        adventure_id: adventureId,
        extension: file.name.split('.')[1]
      });
    } else {
      return Promise.resolve({ data: { } });
    }
  },
  getAdventureGalleryImageUploadURL (adventureId, file) {
    if(file != null) {
      return axios.post(`${ADMIN_BASE_URL}/adventures/gallery_image/upload_url`, {
        adventure_id: adventureId,
        extension: file.name.split('.')[1]
      });
    } else {
      return Promise.resolve({ data: { } });
    }
  },
  uploadImage(file, uploadURL, onProgress) {
    if(file != null && uploadURL != null) {
      let options = {
        onUploadProgress: onProgress,
        headers: {
          'Content-Type': file.type
        }
      };

      return axios.put(uploadURL, file, options);
    } else {
      return Promise.resolve({ data: { } });
    }
  },
  destroyGalleryImage (adventureId, galleryImageId) {
    return axios.post(`${BASE_URL}/adventures/gallery_image/remove`, {
      adventure_id: adventureId,
      image_id: galleryImageId
    });
  },

  /**
   * POINTS
   */
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

  /**
   * CLUES
   */
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
      return axios.post(`${ADMIN_BASE_URL}/clues/upload_asset`, {
        adventure_id: adventureId,
        clue_id: clueId,
        type: clueType,
        extension: file.name.split('.')[1]
      });
    } else {
      return Promise.resolve({ data: { } });
    }
  },
  uploadClueAsset (file, uploadURL, onProgress) {
    if(file != null && uploadURL != null) {
      let options = {
        onUploadProgress: onProgress,
        headers: {
          'Content-Type': file.type
        }
      };
      
      return axios.put(uploadURL, file, options);
    } else {
      return Promise.resolve({ data: { } });
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
