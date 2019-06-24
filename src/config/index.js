/**
 * MAPPED ENV VARIABLES
 */
export const BASE_URL = process.env.VUE_APP_API_URL;
export const ADMIN_BASE_URL = process.env.VUE_APP_ADMIN_API_URL;

/**
 * CONSTANTS AND DATA
 */

export const CLUE_TYPES = [
  'text', 'audio', 'video',
  'image', 'url'
]

import directionLock from '@/assets/images/puzzles/direction_lock.png'

import letterLock4 from '@/assets/images/puzzles/letter_lock_4.png'
import letterLock5 from '@/assets/images/puzzles/letter_lock_5.png'
import letterLock6 from '@/assets/images/puzzles/letter_lock_6.png'
import letterLock7 from '@/assets/images/puzzles/letter_lock_7.png'

import numberLock3 from '@/assets/images/puzzles/number_lock_3.png'
import numberLock4 from '@/assets/images/puzzles/number_lock_4.png'
import numberLock5 from '@/assets/images/puzzles/number_lock_5.png'
import numberLock6 from '@/assets/images/puzzles/number_lock_6.png'

import numberPushLock6 from '@/assets/images/puzzles/number_push_lock_6.png'
import numberPushLock8 from '@/assets/images/puzzles/number_push_lock_8.png'
import numberPushLock10 from '@/assets/images/puzzles/number_push_lock_10.png'

import textPassword from '@/assets/images/puzzles/text_password.png'

export const PASSWORD_TYPES = [
  {
    value: 'text',
    length: 50,
    image_url: textPassword
  },

  {
    value: 'number_lock_3',
    length: 3,
    image_url: numberLock3
  },
  {
    value: 'number_lock_4',
    length: 4,
    image_url: numberLock4
  },
  {
    value: 'number_lock_5',
    length: 5,
    image_url: numberLock5
  },
  {
    value: 'number_lock_6',
    length: 6,
    image_url: numberLock6
  },

  {
    value: 'cryptex_lock_4',
    length: 4,
    image_url: letterLock4
  },
  {
    value: 'cryptex_lock_5',
    length: 5,
    image_url: letterLock5
  },
  {
    value: 'cryptex_lock_6',
    length: 6,
    image_url: letterLock6
  },
  {
    value: 'cryptex_lock_7',
    length: 7,
    image_url: letterLock7
  },

  {
    value: 'direction_lock_4',
    length: 4,
    image_url: directionLock
  },
  {
    value: 'direction_lock_6',
    length: 6,
    image_url: directionLock
  },
  {
    value: 'direction_lock_8',
    length: 8,
    image_url: directionLock
  },

  {
    value: 'number_push_lock_3',
    length: 3,
    image_url: numberPushLock6
  },
  {
    value: 'number_push_lock_4',
    length: 4,
    image_url: numberPushLock8
  },
  {
    value: 'number_push_lock_5',
    length: 5,
    image_url: numberPushLock10
  }
]

export const RADIUS_CONSTRAINTS = {
  // In meters
  MIN: 10,
  MAX: 500
}

export const TIME_CONSTRAINT_OPTIONS = {
  INTERVAL: 15 * 60, // 15 minute intervals
}

export const ADVENTURE_DURATION_OPTIONS = {
  //In seconds because API...
  MIN: 30 * 60,
  MAX: 6 * 60 * 60,
  INTERVAL: 15 * 60
}

export const DIFFICULTY_LEVELS = [ 1, 2, 3 ]

/**
 * FOR ADMIN ADVENTURE LISTS
 */
export const ADVENTURES_PENDING = 'pending'
export const ADVENTURES_IN_REVIEW = 'in_review'
export const ADVENTURES_REJECTED = 'rejected'
export const ADVENTURES_UNPUBLISHED = 'unpublished'
export const ADVENTURES_PUBLISHED = 'published'
export const ADVENTURES_CANCELLED = 'cancelled'

export const ADVENTURE_SORTING_OPTIONS = [
  'newest',
  'oldest',
  'top_rated',
  'worst_rated'
]

/**
 * ADVENTURE PUBLISHMENT
 */
export const MESSAGE_CREATED = "created"

export const MESSAGE_COMMENT_CREATOR = "creator_message"
export const MESSAGE_COMMENT_QA = "administrator_message"

export const MESSAGE_PUBLISHMENT_REQUEST = "in_review"
export const MESSAGE_REJECTED = "rejected"
export const MESSAGE_PUBLISHED = "published"
export const MESSAGE_ACCEPTED = "unpublished"
export const MESSAGE_CANCELLED = "cancelled"
export const MESSAGE_BACK_TO_EDIT = "pending"

/**
 * COLORS
 */
export const AREA_BORDER_COLOR = '#ff2b848f'
export const AREA_BACKGROUND_COLOR = '#ff2b845f'
export const AREA_POINT_BACKGROUND_COLOR = '#ffffff'
export const AREA_POINT_BORDER_COLOR = '#ff65a5'

export const COMPLETED_COLOR = '#7bc043'
export const COMPLETED_WITH_TIP_COLOR = '#ffdc00'
export const IN_PROGRESS_COLOR = '#ff851b'
export const ABANDONED_COLOR = '#ff4136'

export const BAR_BACKGROUND_COLOR = '#ff88ba'

export const START_POINT_RADIUS_CIRCLE_COLOR = '#ff94bb'
export const NORMAL_POINT_RADIUS_CIRCLE_COLOR = '#5e81ff'
