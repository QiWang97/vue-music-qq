/* jshint esversion:9  */
const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
const _utf8_encode = function (r) {
  r = r.replace(/\r\n/g, "\n");
  for (var e = "", o = 0; o < r.length; o++) {
    var t = r.charCodeAt(o);
    128 > t ? e += String.fromCharCode(t) : t > 127 && 2048 > t ? (e += String.fromCharCode(t >> 6 | 192), e += String.fromCharCode(63 & t | 128)) : (e += String.fromCharCode(t >> 12 | 224), e += String.fromCharCode(t >> 6 & 63 | 128), e += String.fromCharCode(63 & t | 128))
  }
  return e
}
const encode = function (e) {
  var o, t, n, c, d, a, h, C = ""
  var f = 0
  for (e = _utf8_encode(e); f < e.length;) {
    o = e.charCodeAt(f++)
    t = e.charCodeAt(f++)
    n = e.charCodeAt(f++)
    c = o >> 2
    d = (3 & o) << 4 | t >> 4
    a = (15 & t) << 2 | n >> 6
    h = 63 & n
    isNaN(t) ? a = h = 64 : isNaN(n) && (h = 64)
    C = C + r._keyStr.charAt(c) + r._keyStr.charAt(d) + r._keyStr.charAt(a) + r._keyStr.charAt(h)
  }
  return C
}
const _utf8_decode = function (r) {
  for (var e = "", o = 0,c2=0, t =0, c1 =0; o < r.length;) {
    t = r.charCodeAt(o)
    var c3 =''
    128 > t ? (e += String.fromCharCode(t), o++) : t > 191 && 224 > t ? (c2 = r.charCodeAt(o + 1), e += String.fromCharCode((31 & t) << 6 | 63 & c2), o += 2) : (c2 = r.charCodeAt(o + 1),c3 = r.charCodeAt(o + 2), e += String.fromCharCode((15 & t) << 12 | (63 & c2) << 6 | 63 & c3), o += 3);
  }
  return e
}

const decode = function (e) {
  var o, t, n, c, d, a, h, C = ""
  var f = 0
  for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); f < e.length;) {
    c = _keyStr.indexOf(e.charAt(f++))
    d = _keyStr.indexOf(e.charAt(f++))
    a = _keyStr.indexOf(e.charAt(f++))
    h = _keyStr.indexOf(e.charAt(f++))
    o = c << 2 | d >> 4
    t = (15 & d) << 4 | a >> 2
    n = (3 & a) << 6 | h
    C += String.fromCharCode(o),
      64 != a && (C += String.fromCharCode(t))
    64 != h && (C += String.fromCharCode(n))
  }
  return C = _utf8_decode(C)
}
export default {
  decode,
  encode
};