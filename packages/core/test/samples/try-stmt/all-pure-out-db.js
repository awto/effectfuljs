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
        ($M.context.call = console.log).dbg$call(console, "in");
        continue;

      case 1:
        $0 = $.value;
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "exception", $.$.$0);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "inner");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "out");
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
}, function ($) {
  switch ($.state) {
    case 2:
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, null, [["2:2-2:19", "e", $s$1], ["6:4-6:31", "e", $s$2], ["4:4-4:24", "e", $s$1], ["8:2-8:20", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "in");
        continue;

      case 1:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "fin");
        continue;

      case 2:
        $0 = $.value;
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "exception", $.$.$0);
        continue;

      case 3:
        $.$.$1 = 4;
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, "inner");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "out");
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = $.$.$1;
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["12:2-12:19", "e", $s$1], ["18:4-18:22", "e", $s$1], ["16:4-16:31", "e", $s$3], ["14:4-14:24", "e", $s$1], ["20:2-20:20", "e", $s$1], [], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        ($M.context.call = console.log).dbg$call(console, "in");
        continue;

      case 1:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "fin");
        continue;

      case 2:
        $.$.$0 = 3;
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, "inner");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "out");
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = $.$.$0;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
      $.$.$0 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [["24:2-24:19", "e", $s$1], ["28:4-28:22", "e", $s$1], ["26:4-26:24", "e", $s$1], ["30:2-30:20", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();