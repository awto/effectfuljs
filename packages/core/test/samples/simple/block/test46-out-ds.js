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
  var $0;

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
        $.goto = 3;
        $p = ($M.context.call = eff2)($M.lset($.$, "i", 0));
        continue;

      case 3:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 4;
        ($M.context.call = eff1)($p, $0);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(3);
        continue;

      case 6:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 7;
        ($M.context.call = eff3)($0);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(4);
        continue;

      case 8:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 9;
        ($M.context.call = eff4)($0);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(5);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(6);
        continue;

      case 11:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 12;
        ($M.context.call = eff5)($0);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(7);
        continue;

      case 13:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 14;
        $p = ($M.context.call = eff6)($0);
        continue;

      case 14:
        if ($p) {
          $.goto = 26;
          $M.brk(8);
          continue;
        } else {
          $.goto = 15;
          $M.brk(10);
          continue;
        }

      case 15:
        $.goto = 16;
        $p = ($M.context.call = eff7)($.$.$0);
        continue;

      case 16:
        if ($p) {
          $.goto = 18;
          $M.brk(11);
          continue;
        } else {
          $.goto = 17;
          $M.brk(13);
          continue;
        }

      case 17:
        return $M.ret(10);

      case 18:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 19;
        $M.brk(12);
        continue;

      case 19:
        $.goto = 20;
        $M.brk(15);
        continue;

      case 20:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 21;
        ($M.context.call = eff8)($0);
        continue;

      case 21:
        $.goto = 22;
        $M.brk(16);
        continue;

      case 22:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 23;
        ($M.context.call = eff9)($0);
        continue;

      case 23:
        $.goto = 24;
        $M.brk(17);
        continue;

      case 24:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 25;
        ($M.context.call = eff10)($0);
        continue;

      case 25:
        return $M.ret();

      case 26:
        $0 = $.$.$0;
        $M.lset($.$, "i", $0 + 1);
        $.goto = 27;
        ($M.context.call = eff7)($0);
        continue;

      case 27:
        $.goto = 21;
        $M.brk(9);
        continue;

      case 28:
        return $M.ret($.value);

      case 29:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "s", $s$2], ["3:2-3:27", "s", $s$2], ["3:7-3:20", "e", $s$2], ["3:2-3:26", "e", $s$2], ["4:2-21:3", "s", $s$2], ["5:4-5:14", "s", $s$2], ["5:4-5:13", "e", $s$2], ["6:4-6:14", "s", $s$2], ["6:4-6:13", "e", $s$2], ["7:4-19:5", "s", $s$2], ["8:6-8:16", "s", $s$2], ["8:6-8:15", "e", $s$2], ["9:6-17:7", "s", $s$2], ["9:10-9:19", "e", $s$2], ["10:8-10:18", "s", $s$2], ["12:17-12:24", "e", $s$2], ["13:8-13:12", "s", $s$2], [], ["14:8-14:19", "s", $s$2], ["20:4-20:14", "s", $s$2], ["20:4-20:13", "e", $s$2], ["22:2-22:12", "s", $s$2], ["22:2-22:11", "e", $s$2], ["23:2-23:13", "s", $s$2], ["23:2-23:12", "e", $s$2], [], ["10:8-10:17", "e", $s$2], ["11:8-11:19", "s", $s$2], [], []]);
module.exports = $M.exports();