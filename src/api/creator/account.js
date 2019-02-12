import loadMock from './mock/account/load'
import updateMock from './mock/account/update'

export default {
  load () {
    return loadMock();
  },

  update (payload) {
    return updateMock(payload);
  }
}
