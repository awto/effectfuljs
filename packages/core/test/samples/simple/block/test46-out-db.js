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
        $p = ($M.context.call = eff2)($.$.$0 = 0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff1)($p, $.$.$0++);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff3)($.$.$0++);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff4)($.$.$0++);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff5)($.$.$0++);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff6)($.$.$0++);
        continue;

      case 6:
        if ($p) {
          $.goto = 9;
          ($M.context.call = eff7)($.$.$0++);
          continue;
        } else {
          $.goto = 7;
          $p = ($M.context.call = eff7)($.$.$0);
          continue;
        }

      case 7:
        if ($p) {
          $.$.$0++;
          $.state = 8;
        } else {
          return $M.ret(10);
        }

      case 8:
        $.goto = 9;
        ($M.context.call = eff8)($.$.$0++);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff9)($.$.$0++);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff10)($.$.$0++);
        continue;

      case 11:
        return $M.ret();

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:7-3:20", "e", $s$2], ["3:2-3:26", "e", $s$2], ["5:4-5:13", "e", $s$2], ["6:4-6:13", "e", $s$2], ["8:6-8:15", "e", $s$2], ["9:10-9:19", "e", $s$2], ["10:8-10:17", "e", $s$2], [], ["20:4-20:13", "e", $s$2], ["22:2-22:11", "e", $s$2], ["23:2-23:12", "e", $s$2], [], [], []]);
module.exports = $M.exports();