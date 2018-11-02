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
    label: 'Text'
  },
  {
    value: 'numberLock',
    label: 'Number Lock'
  },
  {
    value: 'cryptex',
    label: 'Cryptex'
  },
  {
    value: 'directionLock',
    label: 'Direction Lock'
  },
  {
    value: 'numberPushLock',
    label: 'Number Push Lock'
  }
]
