var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  af1: "$4",
  b2: "$5",
  af2: "$6"
}, null, false],
    $s$2 = [{
  e: "$0"
}, $s$1, false],
    $s$3 = [{
  e: "$0"
}, $s$1, false],
    $s$4 = [{
  i: "$0"
}, $s$1, false],
    $s$5 = [{
  e: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$6 = $c.af2($);
        $.$.$5 = $c.b2($);
        $.$.$4 = $c.af1($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.b($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.profile).dbg$call(M, "disabled");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M.profile).dbg$call(M, "generators");
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.option).dbg$call(M, {
          defunct: true,
          state: false,
          contextState: true,
          markRepeat: false,
          inlineContAssign: true,
          storeCont: "$cont"
        });
        continue;

      case 6:
        $.goto = 7;
        $M.brk(20);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = M.option).dbg$call(M, {
          tailCalls: false
        });
        continue;

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:22", "s", $s$1], ["1:0-1:21", "e", $s$1], ["2:0-2:24", "s", $s$1], ["2:0-2:23", "e", $s$1], ["3:0-10:3", "s", $s$1], ["3:0-10:2", "e", $s$1], ["49:0-49:31", "s", $s$1], ["49:0-49:30", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(4);
        continue;

      case 3:
        $.goto = 4;
        $M.yld(2);
        continue;

      case 4:
        return $M.retG();

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["13:2-13:10", "s", $s$1], [null, null, null], ["14:2-14:10", "s", $s$1], [null, null, null], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(5);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 7;
        $M.brk(8);
        continue;

      case 2:
        $.goto = 3;
        $M.yld(1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(6);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(7);
        continue;

      case 5:
        $.goto = 6;
        $M.yld(2);
        continue;

      case 6:
        return $M.retG();

      case 7:
        $.goto = 6;
        $M.yld($.$.$0);
        continue;

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
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [["18:2-18:10", "s", $s$1], ["22:4-22:12", "s", $s$2], [null, null, null], ["19:2-23:3", "s", $s$1], ["20:4-20:12", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
$M.fun("m$3", "c", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(9);
        continue;

      case 1:
        $.goto = 9;
        $M.brk(13);
        continue;

      case 2:
        $0 = $.value;
        $.goto = 8;
        $M.brk(12);
        continue;

      case 3:
        $.goto = 4;
        $M.yld(1);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(10);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(11);
        continue;

      case 6:
        $.$.$1 = 7;
        $.goto = 1;
        $M.yld(2);
        continue;

      case 7:
        return $M.retG();

      case 8:
        $.goto = 7;
        $M.yld($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $M.yld("F");
        continue;

      case 10:
        $.goto = $.$.$1;
        continue;

      case 11:
        return $M.retG($.value);

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

    case 5:
    case 6:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 5:
    case 6:
    case 8:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [["27:2-27:10", "s", $s$1], ["33:4-33:14", "s", $s$1], ["31:4-31:12", "s", $s$3], [null, null, null], ["28:2-34:3", "s", $s$1], ["29:4-29:12", "s", $s$1], [null, null, null], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(14);
        continue;

      case 1:
        $M.iterFin($.$.$3);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterFin($.$.$4);
        $.goto = $.$.$2;
        continue;

      case 3:
        $M.iterErr($.$.$3, $.value, false);
        $.goto = 12;
        continue;

      case 4:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 9;
        continue;

      case 5:
        $.$.$3 = $M.iterator(s);
        $.state = 6;

      case 6:
        $0 = $.$.$3.next();

        if ($0.done) {
          $.$.$1 = 12;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 7;
          $M.brk(15);
          continue;
        }

      case 7:
        $.$.$4 = $M.iterator([$.$.$0]);
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
        $M.brk(16);
        continue;

      case 10:
        $M.yld($1);
        $.goto = 8;
        continue;

      case 11:
        $.goto = 6;
        $M.yld($.$.$0);
        continue;

      case 12:
        return $M.retG();

      case 13:
        return $M.retG($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$1 = 14;
      $.goto = 1;
      break;

    case 10:
      $.goto = 4;
      break;

    case 4:
      $.$.$2 = 3;
      $.goto = 2;
      break;

    case 2:
    case 6:
    case 7:
    case 8:
    case 9:
    case 11:
      $.goto = 3;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 10:
      $.$.$2 = 1;
      $.$.$1 = 13;
      $.goto = 2;
      break;

    case 2:
    case 3:
    case 6:
    case 7:
    case 8:
    case 9:
    case 11:
      $.$.$1 = 13;
      $.goto = 1;
      break;

    default:
      $.goto = 13;
      break;
  }
}, [["38:2-41:3", "s", $s$1], [], [], [], [], [], ["39:4-39:15", "s", $s$4], [], [], ["40:4-40:12", "s", $s$4], [], [null, null, null], [], [], []]);
$M.fun("m$5", "af1", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(17);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.awt($.$$.$.$0);
        continue;

      case 2:
        if ($p) {
          $.goto = 6;
          $M.brk(18);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(19);
        continue;

      case 4:
        $.goto = 5;
        $p = $M.awt($.$$.$.$2);
        continue;

      case 5:
        return $M.retA($p);

      case 6:
        $.goto = 3;
        $M.awt($.$$.$.$1);
        continue;

      case 7:
        return $M.retA($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["45:2-45:23", "s", $s$1], [null, null, null], ["45:15-45:23", "s", $s$1], ["46:2-46:17", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
$M.fun("m$6", "b2", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(21);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 7;
        $M.brk(24);
        continue;

      case 2:
        $.goto = 3;
        $M.yld(1);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(22);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(23);
        continue;

      case 5:
        $.goto = 6;
        $M.yld(2);
        continue;

      case 6:
        return $M.retG();

      case 7:
        $.goto = 6;
        $M.yld($.$.$0);
        continue;

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
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [["52:2-52:10", "s", $s$1], ["56:4-56:12", "s", $s$5], [null, null, null], ["53:2-57:3", "s", $s$1], ["54:4-54:12", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
$M.fun("m$7", "af2", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(25);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.awt($.$$.$.$0);
        continue;

      case 2:
        if ($p) {
          $.goto = 6;
          $M.brk(26);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(27);
        continue;

      case 4:
        $.goto = 5;
        $p = $M.awt($.$$.$.$2);
        continue;

      case 5:
        return $M.retA($p);

      case 6:
        $.goto = 3;
        $M.awt($.$$.$.$1);
        continue;

      case 7:
        return $M.retA($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["61:2-61:23", "s", $s$1], [null, null, null], ["61:15-61:23", "s", $s$1], ["62:2-62:17", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
module.exports = $M.exports();