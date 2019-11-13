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
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        switch ($p) {
          case 1:
            $.goto = 7;
            $M.brk(1);
            continue;

          case 2:
            $.goto = 3;
            continue;

          default:
            $.goto = 4;
            continue;
        }

      case 3:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = 6;
        ($M.context.call = effB)(2);
        $.state = 6;

      case 6:
        $.goto = 4;
        $M.brk(4);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = effB)(1);
        $.state = 8;

      case 8:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-10:3", "s", $s$1], ["3:10-3:16", "e", $s$1], ["5:6-5:14", "s", $s$1], ["8:6-8:14", "s", $s$1], [], ["8:6-8:13", "e", $s$1], ["9:6-9:12", "s", $s$1], ["5:6-5:13", "e", $s$1], ["6:6-6:12", "s", $s$1], [], []]);
module.exports = $M.exports();