import * as M from "@effectful/core";

function main(arg1) {
  var main = M.context();
  main._arg1 = arg1;
  return M.scope(main_1);
}

function main_1(main) {
  main._items = [];
  main._abandoned = false;
  return M.jump(void 0, main_2);
}

function f_1(ctx) {
  var existingItem;
  ctx._item = ctx._main._items[0];

  switch (signal.type) {
    case "timeout":
      existingItem = ctx._main._items.find(({
        productId
      }) => {
        var f = ctx;
        return productId === f._item.productId;
      });

      if (ctx._main._abandoned) {
        return M.pure(0);
      } else {
        return M.jump(void 0, f_2);
      }

    case "checkout":
      return M.pure(0);

    default:
      return M.jump(void 0, f_2);
  }
}

function f_2(ctx) {
  return M.pure();
}

function f_3(ctx, r) {
  return M.pure(r);
}

function main_2(main) {
  var a;

  a = (() => {
    var ctx = M.context();
    ctx._main = main;
    return M.scope(f_1);
  })();

  return M.yldStar(a, main_3);
}

function main_3(main, a) {
  switch (a) {
    case 0:
      return M.pure(main._r);

    default:
      return M.jump(void 0, main_2);
  }
}

function main_4(main, r) {
  return M.pure(r);
}