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
        $M.brk(0);
        continue;

      case 1:
        $2 = $.value;
        $.goto = 10;
        $M.brk(4);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(2);
        continue;

      case 4:
        $.goto = 5;
        $M.mcall("log", console, "1");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(3);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(1);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(6);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $M.lset($.$, "e", $.$.$2);
        $.goto = 11;
        $M.brk(5);
        continue;

      case 11:
        $.goto = 7;
        $M.mcall("log", console, "2");
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
    case 3:
    case 4:
    case 5:
    case 6:
      $.goto = 1;
      break;

    default:
      $.goto = 13;
      break;
  }
}, null, [["2:2-2:15", "s", $s$2], ["7:4-7:14", "s", $s$3], ["3:2-9:3", "s", $s$2], ["4:4-4:21", "s", $s$2], ["4:4-4:20", "e", $s$2], ["5:4-5:11", "s", $s$2], ["5:4-5:10", "e", $s$2], ["10:2-10:9", "s", $s$2], ["10:2-10:8", "e", $s$2], [], ["8:4-8:21", "s", $s$3], ["8:4-8:20", "e", $s$3], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(7);
        continue;

      case 1:
        $2 = $.value;
        $.goto = 10;
        $M.brk(11);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(8);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(9);
        continue;

      case 4:
        $.goto = 5;
        $M.mcall("log", console, "1");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(10);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(1);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(14);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $M.lset($.$, "e", $.$.$2);
        $.goto = 11;
        $M.brk(12);
        continue;

      case 11:
        $.goto = 12;
        $M.mcall("log", console, "2");
        continue;

      case 12:
        $.goto = 13;
        $M.brk(13);
        continue;

      case 13:
        $M.lset($.$, "error", null);
        $.goto = 7;
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 4:
    case 5:
    case 6:
      $.goto = 1;
      break;

    default:
      $.goto = 15;
      break;
  }
}, null, [["14:2-14:15", "s", $s$4], ["19:4-19:14", "s", $s$5], ["15:2-22:3", "s", $s$4], ["16:4-16:21", "s", $s$4], ["16:4-16:20", "e", $s$4], ["17:4-17:11", "s", $s$4], ["17:4-17:10", "e", $s$4], ["23:2-23:9", "s", $s$4], ["23:2-23:8", "e", $s$4], [], ["20:4-20:21", "s", $s$5], ["20:4-20:20", "e", $s$5], ["21:4-21:17", "s", $s$5], [], [], []]);
module.exports = $M.exports();