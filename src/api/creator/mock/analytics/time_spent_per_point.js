import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() => {
    let total = 1 * 60 * 60 + 47 * 60 + 51;

    let time_spent = [
      {
        average: Math.floor(total * 2 / 10)
      },
      {
        average: Math.floor(total * 1  / 10)
      },
      {
        average: Math.floor(total * 1.15 / 10)
      },
      {
        average: Math.floor(total * 1.75 / 10)
      },
      {
        average: Math.floor(total * 2.3 / 10)
      },
      {
        average: Math.floor(total * 2.8 / 10)
      }
    ];

    resolve({
      data: {
        time_spent: time_spent
      }
    });
  }, 400);
});
