var M = require('@effectful/generators');

function a() {
  return M.pure(1);

  function _1() {
    return M.pure(2);
  }
}