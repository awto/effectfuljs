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
        $.goto = 8;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)("in body");
        continue;

      case 3:
        if ($p) {
          $.$.$0 = 7;
          $.goto = 1;
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$0 = 5;
        $.goto = 1;
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        $.goto = $.$.$0;
        continue;

      case 9:
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
      $.$.$0 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [[], ["5:4-5:23", "e", $s$1], ["3:8-3:22", "e", $s$1], [], [], ["7:2-7:24", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();