var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a1: "$0",
  a2: "$1",
  oii: "$2"
}, null, false],
    $s$2 = [{
  i: "$0",
  b: "$1"
}, $s$1, false],
    $s$3 = [{
  j: "$0",
  k: "$1"
}, $s$2, false],
    $s$4 = [{
  i: "$0",
  b: "$1"
}, $s$1, false],
    $s$5 = [{
  j: "$0",
  k: "$1"
}, $s$4, false],
    $s$6 = [{
  ii: "$0",
  oj: "$1"
}, $s$1, false],
    $s$7 = [{
  j: "$0",
  mapTest: "$1"
}, $s$6, false],
    $s$8 = [{
  v: "$0",
  self: "$1"
}, $s$7, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a1($);
        $.$.$2 = $c.oii($);
        $.$.$1 = $c.a2($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("option", M, {
          varStorageField: "V",
          closVarPrefix: "",
          closVarPostfix: ""
        });
        continue;

      case 2:
        $.goto = 3;
        $M.brk(6);
        continue;

      case 3:
        $.goto = 4;
        $M.mcall("option", M, {
          closureStorageField: "VV",
          closVarPrefix: "$",
          closVarPostfix: "$$"
        });
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
}, null, null, [["1:0-1:74", "s", $s$1], ["1:0-1:73", "e", $s$1], ["14:0-18:3", "s", $s$1], ["14:0-18:2", "e", $s$1], [], [], []]);
$M.fun("m$1", "a1", "m$0", [], 0, function () {
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
}, null, null, [["4:2-4:12", "s", $s$2], ["11:2-11:17", "s", $s$2], ["11:9-11:16", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(2);
        continue;

      case 1:
        $.$.$1 = $.$.$0 + $.$$.$.$0;
        $.goto = 2;
        $M.brk(3);
        continue;

      case 2:
        $M.lset($.$$.$, "i", $.$$.$.$0 + 1);
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
}, null, null, [["7:4-7:18", "s", $s$3], ["8:4-8:8", "s", $s$3], ["9:4-9:19", "s", $s$3], ["9:11-9:18", "e", $s$3], [], [], []]);
$M.fun("m$3", "a2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.b($);
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        $.$.$0 = 0;
        $.goto = 2;
        $M.brk(11);
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
}, null, null, [["21:2-21:12", "s", $s$4], ["28:2-28:17", "s", $s$4], ["28:9-28:16", "e", $s$4], [], [], []]);
$M.fun("m$4", "b", "m$3", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(8);
        continue;

      case 1:
        $.$.$1 = $.$.$0 + $.$$.$.$0;
        $.goto = 2;
        $M.brk(9);
        continue;

      case 2:
        $M.lset($.$$.$, "i", $.$$.$.$0 + 1);
        $.goto = 3;
        $M.brk(10);
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
}, null, null, [["24:4-24:18", "s", $s$5], ["25:4-25:8", "s", $s$5], ["26:4-26:19", "s", $s$5], ["26:11-26:18", "e", $s$5], [], [], []]);
$M.fun("m$5", "oii", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.oj($);
        $.goto = 1;
        $M.brk(12);
        continue;

      case 1:
        $.$.$0 = 0;
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["32:2-32:13", "s", $s$6], [], [], []]);
$M.fun("m$6", "oj", "m$5", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.mapTest($);
        $.goto = 1;
        $M.brk(13);
        continue;

      case 1:
        $.$.$0 = 0;
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["34:4-34:14", "s", $s$7], [], [], []]);
$M.fun("m$7", "mapTest", "m$6", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(14);
        continue;

      case 1:
        $.$.$0 = [1, 2, 3];
        $.goto = 2;
        $M.brk(15);
        continue;

      case 2:
        $.$.$1 = {};
        $.goto = 3;
        $M.brk(16);
        continue;

      case 3:
        $.goto = 4;
        $p = $M.mcall("map", $.$.$0, $c.f($), $.$.$1);
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
}, null, null, [["36:6-36:26", "s", $s$8], ["37:6-37:22", "s", $s$8], ["38:6-41:8", "s", $s$8], ["38:13-41:7", "e", $s$8], [], [], []]);
$M.fun("m$8", null, "m$7", ["i", "x", "t"], 12, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $0 = $.$$.$$.$.$0;
        $M.lset($.$$.$$.$, "j", $0 + 1);
        $1 = $.$$.$$.$.$0;
        $M.lset($.$$.$$.$, "ii", $1 + 1);
        return $M.ret(`${i}@${x}[${$0}/${$1}]:${t === $.$$.$.$0}/${$.$$.$.$1 === $.self}`);

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
module.exports = $M.exports();