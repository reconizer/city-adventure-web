import {
  ADVENTURES_PUBLISHED,
  ADVENTURES_IN_REVIEW,
  ADVENTURES_UNPUBLISHED
} from '@/config'

export default () => new Promise((resolve) => {
  setTimeout(() => {
    let response = {
      data: {
        [ADVENTURES_PUBLISHED]: 13 * 24,
        [ADVENTURES_IN_REVIEW]: 2 * 24,
        [ADVENTURES_UNPUBLISHED]: 6 * 24
      }
    };

    resolve(response);
  }, 300);
});
