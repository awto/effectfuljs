var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a1: "$0",
  a2: "$1",
  a3: "$2",
  a4: "$3",
  a5: "$4"
}, null, false],
    $s$2 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3"
}, $s$1, false],
    $s$3 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3"
}, $s$1, false],
    $s$4 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3"
}, $s$1, false],
    $s$5 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3"
}, $s$1, false],
    $s$6 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a1($);
        $.$.$4 = $c.a5($);
        $.$.$3 = $c.a4($);
        $.$.$2 = $c.a3($);
        $.$.$1 = $c.a2($);
        $.goto = 1;
        ($M.context.call = M.option).dbg$call(M, {
          defunct: true,
          contextState: true,
          storeCont: true,
          inlinePureJumps: "tail"
        });
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.option).dbg$call(M, {
          inlineTailCoerce: "check"
        });
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          inlineTailCoerce: true
        });
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M.option).dbg$call(M, {
          inlineTailCoerce: {
            singelton: "token"
          }
        });
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = M.option).dbg$call(M, {
          inlineTailCoerce: {
            singelton: null,
            symbol: "sym"
          }
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
}, null, null, [["1:0-6:2", "e", $s$1], ["13:0-13:39", "e", $s$1], ["20:0-20:36", "e", $s$1], ["27:0-27:54", "e", $s$1], ["34:0-34:66", "e", $s$1], [], [], []]);
$M.fun("m$1", "a1", "m$0", ["a", "b", "c", "d"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = bb)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = cc)();
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
}, null, null, [["9:2-9:6", "e", $s$2], ["10:2-10:6", "e", $s$2], [], [], []]);
$M.fun("m$2", "a2", "m$0", ["a", "b", "c", "d"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = bb)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = cc)();
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
}, null, null, [["16:2-16:6", "e", $s$3], ["17:2-17:6", "e", $s$3], [], [], []]);
$M.fun("m$3", "a3", "m$0", ["a", "b", "c", "d"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = bb)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = cc)();
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
}, null, null, [["23:2-23:6", "e", $s$4], ["24:2-24:6", "e", $s$4], [], [], []]);
$M.fun("m$4", "a4", "m$0", ["a", "b", "c", "d"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = bb)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = cc)();
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
}, null, null, [["30:2-30:6", "e", $s$5], ["31:2-31:6", "e", $s$5], [], [], []]);
$M.fun("m$5", "a5", "m$0", ["a", "b", "c", "d"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = bb)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = cc)();
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
}, null, null, [["37:2-37:6", "e", $s$6], ["38:2-38:6", "e", $s$6], [], [], []]);
module.exports = $M.exports();