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
          $.goto = 3;
          $M.brk(0);
          continue;
        }

      case 3:
        $.goto = 2;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:16-2:22", "e", $s$2], [], ["3:4-3:11", "s", $s$2], ["3:4-3:10", "e", $s$2], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
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
          return $M.ret();
        } else {
          $.$.$0 = $0.value;
          $.goto = 4;
          $M.brk(2);
          continue;
        }

      case 4:
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["8:2-8:8", "s", $s$3], ["9:12-9:18", "e", $s$3], [], ["10:4-10:11", "s", $s$3], ["10:4-10:10", "e", $s$3], [], []]);
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
          $.goto = 3;
          $M.brk(3);
          continue;
        }

      case 3:
        $.goto = 2;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["16:16-16:22", "e", $s$4], [], ["17:4-17:11", "s", $s$4], ["17:4-17:10", "e", $s$4], [], []]);
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
          $.goto = 3;
          $M.brk(4);
          continue;
        }

      case 3:
        $.goto = 2;
        ($M.context.call = console.log).dbg$call(console, $.$.$0);
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:16-22:22", "e", $s$5], [], ["23:4-23:19", "s", $s$5], ["23:4-23:18", "e", $s$5], [], []]);
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
          $.goto = 2;
          $M.brk(5);
          continue;
        }

      case 2:
        $.goto = 1;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["29:4-29:11", "s", $s$6], ["29:4-29:10", "e", $s$6], [], []]);
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
          $.goto = 2;
          $M.brk(6);
          continue;
        }

      case 2:
        $.goto = 1;
        ($M.context.call = console.log).dbg$call(console, $.$.$0);
        continue;

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["35:4-35:19", "s", $s$7], ["35:4-35:18", "e", $s$7], [], []]);
$M.fun("m$7", "g", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = eff)(2);
        continue;

      case 3:
        $.$.$1 = $M.forInIterator($p);
        $.state = 4;

      case 4:
        $0 = $.$.$1.next();

        if ($0.done) {
          $.goto = 12;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 5;
          $M.brk(8);
          continue;
        }

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 6:
        if ($p) {
          $.goto = 4;
          $M.brk(9);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        $M.brk(10);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = effB)($.$.$0);
        continue;

      case 9:
        if ($p) {
          $.goto = 12;
          $M.brk(11);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.goto = 11;
        $M.brk(12);
        continue;

      case 11:
        $.goto = 4;
        ($M.context.call = eff)("c");
        continue;

      case 12:
        $.goto = 13;
        $M.brk(13);
        continue;

      case 13:
        $.goto = 14;
        ($M.context.call = eff)("z");
        continue;

      case 14:
        return $M.ret();

      case 15:
        return $M.ret($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["40:2-40:11", "s", $s$8], ["40:2-40:10", "e", $s$8], ["41:16-41:22", "e", $s$8], [], ["42:4-42:25", "s", $s$8], ["42:8-42:14", "e", $s$8], ["42:16-42:25", "s", $s$8], ["43:4-43:23", "s", $s$8], ["43:8-43:15", "e", $s$8], ["43:17-43:23", "s", $s$8], ["44:4-44:13", "s", $s$8], ["44:4-44:12", "e", $s$8], ["46:2-46:11", "s", $s$8], ["46:2-46:10", "e", $s$8], [], [], []]);
