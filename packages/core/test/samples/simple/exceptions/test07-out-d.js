var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false];
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
        $.goto = 2;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.$.$0 = 4;
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, 1);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(3);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(2);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(4);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = console.log).dbg$call(console, 2);
        continue;

      case 10:
        $.goto = $.$.$0;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$0 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [["2:2-8:3", "s", $s$1], ["5:4-5:19", "s", $s$1], ["3:4-3:11", "s", $s$1], ["3:4-3:10", "e", $s$1], [], ["5:4-5:18", "e", $s$1], ["6:4-6:11", "s", $s$1], ["6:4-6:10", "e", $s$1], ["7:4-7:19", "s", $s$1], ["7:4-7:18", "e", $s$1], [], [], []]);
module.exports = $M.exports();