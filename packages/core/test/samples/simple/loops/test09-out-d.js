var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0"
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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = init)();
        continue;

      case 2:
        $.$.$0 = $p;
        $.state = 3;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = check)();
        continue;

      case 4:
        if ($p === true) {
          $.goto = 5;
          $M.brk(1);
          continue;
        } else {
          return $M.ret();
        }

      case 5:
        if ($.$$.$.$0) {
          $.goto = 7;
          $M.brk(2);
          continue;
        } else {
          $.goto = 6;
          $M.brk(3);
          continue;
        }

      case 6:
        $.goto = 3;
        ($M.context.call = upd)();
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(1);
        continue;

      case 8:
        $.goto = 6;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-4:18", "s", $s$1], ["2:15-2:21", "e", $s$2], [], ["2:23-2:30", "e", $s$2], ["3:4-4:18", "s", $s$2], ["3:11-3:18", "s", $s$2], ["2:41-2:46", "e", $s$2], ["3:11-3:17", "e", $s$2], [], [], []]);
module.exports = $M.exports();