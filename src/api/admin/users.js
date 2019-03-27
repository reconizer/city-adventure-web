import axios from 'axios';

import { ADMIN_BASE_URL } from '@/config'

import userMock from './mock/users/item'
import userListMock from './mock/users/list'
import createUserMock from './mock/users/create'
import destroyUserMock from './mock/users/destroy'
import updateUserMock from './mock/users/update'

export default {
  loadUser (userId) {
    return userMock(userId);
  },

  loadUsers (page = 1, query) {
    return userListMock(page, query);
  },

  createUser(params) {
    return createUserMock(params);
  },

  destroyUser(userId) {
    return destroyUserMock(userId);
  },

  updateUser(userId, params) {
    return updateUserMock(userId, params);
  }
}
