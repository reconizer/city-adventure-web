import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() =>{
    let statData = [];

    let start = moment(startDate);
    let end = moment(endDate);

    let diffDays = end.diff(start, 'days');

    for(let i = 0; i < diffDays; i++) {
      statData.push({
        timestamp: start.clone().add(i, 'days').toDate().getTime(),
        data: Math.floor(Math.random() * 15)
      });
    }

    resolve({
      data: {
        statistics: statData
      }
    });
  }, 500);
});
