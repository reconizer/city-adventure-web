import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED,
  ADVENTURES_REJECTED,
  ADVENTURES_CANCELLED,
  ADVENTURES_PENDING
} from '@/config'

export default () => new Promise((resolve) => {
  setTimeout(() => {
    let response = {
      data: {
        [ADVENTURES_PUBLISHED]: 13 * 12,
        [ADVENTURES_IN_REVIEW]: 2 * 12,
        [ADVENTURES_UNPUBLISHED]: 6 * 12,
        [ADVENTURES_REJECTED]: 3 * 12,
        [ADVENTURES_CANCELLED]: 1 * 12,
        [ADVENTURES_PENDING]: 0
      }
    };

    resolve(response);
  }, 300);
});
