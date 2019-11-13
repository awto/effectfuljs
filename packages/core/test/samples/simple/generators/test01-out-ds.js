var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  d: "$0",
  a4: "$1",
  a5: "$2",
  cfb1: "$3",
  c: "$4",
  v: "$5",
  obj: "$6",
  A: "$7"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$3 = [{
  e: "$0"
}, $s$1, false],
    $s$4 = [{
  i: "$0"
}, $s$1, false],
    $s$5 = [{
  i: "$0"
}, $s$1, false],
    $s$6 = [{
  e: "$1"
}, $s$5, false],
    $s$7 = [{
  a: "$0"
}, $s$1, false],
    $s$8 = [{
  a: "$0",
  b: "$1"
}, $s$1, false],
    $s$9 = [{
  A: "$0",
  _proto: "$1"
}, $s$1, false],
    $s$10 = [{
  a: "$0",
  b: "$1"
}, $s$9, false],
    $s$11 = [{
  b: "$0",
  a: "$1"
}, $s$9, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.d($);
        $.$.$4 = $c.c($);
        $.$.$3 = $c.cfb1($);
        $.$.$2 = $c.a5($);
        $.$.$1 = $c.a4($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("profile", M, "es");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(31);
        continue;

      case 3:
        $.$.$5 = $c.f($);
        $.goto = 4;
        $M.brk(32);
        continue;

      case 4:
        $.$.$6 = {
          a1: $c.f($),
          a2: $c.f($),
          a3: $c.f($)
        };
        $.goto = 5;
        $M.brk(36);
        continue;

      case 5:
        $.goto = 6;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 6:
        $.$.$7 = $p;
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:16", "s", $s$1], ["1:0-1:15", "e", $s$1], ["54:0-54:29", "s", $s$1], ["56:0-66:2", "s", $s$1], [null, "s", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "d", "m$0", ["i"], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(1);
        continue;

      case 1:
        $M.iterFin($.$.$4);
        $.goto = $.$.$2;
        continue;

      case 2:
        $M.iterFin($.$.$4);
        $.goto = $.$.$3;
        continue;

      case 3:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 12;
        continue;

      case 4:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 22;
        continue;

      case 5:
        $.$.$1 = 0;
        $.goto = 6;
        $M.brk(2);
        continue;

      case 6:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 7;
        $M.yld($0);
        continue;

      case 7:
        $0 = $.$.$1;
        $M.lset($.$, "j", $0 + 1);
        $.goto = 8;
        $M.yld($0);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(3);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = some)($M.lset($.$, "i", $.$.$0 + 2), $.$.$1);
        continue;

      case 10:
        $.$.$4 = $M.iterator($p + $.$.$1);
        $.state = 11;

      case 11:
        $0 = $.$.$4.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 12;
        } else {
          $.goto = 13;
          continue;
        }

      case 12:
        $.goto = 14;
        $p = $M.yld($1);
        continue;

      case 13:
        $M.yld($1);
        $.goto = 11;
        continue;

      case 14:
        if ($p) {
          $.goto = 20;
          $M.brk(4);
          continue;
        } else {
          $.goto = 15;
          $M.brk(5);
          continue;
        }

      case 15:
        if ($.$.$1) {
          $.goto = 19;
          $M.brk(6);
          continue;
        } else {
          $.state = 16;
        }

      case 16:
        $.goto = 17;
        $M.brk(7);
        continue;

      case 17:
        $.goto = 18;
        $M.yld(2);
        continue;

      case 18:
        return $M.retG();

      case 19:
        return $M.retG($.$.$0);

      case 20:
        $.$.$4 = $M.iterator($M.lset($.$, "i", $.$.$0 + 3));
        $.state = 21;

      case 21:
        $1 = $.$.$4.next();
        $.value = $1.value;

        if ($1.done) {
          $.state = 22;
        } else {
          $.goto = 23;
          continue;
        }

      case 22:
        return $M.retG();

      case 23:
        $M.yld(r);
        $.goto = 21;
        continue;

      case 24:
        return $M.retG($.value);

      case 25:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 25;
      $.goto = 1;
      break;

    case 4:
      $.$.$3 = 25;
      $.goto = 2;
      break;

    case 23:
      $.goto = 4;
      break;

    case 13:
      $.goto = 3;
      break;

    default:
      $.goto = 25;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 23:
      $.$.$3 = 24;
      $.goto = 2;
      break;

    case 3:
    case 13:
      $.$.$2 = 24;
      $.goto = 1;
      break;

    default:
      $.goto = 24;
      break;
  }
}, [["4:2-4:12", "s", $s$2], [], [], [], [], ["5:2-5:25", "s", $s$2], [null, null, null], [null, null, null], ["6:2-10:3", "s", $s$2], ["6:19-6:36", "e", $s$2], [], [], [null, null, null], [], ["7:4-7:27", "s", $s$2], ["9:4-9:13", "s", $s$2], ["11:2-11:10", "s", $s$2], [null, null, null], [], [], [], [], [], [], [], []]);
$M.fun("m$2", "a4", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(8);
        continue;

      case 1:
        $.goto = 21;
        $M.brk(14);
        continue;

      case 2:
        $M.iterFin($.$.$3);
        $.goto = $.$.$2;
        continue;

      case 3:
        $0 = $.value;
        $.goto = 18;
        $M.brk(12);
        continue;

      case 4:
        $M.iterErr($.$.$3, $.value, true);
        $.goto = 15;
        continue;

      case 5:
        $.goto = 6;
        $M.yld(1);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(9);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(10);
        continue;

      case 8:
        $.goto = 9;
        $M.yld(2);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(11);
        continue;

      case 10:
        $.$.$1 = 11;
        $.goto = 1;
        $M.yld(3);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(16);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = a2)();
        continue;

      case 13:
        $.$.$3 = $M.iterator($p);
        $.state = 14;

      case 14:
        $0 = $.$.$3.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 15;
        } else {
          $.goto = 16;
          continue;
        }

      case 15:
        $.goto = 17;
        $M.yld($1);
        continue;

      case 16:
        $M.yld($1);
        $.goto = 14;
        continue;

      case 17:
        return $M.retG();

      case 18:
        $.goto = 19;
        $M.yld("excep");
        continue;

      case 19:
        $.goto = 20;
        $M.brk(13);
        continue;

      case 20:
        $.goto = 11;
        $M.yld($.$.$0);
        continue;

      case 21:
        $.goto = 22;
        $M.yld("f");
        continue;

      case 22:
        $.goto = 23;
        $M.brk(15);
        continue;

      case 23:
        $.goto = 24;
        $M.yld("e");
        continue;

      case 24:
        $.goto = $.$.$1;
        continue;

      case 25:
        return $M.retG($.value);

      case 26:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
      $.$.$2 = 26;
      $.goto = 2;
      break;

    case 3:
    case 18:
    case 19:
    case 20:
      $.$.$1 = 26;
      $.goto = 1;
      break;

    case 16:
      $.goto = 4;
      break;

    case 7:
    case 8:
    case 9:
    case 10:
      $.goto = 3;
      break;

    default:
      $.goto = 26;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 16:
      $.$.$2 = 25;
      $.goto = 2;
      break;

    case 3:
    case 7:
    case 8:
    case 9:
    case 10:
    case 18:
    case 19:
    case 20:
      $.$.$1 = 25;
      $.goto = 1;
      break;

    default:
      $.goto = 25;
      break;
  }
}, [["15:2-15:10", "s", $s$1], ["23:4-23:14", "s", $s$1], [], ["20:4-20:18", "s", $s$3], [], [null, null, null], ["16:2-25:3", "s", $s$1], ["17:4-17:12", "s", $s$1], [null, null, null], ["18:4-18:12", "s", $s$1], [null, null, null], ["26:2-26:20", "s", $s$1], ["26:15-26:19", "e", $s$1], [], [], [null, null, null], [], [], [null, null, null], ["21:4-21:12", "s", $s$3], [null, null, null], [null, null, null], ["24:4-24:14", "s", $s$1], [null, null, null], [], [], []]);
$M.fun("m$3", "a5", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(17);
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 7;
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = $.$$.$.$1)();
        continue;

      case 4:
        $.$.$2 = $M.iterator($p);
        $.state = 5;

      case 5:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 7;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 6;
          $M.brk(18);
          continue;
        }

      case 6:
        $.goto = 5;
        $M.yld($.$.$0);
        continue;

      case 7:
        return $M.retG();

      case 8:
        return $M.retG($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 9;
      $.goto = 1;
      break;

    case 5:
    case 6:
      $.goto = 2;
      break;

    default:
      $.goto = 9;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 5:
    case 6:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    default:
      $.goto = 8;
      break;
  }
}, [["30:2-30:32", "s", $s$1], [], [], ["30:18-30:22", "e", $s$4], [], ["30:24-30:32", "s", $s$4], [null, null, null], [], [], []]);
$M.fun("m$4", "cfb1", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(19);
        continue;

      case 1:
        $.goto = 22;
        $M.brk(25);
        continue;

      case 2:
        $1 = $.value;
        $.goto = 17;
        $M.brk(27);
        continue;

      case 3:
        $.$.$0 = 0;
        $.state = 4;

      case 4:
        $.goto = 5;
        $M.brk(20);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(21);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(22);
        continue;

      case 7:
        $.goto = 8;
        $p = $M.yld($.$.$0 === 3);
        continue;

      case 8:
        if ($p) {
          $.goto = 14;
          $M.brk(23);
          continue;
        } else {
          $.state = 9;
        }

      case 9:
        $.goto = 10;
        $M.brk(24);
        continue;

      case 10:
        $.$.$2 = 11;
        $.goto = 1;
        $M.yld(`a${$.$.$0}`);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(26);
        continue;

      case 12:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 13;
        $M.yld(`b${$0}`);
        continue;

      case 13:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 4;
        continue;

      case 14:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 15;
        $p = new ($M.context.call = Error)(`AAAAAAAAA${$0}`);
        continue;

      case 15:
        $.value = $p;
        $.state = 16;

      case 16:
        return $M.retG($.value);

      case 17:
        $.goto = 18;
        $M.yld(`e${$.$.$0}`);
        continue;

      case 18:
        $.goto = 19;
        $M.brk(28);
        continue;

      case 19:
        $.goto = 20;
        $M.yld($.$.$1);
        continue;

      case 20:
        $.goto = 21;
        $M.brk(29);
        continue;

      case 21:
        return $M.retG($.$.$0);

      case 22:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 23;
        $M.yld(`f1${$0}`);
        continue;

      case 23:
        $.goto = $.$.$2;
        continue;

      case 24:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 14:
    case 15:
      $.$.$2 = 2;
      $.goto = 1;
      break;

    case 1:
    case 5:
    case 11:
    case 12:
    case 22:
    case 23:
      $.goto = 2;
      break;

    default:
      $.goto = 24;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 14:
    case 15:
      $.$.$2 = 16;
      $.goto = 1;
      break;

    default:
      $.goto = 16;
      break;
  }
}, [["34:2-48:3", "s", $s$1], ["40:8-40:25", "s", $s$5], ["44:6-44:20", "s", $s$6], [], ["35:4-47:5", "s", $s$5], ["36:6-41:7", "s", $s$5], ["37:8-37:62", "s", $s$5], [null, null, null], ["37:27-37:62", "s", $s$5], ["38:8-38:22", "s", $s$5], [null, null, null], ["42:6-42:22", "s", $s$5], [null, null, null], [], ["37:33-37:61", "e", $s$5], [], [], [null, null, null], ["45:6-45:14", "s", $s$6], [null, null, null], ["46:6-46:15", "s", $s$6], [], [null, null, null], [], []]);
$M.fun("m$5", "c", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(30);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["51:2-51:10", "s", $s$1], [null, null, null], [], [], []]);
$M.fun("m$6", null, "m$0", ["v"], 5, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.awt($.$$.$.$5);
        continue;

      case 1:
        return $M.retA($p);

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$7", null, "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(33);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["58:4-58:12", "s", $s$1], [null, null, null], [], [], []]);
$M.fun("m$8", null, "m$0", ["a"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(34);
        continue;

      case 1:
        $.goto = 2;
        $M.awt($.$.$0);
        continue;

      case 2:
        return $M.retA();

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["61:4-61:12", "s", $s$7], [null, null, null], [], [], []]);
$M.fun("m$9", null, "m$0", ["a", "b"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(35);
        continue;

      case 1:
        $.goto = 2;
        $M.awt($.$.$0);
        continue;

      case 2:
        return $M.retA();

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["64:4-64:12", "s", $s$8], [null, null, null], [], [], []]);
$M.fun("m$10", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.A($);
        $.goto = 1;
        $M.brk(37);
        continue;

      case 1:
        $M.set($.$.$0, "a", $c.a($));
        $.goto = 2;
        $M.brk(39);
        continue;

      case 2:
        $.$.$1 = $.$.$0.prototype;
        $.goto = 3;
        $M.brk(40);
        continue;

      case 3:
        $M.set($.$.$1, "b", $c.b($));
        $.goto = 4;
        $M.brk(42);
        continue;

      case 4:
        return $M.ret($.$.$0);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$9], [null, "s", $s$9], [null, "s", $s$9], [null, "s", $s$9], [], [], []]);
$M.fun("m$11", "A", "m$10", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
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
$M.fun("m$12", "a", "m$10", ["b"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(38);
        continue;

      case 1:
        $.goto = 2;
        $M.awt($.$.$1);
        continue;

      case 2:
        return $M.retA();

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["70:4-70:12", "s", $s$10], [null, null, null], [], [], []]);
$M.fun("m$13", "b", "m$10", ["a"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(41);
        continue;

      case 1:
        $.goto = 2;
        $M.awt($.$.$1);
        continue;

      case 2:
        return $M.retA();

      case 3:
        return $M.retA($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["73:4-73:12", "s", $s$11], [null, null, null], [], [], []]);
module.exports = $M.exports();