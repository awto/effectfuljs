function a() {
  var a = function () {
    return M.j(eff(1), _1);
  };

  return M.j(eff('a'), a_1, a);
}

function b() {
  var addLater = function addLater(a, b) {
    var addLater_v = {
      a,
      b,
      deferred: undefined
    },
        c = function () {
      var _addLater_v = addLater_v;

      _addLater_v.deferred.resolve(_addLater_v.a + _addLater_v.b);

      return;
    };

    addLater_v.deferred = Q.defer();
    process.nextTick(c);
    return addLater_v.deferred.promise;
  },
      b_v = {
    addLater: addLater
  },
      a = function () {
    var _v = {
      result: undefined,
      err: undefined
    },
        _b_v = b_v;
    return M.jB(_b_v.addLater(1, 2), _3, _v);
  };

  M.reify(a).done();
  return;
}

function _1() {
  return M.j(eff(2), _2);
}

function _2() {
  return M.pure();
}

function a_1(a) {
  return M.j(M.reflect(monadish), a_2, a);
}

function a_2(a) {
  return M.j(eff(1), a_3, a);
}

function a_3(a) {
  return M.j(M.reflect(monadish + 2), a_4, a);
}

function a_4(a) {
  return M.jB(M.reify(a), a_5);
}

function a_5(a) {
  console.log(a);
  return M.pure();
}

function _3(a, _v) {
  _v.result = a;

  try {
    expect(_v.result).to.equal(3);
    done();
  } catch (err) {
    done(_v.err);
  }

  return M.pure();
}