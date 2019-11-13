var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  scope: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.scope($);
        $.goto = 1;
        ($M.context.call = M.option).dbg$call(M, {
          scopePrefix: "otherScope"
        });
        continue;

      case 1:
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:39", "e", $s$1], [], [], []]);
$M.fun("m$1", "scope", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff_1)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff_2)();
        continue;

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:9", "e", $s$1], ["5:2-5:9", "e", $s$1], [], [], []]);
module.exports = $M.exports();