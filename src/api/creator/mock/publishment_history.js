import moment from 'moment'

export default () => new Promise((resolve) => {
  setTimeout(() => {
    let history = [
      {
        id: 1,
        type: "review_request",
        timestamp: moment().subtract(7, 'days').toDate().getTime()
      },
      {
        id: 2,
        type: "rejected",
        timestamp: moment().subtract(6, 'days').toDate().getTime()
      },
      {
        id: 3,
        type: "message",
        timestamp: moment().subtract(6, 'days').add(3, 'hours').toDate().getTime(),
        details: {
          from_id: 1,
          content: "Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 4,
        type: "message",
        timestamp: moment().subtract(6, 'days').add(8, 'hours').toDate().getTime(),
        details: {
          from_id: 2,
          content: "Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 5,
        type: "message",
        timestamp: moment().subtract(6, 'days').add(9, 'hours').toDate().getTime(),
        details: {
          from_id: 2,
          content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 6,
        type: "back_to_edit",
        timestamp: moment().subtract(6, 'days').add(10, 'hours').toDate().getTime()
      },
      {
        id: 7,
        type: "review_request",
        timestamp: moment().subtract(5, 'days').toDate().getTime()
      },
      {
        id: 8,
        type: "accepted",
        timestamp: moment().subtract(5, 'days').add(4, 'hours').toDate().getTime()
      },
      {
        id: 9,
        type: "published",
        timestamp: moment().subtract(4, 'days').toDate().getTime()
      },
      {
        id: 10,
        type: "cancelled",
        timestamp: moment().subtract(2, 'days').toDate().getTime()
      },
      {
        id: 11,
        type: "message",
        timestamp: moment().subtract(2, 'days').add(4, 'hours').toDate().getTime(),
        details: {
          from_id: 2,
          content: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 12,
        type: "message",
        timestamp: moment().subtract(2, 'days').add(6, 'hours').toDate().getTime(),
        details: {
          from_id: 1,
          content: "Lorem ipsum dolor sit amet."
        }
      },
      {
        id: 13,
        type: "accepted",
        timestamp: moment().subtract(2, 'days').add(10, 'hours').toDate().getTime()
      }
    ];

    resolve({ data: history });
  }, 500);
});
