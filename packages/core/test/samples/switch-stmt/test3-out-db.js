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
            $.goto = 4;
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
        $.goto = 4;
        ($M.context.call = effB)(2);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = effB)(3);
        $.state = 4;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:15-2:21", "e", $s$1], ["4:6-4:13", "e", $s$1], ["7:6-7:13", "e", $s$1], ["10:6-10:13", "e", $s$1], [], [], []]);
module.exports = $M.exports();