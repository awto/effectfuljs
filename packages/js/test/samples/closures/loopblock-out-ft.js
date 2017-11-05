function a(p) {
  var a = M.context();
  a._p = p;
  return M.chain(eff(1), a_1, a_7);
}

function a_1(a) {
  var b;
  a._a = 0;
  b = a._a;
  return M.chain(eff(2, b), a_2, a_7);
}

function a_2(a, c) {
  var b;
  b = M.iterator(c);
  a._loop = b;
  return M.jump(a_3, a_7);
}

function a_3(a) {
  var b, c;

  if (!(a._loop = a._loop.step()).done) {
    a._i = a._loop.value;
    return M.jump(a_4, a_8);
  } else {
    b = a._a;
    c = a._p;
    return M.chain(eff(8, b, c), a_6, a_7);
  }
}

function b_1(b1) {
  var a, b, c;
  b1._k1 = 10;
  b1._j++;
  b1._a++;
  b1._i++;
  b1._k1++, b1._p++;
  a = b1._a;
  b = b1._i;
  c = b1._p;
  return M.chain(eff(5, a, b, b1._k1, c), b_2, b_4);
}

function b_2(b1) {
  var a, b, c;
  a = b1._a;
  b = b1._i;
  c = b1._p;
  return M.chain(eff(6, a, b, b1._k, c), b_3, b_4);
}

function b_3(b1) {
  return M.pure();
}

function b_4(b1, e) {
  return M.raise(e);
}

function f_1(ctx) {
  ctx._j = ctx._i + 1;
  ctx._k = ctx._i + 1;
  ctx._i++;
  return M.chain(eff(function _b(k) {
    var b1 = M.context(),
        a,
        b,
        c,
        d;
    b1._k = k;
    a = b1._a;
    b = b1._j;
    c = b1._k++;
    d = b1._p;
    return M.chain(eff(4, a, b, c, d), b_1, b_4);
  }), f_2, f_4);
}

function f_2(ctx) {
  var a, b, c;
  a = ctx._a;
  b = ctx._i;
  c = ctx._j;
  return M.chain(eff(7, a, b, c), f_3, f_4);
}

function f_3(ctx) {
  return M.pure();
}

function f_4(ctx, e) {
  return M.raise(e);
}

function a_4(a) {
  return M.repeat((i => {
    var ctx = M.context(),
        a,
        b;
    ctx._i = i;
    a = ctx._a;
    b = ctx._a;
    return M.chain(eff(3, a, b), f_1, f_4);
  })(a._i), a_3, a_7);
}

function a_5(a) {
  a._e = a._ex;

  if (a._loop.exit) {
    a._loop.exit();
  }

  throw a._e;
}

function a_6(a) {
  return M.pure();
}

function a_7(a, e) {
  return M.raise(e);
}

function a_8(a, b) {
  a._ex = b;
  return M.jump(a_5, a_7);
}