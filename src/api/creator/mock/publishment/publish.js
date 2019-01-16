import { MESSAGE_PUBLISHED } from '@/config';

export default (adventureId) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_PUBLISHED,
      timestamp: +new Date()
    };

    resolve({ data: message });
  }, 500);
});
