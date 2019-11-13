var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  a_1: "$1",
  c: "$2",
  d: "$3"
}, null, false],
    $s$2 = [{
  z: "$0"
}, $s$1, false],
    $s$3 = [{
  z: "$0"
}, $s$1, false],
    $s$4 = [{
  z: "$0"
}, $s$1, false],
    $s$5 = [{
  z: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.a_1($);
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
$M.fun("m$1", "a", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        switch ($.$.$0) {
          case 1:
            $.goto = 2;
            ($M.context.call = eff)(1);
            continue;

          default:
            $.goto = 1;
            continue;
        }

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(2);
        $.state = 2;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(3);
        $.state = 3;

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
}, null, null, [["4:6-4:12", "e", $s$2], ["7:6-7:12", "e", $s$2], ["9:2-9:8", "e", $s$2], [], [], []]);
$M.fun("m$2", "a_1", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        switch ($.$.$0) {
          case 1:
            $.goto = 3;
            ($M.context.call = eff)(1);
            continue;

          case 2:
            $.goto = 1;
            continue;

          default:
            $.goto = 2;
            continue;
        }

      case 1:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "1");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "2");
        $.state = 3;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(3);
        $.state = 4;

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
}, null, null, [["14:6-14:12", "e", $s$3], ["17:6-17:22", "e", $s$3], ["20:6-20:22", "e", $s$3], ["22:2-22:8", "e", $s$3], [], [], []]);
$M.fun("m$3", "c", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        switch ($.$.$0) {
          case 1:
            $.goto = 4;
            ($M.context.call = eff)(1);
            continue;

          case 2:
            $.goto = 1;
            continue;

          case 3:
            $.goto = 2;
            continue;

          default:
            $.goto = 3;
            continue;
        }

      case 1:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "z");
        $.state = 3;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(3);
        $.state = 4;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(4);
        $.state = 5;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(5);
        $.state = 6;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["29:8-29:14", "e", $s$4], ["32:8-32:14", "e", $s$4], ["35:8-35:24", "e", $s$4], ["37:8-37:14", "e", $s$4], ["39:4-39:10", "e", $s$4], ["41:2-41:8", "e", $s$4], [], [], []]);
$M.fun("m$4", "d", "m$0", ["z"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        switch ($.$.$0) {
          case 1:
            $.goto = 4;
            ($M.context.call = eff)(1);
            continue;

          case 2:
            $.goto = 1;
            continue;

          case 3:
            $.goto = 2;
            continue;

          default:
            $.goto = 3;
            continue;
        }

      case 1:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 2:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, "z");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(3);
        $.state = 4;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(4);
        $.state = 5;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(6);
        $.state = 6;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 5;
        ($M.context.call = eff)(5);
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["49:10-49:16", "e", $s$5], ["52:10-52:16", "e", $s$5], ["55:10-55:26", "e", $s$5], ["58:10-58:16", "e", $s$5], ["60:6-60:12", "e", $s$5], ["65:2-65:8", "e", $s$5], [], ["63:4-63:10", "e", $s$5], [], []]);
module.exports = $M.exports();