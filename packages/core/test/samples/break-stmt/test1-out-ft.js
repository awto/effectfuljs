import * as M from "@effectful/core";
(function () {
  var ctx = M.context();
  return M.scope(f_1);
});
(function () {
  var ctx = M.context();
  return M.scope(_f_1);
});
(function () {
  var ctx = M.context();
  return M.scope(f_11);
});
function a() {
  var a = M.context();
  return M.scope(a_1);
}
function f_1(ctx) {
  return M.chain(eff(1), f_2);
}
function f_2(ctx) {
  return M.chain(eff(2), f_3);
}
function f_3(ctx, a) {
  if (a) {
    return M.jump(void 0, f_4);
  } else {
    return M.chain(eff(3), f_4);
  }
}
function f_4(ctx) {
  return M.chain(eff(4), f_5);
}
function f_5(ctx) {
  return M.chain(eff(5), f_6);
}
function f_6(ctx) {}
function _f_1(ctx) {
  return M.chain(eff(1), _f_2);
}
function _f_2(ctx) {
  return M.chain(eff(2), _f_3);
}
function _f_3(ctx, a) {
  if (a) {
    return M.chain(eff("a"), _f_4);
  } else {
    return M.chain(eff(3), _f_4);
  }
}
function _f_4(ctx) {
  return M.chain(eff(4), _f_5);
}
function _f_5(ctx) {
  return M.chain(eff(5), _f_6);
}
function _f_6(ctx) {}
function f_11(ctx) {
  return M.chain(eff(1), f_21);
}
function f_21(ctx) {
  return M.chain(eff(2), f_31);
}
function f_31(ctx, a) {
  if (a) {
    return M.chain(eff("a"), f_41);
  } else {
    return M.chain(eff(4), f_61);
  }
}
function f_41(ctx) {
  return M.chain(eff("b"), f_51);
}
function f_51(ctx, a) {
  return a;
}
function f_61(ctx) {
  return M.chain(eff(5), f_7);
}
function f_7(ctx) {
  return ctx._r;
}
function a_1(a) {
  if (e) {
    return M.chain(eff("b"), a_2);
  } else {
    return a._r;
  }
}
function a_2(a, b) {
  return b;
}