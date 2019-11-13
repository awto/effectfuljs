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
$M.fun("m$1", "a", "m$0", [], 8, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = $.self.eff).dbg$call($.self, 2);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff3)($.self);
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
}, null, null, [["2:2-2:8", "e", $s$1], ["3:2-3:13", "e", $s$1], ["4:2-4:12", "e", $s$1], [], [], []]);
module.exports = $M.exports();