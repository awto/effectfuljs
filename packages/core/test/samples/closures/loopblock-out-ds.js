var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  p: "$0",
  a: "$1"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
}, $s$2, true],
    $s$4 = [{
  j: "$1",
  k: "$2"
}, $s$3, false],
    $s$5 = [{
  b: "$0",
  k: "$1"
}, $s$4, false],
    $s$6 = [{
  k: "$2"
}, $s$5, false];
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
$M.fun("m$1", "a", "m$0", ["p"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 4;
        $M.brk(0);
        continue;

      case 1:
        $M.iterFin($.$.$4);
        $.goto = $.$.$2;
        continue;

      case 2:
        $M.popScope();
        $.goto = 21;
        continue;

      case 3:
        $M.iterErr($.$.$4, $.value, false);
        $.goto = 18;
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(1);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(1);
        continue;

      case 6:
        $.$.$1 = 0;
        $.goto = 7;
        $M.brk(2);
        continue;

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff)(2, $.$$.$.$1);
        continue;

      case 8:
        $.$.$4 = $M.iterator($p);
        $.state = 9;

      case 9:
        $M.pushScope();
        $.state = 10;

      case 10:
        $0 = $.$$.$.$4.next();

        if ($0.done) {
          $.$$.$.$3 = 1;
          $.$$.$.$2 = 18;
          $.goto = 2;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 11;
          $M.brk(3);
          continue;
        }

      case 11:
        $.goto = 12;
        ($M.context.call = eff)(3, $.$$.$.$1, $.$$.$.$1);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(4);
        continue;

      case 13:
        $.$.$1 = $.$.$0 + 1;
        $.$.$2 = $.$.$0 + 1;
        $.goto = 14;
        $M.brk(5);
        continue;

      case 14:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 15;
        $M.brk(6);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = eff)($c.b($));
        continue;

      case 16:
        $.goto = 17;
        $M.brk(15);
        continue;

      case 17:
        $.goto = 10;
        ($M.context.call = eff)(7, $.$$.$.$1, $.$.$0, $.$.$1);
        continue;

      case 18:
        $.goto = 19;
        $M.brk(16);
        continue;

      case 19:
        $.goto = 20;
        ($M.context.call = eff)(8, $.$.$1, $.$.$0);
        continue;

      case 20:
        return $M.ret();

      case 21:
        $.goto = $.$.$3;
        continue;

      case 22:
        return $M.ret($.value);

      case 23:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 23;
      $.goto = 1;
      break;

    case 2:
      $.goto = 3;
      break;

    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      $.$$.$.$3 = 3;
      $.goto = 2;
      break;

    case 9:
    case 21:
      $.goto = 3;
      break;

    default:
      $.goto = 23;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
      $.$$.$.$3 = 1;
      $.$$.$.$2 = 22;
      $.goto = 2;
      break;

    case 2:
    case 3:
    case 9:
    case 21:
      $.$.$2 = 22;
      $.goto = 1;
      break;

    default:
      $.goto = 22;
      break;
  }
}, [["2:2-2:9", "s", $s$2], [], [], [], ["2:2-2:8", "e", $s$2], ["3:2-3:12", "s", $s$2], ["4:2-22:3", "s", $s$2], ["4:16-4:25", "e", $s$3], [], [], ["5:4-5:17", "s", $s$4], ["5:4-5:16", "e", $s$4], ["6:4-7:16", "s", $s$4], ["8:4-8:8", "s", $s$4], ["9:4-20:7", "s", $s$4], ["9:4-20:6", "e", $s$4], ["21:4-21:20", "s", $s$4], ["21:4-21:19", "e", $s$4], ["23:2-23:15", "s", $s$2], ["23:2-23:14", "e", $s$2], [], [], [], []]);
$M.fun("m$2", "b", "m$1", ["k"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        $0 = $.$.$1;
        $M.lset($.$, "k", $0 + 1);
        $.goto = 2;
        ($M.context.call = eff)(4, $.$$.$$.$.$1, $.$$.$.$1, $0, $.$$.$$.$.$0);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(8);
        continue;

      case 3:
        $.$.$2 = 10;
        $.goto = 4;
        $M.brk(9);
        continue;

      case 4:
        $M.lset($.$$.$, "j", $.$$.$.$1 + 1);
        $.goto = 5;
        $M.brk(10);
        continue;

      case 5:
        $M.lset($.$$.$$.$, "a", $.$$.$$.$.$1 + 1);
        $.goto = 6;
        $M.brk(11);
        continue;

      case 6:
        $M.lset($.$$.$, "i", $.$$.$.$0 + 1);
        $.goto = 7;
        $M.brk(12);
        continue;

      case 7:
        $M.lset($.$, "k", $.$.$2 + 1);
        $M.lset($.$$.$$.$, "p", $.$$.$$.$.$0 + 1);
        $.goto = 8;
        $M.brk(13);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(5, $.$$.$$.$.$1, $.$$.$.$0, $.$.$2, $.$$.$$.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(14);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(6, $.$$.$$.$.$1, $.$$.$.$0, $.$.$1, $.$$.$$.$.$0);
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
}, null, null, [["10:6-10:27", "s", $s$5], ["10:6-10:26", "e", $s$5], ["12:8-12:21", "s", $s$6], ["13:8-13:12", "s", $s$6], ["14:8-14:12", "s", $s$6], ["15:8-15:12", "s", $s$6], ["16:8-16:17", "s", $s$6], ["17:8-17:27", "s", $s$6], ["17:8-17:26", "e", $s$6], ["19:6-19:25", "s", $s$5], ["19:6-19:24", "e", $s$5], [], [], []]);
module.exports = $M.exports();