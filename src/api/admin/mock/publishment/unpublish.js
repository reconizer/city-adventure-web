import { MESSAGE_ACCEPTED } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_ACCEPTED,
      timestamp: +new Date()
    };

    resolve({ data: message });
  }, 500);
});
