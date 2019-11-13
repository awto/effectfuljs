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
}, null, null, [["2:0-7:3", "s", null], [], [], []]);
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
          $.goto = 5;
          $M.brk(3);
          continue;
        } else {
          $.goto = 4;
          $M.brk(4);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(3);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-6:3", "s", null], ["4:4-5:16", "s", null], ["4:8-4:14", "e", null], ["4:16-4:26", "s", null], ["5:9-5:15", "e", null], [], [], []]);
module.exports = $M.exports();