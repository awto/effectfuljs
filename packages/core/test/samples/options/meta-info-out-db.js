var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a2: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  c: "$1"
}, $s$1, false],
    $s$3 = [{
  m: "$0",
  b: "$1"
}, $s$2, false],
    $s$4 = [{
  j: "$0",
  k: "$1"
}, $s$3, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a2($);
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
$M.fun("m$1", "a2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.c($);
        $.$.$0 = 0;
        $.goto = 1;
        $p = ($M.context.call = eff_2)();
        continue;

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:9-12:16", "e", $s$2], [], [], []]);
$M.fun("m$2", "c", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.b($);
        $.$.$0 = 0;
        $.$$.$.$0++;
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
$M.fun("m$3", "b", "m$2", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $.$.$0 + $.$$.$$.$.$0;
        $.$$.$$.$.$0 += $.$$.$.$0;
        $.goto = 1;
        $p = ($M.context.call = eff_1)();
        continue;

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["8:13-8:20", "e", $s$4], [], [], []]);
module.exports = $M.exports();