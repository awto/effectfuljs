var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
}, $s$1, false];
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
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.$.$2 = $.$.$0++;
        $.goto = 1;
        $p = ($M.context.call = eff4)($.$.$0, $.$.$1);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff3)($p, $.$.$1++);
        continue;

      case 2:
        $.$.$3 = $p;
        $.goto = 3;
        $p = ($M.context.call = eff5)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff2)($.$.$2, $.$.$3, $p);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff1)($p, $.$.$0++);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff0)($p, $.$.$0);
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:27-4:37", "e", $s$2], ["4:22-4:43", "e", $s$2], ["4:45-4:52", "e", $s$2], ["4:12-4:53", "e", $s$2], ["4:7-4:59", "e", $s$2], ["4:2-4:63", "e", $s$2], [], [], []]);
module.exports = $M.exports();