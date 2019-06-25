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

export const objectToQuery = (obj, prefix) => {
  var str = [], p;

  for(p in obj) {
    if(obj.hasOwnProperty(p)) {
      var k = prefix ? `${prefix}[${p}]` : p,
        v = obj[p];

      if(v === null || v === "") {
        continue;
      }

      str.push((v !== null && typeof v === "object") ?
        objectToQuery(v, k) :
        k + "=" + encodeURIComponent(v)
      );
    }
  }

  return str.filter((el) => el).join("&");
}
