var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
}, $s$1, false];
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
        $p = ($M.context.call = eff2)();
        continue;

      case 4:
        $.$.$0 = $p;
        $.state = 5;

      case 5:
        if ($.$.$0 < 10) {
          $.goto = 9;
          $M.brk(2);
          continue;
        } else {
          $.goto = 6;
          $M.brk(4);
          continue;
        }

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff7)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.goto = 10;
        $p = ($M.context.call = eff3)($.$.$0);
        continue;

      case 10:
        $.$.$1 = $p;
        $.goto = 11;
        $M.brk(3);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff4)($.$.$1++);
        continue;

      case 12:
        $.$.$0++;
        $.goto = 5;
        continue;

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:9", "s", $s$2], ["3:2-3:8", "e", $s$2], ["4:2-7:3", "s", $s$2], ["4:15-4:21", "e", $s$2], [], ["5:4-5:20", "s", $s$2], ["8:14-8:21", "e", $s$2], ["8:2-8:22", "e", $s$2], [], ["5:12-5:19", "e", $s$2], ["6:4-6:14", "s", $s$2], ["6:4-6:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();