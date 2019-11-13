var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref1: "$3"
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
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $M.lset($.$, "ref1", [1, 2, 3]);
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $M.lset($.$, "j", 0);
        $M.lset($.$, "len", $.$.$3.length);
        $.state = 4;

      case 4:
        if ($.$.$1 < $.$.$2) {
          $.goto = 5;
          $M.brk(3);
          continue;
        } else {
          return $M.ret();
        }

      case 5:
        $M.lset($.$, "i", $.$.$3[$.$.$1]);
        $.goto = 6;
        $M.brk(4);
        continue;

      case 6:
        $.goto = 7;
        $M.mcall("log", console, $.$.$0);
        continue;

      case 7:
        $M.lset($.$, "j", $.$.$1 + 1);
        $.goto = 4;
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:22", "s", $s$2], ["3:2-3:19", "s", $s$2], ["4:2-7:3", "s", $s$2], [], ["5:4-5:16", "s", $s$2], ["6:4-6:19", "s", $s$2], ["6:4-6:18", "e", $s$2], [], [], []]);
module.exports = $M.exports();