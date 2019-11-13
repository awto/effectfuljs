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
  i: "$0"
}, $s$1, false],
    $s$4 = [{
  i: "$0"
}, $s$1, false];
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
        ($M.context.call = M.profile).dbg$call(M, "es");
        continue;

      case 1:
        $.$.$5 = $c.f($);
        $.$.$6 = {
          a1: $c.f($),
          a2: $c.f($),
          a3: $c.f($)
        };
        $.goto = 2;
        $p =
        /*#__PURE__*/
        ($M.context.call = $c.f($))();
        continue;

      case 2:
        $.$.$7 = $p;
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:15", "e", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "d", "m$0", ["i"], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = 0;
        $.goto = 5;
        $M.yld($.$.$0++);
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
        $.goto = 9;
        continue;

      case 4:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 15;
        continue;

      case 5:
        $.goto = 6;
        $M.yld($.$.$1++);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = some)($.$.$0 += 2, $.$.$1);
        continue;

      case 7:
        $.$.$4 = $M.iterator($p + $.$.$1);
        $.state = 8;

      case 8:
        $0 = $.$.$4.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 9;
        } else {
          $.goto = 10;
          continue;
        }

      case 9:
        $.goto = 11;
        $p = $M.yld($1);
        continue;

      case 10:
        $M.yld($1);
        $.goto = 8;
        continue;

      case 11:
        if ($p) {
          $.$.$4 = $M.iterator($.$.$0 += 3);
          $.goto = 14;
          continue;
        } else {
          if ($.$.$1) {
            return $M.retG($.$.$0);
          } else {
            $.state = 12;
          }
        }

      case 12:
        $.goto = 13;
        $M.yld(2);
        continue;

      case 13:
        return $M.retG();

      case 14:
        $1 = $.$.$4.next();
        $.value = $1.value;

        if ($1.done) {
          $.state = 15;
        } else {
          $.goto = 16;
          continue;
        }

      case 15:
        return $M.retG();

      case 16:
        $M.yld(r);
        $.goto = 14;
        continue;

      case 17:
        return $M.retG($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 18;
      $.goto = 1;
      break;

    case 4:
      $.$.$3 = 18;
      $.goto = 2;
      break;

    case 16:
      $.goto = 4;
      break;

    case 10:
      $.goto = 3;
      break;

    default:
      $.goto = 18;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 16:
      $.$.$3 = 17;
      $.goto = 2;
      break;

    case 3:
    case 10:
      $.$.$2 = 17;
      $.goto = 1;
      break;

    default:
      $.goto = 17;
      break;
  }
}, [[null, null, null], [], [], [], [], [null, null, null], ["6:19-6:36", "e", $s$2], [], [], [null, null, null], [], [], [null, null, null], [], [], [], [], [], []]);
$M.fun("m$2", "a4", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.yld(1);
        continue;

      case 1:
        $.goto = 14;
        $M.yld("f");
        continue;

      case 2:
        $M.iterFin($.$.$3);
        $.goto = $.$.$2;
        continue;

      case 3:
        $0 = $.value;
        $.goto = 13;
        $M.yld("excep");
        continue;

      case 4:
        $M.iterErr($.$.$3, $.value, true);
        $.goto = 10;
        continue;

      case 5:
        $.goto = 6;
        $M.yld(2);
        continue;

      case 6:
        $.$.$1 = 7;
        $.goto = 1;
        $M.yld(3);
        continue;

      case 7:
        $.goto = 8;
        $p = ($M.context.call = a2)();
        continue;

      case 8:
        $.$.$3 = $M.iterator($p);
        $.state = 9;

      case 9:
        $0 = $.$.$3.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 10;
        } else {
          $.goto = 11;
          continue;
        }

      case 10:
        $.goto = 12;
        $M.yld($1);
        continue;

      case 11:
        $M.yld($1);
        $.goto = 9;
        continue;

      case 12:
        return $M.retG();

      case 13:
        $.goto = 7;
        $M.yld($.$.$0);
        continue;

      case 14:
        $.goto = 15;
        $M.yld("e");
        continue;

      case 15:
        $.goto = $.$.$1;
        continue;

      case 16:
        return $M.retG($.value);

      case 17:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
      $.$.$2 = 17;
      $.goto = 2;
      break;

    case 3:
    case 13:
      $.$.$1 = 17;
      $.goto = 1;
      break;

    case 11:
      $.goto = 4;
      break;

    case 5:
    case 6:
      $.goto = 3;
      break;

    default:
      $.goto = 17;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 11:
      $.$.$2 = 16;
      $.goto = 2;
      break;

    case 3:
    case 5:
    case 6:
    case 13:
      $.$.$1 = 16;
      $.goto = 1;
      break;

    default:
      $.goto = 16;
      break;
  }
}, [[null, null, null], [null, null, null], [], [null, null, null], [], [null, null, null], [null, null, null], ["26:15-26:19", "e", $s$1], [], [], [null, null, null], [], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$3", "a5", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = ($M.context.call = $.$$.$.$1)();
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 5;
        continue;

      case 3:
        $.$.$2 = $M.iterator($p);
        $.state = 4;

      case 4:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 5;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 4;
          $M.yld($.$.$0);
          continue;
        }

      case 5:
        return $M.retG();

      case 6:
        return $M.retG($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    case 4:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [["30:18-30:22", "e", $s$3], [], [], [], [null, null, null], [], [], []]);
