export default {
  login: {
    title: "Log In",
    email: "Email",
    email_placeholder: "email@domain.com",
    password: "Password",
    password_placeholder: "Password"
  },

  top_menu: {
    adventures: "Adventures",
    settings: "Settings",
    logout: "Log Out"
  },

  adventures: {
    list_title: "Your Adventures",
    create_new: "Create New",

    adventure_status: "Status",
    adventure_rating: "Rating",
    adventure_visibility: "Visibility",
    adventure_public: "Public",
    adventure_hidden: "Hidden",

    set_place: "Find place",

    set_starting_point: "Set starting point here",
    move_starting_point: "Move starting point here",
    create_new_adventure: "Create New Adventure"
  },

  adventure: {
    edit_adventure: "Edit Adventure",
    cover_image: "Cover Photo",
    promo_images: "Promo Images",
    estimated_duration: "Estimated Duration",
    estimated_duration_explanation: "Estimate duration only for short adventures up to few hours",
    difficulty: "Difficulty",
    adventure_hidden: "Hidden",
    adventure_hidden_explanation: "Hidden adventures are only available via secret codes and not visible on map by default",

    start: "Start",
    reposition: "Reposition",

    add_new_puzzle: "Create new Puzzle",
    edit_puzzle: "Edit Puzzle",
    remove_puzzle: "Remove Puzzle",
    remove_puzzle_confirm: "Are you sure you want to remove this puzzle? All associated clues will also be removed",

    new_clue: "New Clue",
    text_clue: "Text Clue",
    audio_clue: "Audio Clip",
    video_clue: "Video",
    url_clue: "URL",

    go_to_puzzle: "Go to",
    visible: "Visible",
    hidden: "Hidden",
    password_required: "Password Required",
    time_constraint: "Time Constraint",

    difficulty_1: 'Easy',
    difficulty_2: 'Medium',
    difficulty_3: 'Hard'
  },

  adventure_point: {
    edit_start: "Edit Starting Point",
    edit: "Edit Puzzle",

    location: "Location",
    location_hidden: "Location hidden",
    radius: "Radius (in meters)",
    radius_explanation: "Radius within which players can access this puzzle",

    password_required: "Password Required",
    password_type: "Password Type",
    enter_password: "Enter Password",
    password_invalid: "Password Invalid",
    password_by_buttons: "Enter password by pressing buttons below",
    password_clear: "Reset",
    transformed_password: "Password: {password}",
    no_password_required: "Password is not required to complete this puzzle",

    time_constraint: "Time Constraint",
    start_time: "Start Time",
    duration: "Duration (hours:minutes)",
    end_time: "End Time",
    no_time_constraint: "There is no time constraint to complete this puzzle"
  },

  clue: {
    new: "New Clue",
    edit: "Edit Clue",
    type: "Clue Type",
    is_tip: "Is a tip?",
    is_tip_explanation: "Tips are optional clues, given to users when they require additional help",
    content: "Content",
    url: "URL",
    remove_confirm: "Are you sure you want to remove this clue?"
  },

  clue_type: {
    text: 'Text',
    audio: 'Audio Clip',
    video: 'Video',
    image: 'Image',
    url: 'URL'
  },

  password_type: {
    text: 'Text Password (up to 50 characters)',

    number_lock_3: 'Number Lock (3 numbers)',
    number_lock_4: 'Number Lock (4 numbers)',
    number_lock_5: 'Number Lock (5 numbers)',
    number_lock_6: 'Number Lock (6 numbers)',

    cryptex_lock_4: 'Letter Lock (4 letters)',
    cryptex_lock_5: 'Letter Lock (5 letters)',
    cryptex_lock_6: 'Letter Lock (6 letters)',
    cryptex_lock_7: 'Letter Lock (7 letters)',

    direction_lock_4: 'Direction Lock (4 directions)',
    direction_lock_6: 'Direction Lock (6 directions)',
    direction_lock_8: 'Direction Lock (8 directions)',

    number_push_lock_6: '3 Numbers Combo Lock (6 buttons)',
    number_push_lock_8: '4 Numbers Combo Lock (8 buttons)',
    number_push_lock_10: '5 Numbers Combo Lock (10 buttons)'
  },


  general: {
    name: "Name",
    description: "Description",

    edit: "Edit",
    remove: "Remove",
    submit: "Submit"
  }
}
