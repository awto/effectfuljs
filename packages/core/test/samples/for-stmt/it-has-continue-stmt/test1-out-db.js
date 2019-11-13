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
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          return $M.ret();
        }

      case 2:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 3;

      case 3:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 5;
          $p = ($M.context.call = eff)(d);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 5:
        if ($p) {
          $.goto = 8;
          continue;
        } else {
          $.state = 6;
        }

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)(2);
        continue;

      case 7:
        if ($p) {
          $.goto = 4;
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.$.$1++;
        $.goto = 3;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["5:4-5:10", "e", $s$1], [], ["8:10-8:16", "e", $s$1], [], [], ["9:10-9:16", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();