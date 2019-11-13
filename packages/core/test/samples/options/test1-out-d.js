var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.b($);
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
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.profile).dbg$call(M, "minimal");
        continue;

      case 6:
        $.goto = 7;
        $M.brk(3);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(3);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(4);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(4);
        continue;

      case 10:
        return $M.ret();

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", $s$1], ["2:2-2:8", "e", $s$1], ["3:2-3:9", "s", $s$1], ["3:2-3:8", "e", $s$1], ["4:2-4:23", "s", $s$1], ["4:2-4:22", "e", $s$1], ["5:2-5:9", "s", $s$1], ["5:2-5:8", "e", $s$1], ["6:2-6:9", "s", $s$1], ["6:2-6:8", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(6);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(7);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.profile).dbg$call(M, "minimal");
        continue;

      case 6:
        $.goto = 7;
        $M.brk(8);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(3);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(9);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(4);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(10);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = M.profile).dbg$call(M, "full");
        continue;

      case 12:
        $.goto = 13;
        $M.brk(11);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff)(5);
        continue;

      case 14:
        $.goto = 15;
        $M.brk(12);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = eff)(6);
        continue;

      case 16:
        $.goto = 17;
        $M.brk(13);
        continue;

      case 17:
        $.goto = 18;
        ($M.context.call = console.log).dbg$call(console, "7");
        continue;

      case 18:
        return $M.ret();

      case 19:
        return $M.ret($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:2-10:9", "s", $s$1], ["10:2-10:8", "e", $s$1], ["11:2-11:9", "s", $s$1], ["11:2-11:8", "e", $s$1], ["12:2-12:23", "s", $s$1], ["12:2-12:22", "e", $s$1], ["13:2-13:9", "s", $s$1], ["13:2-13:8", "e", $s$1], ["14:2-14:9", "s", $s$1], ["14:2-14:8", "e", $s$1], ["15:2-15:20", "s", $s$1], ["15:2-15:19", "e", $s$1], ["16:2-16:9", "s", $s$1], ["16:2-16:8", "e", $s$1], ["17:2-17:9", "s", $s$1], ["17:2-17:8", "e", $s$1], ["18:2-18:19", "s", $s$1], ["18:2-18:18", "e", $s$1], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(14);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(15);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(16);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.profile).dbg$call(M, "minimal");
        continue;

      case 6:
        $.goto = 7;
        $M.brk(17);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(3);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(18);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(4);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(19);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff)(5);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(20);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff)(6);
        continue;

      case 14:
        $.goto = 15;
        $M.brk(21);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = console.log).dbg$call(console, "7");
        continue;

      case 16:
        return $M.ret();

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:2-22:9", "s", $s$1], ["22:2-22:8", "e", $s$1], ["23:2-23:9", "s", $s$1], ["23:2-23:8", "e", $s$1], ["25:4-25:25", "s", $s$1], ["25:4-25:24", "e", $s$1], ["26:4-26:11", "s", $s$1], ["26:4-26:10", "e", $s$1], ["27:4-27:11", "s", $s$1], ["27:4-27:10", "e", $s$1], ["29:2-29:9", "s", $s$1], ["29:2-29:8", "e", $s$1], ["30:2-30:9", "s", $s$1], ["30:2-30:8", "e", $s$1], ["31:2-31:19", "s", $s$1], ["31:2-31:18", "e", $s$1], [], [], []]);
module.exports = $M.exports();