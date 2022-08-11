Number.prototype.toRoman = function () {
  var num = Math.floor(this),
    val, s = '', i = 0,
    v = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    r = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  function toBigRoman(n) {
    var ret = '', n1 = '', rem = n;
    while (rem > 1000) {
      var prefix = '', suffix = '', n = rem, s = '' + rem, magnitude = 1;
      while (n > 1000) {
        n /= 1000;
        magnitude *= 1000;
        prefix += '(';
        suffix += ')';
      }
      n1 = Math.floor(n);
      rem = s - (n1 * magnitude);
      ret += prefix + n1.toRoman() + suffix;
    }
    return ret + rem.toRoman();
  }

  if (this - num || num < 1) num = 0;
  if (num > 3999) return toBigRoman(num);

  while (num) {
    val = v[i];
    while (num >= val) {
      num -= val;
      s += r[i];
    }
    ++i;
  }
  return s;
};

function fromRoman(roman) {
  var s = roman.toUpperCase().replace(/ +/g, ''),
    L = s.length, sum = 0, i = 0, next, val,
    R = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };

  function fromBigRoman(rn) {
    var n = 0, x, n1, S, rx = /(\(*)([MDCLXVI]+)/g;

    while ((S = rx.exec(rn)) != null) {
      x = S[1].length;
      n1 = fromRoman(S[2])
      if (isNaN(n1)) return NaN;
      if (x) n1 *= Math.pow(1000, x);
      n += n1;
    }
    return n;
  }

  if (/^[MDCLXVI)(]+$/.test(s)) {
    if (s.indexOf('(') == 0) return fromBigRoman(s);

    while (i < L) {
      val = R[s.charAt(i++)];
      next = R[s.charAt(i)] || 0;
      if (next - val > 0) val *= -1;
      sum += val;
    }
    if (sum.toRoman() === s) return sum;
  }
  return NaN;
};

function validateInput(value) {
  return value.match(/^[0-9]+$/) || value.match(/^[MDCLXVImdclxvi)(]+$/);
}

function convert() {
  try {
    var $value = $('input').val();
    if (!validateInput($value)) {
      throw "Your input is invalid";
    }
    var intVal = parseInt($value);
    if (!isNaN(intVal)) {
      var result = intVal.toRoman();
    } else {
      var result = fromRoman($value);
      if (isNaN(result)) {
        throw "Your input is invalid";
      }
    }
    $('.result').text(result);
  } catch (error) {
    $('.result').text(error);
  }
}
