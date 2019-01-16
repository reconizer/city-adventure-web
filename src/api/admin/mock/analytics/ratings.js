import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() =>{
    let start = moment(startDate);
    let end = moment(endDate);

    let diffDays = end.diff(start, 'days');

    let statData = {
      rating_5: 20 + Math.floor(Math.random()* 6 * diffDays),
      rating_4: 35 + Math.floor(Math.random()* 5 * diffDays),
      rating_3: 10 + Math.floor(Math.random()* 3 * diffDays),
      rating_2: 5 + Math.floor(Math.random()* 2 * diffDays),
      rating_1: 10 + Math.floor(Math.random()* 1 * diffDays)
    };

    resolve({
      data: {
        ratings: statData
      }
    });
  }, 500);
});

