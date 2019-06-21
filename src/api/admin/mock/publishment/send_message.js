import { MESSAGE_COMMENT_QA } from '@/config';

export default (adventureId, msg) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_COMMENT_QA,
      timestamp: +new Date(),
      content: msg
    };

    resolve({ data: message });
  }, 500);
});
