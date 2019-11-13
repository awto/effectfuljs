var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a1: "$0",
  a2: "$1"
}, null, false],
    $s$2 = [{
  a: "$0",
  b: "$1"
}, $s$1, false],
    $s$3 = [{
  a: "$0",
  b: "$1"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a1($);
        $.$.$1 = $c.a2($);
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
$M.fun("m$1", "a1", "m$0", ["a", "b"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $.goto = 3;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
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
}, function ($) {
  switch ($.state) {
    case 2:
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, null, [[], ["5:4-5:10", "e", $s$2], ["3:4-3:10", "e", $s$2], [], [], []]);
$M.fun("m$2", "a2", "m$0", ["a", "b"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        return $M.ret($.$.$1);

      case 2:
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
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
}, function ($) {
  switch ($.state) {
    case 2:
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, null, [[], [], ["11:4-11:10", "e", $s$3], [], [], []]);
module.exports = $M.exports();