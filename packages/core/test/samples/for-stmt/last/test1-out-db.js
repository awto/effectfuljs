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
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 1;

      case 1:
        if ($.$.$1 < $.$.$2) {
          $.$.$0 = $.$.$3[$.$.$1];
          $.goto = 3;
          $p = ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        return $M.ret();

      case 3:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$1++;
        $.goto = 1;
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["6:8-6:14", "e", $s$1], [], [], [], [], []]);
module.exports = $M.exports();