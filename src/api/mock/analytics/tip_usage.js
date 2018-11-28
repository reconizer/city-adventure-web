import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() => {
    let tip_usage = [
      {
        percentage: 0,
        count: 0
      },
      {
        percentage: 0,
        count: 0
      },
      {
        percentage: 5.4,
        count: 10
      },
      {
        percentage: 0,
        count: 0
      },
      {
        percentage: 9.18,
        count: 17
      },
      {
        percentage: 0.54,
        count: 1
      }
    ];

    resolve({
      data: {
        tip_usage: tip_usage
      }
    });
  }, 500);
});
