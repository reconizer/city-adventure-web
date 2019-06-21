import { MESSAGE_PUBLISHMENT_REQUEST } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_PUBLISHMENT_REQUEST,
      timestamp: +new Date(),
      content: null
    };

    resolve({ data: message });
  }, 500);
});
