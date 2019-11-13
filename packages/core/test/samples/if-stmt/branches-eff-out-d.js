var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  e: "$4",
  f: "$5"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$5 = $c.f($);
        $.$.$4 = $c.e($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.b($);
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
        if (true) {
          $.goto = 4;
          $M.brk(1);
          continue;
        } else {
          $.goto = 2;
          $M.brk(2);
          continue;
        }

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        return $M.ret($p);

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)(1);
        continue;

      case 5:
        return $M.ret($p);

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-4:21", "s", $s$1], ["3:12-3:26", "s", $s$1], ["4:14-4:20", "e", $s$1], [], ["3:19-3:25", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        if (true) {
          $.goto = 4;
          $M.brk(4);
          continue;
        } else {
          $.goto = 2;
          $M.brk(5);
          continue;
        }

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        return $M.ret($p);

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)(1);
        continue;

      case 5:
        return $M.ret($p);

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:2-8:21", "s", $s$1], ["7:12-7:26", "s", $s$1], ["8:14-8:20", "e", $s$1], [], ["7:19-7:25", "e", $s$1], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(8);
        continue;

      case 1:
        if (true) {
          $.goto = 8;
          $M.brk(9);
          continue;
        } else {
          $.goto = 2;
          $M.brk(10);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(2);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(11);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(3);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(12);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(4);
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 3;
        ($M.context.call = eff)(1);
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["13:2-14:14", "s", $s$1], ["13:12-13:19", "s", $s$1], ["14:7-14:13", "e", $s$1], ["15:2-15:9", "s", $s$1], ["15:2-15:8", "e", $s$1], ["16:2-16:9", "s", $s$1], ["16:2-16:8", "e", $s$1], [], ["13:12-13:18", "e", $s$1], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(13);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(14);
        continue;

      case 3:
        if (true) {
          $.goto = 10;
          $M.brk(15);
          continue;
        } else {
          $.goto = 4;
          $M.brk(16);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(17);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(18);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(4);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $.goto = 5;
        ($M.context.call = eff)(1);
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["20:2-20:11", "s", $s$1], ["20:2-20:10", "e", $s$1], ["21:2-22:14", "s", $s$1], ["21:12-21:19", "s", $s$1], ["22:7-22:13", "e", $s$1], ["23:2-23:9", "s", $s$1], ["23:2-23:8", "e", $s$1], ["24:2-24:9", "s", $s$1], ["24:2-24:8", "e", $s$1], [], ["21:12-21:18", "e", $s$1], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(19);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        if ($p) {
          $.goto = 4;
          $M.brk(20);
          continue;
        } else {
          $.goto = 3;
          $M.brk(21);
          continue;
        }

      case 3:
        return $M.ret(2);

      case 4:
        return $M.ret(1);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["28:2-29:16", "s", $s$1], ["28:6-28:12", "e", $s$1], ["28:14-28:23", "s", $s$1], [], [], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(23);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(1);
        continue;

      case 2:
        if ($p) {
          $.goto = 4;
          $M.brk(24);
          continue;
        } else {
          $.goto = 3;
          $M.brk(25);
          continue;
        }

      case 3:
        return $M.ret(2);

      case 4:
        return $M.ret(1);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["34:2-35:16", "s", $s$1], ["34:6-34:12", "e", $s$1], ["34:14-34:23", "s", $s$1], [], [], [], []]);
module.exports = $M.exports();