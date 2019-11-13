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
        $.goto = 4;
        $M.brk(4);
        continue;

      case 4:
        $M.lset($.$, "i", 0);
        $.state = 5;

      case 5:
        if ($.$.$0 < 3) {
          $.goto = 6;
          $M.brk(5);
          continue;
        } else {
          return $M.ret();
        }

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(6);
        continue;

      case 8:
        $M.lset($.$, "j", 0);
        $M.lset($.$, "len", $.$.$3.length);
        $.state = 9;

      case 9:
        if ($.$.$1 < $.$.$2) {
          $.goto = 11;
          $M.brk(7);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 5;
        continue;

      case 11:
        $M.gset(global, "d", $.$.$3[$.$.$1]);
        $.goto = 12;
        $M.brk(8);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = eff)(d);
        continue;

      case 13:
        if ($p) {
          $.goto = 17;
          $M.brk(9);
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 15;
        $M.brk(10);
        continue;

      case 15:
        $.goto = 16;
        $p = ($M.context.call = eff)(2);
        continue;

      case 16:
        if ($p) {
          $.goto = 10;
          $M.brk(11);
          continue;
        } else {
          $.state = 17;
        }

      case 17:
        $M.lset($.$, "j", $.$.$1 + 1);
        $.goto = 9;
        continue;

      case 18:
        return $M.ret($.value);

      case 19:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:21", "s", $s$1], ["3:2-3:18", "s", $s$1], ["4:2-11:3", "s", $s$1], ["4:7-11:3", "s", $s$1], [], ["5:4-5:11", "s", $s$1], ["5:4-5:10", "e", $s$1], ["6:4-10:5", "s", $s$1], [], ["7:6-7:17", "s", $s$1], [], ["8:6-8:27", "s", $s$1], ["8:10-8:16", "e", $s$1], ["8:18-8:27", "s", $s$1], ["9:6-9:31", "s", $s$1], ["9:10-9:16", "e", $s$1], ["9:18-9:31", "s", $s$1], [], [], []]);
module.exports = $M.exports();