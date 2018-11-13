export const BASE_URL = process.env.VUE_APP_API_URL;

export const clueTypes = [
  {
    value: 'text',
    label: 'Text'
  },
  {
    value: 'audio',
    label: 'Audio'
  },
  {
    value: 'video',
    label: 'Video'
  },
  {
    value: 'image',
    label: 'Image'
  },
  {
    value: 'url',
    label: 'URL'
  }
]

export const passwordTypes = [
  {
    value: 'text',
    label: 'Text (upto 50 characters)',
    length: 50
  },
  {
    value: 'number_lock_3',
    label: 'Number Lock (3 numbers)',
    length: 3
  },
  {
    value: 'number_lock_4',
    label: 'Number Lock (4 numbers)',
    length: 4
  },
  {
    value: 'number_lock_5',
    label: 'Number Lock (5 numbers)',
    length: 5
  },
  {
    value: 'number_lock_6',
    label: 'Number Lock (6 numbers)',
    length: 6
  },
  {
    value: 'cryptex_lock_4',
    label: 'Cryptex Lock (4 letters)',
    length: 4
  },
  {
    value: 'cryptex_lock_5',
    label: 'Cryptex Lock (5 letters)',
    length: 5
  },
  {
    value: 'cryptex_lock_6',
    label: 'Cryptex Lock (6 letters)',
    length: 6
  },
  {
    value: 'cryptex_lock_7',
    label: 'Cryptex Lock (7 letters)',
    length: 7
  },
  {
    value: 'direction_lock_4',
    label: 'Direction Lock (4 directions)',
    length: 4
  },
  {
    value: 'direction_lock_6',
    label: 'Direction Lock (6 directions)',
    length: 6
  },
  {
    value: 'direction_lock_8',
    label: 'Direction Lock (8 directions)',
    length: 8
  },
  {
    value: 'number_push_lock_6',
    label: 'Number Push Lock (6 buttons)',
    length: 3
  },
  {
    value: 'number_push_lock_8',
    label: 'Number Push Lock (8 buttons)',
    length: 4
  },
  {
    value: 'number_push_lock_10',
    label: 'Number Push Lock (10 buttons)',
    length: 5
  }
]

export const RADIUS_CONSTRAINTS = {
  MIN: 10,
  MAX: 500
}

export const TIME_CONSTRAINT_OPTIONS = {
  INTERVAL: 15 * 60, // 15 minute intervals
}

export const ADVENTURE_DURATION_OPTIONS = {
  MIN: 30,
  MAX: 360,
  INTERVAL: 15
}

export const DIFFICULTY_LEVELS = [
  {
    value: 1,
    label: 'Easy'
  },
  {
    value: 2,
    label: 'Medium'
  },
  {
    value: 3,
    label: 'Hard'
  }
]
