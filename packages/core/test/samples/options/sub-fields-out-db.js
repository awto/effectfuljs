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
        ($M.context.call = M.option).dbg$call(M, {
          varStorageField: "V",
          closVarPrefix: "",
          closVarPostfix: ""
        });
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.option).dbg$call(M, {
          closureStorageField: "VV",
          closVarPrefix: "$",
          closVarPostfix: "$$"
        });
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
}, null, null, [["1:0-1:73", "e", $s$1], ["14:0-18:2", "e", $s$1], [], [], []]);
$M.fun("m$1", "a1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.b($);
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
}, null, null, [["11:9-11:16", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$1", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $.$.$0 + $.$$.$.$0;
        $.$$.$.$0++;
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
}, null, null, [["9:11-9:18", "e", $s$3], [], [], []]);
$M.fun("m$3", "a2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.b($);
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
}, null, null, [["28:9-28:16", "e", $s$4], [], [], []]);
$M.fun("m$4", "b", "m$3", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $.$.$0 + $.$$.$.$0;
        $.$$.$.$0++;
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
}, null, null, [["26:11-26:18", "e", $s$5], [], [], []]);
$M.fun("m$5", "oii", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.oj($);
        $.$.$0 = 0;
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
$M.fun("m$6", "oj", "m$5", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.mapTest($);
        $.$.$0 = 0;
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
$M.fun("m$7", "mapTest", "m$6", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = [1, 2, 3];
        $.$.$1 = {};
        $.goto = 1;
        $p = ($M.context.call = $.$.$0.map).dbg$call($.$.$0, $c.f($), $.$.$1);
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
}, null, null, [["38:13-41:7", "e", $s$8], [], [], []]);
$M.fun("m$8", null, "m$7", ["i", "x", "t"], 12, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret(`${i}@${x}[${$.$$.$$.$.$0++}/${$.$$.$$.$.$0++}]:${t === $.$$.$.$0}/${$.$$.$.$1 === $.self}`);

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