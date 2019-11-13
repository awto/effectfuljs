var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  b: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.b($);
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
$M.fun("m$1", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        switch ($p) {
          case 1:
            $.goto = 12;
            $M.brk(1);
            continue;

          case 2:
            $.goto = 3;
            continue;

          default:
            $.goto = 4;
            continue;
        }

      case 3:
        $.goto = 7;
        $M.brk(3);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(7);
        $.state = 5;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(4);
        $.state = 6;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        $p = ($M.context.call = effB)(2);
        $.state = 8;

      case 8:
        if ($p) {
          $.goto = 6;
          $M.brk(4);
          continue;
        } else {
          $.state = 9;
        }

      case 9:
        $.goto = 10;
        $M.brk(5);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = effB)(3);
        continue;

      case 11:
        $.goto = 6;
        $M.brk(6);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = effB)(1);
        $.state = 13;

      case 13:
        if ($p) {
          $.goto = 6;
          $M.brk(2);
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 3;
        continue;

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-14:3", "s", $s$1], ["3:10-3:16", "e", $s$1], ["5:6-5:25", "s", $s$1], ["7:6-9:7", "s", $s$1], ["13:6-13:13", "s", $s$1], ["13:6-13:12", "e", $s$1], [], ["7:10-7:17", "e", $s$1], ["8:8-8:14", "s", $s$1], ["10:6-10:14", "s", $s$1], ["10:6-10:13", "e", $s$1], ["11:6-11:12", "s", $s$1], ["5:10-5:17", "e", $s$1], ["5:19-5:25", "s", $s$1], [], [], []]);
module.exports = $M.exports();