import * as M from '@effectful/core';

function aa() {
  var aa = M.context();
  aa._A = class A {
    method() {
      var ctx = M.context();
      return M.scope(method_1);
    }

    static smethod() {
      var ctx = M.context();
      return M.scope(smethod_1);
    }

  };
  aa._B = class B extends aa._A {
    method() {
      var ctx = M.context();
      ctx._aa = aa;
      ctx.__this = this;
      return M.scope(_method_1);
    }

    static smethod() {
      var ctx = M.context();
      ctx._aa = aa;
      ctx.__this = this;
      return M.scope(_smethod_1);
    }

  };
  return M.scope(aa_1);
}

function method_1(ctx) {
  return M.pure('from A');
}

function smethod_1(ctx) {
  return M.pure('static from A');
}

function _method_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx._aa._B.prototype).method.call(ctx.__this);
  return M.chain(a, method_2);
}

function method_2(ctx, a) {
  return M.pure('from B ' + a);
}

function _smethod_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx._aa._B.prototype).method.call(ctx.__this);
  return M.chain(a, smethod_2);
}

function smethod_2(ctx, a) {
  return M.pure('static from B ' + a);
}

function aa_1(aa) {
  return M.pure();
}