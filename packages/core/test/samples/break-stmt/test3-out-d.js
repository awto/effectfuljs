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
}, null, null, [["1:0-7:3", "s", null], [], [], []]);
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
        ($M.context.call = eff)(2);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(3);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(4);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(4);
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-5:3", "s", null], ["3:4-3:11", "s", null], ["3:4-3:10", "e", null], ["4:4-4:14", "s", null], ["6:2-6:9", "s", null], ["6:2-6:8", "e", null], [], [], []]);
module.exports = $M.exports();