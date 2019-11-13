var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  e: "$0"
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
        $.goto = 2;
        $M.brk(0);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 5;
        $M.brk(2);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(1);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = 6;
        $M.mcall("log", console, $.$.$0, 1);
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
        $.goto = 4;
        $M.mcall("log", console, $.$.$0, 2);
        continue;

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, null, [["2:2-8:3", "s", $s$1], ["5:4-5:22", "s", $s$2], ["3:4-3:11", "s", $s$1], ["3:4-3:10", "e", $s$1], [], ["5:4-5:21", "e", $s$2], ["6:4-6:11", "s", $s$2], ["6:4-6:10", "e", $s$2], ["7:4-7:22", "s", $s$2], ["7:4-7:21", "e", $s$2], [], []]);
module.exports = $M.exports();