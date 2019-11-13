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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        if ($p) {
          $.goto = 5;
          $M.brk(1);
          continue;
        } else {
          $.goto = 3;
          $M.brk(2);
          continue;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, 2);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, 1);
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-5:22", "s", $s$1], ["4:6-4:12", "e", $s$1], ["4:14-4:29", "s", $s$1], ["5:7-5:21", "e", $s$1], [], ["4:14-4:28", "e", $s$1], [], []]);
module.exports = $M.exports();