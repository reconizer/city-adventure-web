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
    settings: "Account",
    logout: "Log Out",
    language: "Language"
  },

  adventures: {
    list_title: "Your Adventures",
    create_new: "Create New",

    adventure_status: "Status",
    adventure_published: "Published",
    adventure_unpublished: "Unpublished",
    adventure_rating: "Rating",
    adventure_visibility: "Visibility",
    adventure_public: "Public",
    adventure_hidden: "Hidden",

    set_place: "Find place",

    set_starting_point: "Set starting point here",
    move_starting_point: "Move starting point here",
    create_new_adventure: "Create New Adventure",

    new_adventure_help_header: "Map Controls",
    new_adventure_help_content_1: "Right click using your mouse to set starting point in given location. You can move it in the same way or you can simply drag it around the map.",
    new_adventure_help_content_2: "You can also enter location in which you would like to set the starting point and the map will move to it.",
    new_adventure_help_confirm: "Okay, got it"
  },

  adventure: {
    edit_adventure: "Edit Adventure",
    adventure_details: "Adventure Details",
    cover_image: "Cover Photo",
    promo_images: "Promo Images",
    estimated_duration: "Estimated Duration",
    estimated_duration_explanation: "Estimate duration only for short adventures up to few hours",
    difficulty: "Difficulty",
    adventure_hidden: "Hidden",
    adventure_hidden_explanation: "Hidden adventures are only available via secret codes and not visible on map by default",

    start: "Start",
    reposition: "Reposition",
    help: "Help",

    help_header: "Map Controls",
    help_paragraph_1: "You can quickly change point's position or radius by using your mouse and dragging the point marker or radius controls around.",
    help_paragraph_2: "You can also quickly create or remove points by right clicking.",
    help_paragraph_3: "The reposition button will zoom out the camera unless all of the points are visible.",
    help_confirm: "Okay, got it",

    add_new_puzzle: "Create new Puzzle",
    edit_puzzle: "Edit Puzzle",
    puzzle_details: "Puzzle Details",
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

  adventure_publishing: {
    title: "Publishing"
  },

  adventure_analytics: {
    title: "Analytics",

    overview: "Overview",
    overview_purchases: "Purchases ({value})",
    overview_ratings: "Total ratings: {value}",
    overview_views: "Adventure description views ({value})",
    overview_stars: "{value} out of 5",
    overview_stars_5: "5 stars",
    overview_stars_4: "4 stars",
    overview_stars_3: "3 stars",
    overview_stars_2: "2 stars",
    overview_stars_1: " 1 star",

    completion: "Adventure Completion",
    completion_participants: "Participants ({value})",
    completion_abandoned_tip: "Abandoned means no user activity in incomplete adventure in last two days",
    completion_clear_times: "Clear Times",
    completion_worst_time: "Worst Time",
    completion_best_time: "Best Time",

    completion_completed: "Completed",
    completion_completed_with_tips: "Completed with tips",
    completion_in_progress: "In Progress",
    completion_abandoned: "Abandoned",

    progression: "Adventure Progression",

    progression_tip_usage: "Players who used tips in given points",
    progression_average_time: "Average time spent per point",
    progression_wrong_entries: "Wrong passwords entered by point"
  },

  adventure_testing: {
    title: "Testing"
  },

  adventure_point: {
    edit_start_title: "Edit Starting Point",
    start_title: "Starting Point",
    edit_title: "Edit Puzzle #{index}",
    title: "Puzzle #{index}",

    location: "Location",
    location_hidden: "Location hidden",
    hidden_explanation: "Hidden points will not be visible on the map until the players will manually find them by verifying their location",
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
    edit_title: "Edit Clue Details",
    show_title: "Clue Details",
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

    number_push_lock_3: '3 Numbers Combo Lock (6 buttons)',
    number_push_lock_4: '4 Numbers Combo Lock (8 buttons)',
    number_push_lock_5: '5 Numbers Combo Lock (10 buttons)'
  },

  general: {
    name: "Name",
    description: "Description",

    edit: "Edit",
    remove: "Remove",
    submit: "Submit",

    around: "Around {value}"
  }
}
