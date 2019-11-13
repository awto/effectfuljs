var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false],
    $s$2 = [{
  addLater: "$0"
}, $s$1, false],
    $s$3 = [{
  result: "$0"
}, $s$2, false],
    $s$4 = [{
  err: "$1"
}, $s$3, false],
    $s$5 = [{
  a: "$0",
  b: "$1",
  deferred: "$2"
}, $s$2, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("profile", M, "defaultMinimal");
        continue;

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["14:0-14:28", "s", $s$1], ["14:0-14:27", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        $M.mcall("reflect", M, monadish);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff)(1);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = M)($p);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(3);
        continue;

      case 8:
        $.goto = 9;
        $M.mcall("reflect", M, monadish + 2);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(4);
        continue;

      case 10:
        $.goto = 11;
        $p = $M.mcall("reify", M, $c.f($));
        continue;

      case 11:
        $.goto = 12;
        $M.mcall("log", console, $p);
        continue;

      case 12:
        return $M.ret();

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:11", "s", $s$1], ["2:2-2:10", "e", $s$1], ["3:2-3:22", "s", $s$1], ["3:2-3:21", "e", $s$1], ["4:2-4:12", "s", $s$1], ["4:4-4:10", "e", $s$1], ["4:2-4:11", "e", $s$1], ["5:2-5:26", "s", $s$1], ["5:2-5:25", "e", $s$1], ["6:2-11:4", "s", $s$1], ["7:4-10:6", "e", $s$1], ["6:2-11:3", "e", $s$1], [], [], []]);
$M.fun("m$2", null, "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(6);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["8:6-8:13", "s", $s$1], ["8:6-8:12", "e", $s$1], ["9:6-9:13", "s", $s$1], ["9:6-9:12", "e", $s$1], [], [], []]);
$M.fun("m$3", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.addLater($);
        $.goto = 1;
        $M.brk(8);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.mcall("reify", M, $c.f($));
        continue;

      case 2:
        $.goto = 3;
        $M.mcall("done", $p);
        continue;

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["17:2-25:12", "s", $s$2], ["17:2-25:4", "e", $s$2], ["17:2-25:11", "e", $s$2], [], [], []]);
$M.fun("m$4", null, "m$3", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(9);
        continue;

      case 1:
        $1 = $.value;
        $.goto = 11;
        $M.brk(13);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$$.$.$0)(1, 2);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = M)($p);
        continue;

      case 4:
        $.$.$0 = $p;
        $.goto = 5;
        $M.brk(10);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(11);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = expect)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.mcall("equal", $p.to, 3);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(12);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = done)();
        continue;

      case 10:
        return $M.ret();

      case 11:
        $.goto = 10;
        ($M.context.call = done)($.$.$1);
        continue;

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
      $.goto = 1;
      break;

    default:
      $.goto = 13;
      break;
  }
}, null, [["18:4-18:35", "s", $s$3], ["23:6-23:16", "s", $s$4], ["18:19-18:33", "e", $s$3], ["18:17-18:34", "e", $s$3], ["19:4-24:5", "s", $s$3], ["20:6-20:33", "s", $s$3], ["20:6-20:20", "e", $s$3], ["20:6-20:32", "e", $s$3], ["21:6-21:13", "s", $s$3], ["21:6-21:12", "e", $s$3], [], ["23:6-23:15", "e", $s$4], [], []]);
$M.fun("m$5", "addLater", "m$3", ["a", "b"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(14);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.mcall("defer", Q);
        continue;

      case 2:
        $.$.$2 = $p;
        $.goto = 3;
        $M.brk(15);
        continue;

      case 3:
        $.goto = 4;
        $M.mcall("nextTick", process, $c.f($));
        continue;

      case 4:
        $.goto = 5;
        $M.brk(17);
        continue;

      case 5:
        return $M.ret($.$.$2.promise);

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["28:4-28:29", "s", $s$5], ["28:19-28:28", "e", $s$5], ["29:4-31:7", "s", $s$5], ["29:4-31:6", "e", $s$5], ["32:4-32:28", "s", $s$5], [], [], []]);
$M.fun("m$6", null, "m$5", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(16);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("resolve", $.$$.$.$2, $.$$.$.$0 + $.$$.$.$1);
        continue;

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["30:6-30:30", "s", $s$5], ["30:6-30:29", "e", $s$5], [], [], []]);
module.exports = $M.exports();