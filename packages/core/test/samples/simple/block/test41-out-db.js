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
        ($M.context.call = eff1)();
        continue;

      case 1:
        if (a1) {
          $.goto = 2;
          ($M.context.call = eff2)();
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          coerce: false
        });
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff3)();
        continue;

      case 4:
        if (a2) {
          $.goto = 5;
          ($M.context.call = eff4)();
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        ($M.context.call = M.option).dbg$call(M, {
          coerce: true
        });
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff5)();
        continue;

      case 7:
        if (a3) {
          $.goto = 8;
          ($M.context.call = eff6)();
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.goto = 9;
        ($M.context.call = eff7)();
        continue;

      case 9:
        if (a4) {
          $.goto = 10;
          ($M.context.call = eff8)();
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        return $M.ret();

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:4-3:10", "e", $s$1], ["5:6-5:12", "e", $s$1], ["8:2-8:29", "e", $s$1], ["10:4-10:10", "e", $s$1], ["12:6-12:12", "e", $s$1], ["16:4-16:30", "e", $s$1], ["17:4-17:10", "e", $s$1], ["19:6-19:12", "e", $s$1], ["23:4-23:10", "e", $s$1], ["25:6-25:12", "e", $s$1], [], [], []]);
module.exports = $M.exports();