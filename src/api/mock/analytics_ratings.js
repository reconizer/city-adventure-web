import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() =>{
    let statData = {
      rating_5: 20 + Math.floor(Math.random()*40),
      rating_4: 35 + Math.floor(Math.random()*80),
      rating_3: 10 + Math.floor(Math.random()*25),
      rating_2: 10 + Math.floor(Math.random()*30),
      rating_1: 15 + Math.floor(Math.random()*15)
    };

    resolve({
      data: {
        ratings: statData
      }
    });
  }, 500);
});

