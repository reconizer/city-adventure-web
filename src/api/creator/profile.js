import loadMock from './mock/profile/load'
import updateMock from './mock/profile/update'

export default {
  load () {
    return loadMock();
  },

  update (payload) {
    return updateMock(payload);
  }
}
