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
        ($M.context.call = M.profile).dbg$call(M, "generators");
        continue;

      case 1:
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:23", "e", $s$1], [], [], []]);
$M.fun("m$1", "fSent", "m$0", [], 2, function () {
  var $1, $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = $M.yld($.sent);
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, true);
        $.goto = 5;
        continue;

      case 3:
        $.$.$0 = $p;
        $.$.$2 = $M.iterator([1, 2, 3, $.sent]);
        $.state = 4;

      case 4:
        $0 = $.$.$2.next();
        $1 = $0.value;

        if ($0.done) {
          $.state = 5;
        } else {
          $.goto = 6;
          continue;
        }

      case 5:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, $.$.$0, $.sent);
        continue;

      case 6:
        $M.yld($1);
        $.goto = 4;
        continue;

      case 7:
        $.goto = 8;
        $p = $M.yld(undefined);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 9:
        $.goto = 10;
        $p = $M.yld(undefined);
        continue;

      case 10:
        $.goto = 11;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 11:
        return $M.retG();

      case 12:
        return $M.retG($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 13;
      $.goto = 1;
      break;

    case 6:
      $.goto = 2;
      break;

    default:
      $.goto = 13;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 6:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    default:
      $.goto = 12;
      break;
  }
}, [[null, null, null], [], [], [], [], ["6:2-6:31", "e", $s$2], [], [null, null, null], ["7:2-7:20", "e", $s$2], [null, null, null], ["8:2-8:20", "e", $s$2], [], [], []]);
module.exports = $M.exports();