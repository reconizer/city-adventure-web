export default (adventureId, pointId, data) => new Promise((resolve) => {
  setTimeout(() => {
    let clue = {
      data: {
        ...data,
        id: +new Date()
      }
    };

    resolve(clue);
  }, 750);
});
