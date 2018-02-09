// *- DEFAULT
import * as G from '@effectful/es';

function c() {
  var c = G.generator();
  return G.scopeH(c_1, c_3);
}

function c_1(c) {
  return G.yldStarBH(z, c_2, c_3);
}

function c_2(c) {
  return G.pure();
}

function c_3(c, e) {
  return G.raise(e);
}