import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';
import countersMock from './mock/counters';

import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED
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

  loadCounters () {
    return countersMock();
  }
}
