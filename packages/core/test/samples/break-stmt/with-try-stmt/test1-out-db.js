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
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        if ($p) {
          $.goto = 6;
          ($M.context.call = eff)("before break");
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(4);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(5);
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [[], ["10:6-10:12", "e", $s$1], ["4:10-4:16", "e", null], ["5:8-5:27", "e", null], ["8:6-8:12", "e", null], ["12:4-12:10", "e", null], ["14:2-14:8", "e", null], [], [], []]);
module.exports = $M.exports();