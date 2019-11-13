var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0"
}, $s$1, false],
    $s$3 = [{
  j: "$1"
}, $s$2, false];
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
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = init)();
        continue;

      case 3:
        $.$.$0 = $p;
        $.state = 4;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = check)();
        continue;

      case 5:
        if ($p === true) {
          $.goto = 6;
          $M.brk(2);
          continue;
        } else {
          return $M.ret();
        }

      case 6:
        $.goto = 7;
        $p = ($M.context.call = initJ)();
        continue;

      case 7:
        $.$.$1 = $p;
        $.state = 8;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = checkJ)();
        continue;

      case 9:
        if ($p === true) {
          $.goto = 11;
          $M.brk(3);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.goto = 4;
        ($M.context.call = upd)();
        continue;

      case 11:
        if ($.$.$0 === $.$.$1) {
          $.goto = 12;
          $M.brk(4);
          continue;
        } else {
          $.goto = 10;
          $M.brk(5);
          continue;
        }

      case 12:
        $.goto = 8;
        ($M.context.call = updJ)();
        continue;

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-5:24", "s", $s$1], ["2:7-5:24", "s", $s$1], ["2:20-2:26", "e", $s$2], [], ["2:28-2:35", "e", $s$2], ["3:4-5:24", "s", $s$2], ["3:17-3:24", "e", $s$3], [], ["3:26-3:34", "e", $s$3], ["4:6-5:24", "s", $s$3], ["2:46-2:51", "e", $s$2], ["4:19-4:28", "s", $s$3], ["3:45-3:51", "e", $s$3], [], []]);
module.exports = $M.exports();