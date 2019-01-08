export default (adventureId, pointId, data) => new Promise((resolve) => {
  setTimeout(() => {
    let clue = {
      data: {
        id: +new Date(),
        ...data
      }
    };

    resolve(clue);
  }, 750);
});
