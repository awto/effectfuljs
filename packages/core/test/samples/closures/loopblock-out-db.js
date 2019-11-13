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
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $M.iterFin($.$.$4);
        $.goto = $.$.$2;
        continue;

      case 2:
        $M.popScope();
        $.goto = 12;
        continue;

      case 3:
        $M.iterErr($.$.$4, $.value, false);
        $.goto = 10;
        continue;

      case 4:
        $.$.$1 = 0;
        $.goto = 5;
        $p = ($M.context.call = eff)(2, $.$$.$.$1);
        continue;

      case 5:
        $.$.$4 = $M.iterator($p);
        $.state = 6;

      case 6:
        $M.pushScope();
        $.state = 7;

      case 7:
        $0 = $.$$.$.$4.next();

        if ($0.done) {
          $.$$.$.$3 = 1;
          $.$$.$.$2 = 10;
          $.goto = 2;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 8;
          ($M.context.call = eff)(3, $.$$.$.$1, $.$$.$.$1);
          continue;
        }

      case 8:
        $.$.$1 = $.$.$0 + 1;
        $.$.$2 = $.$.$0 + 1;
        $.$.$0++;
        $.goto = 9;
        ($M.context.call = eff)($c.b($));
        continue;

      case 9:
        $.goto = 7;
        ($M.context.call = eff)(7, $.$$.$.$1, $.$.$0, $.$.$1);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = eff)(8, $.$.$1, $.$.$0);
        continue;

      case 11:
        return $M.ret();

      case 12:
        $.goto = $.$.$3;
        continue;

      case 13:
        return $M.ret($.value);

      case 14:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 14;
      $.goto = 1;
      break;

    case 2:
      $.goto = 3;
      break;

    case 7:
    case 8:
    case 9:
      $.$$.$.$3 = 3;
      $.goto = 2;
      break;

    case 6:
    case 12:
      $.goto = 3;
      break;

    default:
      $.goto = 14;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 7:
    case 8:
    case 9:
      $.$$.$.$3 = 1;
      $.$$.$.$2 = 13;
      $.goto = 2;
      break;

    case 2:
    case 3:
    case 6:
    case 12:
      $.$.$2 = 13;
      $.goto = 1;
      break;

    default:
      $.goto = 13;
      break;
  }
}, [["2:2-2:8", "e", $s$2], [], [], [], ["4:16-4:25", "e", $s$3], [], [], ["5:4-5:16", "e", $s$4], ["9:4-20:6", "e", $s$4], ["21:4-21:19", "e", $s$4], ["23:2-23:14", "e", $s$2], [], [], [], []]);
$M.fun("m$2", "b", "m$1", ["k"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(4, $.$$.$$.$.$1, $.$$.$.$1, $.$.$1++, $.$$.$$.$.$0);
        continue;

      case 1:
        $.$.$2 = 10;
        $.$$.$.$1++;
        $.$$.$$.$.$1++;
        $.$$.$.$0++;
        $.$.$2++;
        $.$$.$$.$.$0++;
        $.goto = 2;
        ($M.context.call = eff)(5, $.$$.$$.$.$1, $.$$.$.$0, $.$.$2, $.$$.$$.$.$0);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(6, $.$$.$$.$.$1, $.$$.$.$0, $.$.$1, $.$$.$$.$.$0);
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
}, null, null, [["10:6-10:26", "e", $s$5], ["17:8-17:26", "e", $s$6], ["19:6-19:24", "e", $s$5], [], [], []]);
module.exports = $M.exports();