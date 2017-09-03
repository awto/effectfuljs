var a1;
var a2;
var a4;

function b3(a3) {
  var f1,
      f2,
      b3_v = {
    a3
  },
      _f1 = function* f1() {
    var _b3_v = b3_v;
    _b3_v.a3 = yield a1;
  },
      _f2 = function* f2() {
    var _b3_v = b3_v;
    _b3_v.a3 = yield a1;
    _b3_v.a3 = yield a1;
  };

  f1 = _f1;
  f2 = _f2;
  return f1;
}

function top(a1, a6) {
  var a = function* a(a8) {
    var a5,
        f1,
        f2 = function* f2() {
      var _a_v = a_v;
      _a_v.a3 = yield (yield a5) + (yield a4);
    },
        f3 = function f3() {
      var _a_v = a_v,
          _top_v = top_v;
      _a_v.a3 = 11;
      _top_v.a6 += 4;
      return;
    },
        a_v = {
      a3: undefined
    },
        _f1 = function* f1() {
      var _top_v = top_v,
          _a_v = a_v;
      _top_v.a7 += 2;
      a8 += 3;
      return _a_v.a3 = yield (yield _top_v.a1) + (yield _top_v.a2);
    },
        _top_v = top_v;

    _top_v.a1 += 2;
    a_v.a3 = yield (yield _top_v.a1) + (yield _top_v.a2);
    a5 = yield (yield a_v.a3) + (yield a4);
    f1 = _f1;
    return [f1, f2, f3];
  },
      b = function b(a1) {
    var _top_v = top_v;
    a1 += _top_v.a2;
    _top_v.a6 += _top_v.a3;
    return;
  },
      top_v = {
    a1,
    a6,
    a2: undefined,
    a7: undefined,
    a3: undefined
  };

  top_v.a2 = 10;
  top_v.a7 = 11;
  top_v.a3 = 12;
  return [a, b];
}

function* b1() {
  var a3,
      f1,
      _f1 = function* f1() {
    return a3 = yield a1;
  };

  a3 = yield a1;
  f1 = _f1;
  return f1;
}

function* b2() {
  var f1,
      b2_v = {
    a3: undefined
  },
      _f1 = function f1() {
    var _b2_v = b2_v;
    _b2_v.a3 = a1;
    return;
  };

  b2_v.a3 = yield a1;
  f1 = _f1;
  return f1;
}

function* b() {
  var f;
  f = yield* top()();
  yield* f[0];
  yield* f[1];
  yield* f[2];
}