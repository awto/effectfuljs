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
        $.goto = 8;
        ($M.context.call = eff)(5);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(2);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(3);
        continue;

      case 4:
        if ($p) {
          $.goto = 6;
          continue;
        } else {
          $.goto = 5;
          $p = new ($M.context.call = Error)("error");
          continue;
        }

      case 5:
        return $M.ret($p);

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(7);
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 6;
        ($M.context.call = eff)(6);
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
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
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 10;
      break;
  }
}, null, [[], ["9:6-9:12", "e", $s$1], ["4:6-4:12", "e", null], ["5:10-5:16", "e", null], ["6:17-6:35", "e", null], [], ["13:2-13:8", "e", null], [], ["11:4-11:10", "e", null], [], []]);
module.exports = $M.exports();