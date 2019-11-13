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
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        if ($p) {
          $.goto = 5;
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        if ($p) {
          $.goto = 7;
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(3);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff)(4);
        continue;

      case 6:
        if ($p) {
          $.goto = 0;
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(5);
        continue;

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:8-3:14", "e", null], [], ["4:8-4:14", "e", null], [], ["5:4-5:10", "e", null], ["6:11-6:17", "e", null], [], ["7:2-7:8", "e", null], [], [], []]);
module.exports = $M.exports();