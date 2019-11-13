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
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        if ($p) {
          $.goto = 4;
          ($M.context.call = eff3)();
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        return $M.ret();

      case 4:
        $.goto = 3;
        ($M.context.call = eff4)();
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", $s$1], ["3:6-3:12", "e", $s$1], ["4:4-4:10", "e", $s$1], [], ["5:4-5:10", "e", $s$1], [], []]);
module.exports = $M.exports();