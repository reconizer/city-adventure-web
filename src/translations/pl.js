export default {
  login: {
    title: "Zaloguj się",
    email: "Email",
    email_placeholder: "email@domena.pl",
    password: "Hasło",
    password_placeholder: "Hasło"
  },

  top_menu: {
    adventures: "Przygody",
    settings: "Opcje",
    logout: "Wyloguj Się"
  },

  adventures: {
    list_title: "Twoje Przygody",
    create_new: "Stwórz Nową",

    adventure_status: "Status",
    adventure_published: "Opublikowana",
    adventure_unpublished: "Nieopublikowana",
    adventure_rating: "Ocena",
    adventure_visibility: "Widoczność",
    adventure_public: "Publiczna",
    adventure_hidden: "Ukryta",

    set_place: "Wpisz Lokalizację",

    set_starting_point: "Ustaw punkt startowy w tym miejscu",
    move_starting_point: "Przenieś punkt startowy w to miejsce",
    create_new_adventure: "Stwórz Nową Przygodę"
  },

  adventure: {
    edit_adventure: "Edytuj Przygodę",
    cover_image: "Zdjęcie Główne", //TODO shitty text
    promo_images: "Zdjęcia Promujące",
    estimated_duration: "Przewidywany czas trwania",
    estimated_duration_explanation: "Ustaw jedynie gdy przewidywany czas trwania wynosi conajwyżej parę godzin",
    difficulty: "Trudność",
    adventure_hidden: "Ukryta",
    adventure_hidden_explanation: "Ukryte przygody będą dostępne jedynie poprzez sekretny kod i nie będą domyślnie widoczne na mapie",

    start: "Start",
    reposition: "Znajdź punkty", //TODO shitty text

    add_new_puzzle: "Dodaj nowy punkt",
    edit_puzzle: "Edytuj punkt",
    remove_puzzle: "Usuń punkt",
    remove_puzzle_confirm: "Jesteś pewien, że chcesz usunąć ten punkt? Wszystkie wskazówki z nim połączone zostaną usunięte",

    new_clue: "Nowa wskazówka",
    text_clue: "Wskazówka Tekstowa",
    audio_clue: "Klip Audio",
    video_clue: "Klip Wideo",
    url_clue: "Link URL",

    go_to_puzzle: "Idź do",
    visible: "Widoczny",
    hidden: "Ukryty",
    password_required: "Wymaga hasła",
    time_constraint: "Ograniczony czasowo",

    difficulty_1: 'Łatwa',
    difficulty_2: 'Umiarkowana',
    difficulty_3: 'Trudna'
  },

  adventure_point: {
    edit_start: "Edytuj Punkt Startowy",
    edit: "Edytuj Punkt",

    location: "Lokalizacja",
    location_hidden: "Lokalizacja ukryta",
    radius: "Promień (w metrach)",
    radius_explanation: "Promień, w którym gracz może rozwiązać zagadkę",

    password_required: "Wymaga Hasła",
    password_type: "Rodzaj i metoda wprowadzania",
    enter_password: "Wprowadź hasło",
    password_invalid: "Hasło Niepoprawne",
    password_by_buttons: "Wprowadź hasło za pomocą przycisków poniżej",
    password_clear: "Resetuj",
    transformed_password: "Hasło: {password}",
    no_password_required: "Hasło nie jest wymagane aby rozwiązać zagadkę",

    time_constraint: "Ograniczony Czasowo",
    start_time: "Początek",
    duration: "Czas trwania (godziny:minuty)",
    end_time: "Koniec",
    no_time_constraint: "Nie ma wymogu czasowego aby rozwiązać zagadkę"
  },

  clue: {
    new: "Nowa wskazówka",
    edit: "Edytuj wskazówkę",
    type: "Typ wskazówki",
    is_tip: "Jest podpowiedzią?",
    is_tip_explanation: "Podpowiedzi są opcjonalnymi wskazówkami dostępnymi na życzenie użytkownika",
    content: "Treść",
    url: "URL",
    remove_confirm: "Jesteś pewien, że chcesz usunąć tą wskazówkę?"
  },

  clue_type: {
    text: 'Tekstowa',
    audio: 'Klip Audio',
    video: 'Klip Wideo',
    image: 'Zdjęcie',
    url: 'Link URL'
  },

  password_type: {
    text: 'Hasło tekstowe (do 50 znaków)',

    number_lock_3: 'Kłódka numeryczna (3 cyfry)',
    number_lock_4: 'Kłódka numeryczna (4 cyfry)',
    number_lock_5: 'Kłódka numeryczna (5 cyfr)',
    number_lock_6: 'Kłódka numeryczna (6 cyfr)',

    cryptex_lock_4: 'Kłódka literowa (4 litery)',
    cryptex_lock_5: 'Kłódka literowa (5 liter)',
    cryptex_lock_6: 'Kłódka literowa (6 liter)',
    cryptex_lock_7: 'Kłódka literowa (7 liter)',

    direction_lock_4: 'Kłódka kierunkowa (4 kierunki)',
    direction_lock_6: 'Kłódka kierunkowa (6 kierunków)',
    direction_lock_8: 'Kłódka kierunkowa (8 kierunków)',

    number_push_lock_6: 'Kłódka kombinacji 3 cyfr (6 przycisków)',
    number_push_lock_8: 'Kłódka kombinacji 4 cyfr (8 przycisków)',
    number_push_lock_10: 'Kłódka kombinacji 5 cyfr (10 przyciski)'
  },

  general: {
    name: "Nazwa",
    description: "Opis",

    edit: "Edytuj",
    remove: "Usuń",
    submit: "Zatwierdź"
  }
}
