export default (adventurId) => new Promise((resolve) => {
  setTimeout(() => {
    let points = {
      data: [
        //Start
        {
          id: 1,
          parent_id: null,
          position: {
            lat: 53.0098,
            lng: 18.60216
          },
          radius: 20,
          clues: [
            {
              id: 1,
              order: 0,
              point_id: 1,
              tip: false,
              type: "audio",
              details: {
                url: "http://test.com"
              }
            }
          ]
        },
        //Fontanna
        {
          id: 2,
          parent_id: 1,
          position: {
            lat: 53.01057,
            lng: 18.59991
          },
          radius: 20,
          clues: [
            {
              id: 2,
              order: 0,
              point_id: 2,
              tip: false,
              type: "text",
              details: {
                text: "Odpowiedzi szukaj u Psa, Smoka i Kury bez Głowy"
              }
            }
          ]
        },
        //Filutek
        {
          id: 3,
          parent_id: 2,
          position: {
            lat: 53.01105,
            lng: 18.6045
          },
          radius: 20,
          clues: [
            {
              id: 3,
              order: 0,
              point_id: 3,
              tip: false,
              type: "image",
              details: {
                url: "http://placehold.it/500x500"
              }
            }
          ]
        },
        //Smok
        {
          id: 4,
          parent_id: 3,
          position: {
            lat: 53.0107,
            lng: 18.60881
          },
          radius: 20,
          clues: [
            {
              id: 4,
              order: 0,
              point_id: 4,
              tip: false,
              type: "image",
              details: {
                url: "http://placehold.it/600x600"
              }
            }
          ]
        },
        //Kura
        {
          id: 5,
          parent_id: 4,
          position: {
            lat: 53.01218,
            lng: 18.60433
          },
          radius: 20,
          clues: [
            {
              id: 5,
              order: 0,
              point_id: 5,
              tip: false,
              type: "image",
              details: {
                url: "http://placehold.it/400x500"
              }
            }
          ]
        },
        //Kopernik
        {
          id: 6,
          parent_id: 5,
          position: {
            lat: 53.0103,
            lng: 18.60496
          },
          radius: 20,
          clues: [
            {
              id: 6,
              order: 0,
              point_id: 6,
              tip: false,
              type: "image",
              details: {
                url: "http://placehold.it/400x200"
              }
            },
            {
              id: 7,
              order: 1,
              point_id: 6,
              tip: false,
              type: "image",
              details: {
                url: "http://placehold.it/500x200"
              }
            }
          ]
        },
        // Brama Mostowa
        {
          id: 7,
          parent_id: 6,
          position: {
            lat: 53.00855,
            lng: 18.60891
          },
          radius: 20,
          clues: []
        }
      ]
    };

    resolve(points);
  }, 500);
});

