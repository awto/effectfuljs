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
}, null, false];
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
        ($M.context.call = M.profile).dbg$call(M, "disabled");
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.profile).dbg$call(M, "generators");
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          defunct: true,
          state: false,
          contextState: true,
          markRepeat: false,
          inlineContAssign: true,
          storeCont: "$cont"
        });
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M.option).dbg$call(M, {
          tailCalls: false
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
}, null, null, [["1:0-1:21", "e", $s$1], ["2:0-2:23", "e", $s$1], ["3:0-10:2", "e", $s$1], ["49:0-49:30", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld(1);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(2);
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
}, null, null, [[null, null, null], [null, null, null], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 3;
        $M.yld($.$.$0);
        continue;

      case 2:
        $.goto = 3;
        $M.yld(2);
        continue;

      case 3:
        return $M.retG();

      case 4:
        return $M.retG($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, null, [[null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.yld(1);
        continue;

      case 1:
        $.goto = 5;
        $M.yld("F");
        continue;

      case 2:
        $0 = $.value;
        $.goto = 4;
        $M.yld($.$.$0);
        continue;

      case 3:
        $.$.$1 = 4;
        $.goto = 1;
        $M.yld(2);
        continue;

      case 4:
        return $M.retG();

      case 5:
        $.goto = $.$.$1;
        continue;

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

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[null, null, null], [null, null, null], [null, null, null], [null, null, null], [], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = $M.iterator(s);
        $.goto = 5;
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
        $.goto = 9;
        continue;

      case 4:
        $M.iterErr($.$.$4, $.value, true);
        $.goto = 7;
        continue;

      case 5:
        $0 = $.$.$3.next();

        if ($0.done) {
          $.$.$1 = 9;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.$.$4 = $M.iterator([$.$.$0]);
          $.state = 6;
        }

      case 6:
        $0 = $.$.$4.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 7;
        } else {
          $.goto = 8;
          continue;
        }

      case 7:
        $.goto = 5;
        $M.yld($.$.$0);
        continue;

      case 8:
        $M.yld($1);
        $.goto = 6;
        continue;

      case 9:
        return $M.retG();

      case 10:
        return $M.retG($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    case 8:
      $.goto = 4;
      break;

    case 4:
      $.$.$2 = 3;
      $.goto = 2;
      break;

    case 2:
    case 5:
    case 6:
    case 7:
      $.goto = 3;
      break;

    default:
      $.goto = 11;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 8:
      $.$.$2 = 1;
      $.$.$1 = 10;
      $.goto = 2;
      break;

    case 2:
    case 3:
    case 5:
    case 6:
    case 7:
      $.$.$1 = 10;
      $.goto = 1;
      break;

    default:
      $.goto = 10;
      break;
  }
}, [[], [], [], [], [], [], [], [null, null, null], [], [], [], []]);
$M.fun("m$5", "af1", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.awt($.$$.$.$0);
        continue;

      case 1:
        if ($p) {
          $.goto = 2;
          $M.awt($.$$.$.$1);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $p = $M.awt($.$$.$.$2);
        continue;

      case 3:
        return $M.retA($p);

      case 4:
        return $M.retA($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$6", "b2", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 3;
        $M.yld($.$.$0);
        continue;

      case 2:
        $.goto = 3;
        $M.yld(2);
        continue;

      case 3:
        return $M.retG();

      case 4:
        return $M.retG($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, null, [[null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$7", "af2", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = $M.awt($.$$.$.$0);
        continue;

      case 1:
        if ($p) {
          $.goto = 2;
          $M.awt($.$$.$.$1);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $p = $M.awt($.$$.$.$2);
        continue;

      case 3:
        return $M.retA($p);

      case 4:
        return $M.retA($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [null, null, null], [], [], []]);
module.exports = $M.exports();