$M.fun("m$4", "cfb1", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.goto = 3;
        continue;

      case 1:
        $.goto = 14;
        $M.yld(`f1${$.$.$0++}`);
        continue;

      case 2:
        $1 = $.value;
        $.goto = 12;
        $M.yld(`e${$.$.$0}`);
        continue;

      case 3:
        $.state = 4;

      case 4:
        $.state = 5;

      case 5:
        $.goto = 6;
        $p = $M.yld($.$.$0 === 3);
        continue;

      case 6:
        if ($p) {
          $.goto = 10;
          $p = new ($M.context.call = Error)(`AAAAAAAAA${$.$.$0++}`);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.$.$2 = 8;
        $.goto = 1;
        $M.yld(`a${$.$.$0}`);
        continue;

      case 8:
        $.goto = 9;
        $M.yld(`b${$.$.$0++}`);
        continue;

      case 9:
        $.$.$0++;
        $.goto = 3;
        continue;

      case 10:
        $.value = $p;
        $.state = 11;

      case 11:
        return $M.retG($.value);

      case 12:
        $.goto = 13;
        $M.yld($.$.$1);
        continue;

      case 13:
        return $M.retG($.$.$0);

      case 14:
        $.goto = $.$.$2;
        continue;

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 5:
    case 6:
    case 7:
    case 10:
      $.$.$2 = 2;
      $.goto = 1;
      break;

    case 1:
    case 4:
    case 8:
    case 14:
      $.goto = 2;
      break;

    default:
      $.goto = 15;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 5:
    case 6:
    case 7:
    case 10:
      $.$.$2 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [[], [null, null, null], [null, null, null], [], [], [null, null, null], ["37:33-37:61", "e", $s$4], [null, null, null], [null, null, null], [], [], [], [null, null, null], [], [], []]);
$M.fun("m$5", "c", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld(1);
        continue;

      case 1:
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
        $M.yld(1);
        continue;

      case 1:
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
$M.fun("m$8", null, "m$0", ["a"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.awt($.$.$0);
        continue;

      case 1:
        return $M.retA();

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$9", null, "m$0", ["a", "b"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.awt($.$.$0);
        continue;

      case 1:
        return $M.retA();

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$10", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.A($);
        $.$.$0.a = $c.a($);
        $.$.$1 = $.$.$0.prototype;
        $.$.$1.b = $c.b($);
        return $M.ret($.$.$0);

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
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
        $M.awt($.$.$1);
        continue;

      case 1:
        return $M.retA();

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
$M.fun("m$13", "b", "m$10", ["a"], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.awt($.$.$1);
        continue;

      case 1:
        return $M.retA();

      case 2:
        return $M.retA($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [], [], []]);
module.exports = $M.exports();