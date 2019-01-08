export default (adventureId, msg) => new Promise((resolve) => {
  setTimeout(() => {
    let message = {
      id: +new Date(),
      type: "message",
      timestamp: +new Date(),
      details: {
        from_id: 2,
        content: msg
      }
    };

    resolve({ data: message });
  }, 500);
});
