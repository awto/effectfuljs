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
        $.goto = 1;
        ($M.context.call = eff1)();
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff2)();
        continue;

      case 2:
        $.$.$0 = $p;
        $.state = 3;

      case 3:
        if ($.$.$0 < 10) {
          $.goto = 6;
          $p = ($M.context.call = eff3)($.$.$0);
          continue;
        } else {
          $.goto = 4;
          $p = ($M.context.call = eff7)($.$.$0);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.$.$1 = $p;
        $.goto = 7;
        ($M.context.call = eff4)($.$.$1++);
        continue;

      case 7:
        $.$.$0++;
        $.goto = 3;
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:8", "e", $s$2], ["4:15-4:21", "e", $s$2], [], ["5:12-5:19", "e", $s$2], ["8:2-8:22", "e", $s$2], [], ["6:4-6:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();