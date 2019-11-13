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
        ($M.context.call = eff1)(1);
        continue;

      case 1:
        $.$$.$.$0;

        if (test) {
          b;
          $.goto = 4;
          ($M.context.call = eff)(3);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)(5);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(6);
        continue;

      case 3:
        return $M.ret();

      case 4:
        c;
        $.goto = 2;
        ($M.context.call = eff)(4);
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "e", $s$1], ["6:4-6:10", "e", $s$1], ["10:2-10:8", "e", $s$1], [], ["8:4-8:10", "e", $s$1], [], []]);
module.exports = $M.exports();