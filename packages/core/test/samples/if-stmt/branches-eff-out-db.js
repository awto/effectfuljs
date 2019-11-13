var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  e: "$4",
  f: "$5"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
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
        if (true) {
          $.goto = 2;
          $p = ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          $p = ($M.context.call = eff)(2);
          continue;
        }

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($p);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:19-3:25", "e", $s$1], [], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 2;
          $p = ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          $p = ($M.context.call = eff)(2);
          continue;
        }

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($p);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:19-7:25", "e", $s$1], [], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 1;
          ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          ($M.context.call = eff)(2);
          continue;
        }

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(3);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(4);
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
}, null, null, [["13:12-13:18", "e", $s$1], ["15:2-15:8", "e", $s$1], ["16:2-16:8", "e", $s$1], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("a");
        continue;

      case 1:
        if (true) {
          $.goto = 2;
          ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)(2);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(3);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
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
}, null, null, [["20:2-20:10", "e", $s$1], ["21:12-21:18", "e", $s$1], ["23:2-23:8", "e", $s$1], ["24:2-24:8", "e", $s$1], [], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        if ($p) {
          return $M.ret(1);
        } else {
          return $M.ret(2);
        }

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["28:6-28:12", "e", $s$1], [], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        if ($p) {
          return $M.ret(1);
        } else {
          return $M.ret(2);
        }

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["34:6-34:12", "e", $s$1], [], [], []]);
module.exports = $M.exports();