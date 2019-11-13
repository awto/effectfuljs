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
        ($M.context.call = eff1)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 6;
        ($M.context.call = eff2)($0);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        if ($.$.$0) {
          $.goto = 13;
          $M.brk(5);
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.goto = 9;
        $M.brk(7);
        continue;

      case 9:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 10;
        ($M.context.call = eff3)($0);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(8);
        continue;

      case 11:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 12;
        ($M.context.call = eff4)($0);
        continue;

      case 12:
        return $M.ret();

      case 13:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 10;
        $M.brk(6);
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:12", "s", $s$2], ["3:2-3:10", "s", $s$2], ["3:2-3:9", "e", $s$2], ["4:2-11:3", "s", $s$2], ["5:4-5:14", "s", $s$2], ["5:4-5:13", "e", $s$2], ["6:4-9:5", "s", $s$2], ["7:6-7:10", "s", $s$2], ["10:4-10:14", "s", $s$2], ["10:4-10:13", "e", $s$2], ["12:2-12:12", "s", $s$2], ["12:2-12:11", "e", $s$2], [], ["8:6-8:16", "s", $s$2], [], []]);
module.exports = $M.exports();