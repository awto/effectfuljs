var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  c: "$1"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.c($);
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
        $p = ($M.context.call = eff)();
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = effC)(1);
        continue;

      case 2:
        if ($.$.$0 === $p) {
          $.goto = 6;
          ($M.context.call = effR)(1);
          continue;
        } else {
          $.goto = 3;
          $p = ($M.context.call = effC)(2);
          continue;
        }

      case 3:
        if ($.$.$0 === $p) {
          $.state = 4;
        } else {
          $.goto = 5;
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = effR)(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = effR)("default");
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:10-2:15", "e", $s$1], ["3:9-3:16", "e", $s$1], ["4:6-4:13", "e", $s$1], [], ["7:6-7:13", "e", $s$1], ["9:6-9:21", "e", $s$1], [], [], []]);
$M.fun("m$2", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        if ($.$.$0 === $p) {
          $.goto = 4;
          ($M.context.call = eff)(3);
          continue;
        } else {
          $.goto = 3;
          $p = ($M.context.call = eff)(4);
          continue;
        }

      case 3:
        if ($.$.$0 === $p) {
          $.state = 4;
        } else {
          if ($.$.$0 === 6) {
            $.goto = 5;
            continue;
          } else {
            if ($.$.$0 === 8) {
              $.goto = 6;
              continue;
            } else {
              $.goto = 7;
              continue;
            }
          }
        }

      case 4:
        $.goto = 8;
        ($M.context.call = eff)(5);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(7);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, 9);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(10);
        continue;

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["14:10-14:16", "e", $s$1], ["15:9-15:15", "e", $s$1], ["16:6-16:12", "e", $s$1], [], ["18:6-18:12", "e", $s$1], ["21:6-21:12", "e", $s$1], ["23:6-23:20", "e", $s$1], ["25:6-25:13", "e", $s$1], [], [], []]);
module.exports = $M.exports();