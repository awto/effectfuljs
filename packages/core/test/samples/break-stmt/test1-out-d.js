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
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $c.f($);
        $.goto = 2;
        $M.brk(8);
        continue;

      case 2:
        $c.f($);
        $.goto = 3;
        $M.brk(17);
        continue;

      case 3:
        $c.f($);
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-9:3", "s", $s$1], ["10:0-20:3", "s", $s$1], ["21:0-29:3", "s", $s$1], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(3);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)(2);
        continue;

      case 5:
        if ($p) {
          $.goto = 7;
          $M.brk(4);
          continue;
        } else {
          $.goto = 6;
          $M.brk(5);
          continue;
        }

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(6);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(4);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(7);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(5);
        continue;

      case 11:
        return $M.ret();

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", $s$1], ["2:2-2:8", "e", $s$1], ["3:2-6:3", "s", $s$1], ["4:4-5:16", "s", $s$1], ["4:8-4:14", "e", $s$1], ["4:16-4:26", "s", $s$1], ["5:9-5:15", "e", $s$1], ["7:2-7:9", "s", $s$1], ["7:2-7:8", "e", $s$1], ["8:2-8:9", "s", $s$1], ["8:2-8:8", "e", $s$1], [], [], []]);
$M.fun("m$2", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(9);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(10);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(11);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)(2);
        continue;

      case 5:
        if ($p) {
          $.goto = 12;
          $M.brk(12);
          continue;
        } else {
          $.goto = 6;
          $M.brk(14);
          continue;
        }

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(15);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(4);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(16);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(5);
        continue;

      case 11:
        return $M.ret();

      case 12:
        $.goto = 13;
        ($M.context.call = eff)("a");
        continue;

      case 13:
        $.goto = 7;
        $M.brk(13);
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["11:2-11:9", "s", $s$1], ["11:2-11:8", "e", $s$1], ["12:2-17:3", "s", $s$1], ["13:4-16:18", "s", $s$1], ["13:8-13:14", "e", $s$1], ["14:6-14:15", "s", $s$1], ["16:11-16:17", "e", $s$1], ["18:2-18:9", "s", $s$1], ["18:2-18:8", "e", $s$1], ["19:2-19:9", "s", $s$1], ["19:2-19:8", "e", $s$1], [], ["14:6-14:14", "e", $s$1], ["15:6-15:16", "s", $s$1], [], []]);
$M.fun("m$3", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(18);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(19);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(2);
        continue;

      case 4:
        if ($p) {
          $.goto = 10;
          $M.brk(20);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $M.brk(22);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(4);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(23);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(5);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $.goto = 11;
        ($M.context.call = eff)("a");
        continue;

      case 11:
        $.goto = 12;
        $M.brk(21);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = eff)("b");
        continue;

      case 13:
        return $M.ret($p);

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:2-22:9", "s", $s$1], ["22:2-22:8", "e", $s$1], ["23:2-26:3", "s", $s$1], ["23:6-23:12", "e", $s$1], ["24:4-24:13", "s", $s$1], ["27:2-27:9", "s", $s$1], ["27:2-27:8", "e", $s$1], ["28:2-28:9", "s", $s$1], ["28:2-28:8", "e", $s$1], [], ["24:4-24:12", "e", $s$1], ["25:4-25:20", "s", $s$1], ["25:11-25:19", "e", $s$1], [], [], []]);
$M.fun("m$4", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(24);
        continue;

      case 1:
        if (e) {
          $.goto = 3;
          $M.brk(25);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        return $M.ret();

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)("b");
        continue;

      case 4:
        return $M.ret($p);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["31:2-33:3", "s", $s$1], ["32:4-32:20", "s", $s$1], [], ["32:11-32:19", "e", $s$1], [], [], []]);
module.exports = $M.exports();