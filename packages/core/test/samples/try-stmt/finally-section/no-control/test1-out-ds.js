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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 7;
        $M.brk(2);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.$.$0 = 4;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 8:
        $.goto = $.$.$0;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$0 = 9;
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, [["2:2-6:3", "s", $s$1], ["5:4-5:24", "s", $s$1], ["3:4-3:19", "s", $s$1], ["3:4-3:18", "e", $s$1], ["7:2-7:25", "s", $s$1], ["7:2-7:24", "e", $s$1], [], ["5:4-5:23", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(4);
        continue;

      case 1:
        $.goto = 9;
        $M.brk(7);
        continue;

      case 2:
        $0 = $.value;
        $.goto = 8;
        $M.brk(6);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(5);
        continue;

      case 4:
        $.$.$1 = 5;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(8);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 5;
        ($M.context.call = eff)("in `catch`", $.$.$0);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 10:
        $.goto = $.$.$1;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 8:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 3:
    case 4:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 8:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [["11:2-17:3", "s", $s$1], ["16:4-16:24", "s", $s$1], ["14:4-14:25", "s", $s$2], ["12:4-12:19", "s", $s$1], ["12:4-12:18", "e", $s$1], ["18:2-18:25", "s", $s$1], ["18:2-18:24", "e", $s$1], [], ["14:4-14:24", "e", $s$2], ["16:4-16:23", "e", $s$1], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(9);
        continue;

      case 1:
        $.goto = 7;
        $M.brk(11);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(10);
        continue;

      case 3:
        $.$.$0 = 4;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(12);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        $M.mcall("log", console, "in `finally`");
        continue;

      case 8:
        $.goto = $.$.$0;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$0 = 9;
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, [["22:2-26:3", "s", $s$1], ["25:4-25:32", "s", $s$1], ["23:4-23:19", "s", $s$1], ["23:4-23:18", "e", $s$1], ["27:2-27:25", "s", $s$1], ["27:2-27:24", "e", $s$1], [], ["25:4-25:31", "e", $s$1], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(13);
        continue;

      case 1:
        $.goto = 7;
        $M.brk(15);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(14);
        continue;

      case 3:
        $.$.$0 = 4;
        $.goto = 1;
        $M.mcall("log", console, "in body");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(16);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 8:
        $.goto = $.$.$0;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$0 = 9;
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, [["31:2-35:3", "s", $s$1], ["34:4-34:24", "s", $s$1], ["32:4-32:27", "s", $s$1], ["32:4-32:26", "e", $s$1], ["36:2-36:25", "s", $s$1], ["36:2-36:24", "e", $s$1], [], ["34:4-34:23", "e", $s$1], [], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(17);
        continue;

      case 1:
        $.goto = 21;
        $M.brk(25);
        continue;

      case 2:
        $0 = $.value;
        $.goto = 16;
        $M.brk(22);
        continue;

      case 3:
        $.goto = 4;
        $M.mcall("log", console, "before");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(18);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)("before");
        continue;

      case 6:
        $.goto = 7;
        $M.brk(19);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(20);
        continue;

      case 8:
        $.goto = 9;
        $M.mcall("log", console, "in body");
        continue;

      case 9:
        $.goto = 10;
        $M.brk(21);
        continue;

      case 10:
        $.$.$1 = 11;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 11:
        $.goto = 12;
        $M.brk(28);
        continue;

      case 12:
        $.goto = 13;
        $M.mcall("log", console, "after `finally`");
        continue;

      case 13:
        $.goto = 14;
        $M.brk(29);
        continue;

      case 14:
        $.goto = 15;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 15:
        return $M.ret();

      case 16:
        $.goto = 17;
        $M.mcall("log", console, "catch", $.$.$0);
        continue;

      case 17:
        $.goto = 18;
        $M.brk(23);
        continue;

      case 18:
        $.goto = 19;
        ($M.context.call = eff)("catch", $.$.$0);
        continue;

      case 19:
        $.goto = 20;
        $M.brk(24);
        continue;

      case 20:
        $.goto = 11;
        $M.mcall("log", console, "catch", $.$.$0);
        continue;

      case 21:
        $.goto = 22;
        $M.mcall("log", console, "in finally");
        continue;

      case 22:
        $.goto = 23;
        $M.brk(26);
        continue;

      case 23:
        $.goto = 24;
        ($M.context.call = eff)("in `finally`");
        continue;

      case 24:
        $.goto = 25;
        $M.brk(27);
        continue;

      case 25:
        $.goto = 26;
        $M.mcall("log", console, "in finally 2");
        continue;

      case 26:
        $.goto = $.$.$1;
        continue;

      case 27:
        return $M.ret($.value);

      case 28:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      $.$.$1 = 28;
      $.goto = 1;
      break;

    case 7:
    case 8:
    case 9:
    case 10:
      $.goto = 2;
      break;

    default:
      $.goto = 28;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 7:
    case 8:
    case 9:
    case 10:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      $.$.$1 = 27;
      $.goto = 1;
      break;

    default:
      $.goto = 27;
      break;
  }
}, [["40:2-40:24", "s", $s$1], ["50:4-50:30", "s", $s$1], ["46:4-46:28", "s", $s$3], ["40:2-40:23", "e", $s$1], ["41:2-41:16", "s", $s$1], ["41:2-41:15", "e", $s$1], ["42:2-53:3", "s", $s$1], ["43:4-43:27", "s", $s$1], ["43:4-43:26", "e", $s$1], ["44:4-44:19", "s", $s$1], ["44:4-44:18", "e", $s$1], ["54:2-54:33", "s", $s$1], ["54:2-54:32", "e", $s$1], ["55:2-55:25", "s", $s$1], ["55:2-55:24", "e", $s$1], [], ["46:4-46:27", "e", $s$3], ["47:4-47:20", "s", $s$3], ["47:4-47:19", "e", $s$3], ["48:4-48:28", "s", $s$3], ["48:4-48:27", "e", $s$3], ["50:4-50:29", "e", $s$1], ["51:4-51:24", "s", $s$1], ["51:4-51:23", "e", $s$1], ["52:4-52:32", "s", $s$1], ["52:4-52:31", "e", $s$1], [], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(30);
        continue;

      case 1:
        $.goto = 9;
        $M.brk(33);
        continue;

      case 2:
        $0 = $.value;
        $.goto = 8;
        $M.brk(32);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(31);
        continue;

      case 4:
        $.$.$1 = 5;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(34);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 5;
        ($M.context.call = eff)("in `catch`");
        continue;

      case 9:
        $.goto = 10;
        $M.mcall("log", console, "in `finally`");
        continue;

      case 10:
        $.goto = $.$.$1;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 8:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 3:
    case 4:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 8:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [["59:2-65:3", "s", $s$1], ["64:4-64:32", "s", $s$1], ["62:4-62:22", "s", $s$4], ["60:4-60:19", "s", $s$1], ["60:4-60:18", "e", $s$1], ["66:2-66:25", "s", $s$1], ["66:2-66:24", "e", $s$1], [], ["62:4-62:21", "e", $s$4], ["64:4-64:31", "e", $s$1], [], [], []]);
$M.fun("m$7", "g", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(35);
        continue;

      case 1:
        $.goto = 9;
        $M.brk(38);
        continue;

      case 2:
        $0 = $.value;
        $.goto = 8;
        $M.brk(37);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(36);
        continue;

      case 4:
        $.$.$1 = 5;
        $.goto = 1;
        ($M.context.call = eff)("in body");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(39);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("after `finally`");
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 5;
        $M.mcall("log", console, "in `catch`");
        continue;

      case 9:
        $.goto = 10;
        $M.mcall("log", console, "in `finally`");
        continue;

      case 10:
        $.goto = $.$.$1;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 8:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 3:
    case 4:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 8:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [["70:2-76:3", "s", $s$1], ["75:4-75:32", "s", $s$1], ["73:4-73:30", "s", $s$5], ["71:4-71:19", "s", $s$1], ["71:4-71:18", "e", $s$1], ["77:2-77:25", "s", $s$1], ["77:2-77:24", "e", $s$1], [], ["73:4-73:29", "e", $s$5], ["75:4-75:31", "e", $s$1], [], [], []]);
module.exports = $M.exports();