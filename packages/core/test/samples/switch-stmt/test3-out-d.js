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
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        switch ($p) {
          case 1:
            $.goto = 10;
            $M.brk(2);
            continue;

          case 2:
            $.goto = 4;
            continue;

          default:
            $.goto = 5;
            continue;
        }

      case 4:
        $.goto = 8;
        $M.brk(4);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(6);
        $.state = 6;

      case 6:
        $.goto = 7;
        ($M.context.call = effB)(3);
        $.state = 7;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 9;
        ($M.context.call = effB)(2);
        $.state = 9;

      case 9:
        $.goto = 7;
        $M.brk(5);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = effB)(1);
        $.state = 11;

      case 11:
        $.goto = 7;
        $M.brk(3);
        continue;

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-11:3", "s", $s$1], ["2:7-11:3", "s", $s$1], ["2:15-2:21", "e", $s$1], ["4:6-4:14", "s", $s$1], ["7:6-7:14", "s", $s$1], ["10:6-10:14", "s", $s$1], ["10:6-10:13", "e", $s$1], [], ["7:6-7:13", "e", $s$1], ["8:6-8:16", "s", $s$1], ["4:6-4:13", "e", $s$1], ["5:6-5:12", "s", $s$1], [], []]);
module.exports = $M.exports();