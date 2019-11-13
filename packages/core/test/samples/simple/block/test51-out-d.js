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
        ($M.context.call = eff1)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.$$.$.$0;
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        if (test) {
          $.goto = 9;
          $M.brk(3);
          continue;
        } else {
          $.goto = 5;
          $M.brk(7);
          continue;
        }

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(5);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(8);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(6);
        continue;

      case 8:
        return $M.ret();

      case 9:
        b;
        $.goto = 10;
        $M.brk(4);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(3);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(5);
        continue;

      case 12:
        c;
        $.goto = 13;
        $M.brk(6);
        continue;

      case 13:
        $.goto = 6;
        ($M.context.call = eff)(4);
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:10", "s", $s$1], ["2:2-2:9", "e", $s$1], ["3:2-3:4", "s", $s$1], ["4:2-9:16", "s", $s$1], ["5:4-5:6", "s", $s$1], ["9:9-9:15", "e", $s$1], ["10:2-10:9", "s", $s$1], ["10:2-10:8", "e", $s$1], [], ["6:4-6:11", "s", $s$1], ["6:4-6:10", "e", $s$1], ["7:4-7:6", "s", $s$1], ["8:4-8:11", "s", $s$1], ["8:4-8:10", "e", $s$1], [], []]);
module.exports = $M.exports();