import Z from '@effectful/generators';

function a_1() {
  return Z.yldM(1, a_2);
}

function a_2() {
  return Z.yldM(2, Z.pure);
}

function a() {
  return Z.scope(a_1);
}