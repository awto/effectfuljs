var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  zzz: "$1"
}, null, false],
    $s$2 = [{
  i: "$0",
  k: "$1",
  b: "$2"
}, $s$1, false],
    $s$3 = [{
  j: "$0"
}, $s$2, false],
    $s$4 = [{
  zz: "$0",
  aaaa: "$1"
}, $s$1, false],
    $s$5 = [{
  bbbb: "$0"
}, $s$4, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.zzz($);
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
        $.$.$2 = $c.b($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(1, $.$.$0, $.$.$1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.$.$1++;
        $.goto = 5;
        $M.brk(6);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(4, $.$.$0, $.$.$1);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(7);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(5, $.$.$0, $.$.$1);
        continue;

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-3:10", "s", $s$2], ["4:2-4:15", "s", $s$2], ["4:2-4:14", "e", $s$2], ["5:2-5:6", "s", $s$2], ["11:2-11:15", "s", $s$2], ["11:2-11:14", "e", $s$2], ["12:2-12:15", "s", $s$2], ["12:2-12:14", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        $.$.$0 = $.$$.$.$0;
        $.goto = 2;
        $M.brk(4);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(2, $.$.$0);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(5);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(3, $.$$.$.$0);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:4-7:14", "s", $s$3], ["8:4-8:14", "s", $s$3], ["8:4-8:13", "e", $s$3], ["9:4-9:14", "s", $s$3], ["9:4-9:13", "e", $s$3], [], [], []]);
$M.fun("m$3", "zzz", "m$0", ["zz"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.aaaa($);
        $.$.$1 = $c.aaaa($);
        $.goto = 1;
        $M.brk(8);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = $.$.$1)();
        continue;

      case 2:
        $.goto = 3;
        $M.brk(11);
        continue;

      case 3:
        $.$.$1 = $c.bbbb($);
        $.goto = 4;
        $M.brk(13);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = $.$.$1)();
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["16:2-16:9", "s", $s$4], ["16:2-16:8", "e", $s$4], ["23:2-25:4", "s", $s$4], ["26:2-26:9", "s", $s$4], ["26:2-26:8", "e", $s$4], [], [], []]);
$M.fun("m$4", "aaaa", "m$3", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(9);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff1)();
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
}, null, null, [["18:4-18:11", "s", $s$4], ["18:4-18:10", "e", $s$4], [], [], []]);
$M.fun("m$5", "aaaa", "m$3", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(10);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff2)();
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
}, null, null, [["21:4-21:11", "s", $s$4], ["21:4-21:10", "e", $s$4], [], [], []]);
$M.fun("m$6", "bbbb", "m$3", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(12);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff3)();
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
}, null, null, [["24:4-24:11", "s", $s$5], ["24:4-24:10", "e", $s$5], [], [], []]);
module.exports = $M.exports();