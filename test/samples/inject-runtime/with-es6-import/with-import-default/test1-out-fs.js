import Z from '@effectful/generators';

function a() {
  return Z.scope(_1);

  function _1() {
    return Z.yldM(1, _2);
  }

  function _2() {
    return Z.yldM(2, Z.pure);
  }
}