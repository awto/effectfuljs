var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  a1: "$1",
  b: "$2",
  c: "$3",
  d: "$4",
  e: "$5",
  f: "$6",
  c1: "$7",
  c2: "$8",
  c3: "$9"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
}, $s$1, false],
    $s$4 = [{
  i: "$0"
}, $s$1, false],
    $s$5 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$6 = [{
  i: "$0"
}, $s$1, false],
    $s$7 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$8 = [{
  result: "$0",
  i: "$1"
}, $s$1, false],
    $s$9 = [{
  result: "$0",
  i: "$1"
}, $s$1, false],
    $s$10 = [{
  result: "$0",
  i: "$1"
}, $s$1, false],
    $s$11 = [{
  result: "$0"
}, $s$1, false],
    $s$12 = [{
  i: "$0"
}, $s$11, true],
    $s$13 = [{
  cc: "$0"
}, $s$12, false],
    $s$14 = [{
  result: "$0"
}, $s$1, false],
    $s$15 = [{
  i: "$0"
}, $s$14, true],
    $s$16 = [{
  cc: "$0"
}, $s$15, false],
    $s$17 = [{
  result: "$0"
}, $s$1, false],
    $s$18 = [{
  i: "$0"
}, $s$17, true],
    $s$19 = [{
  cc: "$0",
  j: "$1"
}, $s$18, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$9 = $c.c3($);
        $.$.$8 = $c.c2($);
        $.$.$7 = $c.c1($);
        $.$.$6 = $c.f($);
        $.$.$5 = $c.e($);
        $.$.$4 = $c.d($);
        $.$.$3 = $c.c($);
        $.$.$2 = $c.b($);
        $.$.$1 = $c.a1($);
        $c.f($);
        $c.f($);
        $c.f($);
        $c.f($);
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
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = [1, 2, 3];
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 1;

      case 1:
        if ($.$.$1 < $.$.$2) {
          $.$.$0 = $.$.$3[$.$.$1];
          $.goto = 2;
          $p = ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          return $M.ret();
        }

      case 2:
        if ($p) {
          $.state = 3;
        } else {
          $.state = 3;
        }

      case 3:
        $.$.$1++;
        $.goto = 1;
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["6:8-6:14", "e", $s$2], [], [], [], []]);
$M.fun("m$2", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("bi");
        continue;

      case 1:
        $.$.$0 = 0;
        $.state = 2;

      case 2:
        if ($.$.$0 < 3) {
          $.goto = 4;
          ($M.context.call = eff)("bi:", $.$.$0);
          continue;
        } else {
          $.goto = 3;
          ($M.context.call = eff)("ai");
          continue;
        }

      case 3:
        return $M.ret();

      case 4:
        $.$.$0++;
        $.goto = 2;
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:2-10:11", "e", $s$3], [], ["12:4-12:17", "e", $s$3], [], [], [], []]);
$M.fun("m$3", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("bi");
        continue;

      case 1:
        $.$.$0 = 0;
        $.state = 2;

      case 2:
        if ($.$.$0 < 3) {
          $.goto = 4;
          ($M.context.call = eff)("bi:", $.$.$0);
          continue;
        } else {
          $.goto = 3;
          ($M.context.call = eff)("ai");
          continue;
        }

      case 3:
        return $M.ret();

      case 4:
        $.$.$0++;
        $.goto = 2;
        continue;

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["17:2-17:11", "e", $s$1], [], ["19:4-19:17", "e", $s$4], [], [], [], []]);
$M.fun("m$4", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("bi");
        continue;

      case 1:
        $.$.$0 = 0;
        $.state = 2;

      case 2:
        if ($.$.$0 < 3) {
          $.goto = 5;
          ($M.context.call = eff)("bj:" + $.$.$0);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("ai");
        continue;

      case 4:
        return $M.ret();

      case 5:
        $.$.$1 = 0;
        $.state = 6;

      case 6:
        if ($.$.$1 < 40) {
          if ($.$.$1 === 10) {
            $.state = 7;
          } else {
            $.goto = 8;
            continue;
          }
        } else {
          $.goto = 7;
          ($M.context.call = eff)("aj:" + $.$.$0);
          continue;
        }

      case 7:
        $.$.$0++;
        $.goto = 2;
        continue;

      case 8:
        if ($.$.$1 === 30) {
          $.goto = 3;
          continue;
        } else {
          $.state = 9;
        }

      case 9:
        $.goto = 10;
        ($M.context.call = eff)($.$.$0 + $.$.$1);
        continue;

      case 10:
        $.$.$1 += 10;
        $.goto = 6;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["24:2-24:11", "e", $s$5], [], ["26:4-26:18", "e", $s$5], ["34:2-34:11", "e", $s$5], [], [], ["32:4-32:18", "e", $s$5], [], [], ["30:6-30:16", "e", $s$5], [], [], []]);
$M.fun("m$5", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("b");
        continue;

      case 1:
        $.$.$0 = 0;
        $.state = 2;

      case 2:
        if ($.$.$0 < 3) {
          if ($.$.$0 === 2) {
            $.goto = 4;
            ($M.context.call = console.log).dbg$call(console, $.$.$0);
            continue;
          } else {
            $.goto = 4;
            continue;
          }
        } else {
          $.goto = 3;
          ($M.context.call = eff)("a");
          continue;
        }

      case 3:
        return $M.ret();

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        $.$.$0++;
        $.goto = 2;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["38:2-38:10", "e", $s$6], [], ["40:17-40:31", "e", $s$6], [], ["41:4-41:10", "e", $s$6], [], [], []]);
