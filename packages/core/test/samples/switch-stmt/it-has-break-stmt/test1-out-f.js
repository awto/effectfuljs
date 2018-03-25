import * as M from "@effectful/core";

function a(z) {
  switch (z) {
    case 1:
      return M.chain(eff(1), _1);

    default:
      return M.chain(eff(2), _1);
  }

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {}
}

function a(z) {
  switch (z) {
    case 1:
      return M.chain(eff(1), _1);

    case 2:
      console.log("1");
      return M.jump(void 0, _1);

    default:
      console.log("2");
      return M.jump(void 0, _1);
  }

  function _1() {
    return M.chain(eff(3), _2);
  }

  function _2() {}
}

function c(z) {
  switch (z) {
    case 1:
      return M.chain(eff(1), _1);

    case 2:
      return M.chain(eff(2), _2);

    case 3:
      {
        console.log("z");
      }

    default:
      return M.chain(eff(3), _1);
  }

  function _1() {
    return M.chain(eff(4), _2);
  }

  function _2() {
    return M.chain(eff(5), _3);
  }

  function _3() {}
}

function d(z) {
  switch (z) {
    case 1:
      return M.chain(eff(1), _1);

    case 2:
      return M.chain(eff(2), _2);

    case 3:
      console.log("z");
      return M.chain(eff(5), _2);

    default:
      return M.chain(eff(3), _1);
  }

  function _1() {
    return M.chain(eff(4), _2);
  }

  function _2() {
    return M.chain(eff(6), _3);
  }

  function _3() {}
}