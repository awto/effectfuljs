var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $c.f($);
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-6:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(2);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        if ($p) {
          $.goto = 6;
          $M.brk(3);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        $M.brk(4);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(3);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)(1);
        continue;

      case 7:
        if ($p) {
          $.goto = 1;
          continue;
        } else {
          return $M.ret();
        }

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-5:19", "s", null], ["3:4-3:25", "s", null], ["3:8-3:14", "e", null], ["3:16-3:25", "s", null], ["4:4-4:11", "s", null], ["4:4-4:10", "e", null], ["5:11-5:17", "e", null], [], [], []]);
module.exports = $M.exports();