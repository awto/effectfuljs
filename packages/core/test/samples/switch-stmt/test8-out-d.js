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
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)();
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)($.$.$0 += 1);
        continue;

      case 5:
        $.$.$1 = $p;
        $.goto = 6;
        $p = ($M.context.call = check)($.$.$0 += 2);
        continue;

      case 6:
        if ($.$.$1 === $p) {
          $.goto = 17;
          $M.brk(3);
          continue;
        } else {
          $.goto = 7;
          $p = ($M.context.call = check)($.$.$0 += 4);
          continue;
        }

      case 7:
        if ($.$.$1 === $p) {
          $.state = 8;
        } else {
          $.goto = 9;
          $p = ($M.context.call = check)($.$.$0 += 6);
          continue;
        }

      case 8:
        $.goto = 15;
        $M.brk(5);
        continue;

      case 9:
        if ($.$.$1 === $p) {
          $.state = 10;
        } else {
          $.goto = 11;
          continue;
        }

      case 10:
        $.goto = 14;
        $M.brk(7);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(8);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 13:
        return $M.ret();

      case 14:
        $.goto = 11;
        ($M.context.call = console.log).dbg$call(console, "hi", $.$.$0);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = effB)($.$.$0 += 5);
        continue;

      case 16:
        $.goto = 11;
        $M.brk(6);
        continue;

      case 17:
        $.goto = 18;
        ($M.context.call = effB)($.$.$0 += 3);
        continue;

      case 18:
        $.goto = 11;
        $M.brk(4);
        continue;

      case 19:
        return $M.ret($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-3:12", "s", $s$2], ["4:2-4:8", "s", $s$2], ["4:2-4:7", "e", $s$2], ["5:2-14:3", "s", $s$2], ["5:10-5:23", "e", $s$2], ["6:9-6:24", "e", $s$2], ["7:6-7:21", "s", $s$2], ["12:9-12:24", "e", $s$2], ["10:6-10:21", "s", $s$2], [], ["13:6-13:27", "s", $s$2], ["15:2-15:9", "s", $s$2], ["15:2-15:8", "e", $s$2], [], ["13:6-13:26", "e", $s$2], ["10:6-10:20", "e", $s$2], ["11:6-11:12", "s", $s$2], ["7:6-7:20", "e", $s$2], ["8:6-8:12", "s", $s$2], [], []]);
module.exports = $M.exports();