// *- DEFAULT
import * as G from '@effectful/es';

function c() {
  var c = G.generator();
  return G.scope(c_1, c_3);
}

function c_1(c) {
  return G.yldStar(z, c_2, c_3);
}

function c_2(c) {
  return G.pure();
}

function c_3(c, e) {
  return G.raise(e);
}