import * as M from '@effectful/core';

function aa() {
  var aa = M.async();
  aa._A = class A {
    method() {
      var ctx = M.async();
      return M.scope(method_1, method_2);
    }

    static smethod() {
      var ctx = M.async();
      return M.scope(smethod_1, smethod_2);
    }

  };
  aa._B = class B extends aa._A {
    method() {
      var ctx = M.async();
      ctx._aa = aa;
      ctx.__this = this;
      return M.scope(_method_1, method_3);
    }

    static smethod() {
      var ctx = M.async();
      ctx._aa = aa;
      ctx.__this = this;
      return M.scope(_smethod_1, smethod_3);
    }

  };
  return M.scope(aa_1, aa_2);
}

function method_1(ctx) {
  return M.pure('from A');
}

function method_2(ctx, e) {
  return M.raise(e);
}

function smethod_1(ctx) {
  return M.pure('static from A');
}

function smethod_2(ctx, e) {
  return M.raise(e);
}

function _method_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx._aa._B.prototype).method.call(ctx.__this);
  return M.chain(M.chain(a), _method_2, method_3);
}

function _method_2(ctx, a) {
  return M.pure('from B ' + a);
}

function method_3(ctx, e) {
  return M.raise(e);
}

function _smethod_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx._aa._B.prototype).method.call(ctx.__this);
  return M.chain(M.chain(a), _smethod_2, smethod_3);
}

function _smethod_2(ctx, a) {
  return M.pure('static from B ' + a);
}

function smethod_3(ctx, e) {
  return M.raise(e);
}

function aa_1(aa) {
  return M.pure();
}

function aa_2(aa, e) {
  return M.raise(e);
}