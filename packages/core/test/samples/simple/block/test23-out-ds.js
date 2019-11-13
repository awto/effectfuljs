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
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 3;
        $p = ($M.context.call = eff4)($.$.$0, $.$.$1);
        continue;

      case 3:
        $0 = $.$.$1;
        $M.lset($.$, "j", $0 + 1);
        $.goto = 4;
        $p = ($M.context.call = eff3)($p, $0);
        continue;

      case 4:
        $.$.$3 = $p;
        $.goto = 5;
        $p = ($M.context.call = eff5)($.$.$0);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff2)($.$.$2, $.$.$3, $p);
        continue;

      case 6:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 7;
        $p = ($M.context.call = eff1)($p, $0);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff0)($p, $.$.$0);
        continue;

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-3:10", "s", $s$2], ["4:2-4:64", "s", $s$2], ["4:27-4:37", "e", $s$2], ["4:22-4:43", "e", $s$2], ["4:45-4:52", "e", $s$2], ["4:12-4:53", "e", $s$2], ["4:7-4:59", "e", $s$2], ["4:2-4:63", "e", $s$2], [], [], []]);
module.exports = $M.exports();