var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a1: "$0",
  a2: "$1",
  a4: "$2",
  b3: "$3",
  top: "$4",
  b1: "$5",
  b2: "$6",
  b: "$7"
}, null, false],
    $s$2 = [{
  a3: "$0",
  f1: "$1",
  f2: "$2"
}, $s$1, false],
    $s$3 = [{
  f1: "$0"
}, $s$2, false],
    $s$4 = [{
  f2: "$0"
}, $s$2, false],
    $s$5 = [{
  a1: "$0",
  a6: "$1",
  a2: "$2",
  a7: "$3",
  a3: "$4",
  a: "$5",
  b: "$6"
}, $s$1, false],
    $s$6 = [{
  a8: "$0",
  a3: "$1",
  a5: "$2",
  f1: "$3",
  f2: "$4",
  f3: "$5"
}, $s$5, false],
    $s$7 = [{
  f1: "$0"
}, $s$6, false],
    $s$8 = [{
  a1: "$0"
}, $s$5, false],
    $s$9 = [{
  a3: "$0",
  f1: "$1"
}, $s$1, false],
    $s$10 = [{
  f1: "$0"
}, $s$9, false],
    $s$11 = [{
  a3: "$0",
  f1: "$1"
}, $s$1, false],
    $s$12 = [{
  f1: "$0"
}, $s$11, false],
    $s$13 = [{
  f: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = $c.b3($);
        $.$.$7 = $c.b($);
        $.$.$6 = $c.b2($);
        $.$.$5 = $c.b1($);
        $.$.$4 = $c.top($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(2);
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
}, null, null, [["1:0-1:7", "s", $s$1], ["2:0-2:7", "s", $s$1], ["3:0-3:7", "s", $s$1], [], [], []]);
$M.fun("m$1", "b3", "m$0", ["a3"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        $.$.$1 = $c.f1($);
        $.goto = 2;
        $M.brk(5);
        continue;

      case 2:
        $.$.$2 = $c.f2($);
        $.goto = 3;
        $M.brk(8);
        continue;

      case 3:
        return $M.ret($.$.$1);

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["6:2-8:4", "s", $s$2], ["9:2-12:4", "s", $s$2], ["13:2-13:12", "s", $s$2], [], [], []]);
$M.fun("m$2", "f1", "m$1", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(4);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 2:
        $M.lset($.$$.$, "a3", $p);
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:4-7:18", "s", $s$3], [null, null, null], [], [], []]);
$M.fun("m$3", "f2", "m$1", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(6);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 2:
        $M.lset($.$$.$, "a3", $p);
        $.goto = 3;
        $M.brk(7);
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 4:
        $M.lset($.$$.$, "a3", $p);
        return $M.retG();

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:4-10:18", "s", $s$4], [null, null, null], ["11:4-11:18", "s", $s$4], [null, null, null], [], [], []]);
$M.fun("m$4", "top", "m$0", ["a1", "a6"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$5 = $c.a($);
        $.$.$6 = $c.b($);
        $.goto = 1;
        $M.brk(9);
        continue;

      case 1:
        $.$.$2 = 10;
        $.$.$3 = 11;
        $.$.$4 = 12;
        $.goto = 2;
        $M.brk(23);
        continue;

      case 2:
        return $M.ret([$.$.$5, $.$.$6]);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["17:2-19:12", "s", $s$5], ["42:2-42:16", "s", $s$5], [], [], []]);
$M.fun("m$5", "a", "m$4", ["a8"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$4 = $c.f2($);
        $.$.$5 = $c.f3($);
        $.goto = 1;
        $M.brk(10);
        continue;

      case 1:
        $M.lset($.$$.$, "a1", $.$$.$.$0 + 2);
        $.goto = 2;
        $M.brk(11);
        continue;

      case 2:
        $.goto = 3;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 3:
        $.$.$6 = $p;
        $.goto = 4;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 4:
        $.goto = 5;
        $p = $M.yld($.$.$6 + $p);
        continue;

      case 5:
        $.$.$1 = $p;
        $.goto = 6;
        $M.brk(12);
        continue;

      case 6:
        $.goto = 7;
        $p = $M.yld($.$.$1);
        continue;

      case 7:
        $.$.$6 = $p;
        $.goto = 8;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 8:
        $.goto = 9;
        $p = $M.yld($.$.$6 + $p);
        continue;

      case 9:
        $.$.$2 = $p;
        $.goto = 10;
        $M.brk(13);
        continue;

      case 10:
        $.$.$3 = $c.f1($);
        $.goto = 11;
        $M.brk(20);
        continue;

      case 11:
        return $M.retG([$.$.$3, $.$.$4, $.$.$5]);

      case 12:
        return $M.retG($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["21:4-21:12", "s", $s$6], ["22:4-22:43", "s", $s$6], [null, null, null], [null, null, null], [null, null, null], ["23:4-23:43", "s", $s$6], [null, null, null], [null, null, null], [null, null, null], ["24:4-28:6", "s", $s$6], ["36:4-36:24", "s", $s$6], [], [], []]);
$M.fun("m$6", "f1", "m$5", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(14);
        continue;

      case 1:
        $M.lset($.$$.$, "a7", $.$$.$.$3 + 2);
        $.goto = 2;
        $M.brk(15);
        continue;

      case 2:
        $M.lset($.$$.$, "a8", $.$$.$.$0 + 3);
        $.goto = 3;
        $M.brk(16);
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 4:
        $.$.$1 = $p;
        $.goto = 5;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 5:
        $.goto = 6;
        $p = $M.yld($.$.$1 + $p);
        continue;

      case 6:
        return $M.retG($M.lset($.$$.$, "a3", $p));

      case 7:
        return $M.retG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["25:6-25:14", "s", $s$7], ["26:6-26:14", "s", $s$7], ["27:6-27:50", "s", $s$7], [null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$7", "f2", "m$5", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(17);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld($.$.$0 + $p);
        continue;

      case 4:
        $M.lset($.$$.$, "a3", $p);
        return $M.retG();

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["30:6-30:41", "s", $s$6], [null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$8", "f3", "m$5", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(18);
        continue;

      case 1:
        $M.lset($.$$.$, "a3", 11);
        $.goto = 2;
        $M.brk(19);
        continue;

      case 2:
        $M.lset($.$$.$, "a6", $.$$.$.$1 + 4);
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["33:6-33:14", "s", $s$6], ["34:6-34:14", "s", $s$6], [], [], []]);
$M.fun("m$9", "b", "m$4", ["a1"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(21);
        continue;

      case 1:
        $M.lset($.$, "a1", $.$.$0 + $.$$.$.$2);
        $.goto = 2;
        $M.brk(22);
        continue;

      case 2:
        $M.lset($.$$.$, "a6", $.$$.$.$1 + $.$$.$.$4);
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["39:4-39:13", "s", $s$8], ["40:4-40:13", "s", $s$8], [], [], []]);
$M.fun("m$10", "b1", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(24);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(25);
        continue;

      case 3:
        $.$.$1 = $c.f1($);
        $.goto = 4;
        $M.brk(27);
        continue;

      case 4:
        return $M.retG($.$.$1);

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["46:2-46:20", "s", $s$9], [null, null, null], ["47:2-49:4", "s", $s$9], ["50:2-50:12", "s", $s$9], [], [], []]);
$M.fun("m$11", "f1", "m$10", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(26);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 2:
        return $M.retG($M.lset($.$$.$, "a3", $p));

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["48:4-48:27", "s", $s$10], [null, null, null], [], [], []]);
$M.fun("m$12", "b2", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(28);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 2:
        $.$.$0 = $p;
        $.goto = 3;
        $M.brk(29);
        continue;

      case 3:
        $.$.$1 = $c.f1($);
        $.goto = 4;
        $M.brk(31);
        continue;

      case 4:
        return $M.retG($.$.$1);

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["54:2-54:20", "s", $s$11], [null, null, null], ["55:2-57:4", "s", $s$11], ["58:2-58:12", "s", $s$11], [], [], []]);
$M.fun("m$13", "f1", "m$12", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(30);
        continue;

      case 1:
        $M.lset($.$$.$, "a3", $.$$.$.$0);
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["56:4-56:12", "s", $s$12], [], [], []]);
$M.fun("m$14", "b", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 9;
        $M.brk(32);
        continue;

      case 1:
        $M.iterFin($.$.$5);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$2;
        continue;

      case 3:
        $M.iterFin($.$.$5);
        $.goto = $.$.$3;
        continue;

      case 4:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 5:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 13;
        continue;

      case 6:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 17;
        continue;

      case 7:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 21;
        continue;

      case 8:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 25;
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = $.$$.$.$4)();
        continue;

      case 10:
        $.goto = 11;
        $p = ($M.context.call = $p)();
        continue;

      case 11:
        $.$.$5 = $M.iterator($p);
        $.state = 12;

      case 12:
        $0 = $.$.$5.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 13;
        } else {
          $.goto = 14;
          continue;
        }

      case 13:
        $.$.$0 = $1;
        $.goto = 15;
        $M.brk(33);
        continue;

      case 14:
        $M.yld($1);
        $.goto = 12;
        continue;

      case 15:
        $.$.$5 = $M.iterator($.$.$0[0]);
        $.state = 16;

      case 16:
        $1 = $.$.$5.next();
        $0 = $1.value;

        if ($1.done) {
          $.state = 17;
        } else {
          $.goto = 18;
          continue;
        }

      case 17:
        $.goto = 19;
        $M.brk(34);
        continue;

      case 18:
        $M.yld($0);
        $.goto = 16;
        continue;

      case 19:
        $.$.$5 = $M.iterator($.$.$0[1]);
        $.state = 20;

      case 20:
        $0 = $.$.$5.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 21;
        } else {
          $.goto = 22;
          continue;
        }

      case 21:
        $.goto = 23;
        $M.brk(35);
        continue;

      case 22:
        $M.yld($1);
        $.goto = 20;
        continue;

      case 23:
        $.$.$5 = $M.iterator($.$.$0[2]);
        $.state = 24;

      case 24:
        $1 = $.$.$5.next();
        $0 = $1.value;

        if ($1.done) {
          $.state = 25;
        } else {
          $.goto = 26;
          continue;
        }

      case 25:
        return $M.retG();

      case 26:
        $M.yld($0);
        $.goto = 24;
        continue;

      case 27:
        return $M.retG($.value);

      case 28:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 5:
      $.$.$1 = 28;
      $.goto = 1;
      break;

    case 6:
      $.$.$2 = 28;
      $.goto = 2;
      break;

    case 7:
      $.$.$3 = 28;
      $.goto = 3;
      break;

    case 8:
      $.$.$4 = 28;
      $.goto = 4;
      break;

    case 26:
      $.goto = 8;
      break;

    case 22:
      $.goto = 7;
      break;

    case 18:
      $.goto = 6;
      break;

    case 14:
      $.goto = 5;
      break;

    default:
      $.goto = 28;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 8:
    case 26:
      $.$.$4 = 27;
      $.goto = 4;
      break;

    case 7:
    case 22:
      $.$.$3 = 27;
      $.goto = 3;
      break;

    case 6:
    case 18:
      $.$.$2 = 27;
      $.goto = 2;
      break;

    case 5:
    case 14:
      $.$.$1 = 27;
      $.goto = 1;
      break;

    default:
      $.goto = 27;
      break;
  }
}, [["62:2-62:25", "s", $s$13], [], [], [], [], [], [], [], [], ["62:17-62:22", "e", $s$13], ["62:17-62:24", "e", $s$13], [], [], ["63:2-63:14", "s", $s$13], [], [], [], ["64:2-64:14", "s", $s$13], [], [], [], ["65:2-65:14", "s", $s$13], [], [], [], [], [], [], []]);
module.exports = $M.exports();