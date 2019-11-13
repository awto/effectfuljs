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
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          return $M.ret();
        }

      case 2:
        $.$.$1++;
        $.goto = 1;
        continue;

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["6:4-6:10", "e", $s$1], [], [], []]);
module.exports = $M.exports();