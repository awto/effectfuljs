var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2"
}, null, false],
    $s$2 = [{
  e: "$0"
}, $s$1, false],
    $s$3 = [{
  e: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
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
        $.goto = 2;
        $M.brk(0);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 9;
        $M.brk(3);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "in");
        continue;

      case 3:
        $.goto = 4;
        $M.brk(1);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "inner");
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = console.log).dbg$call(console, "out");
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "exception", $.$.$0);
        continue;

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, null, [["2:2-2:20", "s", $s$1], ["6:4-6:32", "s", $s$2], ["2:2-2:19", "e", $s$1], ["3:2-7:3", "s", $s$1], ["4:4-4:25", "s", $s$1], ["4:4-4:24", "e", $s$1], ["8:2-8:21", "s", $s$1], ["8:2-8:20", "e", $s$1], [], ["6:4-6:31", "e", $s$2], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(5);
        continue;

      case 1:
        $.goto = 11;
        $M.brk(9);
        continue;

      case 2:
        $0 = $.value;
        $.goto = 10;
        $M.brk(8);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "in");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(6);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(7);
        continue;

      case 6:
        $.$.$1 = 7;
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, "inner");
        continue;

      case 7:
        $.goto = 8;
        $M.brk(10);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = console.log).dbg$call(console, "out");
        continue;

      case 9:
        return $M.ret();

      case 10:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, "exception", $.$.$0);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = console.log).dbg$call(console, "fin");
        continue;

      case 12:
        $.goto = $.$.$1;
        continue;

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 10:
      $.$.$1 = 14;
      $.goto = 1;
      break;

    case 5:
    case 6:
      $.goto = 2;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 5:
    case 6:
    case 10:
      $.$.$1 = 13;
      $.goto = 1;
      break;

    default:
      $.goto = 13;
      break;
  }
}, [["12:2-12:20", "s", $s$1], ["18:4-18:23", "s", $s$1], ["16:4-16:32", "s", $s$3], ["12:2-12:19", "e", $s$1], ["13:2-19:3", "s", $s$1], ["14:4-14:25", "s", $s$1], ["14:4-14:24", "e", $s$1], ["20:2-20:21", "s", $s$1], ["20:2-20:20", "e", $s$1], [], ["16:4-16:31", "e", $s$3], ["18:4-18:22", "e", $s$1], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(11);
        continue;

      case 1:
        $.goto = 9;
        $M.brk(14);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "in");
        continue;

      case 3:
        $.goto = 4;
        $M.brk(12);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(13);
        continue;

      case 5:
        $.$.$0 = 6;
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, "inner");
        continue;

      case 6:
        $.goto = 7;
        $M.brk(15);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = console.log).dbg$call(console, "out");
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.goto = 10;
        ($M.context.call = console.log).dbg$call(console, "fin");
        continue;

      case 10:
        $.goto = $.$.$0;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 4:
    case 5:
      $.$.$0 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [["24:2-24:20", "s", $s$1], ["28:4-28:23", "s", $s$1], ["24:2-24:19", "e", $s$1], ["25:2-29:3", "s", $s$1], ["26:4-26:25", "s", $s$1], ["26:4-26:24", "e", $s$1], ["30:2-30:21", "s", $s$1], ["30:2-30:20", "e", $s$1], [], ["28:4-28:22", "e", $s$1], [], [], []]);
module.exports = $M.exports();