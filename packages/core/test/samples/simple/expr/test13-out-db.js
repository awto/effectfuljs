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
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        $p = ($M.context.call = eff)(3);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = $.$.$1)($p);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = $.$.$0)($p);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", $s$1], ["2:9-2:15", "e", $s$1], ["2:16-2:22", "e", $s$1], ["2:9-2:23", "e", $s$1], ["2:2-2:24", "e", $s$1], [], [], []]);
module.exports = $M.exports();