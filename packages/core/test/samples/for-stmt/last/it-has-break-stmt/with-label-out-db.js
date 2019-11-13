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
          $.goto = 3;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        return $M.ret();

      case 3:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 4;

      case 4:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 6;
          $p = ($M.context.call = eff)(d);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 6:
        if ($p) {
          $.goto = 5;
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff)(2);
        continue;

      case 8:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 9;
        }

      case 9:
        $.$.$1++;
        $.goto = 4;
        continue;

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["5:4-5:10", "e", $s$1], [], [], ["8:10-8:16", "e", $s$1], [], [], ["9:10-9:16", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();