var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
        $.goto = 1;
        ($M.context.call = M.profile).dbg$call(M, "defaultMinimal");
        continue;

      case 1:
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:27", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(2);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(3);
        continue;

      case 3:
        return $M.ret($p);

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:8", "e", $s$1], ["5:2-5:8", "e", $s$1], ["6:9-6:15", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M)($p);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(3);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)(4);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M)($p);
        continue;

      case 6:
        return $M.ret(5);

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:2-10:8", "e", $s$1], ["11:4-11:10", "e", $s$1], ["11:2-11:11", "e", $s$1], ["12:2-12:8", "e", $s$1], ["13:4-13:10", "e", $s$1], ["13:2-13:11", "e", $s$1], [], [], []]);
module.exports = $M.exports();