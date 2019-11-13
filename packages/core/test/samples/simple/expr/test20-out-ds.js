var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
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
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        $.goto = 3;
        $M.mcall("log", console, $p, 3);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(1);
        continue;

      case 4:
        $.goto = 5;
        $M.mcall("log", console, "2");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(2);
        continue;

      case 6:
        $.goto = 7;
        $M.mcall("log", console, "3");
        continue;

      case 7:
        $.goto = 8;
        $M.brk(3);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = eff)(2);
        continue;

      case 9:
        return $M.ret($p);

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:27", "s", $s$1], ["2:14-2:22", "e", $s$1], ["2:2-2:26", "e", $s$1], ["3:2-3:19", "s", $s$1], ["3:2-3:18", "e", $s$1], ["4:2-4:19", "s", $s$1], ["4:2-4:18", "e", $s$1], ["5:2-5:16", "s", $s$1], ["5:9-5:15", "e", $s$1], [], [], []]);
module.exports = $M.exports();