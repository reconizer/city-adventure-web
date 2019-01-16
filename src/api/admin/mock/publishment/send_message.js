import { MESSAGE_COMMENT, MESSAGE_TYPE_QA } from '@/config';

export default (adventureId, msg) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: MESSAGE_COMMENT,
      timestamp: +new Date(),
      details: {
        from_type: MESSAGE_TYPE_QA,
        content: msg
      }
    };

    resolve({ data: message });
  }, 500);
});
