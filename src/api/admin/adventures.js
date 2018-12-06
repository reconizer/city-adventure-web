import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config';

import adventureListMock from './mock/adventure_list';

export default {
  loadAdventures (page = 1, query, sort) {
    return adventureListMock(page, query, sort);
    // return axios.get(`${BASE_URL}/adventures`);
  }
}

