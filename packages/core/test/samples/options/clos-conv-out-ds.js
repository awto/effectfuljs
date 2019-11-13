var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  i: "$0",
  yh: "$1",
  yh2: "$2"
}, null, false],
    $s$2 = [{
  a: "$0",
  j: "$1"
}, $s$1, false],
    $s$3 = [{
  eh: "$0"
}, $s$2, false],
    $s$4 = [{
  a: "$0",
  j: "$1"
}, $s$1, false],
    $s$5 = [{
  eh: "$0"
}, $s$4, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.yh($);
        $.$.$2 = $c.yh2($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff_top)();
        continue;

      case 3:
        $.goto = 4;
        $M.brk(6);
        continue;

      case 4:
        $.goto = 5;
        $M.mcall("option", M, {
          varStorageField: "$",
          closureStorageField: "$$"
        });
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
}, null, null, [["1:0-1:6", "s", $s$1], ["2:0-2:10", "s", $s$1], ["2:0-2:9", "e", $s$1], ["11:0-14:3", "s", $s$1], ["11:0-14:2", "e", $s$1], [], [], []]);
$M.fun("m$1", "yh", "m$0", ["a"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(2);
        continue;

      case 1:
        $.$.$1 = $M.lset($.$$.$, "i", $.$$.$.$0 + $.$.$0);
        $.goto = 2;
        $M.brk(3);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)();
        continue;

      case 3:
        $.goto = 4;
        $M.brk(4);
        continue;

      case 4:
        return $M.ret($c.eh($));

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:19", "s", $s$2], ["5:2-5:8", "s", $s$2], ["5:2-5:7", "e", $s$2], ["6:2-8:4", "s", $s$2], [], [], []]);
$M.fun("m$2", "eh", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)($M.lset($.$$.$, "i", $.$$.$.$0 + $.$$.$.$1));
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
}, null, null, [["7:4-7:18", "s", $s$3], ["7:4-7:17", "e", $s$3], [], [], []]);
$M.fun("m$3", "yh2", "m$0", ["a"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        $.$.$1 = $M.lset($.$$.$, "i", $.$$.$.$0 + $.$.$0);
        $.goto = 2;
        $M.brk(8);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)();
        continue;

      case 3:
        $.goto = 4;
        $M.brk(9);
        continue;

      case 4:
        return $M.ret($c.eh($));

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["17:2-17:19", "s", $s$4], ["18:2-18:8", "s", $s$4], ["18:2-18:7", "e", $s$4], ["19:2-21:4", "s", $s$4], [], [], []]);
$M.fun("m$4", "eh", "m$3", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(10);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)($M.lset($.$$.$$.$, "i", $.$$.$$.$.$0 + $.$$.$.$1));
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
}, null, null, [["20:4-20:18", "s", $s$5], ["20:4-20:17", "e", $s$5], [], [], []]);
module.exports = $M.exports();