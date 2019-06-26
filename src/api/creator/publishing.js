import axios from 'axios';

import { BASE_URL } from '@/config';

export default {
  loadHistory (adventureId, timestamp, page) {
    return axios.get(`${BASE_URL}/adventures/${adventureId}/qa?page=${page}&timestamp=${timestamp}`);
  },
  sendMessage (adventureId, msg) {
    return axios.post(`${BASE_URL}/adventures/${adventureId}/qa`, {
      content: msg
    });
  },

  requestReview (adventureId) {
    return axios.post(`${BASE_URL}/adventures/send_to_review`, {
      adventure_id: adventureId,
    });
  },
  publish (adventureId) {
    return axios.post(`${BASE_URL}/adventures/publish`, {
      adventure_id: adventureId,
    });
  },
  startEditing (adventureId) {
    return axios.post(`${BASE_URL}/adventures/send_to_pending`, {
      adventure_id: adventureId,
    });
  }
}
