import moment from 'moment'

import {
  MESSAGE_CREATED, MESSAGE_PUBLISHMENT_REQUEST,
  MESSAGE_REJECTED, MESSAGE_COMMENT,
  MESSAGE_PUBLISHED, MESSAGE_ACCEPTED,
  MESSAGE_CANCELLED, MESSAGE_BACK_TO_EDIT,

  MESSAGE_TYPE_CREATOR, MESSAGE_TYPE_QA
} from '@/config'

export default (adventureId, page) => new Promise((resolve) => {
  setTimeout(() => {
    let history = [];

    let daysOffset = (page - 1) * 7;

    if(page <= 2) {
      history = [
        {
          id: 15 * page + 1,
          type: MESSAGE_PUBLISHMENT_REQUEST,
          timestamp: moment().subtract(daysOffset + 7, 'days').toDate().getTime()
        },
        {
          id: 15 * page + 2,
          type: MESSAGE_REJECTED,
          timestamp: moment().subtract(daysOffset + 6, 'days').toDate().getTime()
        },
        {
          id: 15 * page + 3,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 6, 'days').add(3, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_QA,
            content: "Lorem ipsum dolor sit amet."
          }
        },
        {
          id: 15 * page + 4,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 6, 'days').add(8, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_CREATOR,
            content: "Lorem ipsum dolor sit amet."
          }
        },
        {
          id: 15 * page + 5,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 6, 'days').add(9, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_CREATOR,
            content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.\nLorem Ipsum."
          }
        },
        {
          id: 15 * page + 6,
          type: MESSAGE_BACK_TO_EDIT,
          timestamp: moment().subtract(daysOffset + 6, 'days').add(10, 'hours').toDate().getTime()
        },
        {
          id: 15 * page + 7,
          type: MESSAGE_PUBLISHMENT_REQUEST,
          timestamp: moment().subtract(daysOffset + 5, 'days').toDate().getTime()
        },
        {
          id: 15 * page + 8,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 5, 'days').add(4, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_CREATOR,
            content: "Lorem ipsum."
          }
        },
        {
          id: 15 * page + 9,
          type: MESSAGE_PUBLISHED,
          timestamp: moment().subtract(daysOffset + 4, 'days').toDate().getTime()
        },
        {
          id: 15 * page + 1232,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 4, 'days').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_QA,
            content: "Lorem ipsum"
          }
        },
        {
          id: 15 * page + 10,
          type: MESSAGE_CANCELLED,
          timestamp: moment().subtract(daysOffset + 2, 'days').toDate().getTime()
        },
        {
          id: 15 * page + 11,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 2, 'days').add(4, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_CREATOR,
            content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
          }
        },
        {
          id: 15 * page + 12,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 2, 'days').add(6, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_QA,
            content: "Lorem ipsum dolor sit amet."
          }
        },
        {
          id: 15 * page + 13,
          type: MESSAGE_ACCEPTED,
          timestamp: moment().subtract(daysOffset + 2, 'days').add(10, 'hours').toDate().getTime()
        },
        {
          id: 15 * page + 14,
          type: MESSAGE_COMMENT,
          timestamp: moment().subtract(daysOffset + 1, 'days').add(6, 'hours').toDate().getTime(),
          details: {
            from_type: MESSAGE_TYPE_QA,
            content: "Lorem ipsum dolor sit amet."
          }
        }
      ];
    }

    if(page == 2) {
      history.unshift(
        {
          id: 15 * page + 0,
          type: MESSAGE_CREATED,
          timestamp: moment().subtract(daysOffset + 9, 'days').toDate().getTime()
        }
      );
    }

    resolve({ data: history });
  }, 500);
});
