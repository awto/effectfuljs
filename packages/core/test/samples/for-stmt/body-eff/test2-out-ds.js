var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  i: "$0",
  j: "$1",
  d: "$2",
  len: "$3",
  ref: "$4"
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
}, null, null, [["1:0-12:3", "s", null], [], [], []]);
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
        $M.lset($.$, "ref", [1, 2, 3]);
        $.goto = 3;
        $M.brk(3);
        continue;

      case 3:
        $M.lset($.$, "i", 0);
        $M.lset($.$, "len", $.$.$4.lenght);
        $.state = 4;

      case 4:
        if ($.$.$0 < $.$.$3) {
          $.goto = 7;
          $M.brk(4);
          continue;
        } else {
          $.goto = 5;
          $M.brk(8);
          continue;
        }

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(3);
        continue;

      case 6:
        return $M.ret();

      case 7:
        $M.lset($.$, "j", 0);
        $M.lset($.$, "len", $.$.$4.length);
        $.state = 8;

      case 8:
        if ($.$.$1 < $.$.$3) {
          $.goto = 11;
          $M.brk(5);
          continue;
        } else {
          $.goto = 9;
          $M.brk(7);
          continue;
        }

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(2);
        continue;

      case 10:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 4;
        continue;

      case 11:
        $M.lset($.$, "d", $.$.$4[$.$.$1]);
        $.goto = 12;
        $M.brk(6);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 13:
        $M.lset($.$, "j", $.$.$1 + 1);
        $.goto = 8;
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:24", "s", $s$1], ["3:2-3:18", "s", $s$1], ["4:2-10:3", "s", $s$1], [], ["5:4-8:5", "s", $s$1], ["11:2-11:8", "e", $s$1], [], [], ["6:6-6:17", "s", $s$1], ["9:4-9:10", "e", $s$1], [], ["7:6-7:13", "s", $s$1], ["7:6-7:12", "e", $s$1], [], [], []]);
module.exports = $M.exports();