$M.fun("m$8", "h", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(14);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)("a");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(15);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(16);
        continue;

      case 4:
        $.$.$2 = $M.forInIterator(obj);
        $.state = 5;

      case 5:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.goto = 31;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 6;
          $M.brk(17);
          continue;
        }

      case 6:
        $.goto = 7;
        ($M.context.call = console.log).dbg$call(console, "j");
        continue;

      case 7:
        $.goto = 8;
        $M.brk(18);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = effA)($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = eff)($.$.$0);
        continue;

      case 10:
        $.$.$3 = $M.forInIterator($p);
        $.state = 11;

      case 11:
        $0 = $.$.$3.next();

        if ($0.done) {
          $.goto = 29;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 12;
          $M.brk(19);
          continue;
        }

      case 12:
        $.goto = 13;
        ($M.context.call = console.log).dbg$call(console, "b");
        continue;

      case 13:
        $.goto = 14;
        $M.brk(20);
        continue;

      case 14:
        $.goto = 15;
        ($M.context.call = eff)("b");
        continue;

      case 15:
        $.goto = 16;
        $M.brk(21);
        continue;

      case 16:
        $.goto = 17;
        $p = ($M.context.call = eff)($.$.$1 + $.$.$0);
        continue;

      case 17:
        if ($p) {
          $.goto = 5;
          $M.brk(22);
          continue;
        } else {
          $.state = 18;
        }

      case 18:
        $.goto = 19;
        $M.brk(23);
        continue;

      case 19:
        $.goto = 20;
        $p = ($M.context.call = effB)($.$.$1 + $.$.$0);
        continue;

      case 20:
        if ($p) {
          $.goto = 31;
          $M.brk(24);
          continue;
        } else {
          $.state = 21;
        }

      case 21:
        $.goto = 22;
        $M.brk(25);
        continue;

      case 22:
        $.goto = 23;
        $p = ($M.context.call = eff)($.$.$1);
        continue;

      case 23:
        if ($p) {
          $.goto = 11;
          $M.brk(26);
          continue;
        } else {
          $.state = 24;
        }

      case 24:
        $.goto = 25;
        $M.brk(27);
        continue;

      case 25:
        $.goto = 26;
        $p = ($M.context.call = effB)($.$.$1);
        continue;

      case 26:
        if ($p) {
          $.goto = 29;
          $M.brk(28);
          continue;
        } else {
          $.state = 27;
        }

      case 27:
        $.goto = 28;
        $M.brk(29);
        continue;

      case 28:
        $.goto = 11;
        ($M.context.call = eff)("c");
        continue;

      case 29:
        $.goto = 30;
        $M.brk(30);
        continue;

      case 30:
        $.goto = 5;
        ($M.context.call = effB)($.$.$0);
        continue;

      case 31:
        $.goto = 32;
        $M.brk(31);
        continue;

      case 32:
        $.goto = 33;
        ($M.context.call = eff)("z");
        continue;

      case 33:
        return $M.ret();

      case 34:
        return $M.ret($.value);

      case 35:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["50:2-50:11", "s", $s$9], ["50:2-50:10", "e", $s$9], ["51:2-51:8", "s", $s$9], ["52:2-65:3", "s", $s$9], [], ["53:4-53:21", "s", $s$9], ["53:4-53:20", "e", $s$9], ["54:4-54:12", "s", $s$9], ["54:4-54:11", "e", $s$9], ["55:18-55:24", "e", $s$9], [], ["56:6-56:23", "s", $s$9], ["56:6-56:22", "e", $s$9], ["57:6-57:15", "s", $s$9], ["57:6-57:14", "e", $s$9], ["58:6-58:35", "s", $s$9], ["58:10-58:20", "e", $s$9], ["58:22-58:35", "s", $s$9], ["59:6-59:33", "s", $s$9], ["59:10-59:21", "e", $s$9], ["59:23-59:33", "s", $s$9], ["60:6-60:27", "s", $s$9], ["60:10-60:16", "e", $s$9], ["60:18-60:27", "s", $s$9], ["61:6-61:25", "s", $s$9], ["61:10-61:17", "e", $s$9], ["61:19-61:25", "s", $s$9], ["62:6-62:15", "s", $s$9], ["62:6-62:14", "e", $s$9], ["64:4-64:12", "s", $s$9], ["64:4-64:11", "e", $s$9], ["66:2-66:11", "s", $s$9], ["66:2-66:10", "e", $s$9], [], [], []]);
module.exports = $M.exports();