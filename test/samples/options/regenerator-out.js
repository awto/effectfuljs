function a() {
  return M.pure();
}

function b() {
  return M.pure(1);
}

function c() {
  return M.raise(new Error('1'));
}

function d() {
  return [1];
}

function e() {
  return [1].mbind(() => [2]);
}

function f() {
  return eff(1);
}

function g() {
  return eff(1).mbind(() => eff(2));
}

(function () {
  return M.pure();
}).some();