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
}, null, null, [["2:0-10:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 5;
        $M.brk(4);
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
        return $M.ret();

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(3);
        continue;

      case 6:
        $.goto = 4;
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 8;
      break;
  }
}, null, [["3:2-9:3", "s", null], ["7:6-7:13", "s", $s$1], ["4:4-8:5", "s", null], ["5:6-5:16", "s", null], [], ["7:6-7:12", "e", $s$1], [], [], []]);
module.exports = $M.exports();