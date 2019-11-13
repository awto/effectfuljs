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
        $.$.$0 = 1;
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
$M.fun("m$2", "tuzb", "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 2;
        $.$.$1 = 3;
        $.goto = 1;
        $p = ($M.context.call = $.$.$0)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = che)($.$$.$.$0 = $p);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = me)();
        continue;

      case 3:
        $.$.$2 = --$.$.$0.a.d[c.b.a++];
        c = $.$.$2;
        $.goto = 4;
        ($M.context.call = be)();
        continue;

      case 4:
        if (process === 1000) {
          $.goto = 9;
          $p = ($M.context.call = c_fun)("a");
          continue;
        } else {
          $.$.$3 = 2;
          $.state = 5;
        }

      case 5:
        c = $.$.$3;

        if ($.$.$0.a[$.$$.$.$0.m]++) {
          delete $.$.$0[$.$$.$.$0];
          $.state = 6;
        } else {
          $.state = 6;
        }

      case 6:
        $.goto = 7;
        $p = ($M.context.call = $.$.$0)();
        continue;

      case 7:
        $.$.$3 = $p;
        $.goto = 8;
        $p = ($M.context.call = $.$$.$.$0)();
        continue;

      case 8:
        delete $.$.$3[$p + delete $.$$.$.$0.z[2 + 2]];
        return $M.ret();

      case 9:
        $.goto = 10;
        $p = ($M.context.call = process[$p]).dbg$call(process, "b");
        continue;

      case 10:
        $.$.$3 = $p;
        $.goto = 11;
        $p = ($M.context.call = d_fun)("c");
        continue;

      case 11:
        $.$.$4 = $p;
        $.goto = 12;
        $p = new ($M.context.call = process.D)("e");
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = $.$.$3)($.$.$4, "d", $p);
        continue;

      case 13:
        $.goto = 14;
        $p = ($M.context.call = a_fun)($p);
        continue;

      case 14:
        $.$.$3 = $p;
        $.goto = 5;
        continue;

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:14-7:17", "e", $s$3], ["7:4-7:19", "e", $s$3], ["11:4-11:8", "e", $s$3], ["14:4-14:8", "e", $s$3], ["17:24-17:34", "e", $s$3], [], ["21:11-21:14", "e", $s$3], ["21:15-21:19", "e", $s$3], [], ["17:16-17:40", "e", $s$3], ["17:41-17:51", "e", $s$3], ["17:58-17:76", "e", $s$3], ["17:16-17:77", "e", $s$3], ["17:10-17:78", "e", $s$3], [], [], []]);
module.exports = $M.exports();