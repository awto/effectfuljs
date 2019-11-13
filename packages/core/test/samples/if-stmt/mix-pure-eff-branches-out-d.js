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
  h: "$7",
  i: "$8",
  j: "$9",
  a1: "$10"
}, null, false],
    $s$2 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  e: "$4",
  f: "$5"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$10 = $c.a1($);
        $.$.$9 = $c.j($);
        $.$.$8 = $c.i($);
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
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        if (true) {
          $.goto = 3;
          $M.brk(1);
          continue;
        } else {
          $.goto = 2;
          $M.brk(2);
          continue;
        }

      case 2:
        return $M.ret(3);

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(1);
        continue;

      case 4:
        return $M.ret($p);

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:2-4:16", "s", $s$1], ["3:12-3:26", "s", $s$1], [], ["3:19-3:25", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(3);
        continue;

      case 1:
        if (true) {
          $.goto = 8;
          $M.brk(4);
          continue;
        } else {
          $.goto = 2;
          $M.brk(5);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, 3);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(6);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(3);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(7);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(4);
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 3;
        ($M.context.call = eff)(1);
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:2-8:22", "s", $s$1], ["7:12-7:19", "s", $s$1], ["8:7-8:21", "e", $s$1], ["9:2-9:9", "s", $s$1], ["9:2-9:8", "e", $s$1], ["10:2-10:9", "s", $s$1], ["10:2-10:8", "e", $s$1], [], ["7:12-7:18", "e", $s$1], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(8);
        continue;

      case 1:
        if (true) {
          $.goto = 5;
          $M.brk(9);
          continue;
        } else {
          $.goto = 2;
          $M.brk(10);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, 3);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(11);
        continue;

      case 4:
        return $M.ret(3);

      case 5:
        $.goto = 6;
        ($M.context.call = eff)(1);
        continue;

      case 6:
        $.goto = 7;
        $M.brk(12);
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = eff)(3);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(13);
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = eff)(4);
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
}, null, null, [["13:2-17:3", "s", $s$1], ["13:12-13:19", "s", $s$1], ["15:4-15:18", "e", $s$1], ["16:4-16:13", "s", $s$1], [], ["13:12-13:18", "e", $s$1], ["18:2-18:9", "s", $s$1], ["18:2-18:8", "e", $s$1], ["19:2-19:9", "s", $s$1], ["19:2-19:8", "e", $s$1], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
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
        if (true) {
          $.goto = 10;
          $M.brk(16);
          continue;
        } else {
          $.goto = 4;
          $M.brk(17);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, 3);
        continue;

      case 5:
        $.goto = 6;
        $M.brk(18);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(3);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(19);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)(4);
        continue;

      case 9:
        return $M.ret();

      case 10:
        $.goto = 5;
        ($M.context.call = eff)(1);
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:2-22:11", "s", $s$1], ["22:2-22:10", "e", $s$1], ["23:2-26:3", "s", $s$1], ["23:12-23:19", "s", $s$1], ["25:4-25:18", "e", $s$1], ["27:2-27:9", "s", $s$1], ["27:2-27:8", "e", $s$1], ["28:2-28:9", "s", $s$1], ["28:2-28:8", "e", $s$1], [], ["23:12-23:18", "e", $s$1], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(20);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        if ($p) {
          $.goto = 6;
          $M.brk(21);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(22);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("2");
        continue;

      case 5:
        return $M.ret();

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
}, null, null, [["31:2-31:23", "s", $s$1], ["31:6-31:14", "e", $s$1], ["31:16-31:23", "s", $s$1], ["32:2-32:11", "s", $s$1], ["32:2-32:10", "e", $s$1], [], [], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(23);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        if ($p) {
          $.goto = 6;
          $M.brk(24);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(25);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = eff)("2");
        continue;

      case 5:
        return $M.ret();

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)("i");
        continue;

      case 7:
        return $M.ret($p);

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["35:2-35:32", "s", $s$1], ["35:6-35:14", "e", $s$1], ["35:16-35:32", "s", $s$1], ["36:2-36:11", "s", $s$1], ["36:2-36:10", "e", $s$1], [], ["35:23-35:31", "e", $s$1], [], [], []]);
$M.fun("m$7", "g", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(26);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        if ($p) {
          $.goto = 6;
          $M.brk(27);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(28);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 5:
        return $M.ret();

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
}, null, null, [["39:2-39:23", "s", $s$1], ["39:6-39:14", "e", $s$1], ["39:16-39:23", "s", $s$1], ["40:2-40:19", "s", $s$1], ["40:2-40:18", "e", $s$1], [], [], [], []]);
$M.fun("m$8", "h", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(29);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        if ($p) {
          $.goto = 8;
          $M.brk(30);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(31);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(32);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)("2");
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["43:2-43:23", "s", $s$1], ["43:6-43:14", "e", $s$1], ["43:16-43:23", "s", $s$1], ["44:2-44:19", "s", $s$1], ["44:2-44:18", "e", $s$1], ["45:2-45:11", "s", $s$1], ["45:2-45:10", "e", $s$1], [], [], [], []]);
$M.fun("m$9", "i", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(33);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        if ($p) {
          $.goto = 8;
          $M.brk(34);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(35);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(36);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(2);
        continue;

      case 7:
        return $M.ret();

      case 8:
        return $M.ret();

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["48:2-48:23", "s", $s$1], ["48:6-48:14", "e", $s$1], ["48:16-48:23", "s", $s$1], ["49:2-49:19", "s", $s$1], ["49:2-49:18", "e", $s$1], ["50:2-50:9", "s", $s$1], ["50:2-50:8", "e", $s$1], [], [], [], []]);
$M.fun("m$10", "j", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(37);
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = eff)("1");
        continue;

      case 2:
        if ($p) {
          $.goto = 10;
          $M.brk(38);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(39);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 5:
        $.goto = 6;
        $M.brk(40);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(2);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(41);
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = console.log).dbg$call(console, "3");
        continue;

      case 9:
        return $M.ret();

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
}, null, null, [["53:2-53:23", "s", $s$1], ["53:6-53:14", "e", $s$1], ["53:16-53:23", "s", $s$1], ["54:2-54:19", "s", $s$1], ["54:2-54:18", "e", $s$1], ["55:2-55:9", "s", $s$1], ["55:2-55:8", "e", $s$1], ["56:2-56:19", "s", $s$1], ["56:2-56:18", "e", $s$1], [], [], [], []]);
$M.fun("m$11", "a1", "m$0", ["a", "b", "c", "d"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(42);
        continue;

      case 1:
        $.$.$4 = void 0;
        $.goto = 2;
        $M.brk(43);
        continue;

      case 2:
        $.$.$5 = void 0;
        $.goto = 3;
        $M.brk(44);
        continue;

      case 3:
        if (nb) {
          $.goto = 11;
          $M.brk(45);
          continue;
        } else {
          $.goto = 4;
          $M.brk(54);
          continue;
        }

      case 4:
        if (wb) {
          $.goto = 9;
          $p = ($M.context.call = ub)($.$.$0, $.$.$2);
          continue;
        } else {
          $0 = "keydown" === $.$.$0;

          if ($0) {
            $0 = 229 === $.$.$2.keyCode;
            $.state = 5;
          } else {
            $.state = 5;
          }
        }

      case 5:
        if ($0) {
          $.$.$4 = sb.compositionStart;
          $.state = 6;
        } else {
          $.state = 6;
        }

      case 6:
        $.goto = 7;
        $M.brk(55);
        continue;

      case 7:
        if (null === $.$.$5) {
          $.value = $.$.$1;
          $.state = 8;
        } else {
          if (null === $.$.$1) {
            $.value = $.$.$5;
            $.state = 8;
          } else {
            $.value = [$.$.$5, $.$.$1];
            $.state = 8;
          }
        }

      case 8:
        return $M.ret();

      case 9:
        if ($p) {
          $.$.$4 = sb.compositionEnd;
          $.state = 10;
        } else {
          $.state = 10;
        }

      case 10:
        $.goto = 6;
        continue;

      case 11:
        $.goto = 12;
        $M.brk(46);
        continue;

      case 12:
        switch ($.$.$0) {
          case "compositionstart":
            $.goto = 20;
            $M.brk(47);
            continue;

          case "compositionend":
            $.goto = 13;
            continue;

          case "compositionupdate":
            $.goto = 14;
            continue;

          default:
            $.goto = 15;
            continue;
        }

      case 13:
        $.goto = 19;
        $M.brk(49);
        continue;

      case 14:
        $.goto = 18;
        $M.brk(51);
        continue;

      case 15:
        $.goto = 16;
        $M.brk(53);
        $.state = 16;

      case 16:
        $.$.$4 = void 0;
        $.goto = 17;
        continue;

      case 17:
        $.goto = 6;
        continue;

      case 18:
        $.$.$4 = sb.compositionUpdate;
        $.goto = 17;
        $M.brk(52);
        continue;

      case 19:
        $.$.$4 = sb.compositionEnd;
        $.goto = 17;
        $M.brk(50);
        continue;

      case 20:
        $.$.$4 = sb.compositionStart;
        $.goto = 17;
        $M.brk(48);
        continue;

      case 21:
        return $M.ret($.value);

      case 22:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["60:2-60:17", "s", $s$2], ["61:2-61:17", "s", $s$2], ["62:2-81:3", "s", $s$2], ["63:4-76:5", "s", $s$2], ["79:8-79:16", "e", $s$2], [], ["82:2-82:50", "s", $s$2], [], [], [], [], ["64:6-74:7", "s", $s$2], ["66:10-66:34", "s", $s$2], ["69:10-69:32", "s", $s$2], ["72:10-72:35", "s", $s$2], ["75:6-75:17", "s", $s$2], [], [], ["73:10-73:18", "s", $s$2], ["70:10-70:18", "s", $s$2], ["67:10-67:18", "s", $s$2], [], []]);
module.exports = $M.exports();