var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
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
        if (true) {
          2;
          $.state = 1;
        } else {
          3;
          $.state = 1;
        }

      case 1:
        return $M.ret(1);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 3;
          ($M.context.call = console.log).dbg$call(console, "a");
          continue;
        } else {
          $.goto = 1;
          ($M.context.call = console.log).dbg$call(console, "c");
          continue;
        }

      case 1:
        $.goto = 2;
        ($M.context.call = console.log).dbg$call(console, "d");
        continue;

      case 2:
        return $M.ret();

      case 3:
        $.goto = 2;
        ($M.context.call = console.log).dbg$call(console, "b");
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["9:4-9:20", "e", $s$1], ["13:4-13:20", "e", $s$1], [], ["10:4-10:20", "e", $s$1], [], []]);
module.exports = $M.exports();