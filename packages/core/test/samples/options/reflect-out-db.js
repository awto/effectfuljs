var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1"
}, null, false],
    $s$2 = [{
  addLater: "$0"
}, $s$1, false],
    $s$3 = [{
  result: "$0"
}, $s$2, false],
    $s$4 = [{
  err: "$1"
}, $s$3, false],
    $s$5 = [{
  a: "$0",
  b: "$1",
  deferred: "$2"
}, $s$2, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$1 = $c.b($);
        $.goto = 1;
        ($M.context.call = M.profile).dbg$call(M, "defaultMinimal");
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
}, null, null, [["14:0-14:27", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("a");
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.reflect).dbg$call(M, monadish);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(1);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M)($p);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = M.reflect).dbg$call(M, monadish + 2);
        continue;

      case 5:
        $.goto = 6;
        $p = ($M.context.call = M.reify).dbg$call(M, $c.f($));
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, $p);
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:10", "e", $s$1], ["3:2-3:21", "e", $s$1], ["4:4-4:10", "e", $s$1], ["4:2-4:11", "e", $s$1], ["5:2-5:25", "e", $s$1], ["7:4-10:6", "e", $s$1], ["6:2-11:3", "e", $s$1], [], [], []]);
$M.fun("m$2", null, "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(1);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(2);
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
}, null, null, [["8:6-8:12", "e", $s$1], ["9:6-9:12", "e", $s$1], [], [], []]);
$M.fun("m$3", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.addLater($);
        $.goto = 1;
        $p = ($M.context.call = M.reify).dbg$call(M, $c.f($));
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = $p.done).dbg$call($p);
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
}, null, null, [["17:2-25:4", "e", $s$2], ["17:2-25:11", "e", $s$2], [], [], []]);
$M.fun("m$4", null, "m$3", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $p = ($M.context.call = $.$$.$.$0)(1, 2);
        continue;

      case 1:
        $1 = $.value;
        $.goto = 7;
        ($M.context.call = done)($.$.$1);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = M)($p);
        continue;

      case 3:
        $.$.$0 = $p;
        $.state = 4;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = expect)($.$.$0);
        continue;

      case 5:
        $0 = $p.to;
        $.goto = 6;
        ($M.context.call = $0.equal).dbg$call($0, 3);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = done)();
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 5:
    case 6:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [["18:19-18:33", "e", $s$3], ["23:6-23:15", "e", $s$4], ["18:17-18:34", "e", $s$3], [], ["20:6-20:20", "e", $s$3], ["20:6-20:32", "e", $s$3], ["21:6-21:12", "e", $s$3], [], [], []]);
$M.fun("m$5", "addLater", "m$3", ["a", "b"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = Q.defer).dbg$call(Q);
        continue;

      case 1:
        $.$.$2 = $p;
        $.goto = 2;
        ($M.context.call = process.nextTick).dbg$call(process, $c.f($));
        continue;

      case 2:
        return $M.ret($.$.$2.promise);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["28:19-28:28", "e", $s$5], ["29:4-31:6", "e", $s$5], [], [], []]);
$M.fun("m$6", null, "m$5", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = $.$$.$.$2.resolve).dbg$call($.$$.$.$2, $.$$.$.$0 + $.$$.$.$1);
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
}, null, null, [["30:6-30:29", "e", $s$5], [], [], []]);
module.exports = $M.exports();