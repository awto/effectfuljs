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
        $.goto = 2;
        $p = ($M.context.call = eff)($.$.$0 += 1);
        continue;

      case 2:
        $.$.$1 = $p;
        $.goto = 3;
        $p = ($M.context.call = check)($.$.$0 += 2);
        continue;

      case 3:
        if ($.$.$1 === $p) {
          $.goto = 8;
          ($M.context.call = effB)($.$.$0 += 3);
          continue;
        } else {
          $.goto = 4;
          $p = ($M.context.call = check)($.$.$0 += 4);
          continue;
        }

      case 4:
        if ($.$.$1 === $p) {
          $.state = 5;
        } else {
          $.goto = 6;
          $p = ($M.context.call = check)($.$.$0 += 6);
          continue;
        }

      case 5:
        $.goto = 8;
        ($M.context.call = effB)($.$.$0 += 5);
        continue;

      case 6:
        if ($.$.$1 === $p) {
          $.state = 7;
        } else {
          $.goto = 8;
          continue;
        }

      case 7:
        $.goto = 8;
        ($M.context.call = console.log).dbg$call(console, "hi", $.$.$0);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 9:
        return $M.ret();

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:7", "e", $s$2], ["5:10-5:23", "e", $s$2], ["6:9-6:24", "e", $s$2], ["7:6-7:20", "e", $s$2], ["12:9-12:24", "e", $s$2], ["10:6-10:20", "e", $s$2], [], ["13:6-13:26", "e", $s$2], ["15:2-15:8", "e", $s$2], [], [], []]);
module.exports = $M.exports();