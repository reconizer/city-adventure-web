import ADVENTURES_IN_REVIEW from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {
      status: ADVENTURES_IN_REVIEW
    };

    resolve({ data: adventures });
  });
});
