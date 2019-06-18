import { MESSAGE_BACK_TO_EDIT } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_BACK_TO_EDIT,
      timestamp: +new Date(),
      content: null
    };

    resolve({ data: message });
  }, 500);
});

