var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  k: "$0",
  i: "$1",
  j: "$2",
  l: "$3"
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
        $.$.$0 = 0;
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
          $M.brk(7);
          continue;
        }

      case 7:
        $.goto = 8;
        ($M.context.call = eff6)($.$.$1, $.$.$2, $.$.$0);
        continue;

      case 8:
        return $M.ret();

      case 9:
        $M.lset($.$, "k", $.$.$0 + 1);
        $.goto = 10;
        $M.brk(4);
        continue;

      case 10:
        $.goto = 11;
        $p = ($M.context.call = eff3)($.$.$1);
        continue;

      case 11:
        $.$.$2 = $p;
        $.goto = 12;
        $p = ($M.context.call = eff4)($.$.$1);
        continue;

      case 12:
        $.$.$3 = $p;
        $.goto = 13;
        $M.brk(5);
        continue;

      case 13:
        $M.lset($.$, "l", $.$.$3 + 1);
        $.goto = 14;
        $M.brk(6);
        continue;

      case 14:
        $0 = $.$.$2;
        $M.lset($.$, "j", $0 + 1);
        $.goto = 15;
        ($M.context.call = eff5)($0, $.$.$0, $.$.$3);
        continue;

      case 15:
        $M.lset($.$, "i", $.$.$1 + 1);
        $.goto = 6;
        continue;

      case 16:
        return $M.ret($.value);

      case 17:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:12", "s", $s$2], ["3:2-3:9", "s", $s$2], ["3:2-3:8", "e", $s$2], ["4:2-10:3", "s", $s$2], ["4:15-4:21", "e", $s$2], [], ["5:4-5:8", "s", $s$2], ["11:2-11:15", "e", $s$2], [], ["6:4-7:18", "s", $s$2], ["6:12-6:19", "e", $s$2], ["7:10-7:17", "e", $s$2], ["8:4-8:8", "s", $s$2], ["9:4-9:20", "s", $s$2], ["9:4-9:19", "e", $s$2], [], [], []]);
module.exports = $M.exports();