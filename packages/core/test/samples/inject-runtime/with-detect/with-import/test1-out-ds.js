var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _generators: "$0",
  _interopRequireDefault: "$1",
  a: "$2"
}, null, false],
    $s$2 = [{
  obj: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c._interopRequireDefault($);
        $.$.$2 = $c.a($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.evalDir("@effectful/generators");
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$.$1)($p);
        continue;

      case 3:
        $.$.$0 = $p;
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:38", "s", $s$1], [null, "e", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "_interopRequireDefault", "m$0", ["obj"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $0 = $.$.$0;

        if ($0) {
          $0 = $.$.$0.__esModule;
          $.state = 2;
        } else {
          $.state = 2;
        }

      case 2:
        if ($0) {
          $.value = $.$.$0;
          $.state = 3;
        } else {
          $.value = {
            default: $.$.$0
          };
          $.state = 3;
        }

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
}, null, null, [[null, "s", $s$2], [], [], [], [], []]);
$M.fun("m$2", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(2);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(3);
        continue;

      case 3:
        $.goto = 4;
        $M.yld(2);
        continue;

      case 4:
        return $M.retG();

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:10", "s", $s$1], [null, null, null], ["5:2-5:10", "s", $s$1], [null, null, null], [], [], []]);
module.exports = $M.exports();