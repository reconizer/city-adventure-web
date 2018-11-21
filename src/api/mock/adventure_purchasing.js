import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() =>{
    let statData = [];
    let sum = 0;

    let start = moment(startDate);
    let end = moment(endDate);

    let diffDays = end.diff(start);

    for(let i = 0; i < diffDays; i++) {
      let value = Math.floor(Math.random() * 15);
      sum += value;

      statData.push({
        timestamp: start.add(i, 'days').toDate().getTime(),
        data: value
      });
    }

    resolve({
      data: {
        statistics: statData,
        total: sum
      }
    });
  }, 500);
});
