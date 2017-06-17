function a() {}

function b() {
  return 1;
}

function c() {
  return M.throw(new Error('1'));
}

function d() {
  return [1];
}

function e() {
  return M.jM([1], _1);

  function _1() {
    return [2];
  }
}

function f() {
  return eff(1);
}

function g() {
  return M.jM(eff(1), _1);

  function _1() {
    return eff(2);
  }
}

(function () {}).some();