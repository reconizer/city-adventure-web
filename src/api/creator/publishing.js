import axios from 'axios';

import { BASE_URL } from '@/config';

import historyMock from './mock/publishment/history';
import sendMessageMock from './mock/publishment/send_message';
import publishMock from './mock/publishment/publish';
import requestReviewMock from './mock/publishment/request_review';
import startEditingMock from './mock/publishment/start_editing';

export default {
  loadHistory (adventureId) {
    return historyMock();
  },
  sendMessage (adventureId, msg) {
    return sendMessageMock(adventureId, msg);
  },

  requestReview (adventureId) {
    return requestReviewMock(adventureId);
  },
  publish (adventureId) {
    return publishMock(adventureId);
  },
  startEditing (adventureId) {
    return startEditingMock(adventureId);
  }
}
