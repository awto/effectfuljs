var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  j: "$0",
  i: "$1"
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
  var $0;

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
        $.$.$1 = $p;
        $.state = 6;

      case 6:
        if ($.$.$1 < 10) {
          $.goto = 9;
          $M.brk(3);
          continue;
        } else {
          $.goto = 7;
          $M.brk(5);
          continue;
        }

      case 7:
        $.goto = 8;
        ($M.context.call = eff7)($.$.$1);
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.goto = 10;
        ($M.context.call = eff3)($.$.$1, $.$.$0);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(4);
        continue;

      case 11:
        $0 = $.$.$0;
        $M.lset($.$, "j", $0 + 1);
        $.goto = 12;
        ($M.context.call = eff4)($0);
        continue;

      case 12:
        $M.lset($.$, "i", $.$.$1 + 1);
        $.goto = 6;
        continue;

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "s", $s$2], ["3:2-3:9", "s", $s$2], ["3:2-3:8", "e", $s$2], ["4:2-7:3", "s", $s$2], ["4:15-4:21", "e", $s$2], [], ["5:4-5:15", "s", $s$2], ["8:2-8:9", "e", $s$2], [], ["5:4-5:14", "e", $s$2], ["6:4-6:14", "s", $s$2], ["6:4-6:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();