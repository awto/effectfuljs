var Z;
Z = require('@effectfuljs/generators');

function a() {
  return Z.generator((ret, yld, yldS) => yld(1).mbind(() => yld(2)));
}
