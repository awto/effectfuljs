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
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        $.$.$0 = $p;
        $.goto = 2;
        $p = ($M.context.call = check)(1);
        continue;

      case 2:
        if ($.$.$0 === $p) {
          $.goto = 6;
          ($M.context.call = effB)(1);
          continue;
        } else {
          $.goto = 3;
          $p = ($M.context.call = check)(2);
          continue;
        }

      case 3:
        if ($.$.$0 === $p) {
          $.state = 4;
        } else {
          $.goto = 5;
          continue;
        }

      case 4:
        $.goto = 6;
        ($M.context.call = effB)(2);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = effB)(3);
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:10-2:16", "e", $s$1], ["3:9-3:17", "e", $s$1], ["4:6-4:13", "e", $s$1], [], ["7:6-7:13", "e", $s$1], ["10:6-10:13", "e", $s$1], [], [], []]);
module.exports = $M.exports();