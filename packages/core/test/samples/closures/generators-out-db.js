var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  e1: "$1",
  e2: "$2"
}, null, false],
    $s$2 = [{
  mfs: "$0",
  s: "$1",
  v: "$2",
  k: "$3"
}, $s$1, false],
    $s$3 = [{
  kk: "$0",
  k: "$1"
}, $s$2, false],
    $s$4 = [{
  vv: "$0",
  ww: "$1",
  id: "$2"
}, $s$3, false],
    $s$5 = [{
  nn: "$0",
  mm: "$1"
}, $s$4, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.e1($);
        $.$.$2 = $c.e2($);
        $.goto = 1;
        ($M.context.call = M.profile).dbg$call(M, "es");
        continue;

      case 1:
        $.$.$0 = $c.f($);
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:15", "e", $s$1], [], [], []]);
$M.fun("m$1", null, "m$0", ["w"], 4, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret($c.mfs($));

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$2", "mfs", "m$1", ["s"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.retG($c.kk($));

      case 1:
        return $M.retG($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$3", "kk", "m$2", ["k"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret($c.vv($));

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$4", "vv", "m$3", ["ww"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($c.nn($));
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
$M.fun("m$5", "nn", "m$4", ["mm"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($c.f($));
        continue;

      case 1:
        $.goto = 2;
        $M.yld($.$$.$.$1++);
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
$M.fun("m$6", null, "m$5", ["m"], 4, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = $.$$.$.$2)($.$$.$.$1, $.$$.$.$2, w, m, $.$$.$.$1, $.$$.$.$1);
        continue;

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:21-10:43", "e", $s$5], [], [], []]);
$M.fun("m$7", "e1", "m$0", ["k"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($.$.$0);
        continue;

      case 1:
        $.goto = 2;
        $M.yld($c.p1($));
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
$M.fun("m$8", "p1", "m$7", ["m"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret($c.e2($));

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$9", "e2", "m$8", ["l"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($.$$.$.$0 += $.$.$1);
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
$M.fun("m$10", "e2", "m$0", ["k"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($.$.$0);
        continue;

      case 1:
        $.goto = 2;
        $M.yld($c.e3($));
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
$M.fun("m$11", "e3", "m$10", ["m"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($c.e4($));
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
$M.fun("m$12", "e4", "m$11", ["l"], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld($.$$.$$.$.$0 += $.$.$1);
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
module.exports = $M.exports();