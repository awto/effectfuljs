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
$M.fun("m$1", "b3", "m$0", ["a3"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.f1($);
        $.$.$2 = $c.f2($);
        return $M.ret($.$.$1);

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$2", "f1", "m$1", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        $.$$.$.$0 = $p;
        return $M.retG();

      case 2:
        return $M.retG($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$3", "f2", "m$1", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        $.$$.$.$0 = $p;
        $.goto = 2;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 2:
        $.$$.$.$0 = $p;
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [], [], []]);
$M.fun("m$4", "top", "m$0", ["a1", "a6"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$5 = $c.a($);
        $.$.$6 = $c.b($);
        $.$.$2 = 10;
        $.$.$3 = 11;
        $.$.$4 = 12;
        return $M.ret([$.$.$5, $.$.$6]);

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$5", "a", "m$4", ["a8"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$4 = $c.f2($);
        $.$.$5 = $c.f3($);
        $.$$.$.$0 += 2;
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        $.$.$6 = $p;
        $.goto = 2;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 2:
        $.goto = 3;
        $p = $M.yld($.$.$6 + $p);
        continue;

      case 3:
        $.$.$1 = $p;
        $.goto = 4;
        $p = $M.yld($.$.$1);
        continue;

      case 4:
        $.$.$6 = $p;
        $.goto = 5;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 5:
        $.goto = 6;
        $p = $M.yld($.$.$6 + $p);
        continue;

      case 6:
        $.$.$2 = $p;
        $.$.$3 = $c.f1($);
        return $M.retG([$.$.$3, $.$.$4, $.$.$5]);

      case 7:
        return $M.retG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$6", "f1", "m$5", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$$.$.$3 += 2;
        $.$$.$.$0 += 3;
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        $.$.$1 = $p;
        $.goto = 2;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 2:
        $.goto = 3;
        $p = $M.yld($.$.$1 + $p);
        continue;

      case 3:
        return $M.retG($.$$.$.$1 = $p);

      case 4:
        return $M.retG($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$7", "f2", "m$5", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = $M.yld($.$$.$.$2);
        continue;

      case 2:
        $.goto = 3;
        $p = $M.yld($.$.$0 + $p);
        continue;

      case 3:
        $.$$.$.$1 = $p;
        return $M.retG();

      case 4:
        return $M.retG($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$8", "f3", "m$5", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$$.$.$1 = 11;
        $.$$.$.$1 += 4;
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
$M.fun("m$9", "b", "m$4", ["a1"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 += $.$$.$.$2;
        $.$$.$.$1 += $.$$.$.$4;
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
$M.fun("m$10", "b1", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        $.$.$0 = $p;
        $.$.$1 = $c.f1($);
        return $M.retG($.$.$1);

      case 2:
        return $M.retG($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$11", "f1", "m$10", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        return $M.retG($.$$.$.$0 = $p);

      case 2:
        return $M.retG($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$12", "b2", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.yld($.$$.$.$0);
        continue;

      case 1:
        $.$.$0 = $p;
        $.$.$1 = $c.f1($);
        return $M.retG($.$.$1);

      case 2:
        return $M.retG($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$13", "f1", "m$12", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$$.$.$0 = $.$$.$.$0;
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
$M.fun("m$14", "b", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 9;
        $p = ($M.context.call = $.$$.$.$4)();
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
        $.goto = 12;
        continue;

      case 6:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 15;
        continue;

      case 7:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 18;
        continue;

      case 8:
        $M.iterErr($.$.$5, $.value, true);
        $.goto = 21;
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = $p)();
        continue;

      case 10:
        $.$.$5 = $M.iterator($p);
        $.state = 11;

      case 11:
        $0 = $.$.$5.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 12;
        } else {
          $.goto = 13;
          continue;
        }

      case 12:
        $.$.$0 = $1;
        $.$.$5 = $M.iterator($.$.$0[0]);
        $.goto = 14;
        continue;

      case 13:
        $M.yld($1);
        $.goto = 11;
        continue;

      case 14:
        $1 = $.$.$5.next();
        $0 = $1.value;

        if ($1.done) {
          $.state = 15;
        } else {
          $.goto = 16;
          continue;
        }

      case 15:
        $.$.$5 = $M.iterator($.$.$0[1]);
        $.goto = 17;
        continue;

      case 16:
        $M.yld($0);
        $.goto = 14;
        continue;

      case 17:
        $0 = $.$.$5.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 18;
        } else {
          $.goto = 19;
          continue;
        }

      case 18:
        $.$.$5 = $M.iterator($.$.$0[2]);
        $.goto = 20;
        continue;

      case 19:
        $M.yld($1);
        $.goto = 17;
        continue;

      case 20:
        $1 = $.$.$5.next();
        $0 = $1.value;

        if ($1.done) {
          $.state = 21;
        } else {
          $.goto = 22;
          continue;
        }

      case 21:
        return $M.retG();

      case 22:
        $M.yld($0);
        $.goto = 20;
        continue;

      case 23:
        return $M.retG($.value);

      case 24:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 5:
      $.$.$1 = 24;
      $.goto = 1;
      break;

    case 6:
      $.$.$2 = 24;
      $.goto = 2;
      break;

    case 7:
      $.$.$3 = 24;
      $.goto = 3;
      break;

    case 8:
      $.$.$4 = 24;
      $.goto = 4;
      break;

    case 22:
      $.goto = 8;
      break;

    case 19:
      $.goto = 7;
      break;

    case 16:
      $.goto = 6;
      break;

    case 13:
      $.goto = 5;
      break;

    default:
      $.goto = 24;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 8:
    case 22:
      $.$.$4 = 23;
      $.goto = 4;
      break;

    case 7:
    case 19:
      $.$.$3 = 23;
      $.goto = 3;
      break;

    case 6:
    case 16:
      $.$.$2 = 23;
      $.goto = 2;
      break;

    case 5:
    case 13:
      $.$.$1 = 23;
      $.goto = 1;
      break;

    default:
      $.goto = 23;
      break;
  }
}, [["62:17-62:22", "e", $s$2], [], [], [], [], [], [], [], [], ["62:17-62:24", "e", $s$2], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
module.exports = $M.exports();