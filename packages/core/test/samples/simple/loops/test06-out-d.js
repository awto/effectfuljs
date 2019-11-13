var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0"
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
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff1)();
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff2)();
        continue;

      case 5:
        $.$.$0 = $p;
        $.state = 6;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)(3);
        continue;

      case 7:
        if ($.$.$0 !== $p) {
          $.goto = 10;
          $M.brk(3);
          continue;
        } else {
          $.goto = 8;
          $M.brk(5);
          continue;
        }

      case 8:
        $.goto = 9;
        ($M.context.call = eff7)($.$.$0);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $.goto = 11;
        ($M.context.call = eff5)($.$.$0);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(4);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff6)($.$.$0);
        continue;

      case 13:
        $.goto = 14;
        $p = ($M.context.call = eff4)($.$.$0);
        continue;

      case 14:
        $.$.$0 = $p;
        $.goto = 6;
        continue;

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "s", $s$2], ["3:2-3:9", "s", $s$2], ["3:2-3:8", "e", $s$2], ["4:2-7:3", "s", $s$2], ["4:11-4:17", "e", $s$2], [], ["4:25-4:31", "e", $s$2], ["5:4-5:12", "s", $s$2], ["8:2-8:9", "e", $s$2], [], ["5:4-5:11", "e", $s$2], ["6:4-6:12", "s", $s$2], ["6:4-6:11", "e", $s$2], ["4:37-4:44", "e", $s$2], [], [], []]);
module.exports = $M.exports();