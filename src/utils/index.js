export function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return user.token;
  } else {
    return '';
  }
}

export function pad(num, length) {
  let str = num.toString();

  while( str.length < length) {
    str = '0' + str;
  }

  return str;
}

export const arrowUnicodeToChar = {
  '←': 'l',
  '↑': 'u',
  '→': 'r',
  '↓': 'd'
}

export const charToArrowUnicode = {
  'l': '←',
  'u': '↑',
  'r': '→',
  'd': '↓'
}
