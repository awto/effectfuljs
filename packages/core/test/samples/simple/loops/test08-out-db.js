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
          ($M.context.call = b1)();
          continue;
        } else {
          return $M.ret();
        }

      case 4:
        if (v) {
          $.goto = 5;
          ($M.context.call = e)();
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 2;
        ($M.context.call = upd)();
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:15-2:21", "e", $s$2], [], ["2:23-2:30", "e", $s$2], ["3:4-3:8", "e", $s$2], ["5:6-5:9", "e", $s$2], ["2:41-2:46", "e", $s$2], [], []]);
module.exports = $M.exports();