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
        $p = ($M.context.call = init)();
        continue;

      case 1:
        $.$.$0 = $p;
        $.state = 2;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = check)();
        continue;

      case 3:
        if ($p === true) {
          $.goto = 4;
          $p = ($M.context.call = initJ)();
          continue;
        } else {
          return $M.ret();
        }

      case 4:
        $.$.$1 = $p;
        $.state = 5;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = checkJ)();
        continue;

      case 6:
        if ($p === true) {
          if ($.$.$0 === $.$.$1) {
            $.goto = 8;
            continue;
          } else {
            $.state = 7;
          }
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 2;
        ($M.context.call = upd)();
        continue;

      case 8:
        $.goto = 5;
        ($M.context.call = updJ)();
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:20-2:26", "e", $s$2], [], ["2:28-2:35", "e", $s$2], ["3:17-3:24", "e", $s$3], [], ["3:26-3:34", "e", $s$3], [], ["2:46-2:51", "e", $s$2], ["3:45-3:51", "e", $s$3], [], []]);
module.exports = $M.exports();