import * as Z from '@effectfuljs/generators';

function a() {
  return Z.generator((ret, yld, yldS) => yld(1).mbind(() => yld(2)));
}
