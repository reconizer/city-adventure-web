import { ADVENTURES_PUBLISHED } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {
      status: ADVENTURES_PUBLISHED
    };

    resolve({ data: adventure });
  });
});