$M.fun("m$6", "a1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("b");
        continue;

      case 1:
        $.$.$0 = 0;
        $.$.$1 = 10;
        $.state = 2;

      case 2:
        if ($.$.$0 < 3) {
          if ($.$.$0 === 2) {
            $.goto = 4;
            ($M.context.call = console.log).dbg$call(console, $.$.$0, $.$.$1);
            continue;
          } else {
            $.goto = 4;
            continue;
          }
        } else {
          $.goto = 3;
          ($M.context.call = effRes)($.$.$0, $.$.$1);
          continue;
        }

      case 3:
        return $M.ret();

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0, $.$.$1);
        continue;

      case 5:
        $.$.$0++;
        $.$.$1 += 2;
        $.goto = 2;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["47:2-47:10", "e", $s$7], [], ["49:17-49:34", "e", $s$7], [], ["50:4-50:13", "e", $s$7], [], [], []]);
$M.fun("m$7", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("b");
        continue;

      case 1:
        if (i === 2) {
          $.goto = 2;
          ($M.context.call = console.log).dbg$call(console, i);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 1;
        ($M.context.call = eff)(i);
        continue;

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["55:2-55:10", "e", $s$1], ["57:17-57:31", "e", $s$1], ["58:4-58:10", "e", $s$1], [], []]);
$M.fun("m$8", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("b");
        continue;

      case 1:
        if (i === 2) {
          $.goto = 2;
          ($M.context.call = console.log).dbg$call(console, i);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        if (i === 3) {
          return $M.ret(10);
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 1;
        ($M.context.call = eff)(i);
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["63:2-63:10", "e", $s$1], ["65:17-65:31", "e", $s$1], [], ["67:4-67:10", "e", $s$1], [], []]);
$M.fun("m$9", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.state = 1;

      case 1:
        if ($.$.$1 < 10) {
          $.goto = 3;
          $p = ($M.context.call = eff)($.$.$0, $.$.$1);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 2:
        return $M.ret();

      case 3:
        $.$.$0 = $p;
        $.$.$1++;
        $.goto = 1;
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["75:13-75:27", "e", $s$8], [], [], [], []]);
$M.fun("m$10", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.state = 1;

      case 1:
        if ($.$.$1 < 10) {
          $.goto = 3;
          $p = ($M.context.call = eff)($.$.$1);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)();
          continue;
        }

      case 2:
        return $M.ret();

      case 3:
        $.$.$0 = $p;
        $.$.$1++;
        $.goto = 1;
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["83:13-83:19", "e", $s$9], [], [], [], []]);
$M.fun("m$11", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.$.$1 = 0;
        $.state = 1;

      case 1:
        if ($.$.$1 < 10) {
          $.goto = 3;
          $p = ($M.context.call = eff)($.$.$1);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 2:
        return $M.ret();

      case 3:
        $.$.$0 = $p;
        $.$.$1++;
        $.goto = 1;
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["91:13-91:19", "e", $s$10], [], [], [], []]);
$M.fun("m$12", "c1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = [];
        $M.pushScope();
        $.goto = 2;
        continue;

      case 1:
        $M.popScope();
        $.goto = 6;
        continue;

      case 2:
        $.$.$0 = 0;
        $.state = 3;

      case 3:
        if ($.$.$0 < 10) {
          $.$$.$.$0[$.$.$0] = $c.cc($);
          $.goto = 3;
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = $.$.$1;
        continue;

      case 7:
        return $M.ret($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$$.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [[], [], [], [], ["103:2-103:13", "e", $s$11], [], [], [], []]);
$M.fun("m$13", "cc", "m$12", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)($.$$.$.$0 += $.$$.$.$0++);
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
}, null, null, [["100:6-100:26", "e", $s$13], [], [], []]);
$M.fun("m$14", "c2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = [];
        $M.pushScope();
        $.goto = 2;
        continue;

      case 1:
        $M.popScope();
        $.goto = 7;
        continue;

      case 2:
        $.$.$0 = 0;
        $.state = 3;

      case 3:
        if ($.$.$0 < 10) {
          $.goto = 6;
          $p = ($M.context.call = eff)($c.cc($));
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.$$.$.$0[$.$.$0] = $p;
        $.goto = 3;
        continue;

      case 7:
        $.goto = $.$.$1;
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 6:
      $.$$.$.$1 = 8;
      $.goto = 1;
      break;

    default:
      $.goto = 8;
      break;
  }
}, [[], [], [], ["109:16-111:6", "e", $s$15], ["113:2-113:13", "e", $s$14], [], [], [], [], []]);
$M.fun("m$15", "cc", "m$14", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)($.$$.$.$0 += $.$$.$.$0++);
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
}, null, null, [["110:6-110:26", "e", $s$16], [], [], []]);
$M.fun("m$16", "c3", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = [];
        $M.pushScope();
        $.goto = 2;
        continue;

      case 1:
        $M.popScope();
        $.goto = 8;
        continue;

      case 2:
        $.$.$0 = 0;
        $.state = 3;

      case 3:
        if ($.$.$0 < 10) {
          $.goto = 6;
          $p = ($M.context.call = $c.cc($))($.$.$0++);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)($p);
        continue;

      case 7:
        $.$$.$.$0[$.$.$0] = $p;
        $.goto = 3;
        continue;

      case 8:
        $.goto = $.$.$1;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 6:
    case 7:
      $.$$.$.$1 = 9;
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, [[], [], [], ["119:6-121:13", "e", $s$18], ["124:2-124:13", "e", $s$17], [], ["118:16-122:5", "e", $s$18], [], [], [], []]);
$M.fun("m$17", "cc", "m$16", ["j"], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)($.$$.$$.$.$0 += $.$$.$.$0 += $.$.$1);
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
}, null, null, [["120:8-120:31", "e", $s$19], [], [], []]);
module.exports = $M.exports();