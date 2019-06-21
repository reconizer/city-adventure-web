import { MESSAGE_COMMENT_CREATOR } from '@/config';

export default (adventureId, msg) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_COMMENT_CREATOR,
      timestamp: +new Date(),
      content: msg
    };

    resolve({ data: message });
  }, 500);
});
