var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  e: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.e($);
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
$M.fun("m$1", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = M.option).dbg$call(M, {
          coerce: true
        });
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff1)();
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff2)();
        continue;

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:28", "e", $s$1], ["3:2-3:8", "e", $s$1], ["4:2-4:8", "e", $s$1], [], [], []]);
module.exports = $M.exports();