// *- DEFAULT
import * as G from '@effectful/es';

function c() {
  var c = M.generator();
  return M.scope(c_1, c_3);
}

function c_1(c) {
  return M.yldStar(z, c_2, c_3);
}

function c_2(c) {
  return M.pure();
}

function c_3(c, e) {
  return M.raise(e);
}