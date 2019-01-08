import moment from 'moment'

import {
  MESSAGE_CREATED, MESSAGE_PUBLISHMENT_REQUEST,
  MESSAGE_REJECTED, MESSAGE_COMMENT,
  MESSAGE_PUBLISHED, MESSAGE_ACCEPTED,
  MESSAGE_CANCELLED, MESSAGE_BACK_TO_EDIT
} from '@/config'

export default () => new Promise((resolve) => {
  setTimeout(() => {
    let history = [
      {
        id: 0,
        type: MESSAGE_CREATED,
        timestamp: moment().subtract(9, 'days').toDate().getTime()
      },
      {
        id: 1,
        type: MESSAGE_PUBLISHMENT_REQUEST,
        timestamp: moment().subtract(7, 'days').toDate().getTime()
      },
      {
        id: 2,
        type: MESSAGE_REJECTED,
        timestamp: moment().subtract(6, 'days').toDate().getTime()
      },
      {
        id: 3,
        type: MESSAGE_COMMENT,
        timestamp: moment().subtract(6, 'days').add(3, 'hours').toDate().getTime(),
        details: {
          from_id: 1,
          content: "Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 4,
        type: MESSAGE_COMMENT,
        timestamp: moment().subtract(6, 'days').add(8, 'hours').toDate().getTime(),
        details: {
          from_id: 2,
          content: "Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 5,
        type: MESSAGE_COMMENT,
        timestamp: moment().subtract(6, 'days').add(9, 'hours').toDate().getTime(),
        details: {
          from_id: 2,
          content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 6,
        type: MESSAGE_BACK_TO_EDIT,
        timestamp: moment().subtract(6, 'days').add(10, 'hours').toDate().getTime()
      },
      {
        id: 7,
        type: MESSAGE_PUBLISHMENT_REQUEST,
        timestamp: moment().subtract(5, 'days').toDate().getTime()
      },
      {
        id: 8,
        type: MESSAGE_COMMENT,
        timestamp: moment().subtract(5, 'days').add(4, 'hours').toDate().getTime()
      },
      {
        id: 9,
        type: MESSAGE_PUBLISHED,
        timestamp: moment().subtract(4, 'days').toDate().getTime()
      },
      {
        id: 10,
        type: MESSAGE_CANCELLED,
        timestamp: moment().subtract(2, 'days').toDate().getTime()
      },
      {
        id: 11,
        type: MESSAGE_COMMENT,
        timestamp: moment().subtract(2, 'days').add(4, 'hours').toDate().getTime(),
        details: {
          from_id: 2,
          content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 12,
        type: MESSAGE_COMMENT,
        timestamp: moment().subtract(2, 'days').add(6, 'hours').toDate().getTime(),
        details: {
          from_id: 1,
          content: "Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 13,
        type: MESSAGE_ACCEPTED,
        timestamp: moment().subtract(2, 'days').add(10, 'hours').toDate().getTime()
      }
    ];

    resolve({ data: history });
  }, 500);
});
