var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  d: "$0",
  a4: "$1",
  a5: "$2"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.d($);
        $.$.$2 = $c.a5($);
        $.$.$1 = $c.a4($);
        $.goto = 1;
        ($M.context.call = M.profile).dbg$call(M, "generators");
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.option).dbg$call(M, {
          combineOps: true,
          scopePrefix: true,
          scopeContext: false
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
}, null, null, [["1:0-1:23", "e", $s$1], ["2:0-2:70", "e", $s$1], [], [], []]);
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
        $.goto = 13;
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
          $.state = 12;
        } else {
          return $M.retG($.$.$0);
        }

      case 12:
        $1 = $.$.$4.next();
        $.value = $1.value;

        if ($1.done) {
          $.state = 13;
        } else {
          $.goto = 14;
          continue;
        }

      case 13:
        return $M.retG();

      case 14:
        $M.yld(r);
        $.goto = 12;
        continue;

      case 15:
        return $M.retG($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 16;
      $.goto = 1;
      break;

    case 4:
      $.$.$3 = 16;
      $.goto = 2;
      break;

    case 14:
      $.goto = 4;
      break;

    case 10:
      $.goto = 3;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 14:
      $.$.$3 = 15;
      $.goto = 2;
      break;

    case 3:
    case 10:
      $.$.$2 = 15;
      $.goto = 1;
      break;

    default:
      $.goto = 15;
      break;
  }
}, [[null, null, null], [], [], [], [], [null, null, null], ["7:19-7:36", "e", $s$2], [], [], [null, null, null], [], [], [], [], [], [], []]);
$M.fun("m$2", "a4", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 7;
        $M.yld(1);
        continue;

      case 1:
        $.goto = 21;
        $M.yld("f");
        continue;

      case 2:
        $M.iterFin($.$.$4);
        $.goto = $.$.$2;
        continue;

      case 3:
        $M.iterFin($.$.$4);
        $.goto = $.$.$3;
        continue;

      case 4:
        $0 = $.value;
        $.goto = 20;
        $M.yld("excep");
        continue;

      case 5:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 12;
        continue;

      case 6:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 16;
        continue;

      case 7:
        $.goto = 8;
        $M.yld(2);
        continue;

      case 8:
        $.$.$1 = 9;
        $.goto = 1;
        $M.yld(3);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = a2)();
        continue;

      case 10:
        $.$.$4 = $M.iterator($p);
        $.state = 11;

      case 11:
        $0 = $.$.$4.next();
        $.$.$5 = $0.value;

        if ($0.done) {
          $.state = 12;
        } else {
          $.goto = 13;
          continue;
        }

      case 12:
        $.goto = 14;
        $p = ($M.context.call = a3)();
        continue;

      case 13:
        $M.yld($.$.$5);
        $.goto = 11;
        continue;

      case 14:
        $.$.$4 = $M.iterator($p);
        $.state = 15;

      case 15:
        $0 = $.$.$4.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 16;
        } else {
          $.goto = 17;
          continue;
        }

      case 16:
        $.goto = 18;
        $p = ($M.context.call = a1)($.$.$5, $1);
        continue;

      case 17:
        $M.yld($1);
        $.goto = 15;
        continue;

      case 18:
        $.goto = 19;
        $M.yld($p);
        continue;

      case 19:
        return $M.retG();

      case 20:
        $.goto = 9;
        $M.yld($.$.$0);
        continue;

      case 21:
        $.goto = 22;
        $M.yld("e");
        continue;

      case 22:
        $.goto = $.$.$1;
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
      $.$.$2 = 24;
      $.goto = 2;
      break;

    case 6:
      $.$.$3 = 24;
      $.goto = 3;
      break;

    case 4:
    case 20:
      $.$.$1 = 24;
      $.goto = 1;
      break;

    case 17:
      $.goto = 6;
      break;

    case 13:
      $.goto = 5;
      break;

    case 7:
    case 8:
      $.goto = 4;
      break;

    default:
      $.goto = 24;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 6:
    case 17:
      $.$.$3 = 23;
      $.goto = 3;
      break;

    case 5:
    case 13:
      $.$.$2 = 23;
      $.goto = 2;
      break;

    case 4:
    case 7:
    case 8:
    case 20:
      $.$.$1 = 23;
      $.goto = 1;
      break;

    default:
      $.goto = 23;
      break;
  }
}, [[null, null, null], [null, null, null], [], [], [null, null, null], [], [], [null, null, null], [null, null, null], ["27:18-27:22", "e", $s$1], [], [], ["27:31-27:35", "e", $s$1], [], [], [], ["27:8-27:36", "e", $s$1], [], [null, null, null], [], [null, null, null], [null, null, null], [], [], []]);
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
}, [["31:18-31:22", "e", $s$3], [], [], [], [null, null, null], [], [], []]);
module.exports = $M.exports();