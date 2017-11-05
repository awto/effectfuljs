// *- with state
function a() {
  var i;
  i = 0;
  return M.chain(eff(), a_1, a_7, i);
}

function a_1(i) {
  var a;
  a = i += 1;
  return M.chain(eff(a), a_2, a_7, i);
}

function a_2(a, i) {
  var b;
  pat = a;
  b = i += 2;
  return M.chain(check(b), a_3, a_7, i);
}

function a_3(a, i) {
  var b, c;

  if (pat === a) {
    b = i += 3;
    return M.chain(effB(b), a_6, a_7);
  } else {
    c = i += 4;
    return M.chain(check(c), a_4, a_7, i);
  }
}

function a_4(a, i) {
  var b, c;

  if (pat === a) {
    b = i += 5;
    return M.chain(effB(b), a_6, a_7);
  } else {
    c = i += 6;
    return M.chain(check(c), a_5, a_7, i);
  }
}

function a_5(a, i) {
  if (pat === a) {
    console.log('hi', i);
  }

  return M.chain(eff(i), a_6, a_7);
}

function a_6() {
  return M.pure();
}

function a_7(e) {
  return M.raise(e);
}