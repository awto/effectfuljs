function a(p) {
  var a_v = {
    p,
    a: undefined,
    i: undefined
  },
      a = i => {
    var _v = {
      i,
      j: undefined,
      k: undefined
    },
        b = function b(k) {
      var b_v = {
        k,
        b: undefined,
        k1: undefined
      },
          _a_v = a_v,
          __v = _v,
          a;
      a = b_v.k++;
      return M.j(eff(4, _a_v.a, __v.j, a, _a_v.p), b_1, b_v, _a_v, __v);
    },
        _a_v = a_v;

    return M.j(eff(3, _a_v.a, _a_v.a), _1, _v, _a_v);
  };

  return M.j(eff(1), a_1, a_v, a);
}

function b_1(b_v, _a_v, __v) {
  b_v.k1 = 10;
  __v.j++;
  _a_v.a++;
  __v.i++;
  b_v.k1++, _a_v.p++;
  return M.j(eff(5, _a_v.a, __v.i, b_v.k1, _a_v.p), b_2, b_v, _a_v, __v);
}

function b_2(b_v, _a_v, __v) {
  return M.j(eff(6, _a_v.a, __v.i, b_v.k, _a_v.p), b_3);
}

function b_3() {
  return M.pure();
}

function _1(_v, _a_v) {
  _v.j = _v.i + 1;
  _v.k = _v.i + 1;
  _v.i++;
  return M.j(eff(b), _2, _v, _a_v);
}

function _2(_v, _a_v) {
  return M.j(eff(7, _a_v.a, _v.i, _v.j), _3);
}

function _3() {
  return M.pure();
}

function a_1(a_v, a) {
  a_v.a = 0;
  return M.jB(eff(2, a_v.a), a_2, a_v, a);
}

function a_2(c, a_v, a) {
  var loop, b;
  b = M.iterator(c);
  loop = b;
  return a_3(a_v, loop, a);
}

function a_3(a_v, loop, a) {
  var b, c;
  c = loop.incr();
  b = loop = c;
  if (!b.done) return a_4(a_v, loop, a);else {
    return M.j(eff(8, a_v.a, a_v.p), a_5);
  }
}

function a_4(a_v, loop, a) {
  a_v.i = loop.value;
  return M.jR(a(a_v.i), a_3, a_v, loop, a);
}

function a_5() {
  return M.pure();
}