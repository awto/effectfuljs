import * as M from "@effectful/core";
function main(arg1) {
  var items, abandoned, r;
  return M.scope(_1);
  function _1() {
    items = [];
    abandoned = false;
    return M.jump(void 0, _2);
  }
  function _2() {
    var a;
    a = (() => {
      var item, existingItem, r;
      return M.scope(_1);
      function _1() {
        item = items[0];
        switch (signal.type) {
          case "timeout":
            existingItem = items.find(({
              productId
            }) => productId === item.productId);
            if (abandoned) {
              return M.pure(0);
            } else {
              return M.jump(void 0, _2);
            }
          case "checkout":
            return M.pure(0);
          default:
            return M.jump(void 0, _2);
        }
      }
      function _2() {
        return M.pure();
      }
      function _3(r) {
        return M.pure(r);
      }
    })();
    return M.yldStar(a, _3);
  }
  function _3(a) {
    switch (a) {
      case 0:
        return M.pure(r);
      default:
        return M.jump(void 0, _2);
    }
  }
  function _4(r) {
    return M.pure(r);
  }
}