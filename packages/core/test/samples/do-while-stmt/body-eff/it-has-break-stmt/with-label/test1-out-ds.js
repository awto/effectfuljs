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
}, null, null, [["1:0-27:3", "s", null], [], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(0);
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
        $M.brk(4);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(1);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(5);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(6);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(2);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(7);
        continue;

      case 10:
        $.goto = 11;
        $p = ($M.context.call = eff)(3);
        continue;

      case 11:
        if ($p) {
          $.goto = 35;
          $M.brk(8);
          continue;
        } else {
          $.state = 12;
        }

      case 12:
        $.goto = 13;
        $M.brk(10);
        continue;

      case 13:
        $.goto = 14;
        $p = ($M.context.call = eff)(3);
        continue;

      case 14:
        if ($p) {
          $.goto = 33;
          $M.brk(11);
          continue;
        } else {
          $.state = 15;
        }

      case 15:
        $.goto = 16;
        $M.brk(13);
        continue;

      case 16:
        $.goto = 17;
        $p = ($M.context.call = eff)(5);
        continue;

      case 17:
        if ($p) {
          $.goto = 31;
          $M.brk(14);
          continue;
        } else {
          $.state = 18;
        }

      case 18:
        $.goto = 19;
        $M.brk(16);
        continue;

      case 19:
        $.goto = 20;
        $p = ($M.context.call = eff)(7);
        continue;

      case 20:
        if ($p) {
          $.goto = 29;
          $M.brk(17);
          continue;
        } else {
          $.state = 21;
        }

      case 21:
        $.goto = 22;
        $p = ($M.context.call = eff)(9);
        continue;

      case 22:
        if ($p) {
          $.goto = 7;
          continue;
        } else {
          $.state = 23;
        }

      case 23:
        $.goto = 24;
        $M.brk(19);
        continue;

      case 24:
        $.goto = 25;
        ($M.context.call = eff)(10);
        continue;

      case 25:
        if (true) {
          $.goto = 4;
          continue;
        } else {
          $.state = 26;
        }

      case 26:
        $.goto = 27;
        $M.brk(20);
        continue;

      case 27:
        $.goto = 28;
        ($M.context.call = eff)(11);
        continue;

      case 28:
        return $M.ret();

      case 29:
        $.goto = 30;
        ($M.context.call = eff)(8);
        continue;

      case 30:
        $.goto = 26;
        $M.brk(18);
        continue;

      case 31:
        $.goto = 32;
        ($M.context.call = eff)(6);
        continue;

      case 32:
        $.goto = 25;
        $M.brk(15);
        continue;

      case 33:
        $.goto = 34;
        ($M.context.call = eff)(4);
        continue;

      case 34:
        $.goto = 21;
        $M.brk(12);
        continue;

      case 35:
        $.goto = 36;
        ($M.context.call = eff)(4);
        continue;

      case 36:
        $.goto = 23;
        $M.brk(9);
        continue;

      case 37:
        return $M.ret($.value);

      case 38:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:9", "s", null], ["2:2-2:8", "e", null], ["3:2-25:17", "s", null], ["3:7-25:17", "s", null], ["4:4-4:11", "s", null], ["4:4-4:10", "e", null], ["5:4-23:21", "s", null], ["6:6-6:13", "s", null], ["6:6-6:12", "e", null], ["7:6-10:7", "s", null], ["7:10-7:16", "e", null], ["8:8-8:15", "s", null], ["11:6-14:7", "s", null], ["11:10-11:16", "e", null], ["12:8-12:15", "s", null], ["15:6-18:7", "s", null], ["15:10-15:16", "e", null], ["16:8-16:15", "s", null], ["19:6-22:7", "s", null], ["19:10-19:16", "e", null], ["20:8-20:15", "s", null], ["23:13-23:19", "e", null], [], ["24:4-24:12", "s", null], ["24:4-24:11", "e", null], [], ["26:2-26:10", "s", null], ["26:2-26:9", "e", null], [], ["20:8-20:14", "e", null], ["21:8-21:18", "s", null], ["16:8-16:14", "e", null], ["17:8-17:21", "s", null], ["12:8-12:14", "e", null], ["13:8-13:17", "s", null], ["8:8-8:14", "e", null], ["9:8-9:14", "s", null], [], []]);
module.exports = $M.exports();