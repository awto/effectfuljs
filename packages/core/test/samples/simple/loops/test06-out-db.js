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
        $.goto = 1;
        ($M.context.call = eff1)();
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff2)();
        continue;

      case 2:
        $.$.$0 = $p;
        $.state = 3;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(3);
        continue;

      case 4:
        if ($.$.$0 !== $p) {
          $.goto = 6;
          ($M.context.call = eff5)($.$.$0);
          continue;
        } else {
          $.goto = 5;
          ($M.context.call = eff7)($.$.$0);
          continue;
        }

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        ($M.context.call = eff6)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff4)($.$.$0);
        continue;

      case 8:
        $.$.$0 = $p;
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
}, null, null, [["3:2-3:8", "e", $s$2], ["4:11-4:17", "e", $s$2], [], ["4:25-4:31", "e", $s$2], ["5:4-5:11", "e", $s$2], [], ["6:4-6:11", "e", $s$2], ["4:37-4:44", "e", $s$2], [], [], []]);
module.exports = $M.exports();