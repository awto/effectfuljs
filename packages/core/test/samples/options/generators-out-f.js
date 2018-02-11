// *- DEFAULT
import * as G from '@effectful/es';

var _c = G.generatorFunction(c);

function c() {
  return G.scope(_1, _3);

  function _1() {
    return G.yldStar(z, _2, _3);
  }

  function _2() {
    return G.pure();
  }

  function _3(e) {
    return G.raise(e);
  }
}