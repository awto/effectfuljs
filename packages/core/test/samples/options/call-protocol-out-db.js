var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a1: "$0",
  a2: "$1",
  a3: "$2",
  a4: "$3",
  a5: "$4",
  a6: "$5"
}, null, false],
    $s$2 = [{
  a: "$0",
  b: "$1"
}, $s$1, false],
    $s$3 = [{
  a: "$0",
  b: "$1"
}, $s$1, false],
    $s$4 = [{
  a: "$0",
  b: "$1"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a1($);
        $.$.$5 = $c.a6($);
        $.$.$4 = $c.a5($);
        $.$.$3 = $c.a4($);
        $.$.$2 = $c.a3($);
        $.$.$1 = $c.a2($);
        $.goto = 1;
        ($M.context.call = M.option).dbg$call(M, {
          callProtocol: "apply"
        });
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.option).dbg$call(M, {
          callProtocol: "call"
        });
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          callProtocol: false
        });
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M.option).dbg$call(M, {
          newProtocol: "method"
        });
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = M.option).dbg$call(M, {
          newProtocol: "op"
        });
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.option).dbg$call(M, {
          newProtocol: false
        });
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:35", "e", $s$1], ["12:0-12:34", "e", $s$1], ["24:0-24:33", "e", $s$1], ["35:0-35:35", "e", $s$1], ["44:0-44:31", "e", $s$1], ["53:0-53:32", "e", $s$1], [], [], []]);
$M.fun("m$1", "a1", "m$0", ["a", "b"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$.$0.eff).dbg$call($.$.$0, $p);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = $p.eff).dbg$call($p, d);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = M.option).dbg$call(M, {
          callName: "APPLY"
        });
        continue;

      case 4:
        $0 = $.$.$0.b;
        $.goto = 5;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 5:
        $0 = [$.$.$0.b];
        $.goto = 6;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 6:
        $0 = {
          a: $.$.$0
        };
        $.goto = 7;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 7:
        $.goto = 8;
        $p = new ($M.context.call = A)({
          a: $.$.$0
        });
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = $p.eff).dbg$call($p, d);
        continue;

      case 9:
        return $M.ret();

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:8-4:14", "e", $s$2], ["4:2-4:15", "e", $s$2], ["4:2-4:22", "e", $s$2], ["5:2-5:33", "e", $s$2], ["6:2-6:12", "e", $s$2], ["7:2-7:14", "e", $s$2], ["8:3-8:15", "e", $s$2], ["9:2-9:14", "e", $s$2], ["9:2-9:21", "e", $s$2], [], [], []]);
$M.fun("m$2", "a2", "m$0", ["a", "b"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$.$0.eff).dbg$call($.$.$0, $p);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = $p.eff).dbg$call($p, d);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = M.option).dbg$call(M, {
          callName: "CALL"
        });
        continue;

      case 5:
        $0 = $.$.$0.b;
        $.goto = 6;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 6:
        $0 = [$.$.$0.b];
        $.goto = 7;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 7:
        $0 = {
          a: $.$.$0
        };
        $.goto = 8;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 8:
        $.goto = 9;
        $p = new ($M.context.call = A)({
          a: $.$.$0
        });
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = $p.eff).dbg$call($p, d);
        continue;

      case 10:
        return $M.ret();

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["15:2-15:8", "e", $s$3], ["16:8-16:14", "e", $s$3], ["16:2-16:15", "e", $s$3], ["16:2-16:22", "e", $s$3], ["17:2-17:32", "e", $s$3], ["18:2-18:12", "e", $s$3], ["19:2-19:14", "e", $s$3], ["20:3-20:15", "e", $s$3], ["21:2-21:14", "e", $s$3], ["21:2-21:21", "e", $s$3], [], [], []]);
$M.fun("m$3", "a3", "m$0", ["a", "b"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$.$0.eff).dbg$call($.$.$0, $p);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = $p.eff).dbg$call($p, d);
        continue;

      case 4:
        $0 = $.$.$0.b;
        $.goto = 5;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 5:
        $0 = [$.$.$0.b];
        $.goto = 6;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 6:
        $0 = {
          a: $.$.$0
        };
        $.goto = 7;
        ($M.context.call = $0.eff).dbg$call($0, d);
        continue;

      case 7:
        $.goto = 8;
        $p = new ($M.context.call = A)({
          a: $.$.$0
        });
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = $p.eff).dbg$call($p, d);
        continue;

      case 9:
        return $M.ret();

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["27:2-27:8", "e", $s$4], ["28:8-28:14", "e", $s$4], ["28:2-28:15", "e", $s$4], ["28:2-28:22", "e", $s$4], ["29:2-29:12", "e", $s$4], ["30:2-30:14", "e", $s$4], ["31:3-31:15", "e", $s$4], ["32:2-32:14", "e", $s$4], ["32:2-32:21", "e", $s$4], [], [], []]);
$M.fun("m$4", "a4", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = B.B;
        $.goto = 1;
        $p = new ($M.context.call = A)(a);
        continue;

      case 1:
        $.goto = 2;
        new ($M.context.call = $.$.$0)($p);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          newName: "NEW"
        });
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)();
        continue;

      case 4:
        $.goto = 5;
        new ($M.context.call = $p.Z)(b);
        continue;

      case 5:
        $.goto = 6;
        new ($M.context.call = {
          a: a
        }.a)();
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["38:10-38:18", "e", $s$1], ["38:2-38:19", "e", $s$1], ["39:2-39:30", "e", $s$1], ["40:7-40:12", "e", $s$1], ["40:2-40:18", "e", $s$1], ["41:2-41:15", "e", $s$1], [], [], []]);
$M.fun("m$5", "a5", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = B.B;
        $.goto = 1;
        $p = new ($M.context.call = A)(a);
        continue;

      case 1:
        $.goto = 2;
        new ($M.context.call = $.$.$0)($p);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          newName: "NEW"
        });
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)();
        continue;

      case 4:
        $.goto = 5;
        new ($M.context.call = $p.Z)(b);
        continue;

      case 5:
        $.goto = 6;
        new ($M.context.call = {
          a: a
        }.a)();
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["47:10-47:18", "e", $s$1], ["47:2-47:19", "e", $s$1], ["48:2-48:30", "e", $s$1], ["49:7-49:12", "e", $s$1], ["49:2-49:18", "e", $s$1], ["50:2-50:15", "e", $s$1], [], [], []]);
$M.fun("m$6", "a6", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = B.B;
        $.goto = 1;
        $p = new ($M.context.call = A)(a);
        continue;

      case 1:
        $.goto = 2;
        new ($M.context.call = $.$.$0)($p);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
          newName: "NEW"
        });
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)();
        continue;

      case 4:
        $.goto = 5;
        new ($M.context.call = $p.Z)(b);
        continue;

      case 5:
        $.goto = 6;
        new ($M.context.call = {
          a: a
        }.a)();
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["56:10-56:18", "e", $s$1], ["56:2-56:19", "e", $s$1], ["57:2-57:30", "e", $s$1], ["58:7-58:12", "e", $s$1], ["58:2-58:18", "e", $s$1], ["59:2-59:15", "e", $s$1], [], [], []]);
module.exports = $M.exports();