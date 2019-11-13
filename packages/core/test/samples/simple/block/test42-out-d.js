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
        ($M.context.call = eff1)();
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff2)();
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(3);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff3)();
        continue;

      case 7:
        $.goto = 8;
        $M.brk(4);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = eff)(4);
        continue;

      case 9:
        if ($p) {
          $.goto = 11;
          $M.brk(5);
          continue;
        } else {
          $.goto = 10;
          $M.brk(6);
          continue;
        }

      case 10:
        return $M.ret();

      case 11:
        $.goto = 12;
        $M.brk(7);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff)(5);
        continue;

      case 13:
        return $M.ret();

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", $s$1], ["2:2-2:8", "e", $s$1], ["3:2-3:9", "s", $s$1], ["3:2-3:8", "e", $s$1], ["4:2-8:3", "s", $s$1], ["5:4-5:11", "s", $s$1], ["5:4-5:10", "e", $s$1], ["6:4-7:16", "s", $s$1], ["6:8-6:14", "e", $s$1], ["6:16-6:27", "s", $s$1], [], ["9:2-9:9", "s", $s$1], ["9:2-9:8", "e", $s$1], [], [], []]);
module.exports = $M.exports();