// *- DEFAULT
import * as G from '@effectful/es';

function c() {
  var c = G.generator();
  return G.scope(c_1);
}

function c_1(c) {
  return G.yldStar(z, c_2);
}

function c_2(c) {
  return G.pure();
}