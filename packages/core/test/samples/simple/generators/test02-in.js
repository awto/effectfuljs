var a1;
var a2;
var a4;

function b3(a3) {
  var f1 = function* f1() {
    a3 = yield a1;
  };
  var f2 = function* f2() {
    a3 = yield a1;
    a3 = yield a1;
  };
  return f1;
}

function top(a1, a6) {
  var a2 = 10,
    a7 = 11,
    a3 = 12;
  function* a(a8) {
    a1 += 2;
    var a3 = yield (yield a1) + (yield a2);
    var a5 = yield (yield a3) + (yield a4);
    var f1 = function* f1() {
      a7 += 2;
      a8 += 3;
      return (a3 = yield (yield a1) + (yield a2));
    };
    function* f2() {
      a3 = yield (yield a5) + (yield a4);
    }
    function f3() {
      a3 = 11;
      a6 += 4;
    }
    return [f1, f2, f3];
  }
  function b(a1) {
    a1 += a2;
    a6 += a3;
  }
  return [a, b];
}

function* b1() {
  var a3 = yield a1;
  var f1 = function* f1() {
    return (a3 = yield a1);
  };
  return f1;
}

function* b2() {
  var a3 = yield a1;
  var f1 = function f1() {
    a3 = a1;
  };
  return f1;
}

function* b() {
  var f = yield* top()();
  yield* f[0];
  yield* f[1];
  yield* f[2];
}
