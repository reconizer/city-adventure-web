export const BASE_URL = process.env.VUE_APP_API_URL;

export const clueTypes = [
  'text', 'audio', 'video',
  'image', 'url'
]

export const passwordTypes = [
  {
    value: 'text',
    length: 50
  },
  {
    value: 'number_lock_3',
    length: 3
  },
  {
    value: 'number_lock_4',
    length: 4
  },
  {
    value: 'number_lock_5',
    length: 5
  },
  {
    value: 'number_lock_6',
    length: 6
  },
  {
    value: 'cryptex_lock_4',
    length: 4
  },
  {
    value: 'cryptex_lock_5',
    length: 5
  },
  {
    value: 'cryptex_lock_6',
    length: 6
  },
  {
    value: 'cryptex_lock_7',
    length: 7
  },
  {
    value: 'direction_lock_4',
    length: 4
  },
  {
    value: 'direction_lock_6',
    length: 6
  },
  {
    value: 'direction_lock_8',
    length: 8
  },
  {
    value: 'number_push_lock_6',
    length: 3
  },
  {
    value: 'number_push_lock_8',
    length: 4
  },
  {
    value: 'number_push_lock_10',
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

export const DIFFICULTY_LEVELS = [ 1, 2, 3 ]
