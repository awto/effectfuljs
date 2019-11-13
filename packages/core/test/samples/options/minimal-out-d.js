var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.profile).dbg$call(M, "defaultMinimal");
        continue;

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:28", "s", $s$1], ["1:0-1:27", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff)(3);
        continue;

      case 6:
        return $M.ret($p);

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:9", "s", $s$1], ["4:2-4:8", "e", $s$1], ["5:2-5:9", "s", $s$1], ["5:2-5:8", "e", $s$1], ["6:2-6:16", "s", $s$1], ["6:9-6:15", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(4);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(5);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(2);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = M)($p);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(6);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(7);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = eff)(4);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = M)($p);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(8);
        continue;

      case 11:
        return $M.ret(5);

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:2-10:9", "s", $s$1], ["10:2-10:8", "e", $s$1], ["11:2-11:12", "s", $s$1], ["11:4-11:10", "e", $s$1], ["11:2-11:11", "e", $s$1], ["12:2-12:9", "s", $s$1], ["12:2-12:8", "e", $s$1], ["13:2-13:12", "s", $s$1], ["13:4-13:10", "e", $s$1], ["13:2-13:11", "e", $s$1], ["14:2-14:11", "s", $s$1], [], [], []]);
module.exports = $M.exports();