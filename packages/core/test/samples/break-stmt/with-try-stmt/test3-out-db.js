var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  e: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $c.f($);
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
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $0 = $.value;
        $.goto = 5;
        ($M.context.call = eff)(3);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(2);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        continue;

      case 4:
        return $M.ret();

      case 5:
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
}, function ($) {
  switch ($.state) {
    case 2:
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, null, [[], ["7:6-7:12", "e", $s$1], ["4:6-4:12", "e", null], ["10:2-10:8", "e", null], [], [], [], []]);
module.exports = $M.exports();