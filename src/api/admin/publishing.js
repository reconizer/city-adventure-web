import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config';

import {
  ADVENTURES_IN_REVIEW, ADVENTURES_PUBLISHED,
  ADVENTURES_PENDING, ADVENTURES_CANCELLED,
  ADVENTURES_UNPUBLISHED, ADVENTURES_REJECTED
} from '@/config';

export default {
  loadHistory (adventureId, timestamp, page) {
    return axios.get(`${ADMIN_BASE_URL}/adventures/${adventureId}/qa?page=${page}&timestamp=${timestamp}`);
  },
  sendMessage (adventureId, msg) {
    return axios.post(`${ADMIN_BASE_URL}/adventures/${adventureId}/qa`, {
      content: msg
    });
  },

  requestReview (adventureId) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      status: ADVENTURES_IN_REVIEW
    });
  },
  publish (adventureId) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      status: ADVENTURES_PUBLISHED
    });
  },
  startEditing (adventureId) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      status: ADVENTURES_PENDING
    });
  },

  cancel (adventureId) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      status: ADVENTURES_CANCELLED
    });
  },
  unpublish (adventureId) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      status: ADVENTURES_UNPUBLISHED
    });
  },
  reject (adventureId) {
    return axios.patch(`${ADMIN_BASE_URL}/adventures`, {
      adventure_id: adventureId,
      status: ADVENTURES_REJECTED
    });
  }
}
