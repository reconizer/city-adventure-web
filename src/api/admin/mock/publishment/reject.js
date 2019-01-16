import { MESSAGE_REJECTED } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_REJECTED,
      timestamp: +new Date()
    };

    resolve({ data: message });
  }, 500);
});
