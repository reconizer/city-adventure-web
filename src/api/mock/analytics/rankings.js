import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() => {
    let rankings = [];

    let lowerBound = 2 * 60 * 60 + 37 * 60 + 16;
    let higherBound = 1 * 60 * 60 + 16 * 60 + 34;

    let bars = 20;

    let diff = Math.abs(lowerBound - higherBound) / bars;

    let start = moment(startDate);
    let end = moment(endDate);

    let diffDays = end.diff(start, 'days');

    for(let i = 0; i < bars; i++) {
      let dist = Math.abs(i - bars /2);
      let alpha = 1 - dist / bars * 2;

      rankings.push({
        lower: Math.floor(lowerBound - diff * i),
        higher: Math.floor(lowerBound - diff * (i + 1)),
        count: Math.floor(alpha * alpha * diffDays * 3 + Math.random() * 5)
      });
    }

    resolve({
      data: {
        rankings: rankings
      }
    });
  }, 500);
});
