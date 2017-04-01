var M = require('@effectfuljs/generators');

function a() {
  return M.generator((ret, yld, yldS) => yld(1).mbind(() => yld(2)));
}
