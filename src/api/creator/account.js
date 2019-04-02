import loadMock from './mock/account/load'
import updateEmailMock from './mock/account/update_email'
import updatePasswordMock from './mock/account/update_password'

export default {
  load () {
    return loadMock();
  },

  updateEmail(payload) {
    return updateEmailMock(payload);
  },

  updatePassword(payload) {
    return updatePasswordMock(payload);
  }
}
