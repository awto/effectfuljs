var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $c.f($);
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-10:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(2);
        continue;

      case 2:
        $.$.$3 = [1, 2, 3];
        $.goto = 3;
        $M.brk(3);
        continue;

      case 3:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 4;

      case 4:
        if ($.$.$1 < $.$.$2) {
          $.goto = 10;
          $M.brk(4);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $M.brk(7);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(2);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(8);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(3);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $.$.$0 = $.$.$3[$.$.$1];
        $.goto = 11;
        $M.brk(5);
        continue;

      case 11:
        $.goto = 12;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 12:
        if ($p) {
          $.goto = 5;
          $M.brk(6);
          continue;
        } else {
          $.state = 13;
        }

      case 13:
        $.$.$1++;
        $.goto = 4;
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:21", "s", $s$1], ["3:2-3:18", "s", $s$1], ["4:2-7:3", "s", $s$1], [], ["5:4-5:15", "s", $s$1], ["8:2-8:9", "s", $s$1], ["8:2-8:8", "e", $s$1], ["9:2-9:9", "s", $s$1], ["9:2-9:8", "e", $s$1], [], ["6:4-6:22", "s", $s$1], ["6:8-6:14", "e", $s$1], ["6:16-6:22", "s", $s$1], [], [], []]);
module.exports = $M.exports();