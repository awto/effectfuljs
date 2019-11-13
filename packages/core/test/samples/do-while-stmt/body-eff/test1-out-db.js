var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $c.f($);
        return $M.ret();

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(2);
        continue;

      case 1:
        if ($p) {
          $.goto = 3;
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(3);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(1);
        continue;

      case 4:
        if ($p) {
          $.goto = 0;
          continue;
        } else {
          return $M.ret();
        }

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:8-3:14", "e", null], [], ["4:4-4:10", "e", null], ["5:11-5:17", "e", null], [], [], []]);
module.exports = $M.exports();