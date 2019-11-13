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
        $p = ($M.context.call = eff)();
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = check)(1);
        continue;

      case 2:
        if ($.$.$0 === $p) {
          $.goto = 4;
          ($M.context.call = effB)(1);
          continue;
        } else {
          $.goto = 3;
          $p = ($M.context.call = check)(2);
          continue;
        }

      case 3:
        if ($.$.$0 === $p) {
          $.state = 4;
        } else {
          $.goto = 5;
          $p = ($M.context.call = check)(3);
          continue;
        }

      case 4:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, 2);
        continue;

      case 5:
        if ($.$.$0 === $p) {
          $.state = 6;
        } else {
          $.goto = 7;
          $p = ($M.context.call = check)(4);
          continue;
        }

      case 6:
        $.goto = 13;
        ($M.context.call = effB)(2);
        continue;

      case 7:
        if ($.$.$0 === $p) {
          $.state = 8;
        } else {
          if ($.$.$0 === 5) {
            $.goto = 9;
            continue;
          } else {
            if ($.$.$0 === 6) {
              $.goto = 10;
              continue;
            } else {
              $.goto = 11;
              $p = ($M.context.call = check)(8);
              continue;
            }
          }
        }

      case 8:
        $.goto = 13;
        ($M.context.call = console.log).dbg$call(console, 5);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = console.log).dbg$call(console, 6);
        continue;

      case 10:
        $.goto = 13;
        ($M.context.call = console.log).dbg$call(console, 7);
        continue;

      case 11:
        if ($.$.$0 === $p) {
          $.state = 12;
        } else {
          $.goto = 13;
          continue;
        }

      case 12:
        $.goto = 13;
        ($M.context.call = effB)(3);
        continue;

      case 13:
        return $M.ret();

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:10-3:15", "e", $s$1], ["4:9-4:17", "e", $s$1], ["5:6-5:13", "e", $s$1], ["8:9-8:17", "e", $s$1], ["7:6-7:20", "e", $s$1], ["11:9-11:17", "e", $s$1], ["9:6-9:13", "e", $s$1], ["19:9-19:17", "e", $s$1], ["12:6-12:20", "e", $s$1], ["15:6-15:20", "e", $s$1], ["17:6-17:20", "e", $s$1], [], ["20:6-20:13", "e", $s$1], [], [], []]);
module.exports = $M.exports();