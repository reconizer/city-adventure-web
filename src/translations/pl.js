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
    settings: "Konto",
    logout: "Wyloguj się",
    language: "Język"
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
    create_new_adventure: "Stwórz Nową Przygodę",

    new_adventure_help_header: "Interfejs Mapy",
    new_adventure_help_content_1: "Kliknij prawym przyciskiem myszy na miejscu w którym chciałbyś ustawić punkt startowy. Punkt startowy możesz przestawić w ten sam sposób lub poprzez przeciąganie go na mapie.",
    new_adventure_help_content_2: "Możesz wpisać też lokalizację w której pobliżu chciałbyś ustawić punkt startowy, aby mapa przesunęła się do tego miejsca.",
    new_adventure_help_confirm: "Jasne, rozumiem",
  },

  adventure: {
    edit_adventure: "Edytuj Przygodę",
    adventure_details: "Szczegóły Przygody",
    cover_image: "Zdjęcie Główne", //TODO shitty text
    promo_images: "Zdjęcia Promujące",
    estimated_duration: "Przewidywany czas trwania",
    estimated_duration_explanation: "Ustaw jedynie gdy przewidywany czas trwania wynosi conajwyżej parę godzin",
    difficulty: "Trudność",
    adventure_hidden: "Ukryta",
    adventure_hidden_explanation: "Ukryte przygody będą dostępne jedynie poprzez sekretny kod i nie będą domyślnie widoczne na mapie",

    start: "Start",
    reposition: "Znajdź punkty", //TODO shitty text
    help: "Pomoc",

    help_header: "Interfejs Mapy",
    help_paragraph_1: "Możesz szybko zmienić pozycję punktu lub zasięg interakcji poprzez przeciąganie znacznika punktu lub kontrolek promienia na mapie.",
    help_paragraph_2: "Możesz także szybko tworzyć nowe punkty lub usuwać istniejące poprzez wciskanie prawego przycisku myszy.",
    help_paragraph_3: "Przycisk 'Znajdź punkty' oddali kamerę tak by wszystkie punkty były widoczne.",
    help_confirm: "Jasne, rozumiem",

    add_new_puzzle: "Dodaj nowy punkt",
    edit_puzzle: "Edytuj punkt",
    puzzle_details: "Zobacz szczegóły",
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

  adventure_publishing: {
    title: "Publikacja"
  },

  adventure_analytics: {
    title: "Analityka",

    overview: "Ogólne",
    overview_purchases: "Kupna trasy ({value})",
    overview_ratings: "Łącznie ocen: {value}",
    overview_views: "Wyświetlenia opisu trasy ({value})",
    overview_stars: "{value} na 5",
    overview_stars_5: "Liczba gwiazdek: 5",
    overview_stars_4: "Liczba gwiazdek: 4",
    overview_stars_3: "Liczba gwiazdek: 3",
    overview_stars_2: "Liczba gwiazdek: 2",
    overview_stars_1: "Liczba gwiazdek: 1",

    completion: "Ukończenia przygody",
    completion_participants: "Uczestnicy ({value})",
    completion_abandoned_tip: "Porzucenia oznaczają brak aktywności w nieukończonej przygodzie w przeciągu ostatnich 2 dni",
    completion_clear_times: "Czasy ukończenia",
    completion_worst_time: "Najgorszy czas",
    completion_best_time: "Najlepszy czas",

    completion_completed: "Ukończona",
    completion_completed_with_tips: "Ukończona z użyciem podpowiedzi",
    completion_in_progress: "W trakcie rozwiązywania",
    completion_abandoned: "Porzucona",

    progression: "Przechodzenie przygody",

    progression_tip_usage: "Ilość graczy która wykorzystała podpowiedzi w danym punkcie",
    progression_average_time: "Średni czas na rozwiązanie danego punktu",
    progression_wrong_entries: "Wprowadzone niepoprawne hasła w danym punkcie"
  },

  adventure_testing: {
    title: "Testy"
  },

  adventure_point: {
    edit_start_title: "Edytuj Punkt Startowy",
    start_title: "Punkt Startowy",
    edit_title: "Edytuj Punkt #{index}",
    title: "Punkt #{index}",

    location: "Lokalizacja",
    location_hidden: "Lokalizacja ukryta",
    hidden_explanation: "Punkty ukryte nie będą widoczne na mapie dopóki gracze nie odnajdą ich poprzez weryfikowanie swojego obecnego położenia",
    radius: "Promień (w metrach)",
    radius_explanation: "Promień, w którym gracz może rozwiązać zagadkę",

    password_required: "Wymaga Hasła",
    password_type: "Rodzaj i metoda wprowadzania",
    password_placeholder: "Hasło",
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
    edit_title: "Edytuj wskazówkę",
    show_title: "Szczegóły wskazówki",
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

    number_push_lock_3: 'Kłódka kombinacji 3 cyfr (6 przycisków)',
    number_push_lock_4: 'Kłódka kombinacji 4 cyfr (8 przycisków)',
    number_push_lock_5: 'Kłódka kombinacji 5 cyfr (10 przyciski)'
  },

  general: {
    name: "Nazwa",
    description: "Opis",

    edit: "Edytuj",
    remove: "Usuń",
    submit: "Zatwierdź",

    around: "Około {value}"
  }
}
