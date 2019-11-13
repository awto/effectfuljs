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
        $.goto = 6;
        ($M.context.call = b1)();
        continue;

      case 6:
        $.goto = 7;
        $M.brk(2);
        continue;

      case 7:
        if (v) {
          $.goto = 9;
          $M.brk(3);
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.goto = 3;
        ($M.context.call = upd)();
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = e)();
        continue;

      case 10:
        $.goto = 8;
        $M.brk(4);
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-8:3", "s", $s$2], ["2:15-2:21", "e", $s$2], [], ["2:23-2:30", "e", $s$2], ["3:4-3:9", "s", $s$2], ["3:4-3:8", "e", $s$2], ["4:4-7:5", "s", $s$2], ["5:6-5:10", "s", $s$2], ["2:41-2:46", "e", $s$2], ["5:6-5:9", "e", $s$2], ["6:6-6:15", "s", $s$2], [], []]);
module.exports = $M.exports();