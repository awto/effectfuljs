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
        continue;

      case 1:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "fin");
        continue;

      case 2:
        $.$.$0 = 3;
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 3:
        return $M.ret();

      case 4:
        $.goto = $.$.$0;
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
      $.$.$0 = 5;
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, [[], ["5:4-5:22", "e", $s$1], ["3:4-3:10", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();