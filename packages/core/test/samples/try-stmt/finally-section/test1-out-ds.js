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
        $.goto = 11;
        $M.brk(3);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)("in body");
        continue;

      case 4:
        if ($p) {
          $.goto = 9;
          $M.brk(2);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.$.$0 = 6;
        $.goto = 1;
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.$.$0 = 10;
        $.goto = 1;
        continue;

      case 10:
        return $M.ret($.value);

      case 11:
        $.goto = 12;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 12:
        $.goto = $.$.$0;
        continue;

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 5:
    case 9:
      $.$.$0 = 10;
      $.goto = 1;
      break;

    default:
      $.goto = 10;
      break;
  }
}, [["2:2-6:3", "s", $s$1], ["5:4-5:24", "s", $s$1], ["3:4-3:31", "s", $s$1], ["3:8-3:22", "e", $s$1], ["3:24-3:31", "s", $s$1], [], ["7:2-7:25", "s", $s$1], ["7:2-7:24", "e", $s$1], [], [], [], ["5:4-5:23", "e", $s$1], [], []]);
module.exports = $M.exports();