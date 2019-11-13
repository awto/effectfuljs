var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  fSent: "$0"
}, null, false],
    $s$2 = [{
  s: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.fSent($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.profile).dbg$call(M, "generators");
        continue;

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
}, null, null, [["1:0-1:24", "s", $s$1], ["1:0-1:23", "e", $s$1], [], [], []]);
$M.fun("m$1", "fSent", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, true);
        $.goto = 7;
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld($.sent);
        continue;

      case 4:
        $.$.$0 = $p;
        $.goto = 5;
        $M.brk(2);
        continue;

      case 5:
        $.$.$2 = $M.iterator([1, 2, 3, $.sent]);
        $.state = 6;

      case 6:
        $0 = $.$.$2.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 7;
        } else {
          $.goto = 8;
          continue;
        }

      case 7:
        $.goto = 9;
        $M.brk(3);
        continue;

      case 8:
        $M.yld($1);
        $.goto = 6;
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = console.log).dbg$call(console, $.$.$0, $.sent);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(4);
        continue;

      case 11:
        $.goto = 12;
        $p = $M.yld(undefined);
        continue;

      case 12:
        $.goto = 13;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 13:
        $.goto = 14;
        $M.brk(5);
        continue;

      case 14:
        $.goto = 15;
        $p = $M.yld(undefined);
        continue;

      case 15:
        $.goto = 16;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 16:
        return $M.retG();

      case 17:
        return $M.retG($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 18;
      $.goto = 1;
      break;

    case 8:
      $.goto = 2;
      break;

    default:
      $.goto = 18;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 8:
      $.$.$1 = 17;
      $.goto = 1;
      break;

    default:
      $.goto = 17;
      break;
  }
}, [["4:2-4:30", "s", $s$2], [], [], [null, null, null], ["5:2-5:34", "s", $s$2], [], [], ["6:2-6:32", "s", $s$2], [], ["6:2-6:31", "e", $s$2], ["7:2-7:21", "s", $s$2], [null, null, null], ["7:2-7:20", "e", $s$2], ["8:2-8:21", "s", $s$2], [null, null, null], ["8:2-8:20", "e", $s$2], [], [], []]);
module.exports = $M.exports();