var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  k: "$0",
  i: "$1",
  j: "$2"
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
        ($M.context.call = eff1)();
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff2)();
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        $p = ($M.context.call = eff3)();
        continue;

      case 3:
        $.$.$2 = $p;
        $.state = 4;

      case 4:
        $0 = $.$.$1 < 10;

        if ($0) {
          $0 = $.$.$2 > -10;
          $.state = 5;
        } else {
          $.state = 5;
        }

      case 5:
        if ($0) {
          $.goto = 7;
          $p = ($M.context.call = eff3)($.$.$1);
          continue;
        } else {
          $.goto = 6;
          ($M.context.call = eff5)($.$.$1, $.$.$2);
          continue;
        }

      case 6:
        return $M.ret();

      case 7:
        $.$.$0 = $p;
        $.goto = 8;
        ($M.context.call = eff4)($.$.$0++);
        continue;

      case 8:
        $.$.$1++;
        $.$.$2--;
        $.goto = 4;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:8", "e", $s$2], ["5:15-5:21", "e", $s$2], ["5:27-5:33", "e", $s$2], [], [], ["6:12-6:19", "e", $s$2], [], ["7:4-7:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();