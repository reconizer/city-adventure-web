import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() => {
    let wrong_entries = [
      {
        percentage: 15,
        count: 40 + Math.floor(Math.random() * 40)
      },
      {
        percentage: 0,
        count: 0
      },
      {
        percentage: 20,
        count: 35 + Math.floor(Math.random() * 35)
      },
      {
        percentage: 12.5,
        count: 10 + Math.floor(Math.random() * 10)
      },
      {
        percentage: 29,
        count: 50 + Math.floor(Math.random() * 50)
      },
      {
        percentage: 35.8,
        count: 100 + Math.floor(Math.random() * 100)
      }
    ];

    resolve({
      data: {
        wrong_entries: wrong_entries
      }
    });
  }, 500);
});
