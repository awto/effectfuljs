var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
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
        if (true) {
          $.goto = 5;
          $M.brk(1);
          continue;
        } else {
          $.goto = 2;
          $M.brk(2);
          continue;
        }

      case 2:
        3;
        $.state = 3;

      case 3:
        $.goto = 4;
        $M.brk(3);
        continue;

      case 4:
        return $M.ret(1);

      case 5:
        2;
        $.goto = 3;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-3:9", "s", $s$1], ["2:12-2:14", "s", $s$1], [], ["4:2-4:11", "s", $s$1], [], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(4);
        continue;

      case 1:
        if (true) {
          $.goto = 6;
          $M.brk(5);
          continue;
        } else {
          $.goto = 2;
          $M.brk(7);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "c");
        continue;

      case 3:
        $.goto = 4;
        $M.brk(8);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "d");
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, "a");
        continue;

      case 7:
        $.goto = 8;
        $M.brk(6);
        continue;

      case 8:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "b");
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["8:2-14:3", "s", $s$1], ["9:4-9:21", "s", $s$1], ["12:4-12:20", "e", $s$1], ["13:4-13:21", "s", $s$1], ["13:4-13:20", "e", $s$1], [], ["9:4-9:20", "e", $s$1], ["10:4-10:21", "s", $s$1], ["10:4-10:20", "e", $s$1], [], []]);
module.exports = $M.exports();