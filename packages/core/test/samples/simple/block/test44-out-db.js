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
        if ($.$$.$.$0) {
          $.goto = 4;
          $p = ($M.context.call = eff5)(5);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff6)();
        continue;

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($p);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", $s$1], ["3:16-3:23", "e", $s$1], ["4:2-4:8", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();