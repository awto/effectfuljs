var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  e: "$4",
  f: "$5",
  g: "$6"
}, null, false],
    $s$2 = [{
  e: "$0"
}, $s$1, false],
    $s$3 = [{
  e: "$0"
}, $s$1, false],
    $s$4 = [{
  e: "$0"
}, $s$1, false],
    $s$5 = [{
  e: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$6 = $c.g($);
        $.$.$5 = $c.f($);
        $.$.$4 = $c.e($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
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
        $.goto = 5;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 2:
        $.$.$0 = 3;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = $.$.$0;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
      $.$.$0 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[], ["5:4-5:23", "e", $s$1], ["3:4-3:18", "e", $s$1], ["7:2-7:24", "e", $s$1], [], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        continue;

      case 1:
        $.goto = 6;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 2:
        $0 = $.value;
        $.goto = 4;
        ($M.context.call = eff)("in `catch`", $.$.$0);
        continue;

      case 3:
        $.$.$1 = 4;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = $.$.$1;
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
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [[], ["16:4-16:23", "e", $s$1], ["14:4-14:24", "e", $s$2], ["12:4-12:18", "e", $s$1], ["18:2-18:24", "e", $s$1], [], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "in `finally`");
        continue;

      case 2:
        $.$.$0 = 3;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = $.$.$0;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
      $.$.$0 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[], ["25:4-25:31", "e", $s$1], ["23:4-23:18", "e", $s$1], ["27:2-27:24", "e", $s$1], [], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $.goto = 5;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 2:
        $.$.$0 = 3;
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, "in body");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.goto = $.$.$0;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
      $.$.$0 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[], ["34:4-34:23", "e", $s$1], ["32:4-32:26", "e", $s$1], ["36:2-36:24", "e", $s$1], [], [], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "before");
        continue;

      case 1:
        $.goto = 11;
        ($M.context.call = console.log).dbg$call(console, "in finally");
        continue;

      case 2:
        $0 = $.value;
        $.goto = 9;
        ($M.context.call = console.log).dbg$call(console, "catch", $.$.$0);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("before");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "in body");
        continue;

      case 5:
        $.$.$1 = 6;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, "after `finally`");
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 8:
        return $M.ret();

      case 9:
        $.goto = 10;
        ($M.context.call = eff)("catch", $.$.$0);
        continue;

      case 10:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "catch", $.$.$0);
        continue;

      case 11:
        $.goto = 12;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = console.log).dbg$call(console, "in finally 2");
        continue;

      case 13:
        $.goto = $.$.$1;
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
    case 2:
    case 9:
    case 10:
      $.$.$1 = 15;
      $.goto = 1;
      break;

    case 4:
    case 5:
      $.goto = 2;
      break;

    default:
      $.goto = 15;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
    case 5:
    case 9:
    case 10:
      $.$.$1 = 14;
      $.goto = 1;
      break;

    default:
      $.goto = 14;
      break;
  }
}, [["40:2-40:23", "e", $s$1], ["50:4-50:29", "e", $s$1], ["46:4-46:27", "e", $s$3], ["41:2-41:15", "e", $s$1], ["43:4-43:26", "e", $s$1], ["44:4-44:18", "e", $s$1], ["54:2-54:32", "e", $s$1], ["55:2-55:24", "e", $s$1], [], ["47:4-47:19", "e", $s$3], ["48:4-48:27", "e", $s$3], ["51:4-51:23", "e", $s$1], ["52:4-52:31", "e", $s$1], [], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        continue;

      case 1:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "in `finally`");
        continue;

      case 2:
        $0 = $.value;
        $.goto = 4;
        ($M.context.call = eff)("in `catch`");
        continue;

      case 3:
        $.$.$1 = 4;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = $.$.$1;
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
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [[], ["64:4-64:31", "e", $s$1], ["62:4-62:21", "e", $s$4], ["60:4-60:18", "e", $s$1], ["66:2-66:24", "e", $s$1], [], [], [], []]);
$M.fun("m$7", "g", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        continue;

      case 1:
        $.goto = 6;
        ($M.context.call = console.log).dbg$call(console, "in `finally`");
        continue;

      case 2:
        $0 = $.value;
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "in `catch`");
        continue;

      case 3:
        $.$.$1 = 4;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = $.$.$1;
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
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [[], ["75:4-75:31", "e", $s$1], ["73:4-73:29", "e", $s$5], ["71:4-71:18", "e", $s$1], ["77:2-77:24", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();