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
        if (a1) {
          $.goto = 24;
          $M.brk(2);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.option).dbg$call(M, {
          coerce: false
        });
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff3)();
        continue;

      case 8:
        $.goto = 9;
        $M.brk(5);
        continue;

      case 9:
        if (a2) {
          $.goto = 23;
          $M.brk(6);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.goto = 11;
        $M.brk(7);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = M.option).dbg$call(M, {
          coerce: true
        });
        continue;

      case 12:
        $.goto = 13;
        $M.brk(8);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff5)();
        continue;

      case 14:
        $.goto = 15;
        $M.brk(9);
        continue;

      case 15:
        if (a3) {
          $.goto = 22;
          $M.brk(10);
          continue;
        } else {
          $.state = 16;
        }

      case 16:
        $.goto = 17;
        $M.brk(11);
        continue;

      case 17:
        $.goto = 18;
        ($M.context.call = eff7)();
        continue;

      case 18:
        $.goto = 19;
        $M.brk(12);
        continue;

      case 19:
        if (a4) {
          $.goto = 21;
          $M.brk(13);
          continue;
        } else {
          $.state = 20;
        }

      case 20:
        return $M.ret();

      case 21:
        $.goto = 20;
        ($M.context.call = eff8)();
        continue;

      case 22:
        $.goto = 16;
        ($M.context.call = eff6)();
        continue;

      case 23:
        $.goto = 10;
        ($M.context.call = eff4)();
        continue;

      case 24:
        $.goto = 4;
        ($M.context.call = eff2)();
        continue;

      case 25:
        return $M.ret($.value);

      case 26:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:4-3:11", "s", $s$1], ["3:4-3:10", "e", $s$1], ["4:4-6:5", "s", $s$1], ["5:6-5:13", "s", $s$1], ["8:2-8:30", "s", $s$1], ["8:2-8:29", "e", $s$1], ["10:4-10:11", "s", $s$1], ["10:4-10:10", "e", $s$1], ["11:4-13:5", "s", $s$1], ["12:6-12:13", "s", $s$1], ["16:4-16:31", "s", $s$1], ["16:4-16:30", "e", $s$1], ["17:4-17:11", "s", $s$1], ["17:4-17:10", "e", $s$1], ["18:4-20:5", "s", $s$1], ["19:6-19:13", "s", $s$1], ["23:4-23:11", "s", $s$1], ["23:4-23:10", "e", $s$1], ["24:4-26:5", "s", $s$1], ["25:6-25:13", "s", $s$1], [], ["25:6-25:12", "e", $s$1], ["19:6-19:12", "e", $s$1], ["12:6-12:12", "e", $s$1], ["5:6-5:12", "e", $s$1], [], []]);
module.exports = $M.exports();