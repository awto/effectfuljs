var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  _generators: "$0",
  _interopRequireDefault: "$1",
  a: "$2"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c._interopRequireDefault($);
        $.$.$2 = $c.a($);
        $.goto = 1;
        $p = $M.evalDir("@effectful/generators");
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$.$1)($p);
        continue;

      case 2:
        $.$.$0 = $p;
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "_interopRequireDefault", "m$0", ["obj"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $0 = $.$.$0;

        if ($0) {
          $0 = $.$.$0.__esModule;
          $.state = 1;
        } else {
          $.state = 1;
        }

      case 1:
        if ($0) {
          $.value = $.$.$0;
          $.state = 2;
        } else {
          $.value = {
            default: $.$.$0
          };
          $.state = 2;
        }

      case 2:
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], [], [], []]);
$M.fun("m$2", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld(1);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(2);
        continue;

      case 2:
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [], [], []]);
module.exports = $M.exports();