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
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 0;
        $.goto = 2;
        $M.brk(6);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff_2)();
        continue;

      case 3:
        return $M.ret($p);

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:12", "s", $s$2], ["12:2-12:17", "s", $s$2], ["12:9-12:16", "e", $s$2], [], [], []]);
$M.fun("m$2", "c", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.b($);
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.$.$0 = 0;
        $.goto = 2;
        $M.brk(5);
        continue;

      case 2:
        $M.lset($.$$.$, "i", $.$$.$.$0 + 1);
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:4-4:14", "s", $s$3], ["10:4-10:8", "s", $s$3], [], [], []]);
$M.fun("m$3", "b", "m$2", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(2);
        continue;

      case 1:
        $.$.$1 = $.$.$0 + $.$$.$$.$.$0;
        $.goto = 2;
        $M.brk(3);
        continue;

      case 2:
        $M.lset($.$$.$$.$, "i", $.$$.$$.$.$0 + $.$$.$.$0);
        $.goto = 3;
        $M.brk(4);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff_1)();
        continue;

      case 4:
        return $M.ret($p);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["6:6-6:20", "s", $s$4], ["7:6-7:13", "s", $s$4], ["8:6-8:21", "s", $s$4], ["8:13-8:20", "e", $s$4], [], [], []]);
module.exports = $M.exports();