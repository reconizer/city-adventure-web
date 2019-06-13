import axios from 'axios';

import { BASE_URL } from '@/config';

import historyMock from './mock/publishment/history';
import sendMessageMock from './mock/publishment/send_message';
import publishMock from './mock/publishment/publish';
import requestReviewMock from './mock/publishment/request_review';
import startEditingMock from './mock/publishment/start_editing';

import {
  ADVENTURES_IN_REVIEW,
  ADVENTURES_PUBLISHED,
  ADVENTURES_PENDING
} from '@/config';

export default {
  loadHistory (adventureId, timestamp, page) {
    return historyMock(adventureId, timestamp, page);
  },
  sendMessage (adventureId, msg) {
    return sendMessageMock(adventureId, msg);
  },

  requestReview (adventureId) {
    return requestReviewMock(adventureId);

    // return axios.patch(`${BASE_URL}/adventures`, {
    //   adventure_id: adventureId,
    //   status: ADVENTURES_IN_REVIEW
    // });
  },
  publish (adventureId) {
    return publishMock(adventureId);

    // return axios.patch(`${BASE_URL}/adventures`, {
    //   adventure_id: adventureId,
    //   status: ADVENTURES_PUBLISHED
    // });
  },
  startEditing (adventureId) {
    return startEditingMock(adventureId);

    // return axios.patch(`${BASE_URL}/adventures`, {
    //   adventure_id: adventureId,
    //   status: ADVENTURES_PENDING
    // });
  }
}
