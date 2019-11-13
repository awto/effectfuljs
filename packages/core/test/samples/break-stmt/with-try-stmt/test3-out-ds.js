var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  e: "$0"
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
}, null, null, [["1:0-11:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 9;
        $M.brk(5);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(3);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(4);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(6);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(4);
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(3);
        continue;

      case 10:
        $.goto = 6;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 12;
      break;
  }
}, null, [["2:2-9:3", "s", null], ["7:6-7:13", "s", $s$1], ["3:4-8:5", "s", null], ["4:6-4:13", "s", null], ["4:6-4:12", "e", null], ["5:6-5:16", "s", null], ["10:2-10:9", "s", null], ["10:2-10:8", "e", null], [], ["7:6-7:12", "e", $s$1], [], [], []]);
module.exports = $M.exports();