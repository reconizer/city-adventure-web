import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() => {
    let overview = {
      //times in seconds
      best_time: 1 * 60 * 60 + 15 * 60 + 34,
      worst_time: 2 * 60 * 60 + 37 * 60 + 16,
      average_time: 1 * 60 * 60 + 47 * 60 + 51
    };

    resolve({
      data: {
        overview: overview
      }
    });
  }, 350);
});
