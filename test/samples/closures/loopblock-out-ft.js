function a_1(a_v, _a_v) {
  a_v.a = 0;
  return M.jMB(eff(2, a_v.a), a_2, a_v, _a_v);
}

function a_2(b, a_v, _a_v) {
  var loop, a;
  a = M.iterator(b);
  loop = a;
  return a_3(a_v, _a_v, loop);
}

function a_3(a_v, _a_v, loop) {
  var _a_v = {
    i: undefined,
    j: undefined,
    k: undefined
  },
      a,
      b;
  b = loop.step();
  a = loop = b;
  if (!a.done) return a_4(a_v, _a_v, loop);else {
    return eff(8, a_v.a, a_v.p);
  }
}

function a_4(a_v, _a_v, loop) {
  _a_v.i = loop.value;
  return M.jM(eff(3, a_v.a, a_v.a), a_5, a_v, _a_v, loop);
}

function b_1(b_v, a_v, _a_v) {
  b_v.k1 = 10;
  _a_v.j++;
  a_v.a++;
  _a_v.i++;
  b_v.k1++, a_v.p++;
  return M.jM(eff(5, a_v.a, _a_v.i, b_v.k1, a_v.p), b_2, b_v, a_v, _a_v);
}

function b_2(b_v, a_v, _a_v) {
  return eff(6, a_v.a, _a_v.i, b_v.k, a_v.p);
}

function a_5(a_v, _a_v, loop) {
  var b_v;
  _a_v.j = _a_v.i + 1;
  _a_v.k = _a_v.i + 1;
  _a_v.i++;
  return M.jM(eff(function b(k) {
    var b_v = {
      k,
      b: undefined,
      k1: undefined
    },
        a_v,
        _a_v,
        a;

    a = b_v.k++;
    return M.jM(eff(4, a_v.a, _a_v.j, a, a_v.p), b_1, b_v, a_v, _a_v);
  }), a_6, a_v, _a_v, loop);
}

function a_6(a_v, _a_v, loop) {
  return M.jRM(eff(7, a_v.a, _a_v.i, _a_v.j), a_3, a_v, _a_v, loop);
}

function a(p) {
  var a_v = {
    p,
    a: undefined
  };
  return M.jM(eff(1), a_1, a_v, _a_v);
}