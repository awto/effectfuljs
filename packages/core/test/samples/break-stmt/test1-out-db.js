var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $c.f($);
        $c.f($);
        $c.f($);
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
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        if ($p) {
          $.state = 3;
        } else {
          $.goto = 3;
          ($M.context.call = eff)(3);
          continue;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(5);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", $s$1], ["4:8-4:14", "e", $s$1], ["5:9-5:15", "e", $s$1], ["7:2-7:8", "e", $s$1], ["8:2-8:8", "e", $s$1], [], [], []]);
$M.fun("m$2", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        if ($p) {
          $.goto = 3;
          ($M.context.call = eff)("a");
          continue;
        } else {
          $.goto = 3;
          ($M.context.call = eff)(3);
          continue;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(5);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["11:2-11:8", "e", $s$1], ["13:8-13:14", "e", $s$1], ["14:6-14:14", "e", $s$1], ["18:2-18:8", "e", $s$1], ["19:2-19:8", "e", $s$1], [], [], []]);
$M.fun("m$3", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        if ($p) {
          $.goto = 6;
          ($M.context.call = eff)("a");
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(5);
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)("b");
        continue;

      case 7:
        return $M.ret($p);

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:2-22:8", "e", $s$1], ["23:6-23:12", "e", $s$1], ["24:4-24:12", "e", $s$1], ["27:2-27:8", "e", $s$1], ["28:2-28:8", "e", $s$1], [], ["25:11-25:19", "e", $s$1], [], [], []]);
$M.fun("m$4", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (e) {
          $.goto = 2;
          $p = ($M.context.call = eff)("b");
          continue;
        } else {
          $.state = 1;
        }

      case 1:
        return $M.ret();

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
}, null, null, [["32:11-32:19", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();