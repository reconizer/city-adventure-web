import ADVENTURES_PENDING from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {
      status: ADVENTURES_PENDING
    };

    resolve({ data: adventures });
  });
});

