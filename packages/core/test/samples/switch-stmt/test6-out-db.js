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
        switch ($p) {
          case 1:
            $.goto = 3;
            ($M.context.call = effB)(1);
            continue;

          case 2:
            $.goto = 2;
            continue;

          default:
            $.goto = 3;
            continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = effB)(2);
        $.state = 3;

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
}, null, null, [["3:10-3:16", "e", $s$1], ["5:6-5:13", "e", $s$1], ["8:6-8:13", "e", $s$1], [], [], []]);
module.exports = $M.exports();