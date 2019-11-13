var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  a_1: "$1",
  c: "$2",
  d: "$3"
}, null, false],
    $s$2 = [{
  z: "$0"
}, $s$1, false],
    $s$3 = [{
  z: "$0"
}, $s$1, false],
    $s$4 = [{
  z: "$0"
}, $s$1, false],
    $s$5 = [{
  z: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.a_1($);
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
$M.fun("m$1", "a", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        switch ($.$.$0) {
          case 1:
            $.goto = 7;
            $M.brk(1);
            continue;

          default:
            $.goto = 2;
            continue;
        }

      case 2:
        $.goto = 3;
        $M.brk(3);
        $.state = 3;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        $.state = 4;

      case 4:
        $.goto = 5;
        $M.brk(4);
        $.state = 5;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(3);
        $.state = 6;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(1);
        $.state = 8;

      case 8:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-8:3", "s", $s$2], ["4:6-4:13", "s", $s$2], ["7:6-7:13", "s", $s$2], ["7:6-7:12", "e", $s$2], ["9:2-9:9", "s", $s$2], ["9:2-9:8", "e", $s$2], [], ["4:6-4:12", "e", $s$2], ["5:6-5:12", "s", $s$2], [], []]);
$M.fun("m$2", "a_1", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        switch ($.$.$0) {
          case 1:
            $.goto = 10;
            $M.brk(6);
            continue;

          case 2:
            $.goto = 2;
            continue;

          default:
            $.goto = 3;
            continue;
        }

      case 2:
        $.goto = 8;
        $M.brk(8);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(10);
        $.state = 4;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "2");
        $.state = 5;

      case 5:
        $.goto = 6;
        $M.brk(11);
        $.state = 6;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        $.state = 7;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 9;
        ($M.context.call = console.log).dbg$call(console, "1");
        $.state = 9;

      case 9:
        $.goto = 5;
        $M.brk(9);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(1);
        $.state = 11;

      case 11:
        $.goto = 5;
        $M.brk(7);
        continue;

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:2-21:3", "s", $s$3], ["14:6-14:13", "s", $s$3], ["17:6-17:23", "s", $s$3], ["20:6-20:23", "s", $s$3], ["20:6-20:22", "e", $s$3], ["22:2-22:9", "s", $s$3], ["22:2-22:8", "e", $s$3], [], ["17:6-17:22", "e", $s$3], ["18:6-18:12", "s", $s$3], ["14:6-14:12", "e", $s$3], ["15:6-15:12", "s", $s$3], [], []]);
$M.fun("m$3", "c", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(12);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(13);
        continue;

      case 2:
        switch ($.$.$0) {
          case 1:
            $.goto = 15;
            $M.brk(14);
            continue;

          case 2:
            $.goto = 3;
            continue;

          case 3:
            $.goto = 4;
            continue;

          default:
            $.goto = 5;
            continue;
        }

      case 3:
        $.goto = 13;
        $M.brk(16);
        continue;

      case 4:
        $.goto = 12;
        $M.brk(18);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(19);
        $.state = 6;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        $.state = 7;

      case 7:
        $.goto = 8;
        $M.brk(20);
        $.state = 8;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(4);
        $.state = 9;

      case 9:
        $.goto = 10;
        $M.brk(21);
        $.state = 10;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(5);
        $.state = 11;

      case 11:
        return $M.ret();

      case 12:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "z");
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff)(2);
        $.state = 14;

      case 14:
        $.goto = 9;
        $M.brk(17);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = eff)(1);
        $.state = 16;

      case 16:
        $.goto = 7;
        $M.brk(15);
        continue;

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["26:2-40:3", "s", $s$4], ["27:4-38:5", "s", $s$4], ["29:8-29:15", "s", $s$4], ["32:8-32:15", "s", $s$4], ["35:8-35:25", "s", $s$4], ["37:8-37:15", "s", $s$4], ["37:8-37:14", "e", $s$4], ["39:4-39:11", "s", $s$4], ["39:4-39:10", "e", $s$4], ["41:2-41:9", "s", $s$4], ["41:2-41:8", "e", $s$4], [], ["35:8-35:24", "e", $s$4], ["32:8-32:14", "e", $s$4], ["33:8-33:18", "s", $s$4], ["29:8-29:14", "e", $s$4], ["30:8-30:14", "s", $s$4], [], []]);
$M.fun("m$4", "d", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(22);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(23);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(24);
        continue;

      case 3:
        switch ($.$.$0) {
          case 1:
            $.goto = 20;
            $M.brk(25);
            continue;

          case 2:
            $.goto = 4;
            continue;

          case 3:
            $.goto = 5;
            continue;

          default:
            $.goto = 6;
            continue;
        }

      case 4:
        $.goto = 18;
        $M.brk(27);
        continue;

      case 5:
        $.goto = 14;
        $M.brk(29);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(31);
        $.state = 7;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(3);
        $.state = 8;

      case 8:
        $.goto = 9;
        $M.brk(32);
        $.state = 9;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(4);
        $.state = 10;

      case 10:
        $.goto = 11;
        $M.brk(33);
        $.state = 11;

      case 11:
        $.goto = 12;
        $M.brk(35);
        $.state = 12;

      case 12:
        $.goto = 13;
        ($M.context.call = eff)(6);
        $.state = 13;

      case 13:
        return $M.ret();

      case 14:
        $.goto = 15;
        ($M.context.call = console.log).dbg$call(console, "z");
        $.state = 15;

      case 15:
        $.goto = 16;
        $M.brk(30);
        $.state = 16;

      case 16:
        $.goto = 17;
        $M.brk(34);
        $.state = 17;

      case 17:
        $.goto = 11;
        ($M.context.call = eff)(5);
        continue;

      case 18:
        $.goto = 19;
        ($M.context.call = eff)(2);
        $.state = 19;

      case 19:
        $.goto = 11;
        $M.brk(28);
        continue;

      case 20:
        $.goto = 21;
        ($M.context.call = eff)(1);
        $.state = 21;

      case 21:
        $.goto = 8;
        $M.brk(26);
        continue;

      case 22:
        return $M.ret($.value);

      case 23:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["45:2-64:3", "s", $s$5], ["46:4-62:5", "s", $s$5], ["47:6-59:7", "s", $s$5], ["49:10-49:17", "s", $s$5], ["52:10-52:17", "s", $s$5], ["55:10-55:27", "s", $s$5], ["58:10-58:17", "s", $s$5], ["58:10-58:16", "e", $s$5], ["60:6-60:13", "s", $s$5], ["60:6-60:12", "e", $s$5], ["61:6-61:17", "s", $s$5], ["65:2-65:9", "s", $s$5], ["65:2-65:8", "e", $s$5], [], ["55:10-55:26", "e", $s$5], ["56:10-56:21", "s", $s$5], ["63:4-63:11", "s", $s$5], ["63:4-63:10", "e", $s$5], ["52:10-52:16", "e", $s$5], ["53:10-53:21", "s", $s$5], ["49:10-49:16", "e", $s$5], ["50:10-50:16", "s", $s$5], [], []]);
module.exports = $M.exports();