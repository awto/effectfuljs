var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  k: "$0",
  i: "$1",
  j: "$2"
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
        ($M.context.call = eff1)();
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
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
        $.goto = 6;
        $p = ($M.context.call = eff3)();
        continue;

      case 6:
        $.$.$2 = $p;
        $.state = 7;

      case 7:
        $0 = $.$.$1 < 10;

        if ($0) {
          $0 = $.$.$2 > -10;
          $.state = 8;
        } else {
          $.state = 8;
        }

      case 8:
        if ($0) {
          $.goto = 11;
          $M.brk(3);
          continue;
        } else {
          $.goto = 9;
          $M.brk(5);
          continue;
        }

      case 9:
        $.goto = 10;
        ($M.context.call = eff5)($.$.$1, $.$.$2);
        continue;

      case 10:
        return $M.ret();

      case 11:
        $.goto = 12;
        $p = ($M.context.call = eff3)($.$.$1);
        continue;

      case 12:
        $.$.$0 = $p;
        $.goto = 13;
        $M.brk(4);
        continue;

      case 13:
        $0 = $.$.$0;
        $M.lset($.$, "k", $0 + 1);
        $.goto = 14;
        ($M.context.call = eff4)($0);
        continue;

      case 14:
        $M.lset($.$, "i", $.$.$1 + 1);
        $M.lset($.$, "j", $.$.$2 - 1);
        $.goto = 7;
        continue;

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:9", "s", $s$2], ["3:2-3:8", "e", $s$2], ["4:2-4:8", "s", $s$2], ["5:2-8:3", "s", $s$2], ["5:15-5:21", "e", $s$2], ["5:27-5:33", "e", $s$2], [], [], ["6:4-6:20", "s", $s$2], ["9:2-9:12", "e", $s$2], [], ["6:12-6:19", "e", $s$2], ["7:4-7:14", "s", $s$2], ["7:4-7:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();