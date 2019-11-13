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
}, null, null, [["1:0-15:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 15;
        $M.brk(7);
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
        $p = ($M.context.call = eff)(1);
        continue;

      case 5:
        if ($p) {
          $.goto = 13;
          $M.brk(4);
          continue;
        } else {
          $.state = 6;
        }

      case 6:
        $.goto = 7;
        $M.brk(6);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(2);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(8);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(4);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(9);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff)(5);
        continue;

      case 12:
        return $M.ret();

      case 13:
        $.goto = 14;
        ($M.context.call = eff)("before break");
        continue;

      case 14:
        $.goto = 10;
        $M.brk(5);
        continue;

      case 15:
        $.goto = 8;
        ($M.context.call = eff)(3);
        continue;

      case 16:
        return $M.ret($.value);

      case 17:
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
    case 6:
    case 7:
    case 13:
    case 14:
      $.goto = 1;
      break;

    default:
      $.goto = 17;
      break;
  }
}, null, [["2:2-13:3", "s", null], ["10:6-10:13", "s", $s$1], ["3:4-11:5", "s", null], ["4:6-7:7", "s", null], ["4:10-4:16", "e", null], ["5:8-5:28", "s", null], ["8:6-8:13", "s", null], ["8:6-8:12", "e", null], ["12:4-12:11", "s", null], ["12:4-12:10", "e", null], ["14:2-14:9", "s", null], ["14:2-14:8", "e", null], [], ["5:8-5:27", "e", null], ["6:8-6:18", "s", null], ["10:6-10:12", "e", $s$1], [], []]);
module.exports = $M.exports();