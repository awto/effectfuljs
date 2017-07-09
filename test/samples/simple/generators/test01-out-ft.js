function a_1(a) {
  return M.jM(M.yld(a), a_2);
}

function a_2() {
  var a;
  a = some();
  return M.jMB(M.yldStar(a), a_3);
}

function a_3(a) {
  return M.jMB(M.yld(a), a_4);
}

function a_4(a) {
  if (a) return a_5();else return M.pure();
}

function a_5() {
  return M.yldStar(some);
}

function a_6() {
  return M.yld(2);
}

function b_1(a) {
  return M.yldM(a, b_2);
}

function b_2() {
  var a;
  a = some();
  return M.yldStarMB(a, b_3);
}

function b_3(a) {
  return M.yldMB(a, b_4);
}

function b_4(a) {
  if (a) return b_5();else return M.pure();
}

function b_5() {
  return M.yldStarMB(some, M.pure);
}

function b_6() {
  return M.yldM(2, M.pure);
}

function c_1(ctx) {
  return M.yldMB(ctx, 1, c_2);
}

function c_2(ctx, a) {
  return M.yldM(ctx, a, c_3);
}

function c_3(ctx) {
  var a;
  a = some();
  return M.yldStarMB(ctx, a, c_4);
}

function c_4(ctx, a) {
  return M.yldMB(ctx, a, c_5);
}

function c_5(ctx, a) {
  if (a) return c_6(ctx);else return M.pure(ctx);
}

function c_6(ctx) {
  return M.yldStarMB(ctx, some, M.pure);
}

function c_7(ctx) {
  return M.yldM(ctx, 2, M.pure);
}

function d_1(ctx) {
  return M.yldMB(ctx, 1, d_2);
}

function d_2(ctx, a) {
  return M.yldM(ctx, a, d_3);
}

function d_3(ctx) {
  var a;
  a = some();
  return M.yldStarMB(ctx, a, d_4);
}

function d_4(ctx, a) {
  return M.yldMB(ctx, a, d_5);
}

function d_5(ctx, a) {
  if (a) return d_6(ctx);else return M.pure(ctx);
}

function d_6(ctx) {
  return M.yldStarMB(ctx, some, M.pure);
}

function d_7(ctx) {
  return M.yldM(ctx, 2, M.pure);
}

function _d_1(ctx) {
  return ctx.yldMB(1, _d_2);
}

function _d_2(ctx, a) {
  return ctx.yldM(a, _d_3);
}

function _d_3(ctx) {
  var a;
  a = some();
  return ctx.yldStarMB(a, _d_4);
}

function _d_4(ctx, a) {
  return ctx.yldMB(a, _d_5);
}

function _d_5(ctx, a) {
  if (a) return _d_6(ctx);else return ctx.pure();
}

function _d_6(ctx) {
  return ctx.yldStarMB(some, ctx.pure);
}

function _d_7(ctx) {
  return ctx.yldM(2, ctx.pure);
}

function a() {
  return M.jMB(M.yld(1), a_1);
}

function b() {
  return M.yldMB(1, b_1);
}

function c() {
  return M.scope(c_1);
}

function d() {
  return M.scope(d_1);
}

function _d() {
  return M.scope(_d_1);
}