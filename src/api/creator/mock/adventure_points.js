export default (adventureId) => new Promise((resolve) => {
  //TODO location hiding as a component in answers?
  setTimeout(() => {
    let points = {
    };

    if(adventureId > 3) {
      let startingPos = JSON.parse(localStorage.getItem(`${adventureId}-point`));

      points = {
        data: [
          {
            id: 1,
            parent_id: null,
            position: startingPos,
            radius: 50,
            hidden: false,
            clues: [],
            answers: []
          }
        ]
      }
    } else {
      points = {
        data: [
          //Start
          {
            id: 1,
            parent_id: null,
            position: {
              lat: 53.0098,
              lng: 18.60216
            },
            radius: 50,
            hidden: false,
            clues: [
              {
                id: 1,
                order: 0,
                point_id: 1,
                tip: false,
                type: "audio",
                url: "http://test.com",
                description: "Taniec Eleny"
              }
            ],
            answers: []
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
            hidden: false,
            clues: [
              {
                id: 2,
                order: 0,
                point_id: 2,
                tip: false,
                type: "text",
                url: null,
                description: "Odpowiedzi szukaj u Psa, Smoka i Kury bez Głowy"
              }
            ],
            answers: [
              {
                id: 1,
                type: "password",
                details: {
                  password_type: "text",
                  password: "Taniec Eleny"
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
            hidden: true,
            clues: [
              {
                id: 3,
                order: 0,
                point_id: 3,
                tip: false,
                type: "image",
                url: "http://placehold.it/500x500",
                description: null
              }
            ],
            answers: []
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
            hidden: true,
            clues: [
              {
                id: 4,
                order: 0,
                point_id: 4,
                tip: false,
                type: "image",
                url: "http://placehold.it/600x600",
                description: null
              }
            ],
            answers: []
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
            hidden: true,
            clues: [
              {
                id: 5,
                order: 0,
                point_id: 5,
                tip: false,
                type: "image",
                url: "http://placehold.it/400x500",
                description: null
              }
            ],
            answers: []
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
            hidden: false,
            clues: [
              {
                id: 6,
                order: 0,
                point_id: 6,
                tip: false,
                type: "image",
                url: "http://placehold.it/400x200",
                description: null
              },
              {
                id: 7,
                order: 1,
                point_id: 6,
                tip: false,
                type: "image",
                url: "http://placehold.it/500x200",
                description: null
              }
            ],
            answers: [
              {
                id: 2,
                type: "password",
                details: {
                  password_type: "text",
                  password: "De revolutionibus orbium coelestium"
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
            hidden: true,
            clues: [],
            answers: [
              {
                id: 7,
                type: "time",
                details: {
                  starting_time: 19 * 60 * 60 + 15 * 60, //seconds in day
                  duration: 15 * 60 //in seconds
                }
              }
            ]
          }
        ]
      };
    }

    resolve(points);
  }, 1000);
});

