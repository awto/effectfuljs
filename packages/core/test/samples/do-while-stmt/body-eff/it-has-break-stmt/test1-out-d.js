var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $c.f($);
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-8:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(2);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        if ($p) {
          $.goto = 9;
          $M.brk(3);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        $M.brk(4);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff)(2);
        continue;

      case 6:
        if ($p) {
          $.goto = 11;
          $M.brk(5);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        $M.brk(6);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(3);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = eff)(4);
        continue;

      case 10:
        if ($p) {
          $.goto = 1;
          continue;
        } else {
          $.state = 11;
        }

      case 11:
        $.goto = 12;
        $M.brk(7);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = eff)(5);
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
}, null, null, [["2:2-6:19", "s", null], ["3:4-3:25", "s", null], ["3:8-3:14", "e", null], ["3:16-3:25", "s", null], ["4:4-4:22", "s", null], ["4:8-4:14", "e", null], ["4:16-4:22", "s", null], ["5:4-5:11", "s", null], ["5:4-5:10", "e", null], ["6:11-6:17", "e", null], [], ["7:2-7:9", "s", null], ["7:2-7:8", "e", null], [], [], []]);
module.exports = $M.exports();