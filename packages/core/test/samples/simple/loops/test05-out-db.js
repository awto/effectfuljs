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
        $.goto = 1;
        ($M.context.call = eff1)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff2)();
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(3);
        continue;

      case 3:
        if ($p) {
          $.goto = 5;
          ($M.context.call = eff5)();
          continue;
        } else {
          $.goto = 4;
          ($M.context.call = eff7)();
          continue;
        }

      case 4:
        return $M.ret();

      case 5:
        $.goto = 6;
        ($M.context.call = eff6)();
        continue;

      case 6:
        $.goto = 2;
        ($M.context.call = eff4)();
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", $s$1], ["3:7-3:13", "e", $s$1], ["3:15-3:21", "e", $s$1], ["4:4-4:10", "e", $s$1], [], ["5:4-5:10", "e", $s$1], ["3:23-3:29", "e", $s$1], [], []]);
module.exports = $M.exports();