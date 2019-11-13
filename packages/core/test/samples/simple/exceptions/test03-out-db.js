var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false],
    $s$2 = [{
  e: "$0",
  error: "$1"
}, $s$1, false],
    $s$3 = [{
  error: "$2"
}, $s$2, false],
    $s$4 = [{
  e: "$0",
  error: "$1"
}, $s$1, false],
    $s$5 = [{
  error: "$2"
}, $s$4, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
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
        continue;

      case 1:
        $2 = $.value;
        $.$.$0 = $.$.$2;
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "1");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(1);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
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
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, null, [[], ["8:4-8:20", "e", $s$3], ["4:4-4:20", "e", $s$2], ["5:4-5:10", "e", $s$2], ["10:2-10:8", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $2 = $.value;
        $.$.$0 = $.$.$2;
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "1");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(1);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.$.$2 = null;
        $.goto = 4;
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
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 8;
      break;
  }
}, null, [[], ["20:4-20:20", "e", $s$5], ["16:4-16:20", "e", $s$4], ["17:4-17:10", "e", $s$4], ["23:2-23:8", "e", $s$4], [], [], [], []]);
module.exports = $M.exports();