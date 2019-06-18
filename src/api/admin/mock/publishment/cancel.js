import { MESSAGE_CANCELLED } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_CANCELLED,
      timestamp: +new Date(),
      content: null
    };

    resolve({ data: message });
  }, 500);
});
