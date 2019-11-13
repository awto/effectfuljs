var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0"
}, $s$1, false];
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
        $.$.$0 = 0;
        $.goto = 1;
        ($M.context.call = eff)();
        continue;

      case 1:
        $.$.$0 += 1;

        switch ($.$.$0 += 2) {
          case 1:
            $.goto = 4;
            ($M.context.call = effB)($.$.$0 += 3);
            continue;

          case 2:
            $.goto = 2;
            continue;

          case 3:
            $.goto = 3;
            continue;

          default:
            $.goto = 4;
            continue;
        }

      case 2:
        $.goto = 4;
        ($M.context.call = effB)($.$.$0);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = console.log).dbg$call(console, "hi", $.$.$0);
        $.state = 4;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        $.state = 5;

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
}, null, null, [["3:2-3:7", "e", $s$2], ["7:6-7:20", "e", $s$2], ["10:6-10:13", "e", $s$2], ["13:6-13:26", "e", $s$2], ["15:2-15:8", "e", $s$2], [], [], []]);
module.exports = $M.exports();