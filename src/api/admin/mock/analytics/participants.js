import moment from 'moment'

export default (adventureId, startDate, endDate) => new Promise((resolve) => {
  setTimeout(() => {
    let start = moment(startDate);
    let end = moment(endDate);

    let diffDays = end.diff(start, 'days');

    let baseLine = Math.floor(Math.random() * diffDays * 30);

    let participants = {
      completed: Math.floor(baseLine * 0.6 + Math.random() * diffDays * 1),
      completed_with_tips: Math.floor(baseLine * 0.1 + Math.random() * diffDays * 2),
      in_progress: Math.floor(baseLine * 0.25 + Math.random() * diffDays * 3),
      abandoned: Math.floor(baseLine * 0.1 + Math.random() * diffDays * 1)
    };

    resolve({
      data: {
        participants: participants
      }
    });
  }, 500);
});
