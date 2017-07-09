function _1(j, len, ref) {
  var i;

  if (j < len) {
    i = ref[j];
    return M.jMB3(eff(i), _2, j, len, ref);
  } else return M.pure();
}

function _2(a, j, len, ref) {
  if (a) return _3(j, len, ref);else return _3(j, len, ref);
}

function _3(j, len, ref) {
  j++;
  return M.jR3(_1, j, len, ref);
}

function a_1() {
  var i;
  i = 0;
  return a_2(i);
}

function a_2(i) {
  if (i < 3) return a_3(i);else {
    return eff('a');
  }
}

function a_3(i) {
  if (i === 2) {
    console.log(i);
  }

  return M.jM1(eff(i), a_4, i);
}

function a_4(i) {
  i++;
  return M.jR1(a_2, i);
}

function a1_1() {
  var i, j;
  i = 0;
  j = 10;
  return a1_2(i, j);
}

function a1_2(i, j) {
  if (i < 3) return a1_3(i, j);else {
    return effRes(i, j);
  }
}

function a1_3(i, j) {
  if (i === 2) {
    console.log(i, j);
  }

  return M.jM2(eff(i, j), a1_4, i, j);
}

function a1_4(i, j) {
  i++, j += 2;
  return M.jR2(a1_2, i, j);
}

function b_1() {
  if (i === 2) {
    console.log(i);
  }

  return M.jRM(eff(i), b_1);
}

function b_2() {
  return eff('a');
}

function c_1() {
  if (i === 2) {
    console.log(i);
  }

  if (i === 3) return c_2();else {
    return M.jRM(eff(i), c_1);
  }
}

function c_2() {
  return M.pure(10);
}

function c_3() {
  return eff('a');
}

function d_1(result, i) {
  if (i < 10) return d_2(result, i);else {
    return eff(result);
  }
}

function d_2(result, i) {
  return M.jMB1(eff(result, i), d_3, i);
}

function d_3(result, i) {
  i++;
  return M.jR2(d_1, result, i);
}

function e_1(i) {
  if (i < 10) return e_2(i);else {
    return eff();
  }
}

function e_2(i) {
  return M.jMB1(eff(i), e_3, i);
}

function e_3(result, i) {
  i++;
  return M.jR1(e_1, i);
}

function f_1(result, i) {
  if (i < 10) return f_2(i);else {
    return eff(result);
  }
}

function f_2(i) {
  return M.jMB1(eff(i), f_3, i);
}

function f_3(result, i) {
  i++;
  return M.jR2(f_1, result, i);
}

(function () {
  var j, len, ref;
  ref = [1, 2, 3];
  j = 0, len = ref.length;
  return _1(j, len, ref);
});

(function () {
  console.log('bi');

  for (var i = 0; i < 3; i++) {
    console.log('bi:', i);
  }

  console.log('ai');
});

(function () {
  console.log('bi');

  lab: for (var i = 0; i < 3; i++) {
    console.log('bj:' + i);

    for (var j = 0; j < 40; j += 10) {
      if (j === 10) continue lab;
      if (j === 30) break lab;
      console.log(i + j);
    }

    console.log('aj:' + i);
  }

  console.log('ai');
});

function a() {
  return M.jM(eff('b'), a_1);
}

;

function a1() {
  return M.jM(eff('b'), a1_1);
}

function b() {
  return M.jM(eff('b'), b_1);
}

function c() {
  return M.jM(eff('b'), c_1);
}

function d() {
  var result, i;
  result = 0;
  i = 0;
  return d_1(result, i);
}

function e() {
  var result, i;
  result = 0;
  i = 0;
  return e_1(i);
}

function f() {
  var result, i;
  result = 0;
  i = 0;
  return f_1(result, i);
}