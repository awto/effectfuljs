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
}, null, null, [["1:0-14:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 13;
        $M.brk(8);
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
        $p = ($M.context.call = eff)(3);
        continue;

      case 7:
        if ($p) {
          $.goto = 10;
          $M.brk(5);
          continue;
        } else {
          $.goto = 8;
          $M.brk(6);
          continue;
        }

      case 8:
        $.goto = 9;
        $p = new ($M.context.call = Error)("error");
        continue;

      case 9:
        return $M.ret($p);

      case 10:
        $.goto = 11;
        $M.brk(10);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff)(7);
        continue;

      case 12:
        return $M.ret();

      case 13:
        $.goto = 14;
        ($M.context.call = eff)(5);
        continue;

      case 14:
        $.goto = 15;
        $M.brk(9);
        continue;

      case 15:
        $.goto = 10;
        ($M.context.call = eff)(6);
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
    case 8:
    case 9:
      $.goto = 1;
      break;

    default:
      $.goto = 17;
      break;
  }
}, null, [["2:2-12:3", "s", null], ["9:6-9:13", "s", $s$1], ["3:4-10:5", "s", null], ["4:6-4:13", "s", null], ["4:6-4:12", "e", null], ["5:6-6:36", "s", null], ["5:10-5:16", "e", null], ["5:18-5:28", "s", null], ["6:17-6:35", "e", null], [], ["13:2-13:9", "s", null], ["13:2-13:8", "e", null], [], ["9:6-9:12", "e", $s$1], ["11:4-11:11", "s", null], ["11:4-11:10", "e", null], [], []]);
module.exports = $M.exports();