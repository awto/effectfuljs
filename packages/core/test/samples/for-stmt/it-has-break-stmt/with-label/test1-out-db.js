var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
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
        $.$.$3 = [1, 2, 3];
        $.$.$0 = 0;
        $.state = 1;

      case 1:
        if ($.$.$0 < 3) {
          $.goto = 5;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(5);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(6);
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 6;

      case 6:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 10;
          $p = ($M.context.call = eff)(d);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(3);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(4);
        continue;

      case 9:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 10:
        if ($p) {
          $.goto = 7;
          continue;
        } else {
          $.state = 11;
        }

      case 11:
        $.goto = 12;
        $p = ($M.context.call = eff)(2);
        continue;

      case 12:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 13;
        }

      case 13:
        $.$.$1++;
        $.goto = 6;
        continue;

      case 14:
        return $M.ret($.value);

      case 15:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["5:4-5:10", "e", $s$1], ["14:2-14:8", "e", $s$1], ["15:2-15:8", "e", $s$1], [], [], ["8:10-8:16", "e", $s$1], ["11:4-11:10", "e", $s$1], ["12:4-12:10", "e", $s$1], [], [], ["9:10-9:16", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();