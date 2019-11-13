var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  e: "$4",
  f: "$5",
  g: "$6",
  h: "$7"
}, null, false],
    $s$2 = [{
  i: "$0"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
}, $s$1, false],
    $s$4 = [{
  i: "$0"
}, $s$1, false],
    $s$5 = [{
  i: "$0"
}, $s$1, false],
    $s$6 = [{
  i: "$0"
}, $s$1, false],
    $s$7 = [{
  i: "$0"
}, $s$1, false],
    $s$8 = [{
  i: "$0"
}, $s$1, false],
    $s$9 = [{
  j: "$0",
  i: "$1"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$7 = $c.h($);
        $.$.$6 = $c.g($);
        $.$.$5 = $c.f($);
        $.$.$4 = $c.e($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.b($);
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
        $p = ($M.context.call = eff)(2);
        continue;

      case 1:
        $.$.$1 = $M.forInIterator($p);
        $.state = 2;

      case 2:
        $0 = $.$.$1.next();

        if ($0.done) {
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:16-2:22", "e", $s$2], [], ["3:4-3:10", "e", $s$2], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(2);
        continue;

      case 1:
        $.$.$1 = $M.forInIterator($p);
        $.state = 2;

      case 2:
        $0 = $.$.$1.next();

        if ($0.done) {
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["9:12-9:18", "e", $s$3], [], ["10:4-10:10", "e", $s$3], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(2);
        continue;

      case 1:
        $.$.$1 = $M.forInIterator($p);
        $.state = 2;

      case 2:
        $0 = $.$.$1.next();

        if ($0.done) {
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["16:16-16:22", "e", $s$4], [], ["17:4-17:10", "e", $s$4], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)(2);
        continue;

      case 1:
        $.$.$1 = $M.forInIterator($p);
        $.state = 2;

      case 2:
        $0 = $.$.$1.next();

        if ($0.done) {
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 2;
          ($M.context.call = console.log).dbg$call(console, $.$.$0);
          continue;
        }

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:16-22:22", "e", $s$5], [], ["23:4-23:18", "e", $s$5], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $M.forInIterator(obj);
        $.state = 1;

      case 1:
        $0 = $.$.$1.next();

        if ($0.done) {
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 1;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["29:4-29:10", "e", $s$6], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $M.forInIterator(obj);
        $.state = 1;

      case 1:
        $0 = $.$.$1.next();

        if ($0.done) {
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 1;
          ($M.context.call = console.log).dbg$call(console, $.$.$0);
          continue;
        }

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["35:4-35:18", "e", $s$7], [], []]);
$M.fun("m$7", "g", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("a");
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)(2);
        continue;

      case 2:
        $.$.$1 = $M.forInIterator($p);
        $.state = 3;

      case 3:
        $0 = $.$.$1.next();

        if ($0.done) {
          $.goto = 8;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 4;
          $p = ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 4:
        if ($p) {
          $.goto = 3;
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $p = ($M.context.call = effB)($.$.$0);
        continue;

      case 6:
        if ($p) {
          $.goto = 8;
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 3;
        ($M.context.call = eff)("c");
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)("z");
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
}, null, null, [["40:2-40:10", "e", $s$8], ["41:16-41:22", "e", $s$8], [], ["42:8-42:14", "e", $s$8], [], ["43:8-43:15", "e", $s$8], [], ["44:4-44:12", "e", $s$8], ["46:2-46:10", "e", $s$8], [], [], []]);
$M.fun("m$8", "h", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("a");
        continue;

      case 1:
        $.$.$2 = $M.forInIterator(obj);
        $.state = 2;

      case 2:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.goto = 18;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 3;
          ($M.context.call = console.log).dbg$call(console, "j");
          continue;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = effA)($.$.$0);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        $.$.$3 = $M.forInIterator($p);
        $.state = 6;

      case 6:
        $0 = $.$.$3.next();

        if ($0.done) {
          $.goto = 17;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 7;
          ($M.context.call = console.log).dbg$call(console, "b");
          continue;
        }

      case 7:
        $.goto = 8;
        ($M.context.call = eff)("b");
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = eff)($.$.$1 + $.$.$0);
        continue;

      case 9:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.goto = 11;
        $p = ($M.context.call = effB)($.$.$1 + $.$.$0);
        continue;

      case 11:
        if ($p) {
          $.goto = 18;
          continue;
        } else {
          $.state = 12;
        }

      case 12:
        $.goto = 13;
        $p = ($M.context.call = eff)($.$.$1);
        continue;

      case 13:
        if ($p) {
          $.goto = 6;
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 15;
        $p = ($M.context.call = effB)($.$.$1);
        continue;

      case 15:
        if ($p) {
          $.goto = 17;
          continue;
        } else {
          $.state = 16;
        }

      case 16:
        $.goto = 6;
        ($M.context.call = eff)("c");
        continue;

      case 17:
        $.goto = 2;
        ($M.context.call = effB)($.$.$0);
        continue;

      case 18:
        $.goto = 19;
        ($M.context.call = eff)("z");
        continue;

      case 19:
        return $M.ret();

      case 20:
        return $M.ret($.value);

      case 21:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["50:2-50:10", "e", $s$9], [], ["53:4-53:20", "e", $s$9], ["54:4-54:11", "e", $s$9], ["55:18-55:24", "e", $s$9], [], ["56:6-56:22", "e", $s$9], ["57:6-57:14", "e", $s$9], ["58:10-58:20", "e", $s$9], [], ["59:10-59:21", "e", $s$9], [], ["60:10-60:16", "e", $s$9], [], ["61:10-61:17", "e", $s$9], [], ["62:6-62:14", "e", $s$9], ["64:4-64:11", "e", $s$9], ["66:2-66:10", "e", $s$9], [], [], []]);
module.exports = $M.exports();