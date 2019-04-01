import * as M from "@effectful/core";

function aa() {
  var aa = M.context();
  return M.scope(aa_1);
}

function method_1(ctx) {
  return M.pure("from A");
}

function method_2(ctx, r) {
  return M.pure(r);
}

function smethod_1(ctx) {
  return M.pure("static from A");
}

function smethod_2(ctx, r) {
  return M.pure(r);
}

function _method_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx._aa._B.prototype).method.call(ctx.__this);
  ctx.__this = null;
  return M.chain(a, _method_2);
}

function _method_2(ctx, a) {
  return M.pure("from B " + a);
}

function method_3(ctx, r) {
  return M.pure(r);
}

function _smethod_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx._aa._B.prototype).method.call(ctx.__this);
  ctx.__this = null;
  return M.chain(a, _smethod_2);
}

function _smethod_2(ctx, a) {
  return M.pure("static from B " + a);
}

function smethod_3(ctx, r) {
  return M.pure(r);
}

function aa_1(aa) {
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
  return M.pure();
}

function aa_2(aa, r) {
  return M.pure(r);
}