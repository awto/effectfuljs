import Z from '@effectful/generators';

function a() {
  return Z.scope(_1);

  function _1() {
    return Z.yld(1, _2);
  }

  function _2() {
    return Z.yld(2, _3);
  }

  function _3() {
    return Z.pure();
  }
}