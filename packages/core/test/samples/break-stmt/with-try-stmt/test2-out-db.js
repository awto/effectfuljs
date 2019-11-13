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
        $.goto = 4;
        ($M.context.call = eff)(3);
        continue;

      case 2:
        $.state = 3;

      case 3:
        return $M.ret();

      case 4:
        $.goto = 3;
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
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
      $.goto = 6;
      break;
  }
}, null, [[], ["7:6-7:12", "e", $s$1], [], [], [], [], []]);
module.exports = $M.exports();