var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  j: "$0",
  i: "$1"
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
        $.$.$1 = $p;
        $.state = 3;

      case 3:
        if ($.$.$1 < 10) {
          $.goto = 5;
          ($M.context.call = eff3)($.$.$1, $.$.$0);
          continue;
        } else {
          $.goto = 4;
          ($M.context.call = eff7)($.$.$1);
          continue;
        }

      case 4:
        return $M.ret();

      case 5:
        $.goto = 6;
        ($M.context.call = eff4)($.$.$0++);
        continue;

      case 6:
        $.$.$1++;
        $.goto = 3;
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:8", "e", $s$2], ["4:15-4:21", "e", $s$2], [], ["5:4-5:14", "e", $s$2], [], ["6:4-6:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();