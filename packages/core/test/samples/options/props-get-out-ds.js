var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  tuza: "$0"
}, null, false],
    $s$2 = [{
  av: "$0",
  tuzb: "$1"
}, $s$1, false],
    $s$3 = [{
  b: "$0",
  mv: "$1",
  v: "$2"
}, $s$2, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.tuza($);
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
$M.fun("m$1", "tuza", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c.tuzb($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.$.$0 = 1;
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:13", "s", $s$2], [], [], []]);
$M.fun("m$2", "tuzb", "m$1", [], 0, function () {
  var $2, $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        $.$.$0 = 2;
        $.$.$1 = 3;
        $.goto = 2;
        $M.brk(2);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$.$0)();
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = che)($M.lset($.$$.$, "av", $p));
        continue;

      case 4:
        $.goto = 5;
        $M.brk(3);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = me)();
        continue;

      case 6:
        $.goto = 7;
        $M.brk(4);
        continue;

      case 7:
        $0 = c.b;
        $1 = $0.a;
        $M.set($0, "a", $1 + 1);
        $0 = $.$.$0.a.d;
        $.$.$2 = $M.set($0, $1, $0[$1] - 1);
        $.goto = 8;
        $M.brk(5);
        continue;

      case 8:
        $M.gset(global, "c", $.$.$2);
        $.goto = 9;
        $M.brk(6);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = be)();
        continue;

      case 10:
        $.goto = 11;
        $M.brk(7);
        continue;

      case 11:
        if (process === 1000) {
          $.goto = 19;
          $p = ($M.context.call = c_fun)("a");
          continue;
        } else {
          $.$.$3 = 2;
          $.state = 12;
        }

      case 12:
        $M.gset(global, "c", $.$.$3);
        $.goto = 13;
        $M.brk(8);
        continue;

      case 13:
        $1 = $.$$.$.$0.m;
        $0 = $.$.$0.a;
        $2 = $0[$1];
        $M.set($0, $1, $2 + 1);

        if ($2) {
          $.goto = 18;
          $M.brk(9);
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 15;
        $M.brk(10);
        continue;

      case 15:
        $.goto = 16;
        $p = ($M.context.call = $.$.$0)();
        continue;

      case 16:
        $.$.$3 = $p;
        $.goto = 17;
        $p = ($M.context.call = $.$$.$.$0)();
        continue;

      case 17:
        $M.del($.$.$3, $p + $M.del($.$$.$.$0.z, 2 + 2));
        return $M.ret();

      case 18:
        $M.del($.$.$0, $.$$.$.$0);
        $.goto = 14;
        continue;

      case 19:
        $.goto = 20;
        $p = $M.mcall($p, process, "b");
        continue;

      case 20:
        $.$.$3 = $p;
        $.goto = 21;
        $p = ($M.context.call = d_fun)("c");
        continue;

      case 21:
        $.$.$4 = $p;
        $.goto = 22;
        $p = new ($M.context.call = process.D)("e");
        continue;

      case 22:
        $.goto = 23;
        $p = ($M.context.call = $.$.$3)($.$.$4, "d", $p);
        continue;

      case 23:
        $.goto = 24;
        $p = ($M.context.call = a_fun)($p);
        continue;

      case 24:
        $.$.$3 = $p;
        $.goto = 12;
        continue;

      case 25:
        return $M.ret($.value);

      case 26:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["5:4-6:13", "s", $s$3], ["7:4-7:20", "s", $s$3], ["7:14-7:17", "e", $s$3], ["7:4-7:19", "e", $s$3], ["11:4-11:9", "s", $s$3], ["11:4-11:8", "e", $s$3], ["12:4-12:31", "s", $s$3], ["13:4-13:10", "s", $s$3], ["14:4-14:9", "s", $s$3], ["14:4-14:8", "e", $s$3], ["15:4-18:12", "s", $s$3], ["17:24-17:34", "e", $s$3], ["19:4-19:34", "s", $s$3], ["19:21-19:34", "s", $s$3], ["21:4-21:42", "s", $s$3], ["21:11-21:14", "e", $s$3], ["21:15-21:19", "e", $s$3], [], [], ["17:16-17:40", "e", $s$3], ["17:41-17:51", "e", $s$3], ["17:58-17:76", "e", $s$3], ["17:16-17:77", "e", $s$3], ["17:10-17:78", "e", $s$3], [], [], []]);
module.exports = $M.exports();