var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  b: "$0"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.b($);
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
$M.fun("m$1", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(1);
        continue;

      case 1:
        switch ($p) {
          case 1:
            $.goto = 7;
            $p = ($M.context.call = effB)(1);
            continue;

          case 2:
            $.goto = 2;
            continue;

          default:
            $.goto = 3;
            continue;
        }

      case 2:
        $.goto = 5;
        $p = ($M.context.call = effB)(2);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        $.state = 4;

      case 4:
        return $M.ret();

      case 5:
        if ($p) {
          $.goto = 4;
          continue;
        } else {
          $.state = 6;
        }

      case 6:
        $.goto = 4;
        ($M.context.call = effB)(3);
        continue;

      case 7:
        if ($p) {
          $.goto = 4;
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.goto = 2;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:10-3:16", "e", $s$1], ["5:10-5:17", "e", $s$1], ["7:10-7:17", "e", $s$1], ["13:6-13:12", "e", $s$1], [], [], ["10:6-10:13", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();