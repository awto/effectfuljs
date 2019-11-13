var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false];
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
        $p = ($M.context.call = test)(1);
        continue;

      case 2:
        if ($p) {
          $.goto = 5;
          $M.brk(1);
          continue;
        } else {
          $.goto = 3;
          $M.brk(2);
          continue;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(5);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = 4;
        ($M.context.call = eff)(3);
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-4:16", "s", $s$1], ["2:6-2:13", "e", $s$1], ["3:4-3:11", "s", $s$1], ["4:9-4:15", "e", $s$1], [], ["3:4-3:10", "e", $s$1], [], []]);
module.exports = $M.exports();