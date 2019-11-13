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
        $p = ($M.context.call = eff)();
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $p = ($M.context.call = check)(1);
        continue;

      case 3:
        if ($.$.$0 === $p) {
          $.goto = 25;
          $M.brk(1);
          continue;
        } else {
          $.goto = 4;
          $p = ($M.context.call = check)(2);
          continue;
        }

      case 4:
        if ($.$.$0 === $p) {
          $.state = 5;
        } else {
          $.goto = 6;
          $p = ($M.context.call = check)(3);
          continue;
        }

      case 5:
        $.goto = 24;
        $M.brk(2);
        continue;

      case 6:
        if ($.$.$0 === $p) {
          $.state = 7;
        } else {
          $.goto = 8;
          $p = ($M.context.call = check)(4);
          continue;
        }

      case 7:
        $.goto = 22;
        $M.brk(3);
        continue;

      case 8:
        if ($.$.$0 === $p) {
          $.state = 9;
        } else {
          if ($.$.$0 === 5) {
            $.goto = 10;
            continue;
          } else {
            if ($.$.$0 === 6) {
              $.goto = 11;
              continue;
            } else {
              $.goto = 12;
              $p = ($M.context.call = check)(8);
              continue;
            }
          }
        }

      case 9:
        $.goto = 20;
        $M.brk(5);
        continue;

      case 10:
        $.goto = 19;
        $M.brk(7);
        continue;

      case 11:
        $.goto = 17;
        $M.brk(8);
        continue;

      case 12:
        if ($.$.$0 === $p) {
          $.state = 13;
        } else {
          $.goto = 14;
          continue;
        }

      case 13:
        $.goto = 15;
        $M.brk(10);
        continue;

      case 14:
        return $M.ret();

      case 15:
        $.goto = 16;
        ($M.context.call = effB)(3);
        continue;

      case 16:
        $.goto = 14;
        $M.brk(11);
        continue;

      case 17:
        $.goto = 18;
        ($M.context.call = console.log).dbg$call(console, 7);
        continue;

      case 18:
        $.goto = 14;
        $M.brk(9);
        continue;

      case 19:
        $.goto = 11;
        ($M.context.call = console.log).dbg$call(console, 6);
        continue;

      case 20:
        $.goto = 21;
        ($M.context.call = console.log).dbg$call(console, 5);
        continue;

      case 21:
        $.goto = 14;
        $M.brk(6);
        continue;

      case 22:
        $.goto = 23;
        ($M.context.call = effB)(2);
        continue;

      case 23:
        $.goto = 14;
        $M.brk(4);
        continue;

      case 24:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, 2);
        continue;

      case 25:
        $.goto = 5;
        ($M.context.call = effB)(1);
        continue;

      case 26:
        return $M.ret($.value);

      case 27:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-22:3", "s", $s$1], ["3:10-3:15", "e", $s$1], ["4:9-4:17", "e", $s$1], ["5:6-5:14", "s", $s$1], ["8:9-8:17", "e", $s$1], ["7:6-7:21", "s", $s$1], ["11:9-11:17", "e", $s$1], ["9:6-9:14", "s", $s$1], ["19:9-19:17", "e", $s$1], ["12:6-12:21", "s", $s$1], ["15:6-15:21", "s", $s$1], ["17:6-17:21", "s", $s$1], [], ["20:6-20:14", "s", $s$1], [], ["20:6-20:13", "e", $s$1], ["21:6-21:12", "s", $s$1], ["17:6-17:20", "e", $s$1], ["18:6-18:12", "s", $s$1], ["15:6-15:20", "e", $s$1], ["12:6-12:20", "e", $s$1], ["13:6-13:12", "s", $s$1], ["9:6-9:13", "e", $s$1], ["10:6-10:12", "s", $s$1], ["7:6-7:20", "e", $s$1], ["5:6-5:13", "e", $s$1], [], []]);
module.exports = $M.exports();