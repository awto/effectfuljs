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

        if (t) {
          $.goto = 1;
          ($M.context.call = eff1)($.$.$0);
          continue;
        } else {
          $.$.$0++;
          $.state = 1;
        }

      case 1:
        $.goto = 2;
        ($M.context.call = eff2)($.$.$0);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff3)($.$.$0);
        continue;

      case 3:
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:4-4:11", "e", $s$2], ["8:2-8:9", "e", $s$2], ["9:2-9:9", "e", $s$2], [], [], []]);
module.exports = $M.exports();