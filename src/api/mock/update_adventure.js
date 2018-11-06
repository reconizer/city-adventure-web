export default (adventureId, data) => new Promise((resolve) => {
  setTimeout(() => {
    let adventure = {
      data: {
        id: adventureId,
        ...data
      }
    };

    resolve(adventure);
  }, 600);
});
