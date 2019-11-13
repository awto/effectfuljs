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
  e: "$0"
}, $s$1, false],
    $s$4 = [{
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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("profile", M, "generators");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        $M.mcall("option", M, {
          combineOps: true,
          scopePrefix: false,
          scopeContext: false
        });
        continue;

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
}, null, null, [["1:0-1:24", "s", $s$1], ["1:0-1:23", "e", $s$1], ["2:0-2:72", "s", $s$1], ["2:0-2:71", "e", $s$1], [], [], []]);
$M.fun("m$1", "d", "m$0", ["i"], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(2);
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
        $.goto = 18;
        continue;

      case 5:
        $.$.$1 = 0;
        $.goto = 6;
        $M.brk(3);
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
        $M.brk(4);
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
          $.goto = 16;
          $M.brk(5);
          continue;
        } else {
          $.goto = 15;
          $M.brk(6);
          continue;
        }

      case 15:
        return $M.retG($.$.$0);

      case 16:
        $.$.$4 = $M.iterator($M.lset($.$, "i", $.$.$0 + 3));
        $.state = 17;

      case 17:
        $1 = $.$.$4.next();
        $.value = $1.value;

        if ($1.done) {
          $.state = 18;
        } else {
          $.goto = 19;
          continue;
        }

      case 18:
        return $M.retG();

      case 19:
        $M.yld(r);
        $.goto = 17;
        continue;

      case 20:
        return $M.retG($.value);

      case 21:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 21;
      $.goto = 1;
      break;

    case 4:
      $.$.$3 = 21;
      $.goto = 2;
      break;

    case 19:
      $.goto = 4;
      break;

    case 13:
      $.goto = 3;
      break;

    default:
      $.goto = 21;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 19:
      $.$.$3 = 20;
      $.goto = 2;
      break;

    case 3:
    case 13:
      $.$.$2 = 20;
      $.goto = 1;
      break;

    default:
      $.goto = 20;
      break;
  }
}, [["5:2-5:12", "s", $s$2], [], [], [], [], ["6:2-6:25", "s", $s$2], [null, null, null], [null, null, null], ["7:2-11:3", "s", $s$2], ["7:19-7:36", "e", $s$2], [], [], [null, null, null], [], ["8:4-8:27", "s", $s$2], [], [], [], [], [], [], []]);
$M.fun("m$2", "a4", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 7;
        $M.brk(8);
        continue;

      case 1:
        $.goto = 28;
        $M.brk(14);
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
        $.goto = 25;
        $M.brk(12);
        continue;

      case 5:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 17;
        continue;

      case 6:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 21;
        continue;

      case 7:
        $.goto = 8;
        $M.yld(1);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(9);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(10);
        continue;

      case 10:
        $.goto = 11;
        $M.yld(2);
        continue;

      case 11:
        $.goto = 12;
        $M.brk(11);
        continue;

      case 12:
        $.$.$1 = 13;
        $.goto = 1;
        $M.yld(3);
        continue;

      case 13:
        $.goto = 14;
        $M.brk(16);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = a2)();
        continue;

      case 15:
        $.$.$4 = $M.iterator($p);
        $.state = 16;

      case 16:
        $0 = $.$.$4.next();
        $.$.$5 = $0.value;

        if ($0.done) {
          $.state = 17;
        } else {
          $.goto = 18;
          continue;
        }

      case 17:
        $.goto = 19;
        $p = ($M.context.call = a3)();
        continue;

      case 18:
        $M.yld($.$.$5);
        $.goto = 16;
        continue;

      case 19:
        $.$.$4 = $M.iterator($p);
        $.state = 20;

      case 20:
        $0 = $.$.$4.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 21;
        } else {
          $.goto = 22;
          continue;
        }

      case 21:
        $.goto = 23;
        $p = ($M.context.call = a1)($.$.$5, $1);
        continue;

      case 22:
        $M.yld($1);
        $.goto = 20;
        continue;

      case 23:
        $.goto = 24;
        $M.yld($p);
        continue;

      case 24:
        return $M.retG();

      case 25:
        $.goto = 26;
        $M.yld("excep");
        continue;

      case 26:
        $.goto = 27;
        $M.brk(13);
        continue;

      case 27:
        $.goto = 13;
        $M.yld($.$.$0);
        continue;

      case 28:
        $.goto = 29;
        $M.yld("f");
        continue;

      case 29:
        $.goto = 30;
        $M.brk(15);
        continue;

      case 30:
        $.goto = 31;
        $M.yld("e");
        continue;

      case 31:
        $.goto = $.$.$1;
        continue;

      case 32:
        return $M.retG($.value);

      case 33:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 5:
      $.$.$2 = 33;
      $.goto = 2;
      break;

    case 6:
      $.$.$3 = 33;
      $.goto = 3;
      break;

    case 4:
    case 25:
    case 26:
    case 27:
      $.$.$1 = 33;
      $.goto = 1;
      break;

    case 22:
      $.goto = 6;
      break;

    case 18:
      $.goto = 5;
      break;

    case 9:
    case 10:
    case 11:
    case 12:
      $.goto = 4;
      break;

    default:
      $.goto = 33;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 6:
    case 22:
      $.$.$3 = 32;
      $.goto = 3;
      break;

    case 5:
    case 18:
      $.$.$2 = 32;
      $.goto = 2;
      break;

    case 4:
    case 9:
    case 10:
    case 11:
    case 12:
    case 25:
    case 26:
    case 27:
      $.$.$1 = 32;
      $.goto = 1;
      break;

    default:
      $.goto = 32;
      break;
  }
}, [["16:2-16:10", "s", $s$1], ["24:4-24:14", "s", $s$1], [], [], ["21:4-21:18", "s", $s$3], [], [], [null, null, null], ["17:2-26:3", "s", $s$1], ["18:4-18:12", "s", $s$1], [null, null, null], ["19:4-19:12", "s", $s$1], [null, null, null], ["27:2-27:37", "s", $s$1], ["27:18-27:22", "e", $s$1], [], [], ["27:31-27:35", "e", $s$1], [], [], [], ["27:8-27:36", "e", $s$1], [], [null, null, null], [], [null, null, null], ["22:4-22:12", "s", $s$3], [null, null, null], [null, null, null], ["25:4-25:14", "s", $s$1], [null, null, null], [], [], []]);
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
}, [["31:2-31:32", "s", $s$1], [], [], ["31:18-31:22", "e", $s$4], [], ["31:24-31:32", "s", $s$4], [null, null, null], [], [], []]);
module.exports = $M.exports();