function aa() {
  var aa = M.async();

  class A {
    method() {
      var ctx = M.async();
      return M.scope(method_1, _method_2);
    }

    static smethod() {
      var ctx = M.async();
      return M.scope(smethod_1, _smethod_2);
    }

  }

  class B extends aa._A {
    method() {
      var ctx = M.async();
      ctx.__this = this;
      return M.scope(_method_1, method_3);
    }

    static smethod() {
      var ctx = M.async();
      ctx.__this = this;
      return M.scope(_smethod_1, smethod_3);
    }

  }

  return M.scope(aa_1, aa_2);
}

function method_1(ctx) {
  return M.pure('from A');
}

function _method_2(ctx, e) {
  return M.raise(e);
}

function smethod_1(ctx) {
  return M.pure('static from A');
}

function _smethod_2(ctx, e) {
  return M.raise(e);
}

function _method_1(ctx) {
  var a;
  a = Object.getPrototypeOf(Object.getPrototypeOf(ctx.__this)).method.call(ctx.__this);
  return M.chain(M.chain(a), method_2, method_3);
}

function method_2(ctx, a) {
  return M.pure('from B ' + a);
}

function method_3(ctx, e) {
  return M.raise(e);
}

function _smethod_1(ctx) {
  var a;
  a = Object.getPrototypeOf(ctx.__this).method.call(ctx.__this);
  return M.chain(M.chain(a), smethod_2, smethod_3);
}

function smethod_2(ctx, a) {
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