var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  k: "$0",
  i: "$1",
  j: "$2",
  l: "$3"
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
          $.$.$0++;
          $.goto = 5;
          $p = ($M.context.call = eff3)($.$.$1);
          continue;
        } else {
          $.goto = 4;
          ($M.context.call = eff6)($.$.$1, $.$.$2, $.$.$0);
          continue;
        }

      case 4:
        return $M.ret();

      case 5:
        $.$.$2 = $p;
        $.goto = 6;
        $p = ($M.context.call = eff4)($.$.$1);
        continue;

      case 6:
        $.$.$3 = $p;
        $.$.$3++;
        $.goto = 7;
        ($M.context.call = eff5)($.$.$2++, $.$.$0, $.$.$3);
        continue;

      case 7:
        $.$.$1++;
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
}, null, null, [["3:2-3:8", "e", $s$2], ["4:15-4:21", "e", $s$2], [], ["6:12-6:19", "e", $s$2], [], ["7:10-7:17", "e", $s$2], ["9:4-9:19", "e", $s$2], [], [], []]);
module.exports = $M.exports();