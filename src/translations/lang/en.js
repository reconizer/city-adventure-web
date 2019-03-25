export default {
  login: {
    title_creator: "Creator Panel",
    title_admin: "Admin Panel",
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

  account_settings: {
    title: "Account Settings",

    profile_picture: "Profile Picture",
    add_profile_picture: "Add Image",
    name: "Name",
    description: "Description"
  },

  adventures: {
    list_title: "Your Adventures",
    create_new: "Create New",
    empty: "No results",

    adventure_status: "Status",

    adventure_published: "Published",
    adventure_in_review: "In Review",
    adventure_unpublished: "Unpublished",
    adventure_rejected: "Rejected",
    adventure_cancelled: "Cancelled",
    adventure_pending: "Pending",

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
    new_adventure_help_confirm: "Okay, got it",

    sorting_newest: "Newly Published",
    sorting_oldest: "Oldest Published",
    sorting_top_rated: "Top Rated",
    sorting_worst_rated: "Worst Rated"
  },

  adventure: {
    edit_adventure: "Edit Adventure",
    adventure_details: "Adventure Details",
    cover_image: "Cover Photo",
    add_cover_image: "Choose Cover Photo",
    promo_images: "Promo Images",
    add_promo_images: "Add Images",
    estimated_duration: "Estimated Duration",
    estimated_duration_explanation: "Estimate duration only for short adventures up to few hours",
    difficulty: "Difficulty",
    adventure_hidden: "Hidden",
    adventure_hidden_explanation: "Hidden adventures are only available via secret codes and not visible on map by default",
    editing_disabled: "Editing Disabled",

    remove: "Remove Adventure",
    remove_confirm: "Are you sure you want to remove this adventure?",

    start: "Start",
    reposition: "Reposition",
    help: "Help",
    show_radiuses: "Show point range",

    help_header: "Map Controls",
    help_paragraph_1: "You can quickly change point's position or radius by using your mouse and dragging the point marker or radius controls around.",
    help_paragraph_2: "You can also quickly create or remove points by right clicking.",
    help_paragraph_3: "The reposition button will zoom out the camera unless all of the points are visible.",
    help_paragraph_4: "You can also enable/disable showing points' ranges for more clarity.",

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
    title: "Publishing",

    history_created: "Created",
    history_review_request: "In Review",
    history_rejected: "Rejected",
    history_published: "Published",
    history_accepted: "Ready to be published",
    history_cancelled: "Cancelled",
    history_back_to_edit: "Pending",

    history_author: "A",
    history_qa: "QA",
    history_you: "You",

    status: "Status",
    change_status: "Change adventure status",

    input_placeholder: "Type your message...",

    summary_pending: 'Your adventure has not been reviewed yet.\nTo publish it, you need to submit it for review first.',
    summary_in_review: 'Your adventure is currently reviewed by our QA team. You will be notified soon about the result.',
    summary_rejected: 'Your adventure has been rejected.\nPlease check the feedback left by QA team.',
    summary_unpublished: 'Your adventure has been accepted by our QA team and is ready to be published.',
    summary_published: 'Your adventure is now published and can be accessed from the app.\nIf you want to cancel the publication, please send a message to our QA team.',
    summary_cancelled: 'Your adventure has been cancelled and cannot be edited anymore. If you think this is a mistake, please send a message to our QA team.',

    modal_edit_1: 'To make necessary edits in this adventure, you will need to move it back from the review process to editing.',
    modal_edit_2: 'After you will make all necessary changes, you will be able to submit it for review again.',

    modal_review_1: 'Submitting adventure for a review will mean that you will not be able to make any changes during this process.',
    modal_review_2: 'Our QA team can accept your adventure and then you will be able to publish it at any time or go back to editing.',
    modal_review_3: 'If our QA team will for some reason reject your adventure you will receive detailed instructions to help you meet our quality standards.',

    modal_publish_1: 'If you will publish your adventure you will not be able to change it anymore and it will be available to users in the app.',

    action_request_review: 'Submit for review',
    action_edit: 'Go back to editing',
    action_publish: 'Publish'
  },

  stars: {
    label: "{value} out of 5",
  },

  adventure_analytics: {
    title: "Analytics",

    overview: "Overview",
    overview_purchases: "Purchases ({value})",
    overview_ratings: "Total ratings: {value}",
    overview_views: "Adventure description views ({value})",
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
    password_placeholder: "Password",
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

  pagination: {
    prev: "Previous",
    next: "Next",
    first: "First",
    last: "Last"
  },

  general: {
    name: "Name",
    description: "Description",
    sort_placeholder: "Sorting",

    edit: "Edit",
    remove: "Remove",
    submit: "Submit",
    cancel: "Cancel",
    filter: "Filter",
    query: "Search",

    around: "Around {value}",

    confirm_remove: "Yes, remove it",
    i_understand_confirm: "OK, got it",

    upload_files: "Add Files",
    choose_file: "Choose File",
    replace_file: "Change"
  }
}
