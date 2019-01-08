export default (adventureId, pointId, clueId, data) => new Promise((resolve) => {
  setTimeout(() => {
    let clue = {
      data: {
        id: clueId,
        ...data
      }
    };

    resolve(clue);
  }, 750);
});
