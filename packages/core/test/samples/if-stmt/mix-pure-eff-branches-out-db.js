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
        if (true) {
          $.goto = 1;
          $p = ($M.context.call = eff)(1);
          continue;
        } else {
          return $M.ret(3);
        }

      case 1:
        return $M.ret($p);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["3:19-3:25", "e", $s$1], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 1;
          ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          ($M.context.call = console.log).dbg$call(console, 3);
          continue;
        }

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(3);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(4);
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
}, null, null, [["7:12-7:18", "e", $s$1], ["9:2-9:8", "e", $s$1], ["10:2-10:8", "e", $s$1], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (true) {
          $.goto = 2;
          ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 1;
          ($M.context.call = console.log).dbg$call(console, 3);
          continue;
        }

      case 1:
        return $M.ret(3);

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(3);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["13:12-13:18", "e", $s$1], [], ["18:2-18:8", "e", $s$1], ["19:2-19:8", "e", $s$1], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)("a");
        continue;

      case 1:
        if (true) {
          $.goto = 2;
          ($M.context.call = eff)(1);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = console.log).dbg$call(console, 3);
          continue;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(3);
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(4);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:2-22:10", "e", $s$1], ["23:12-23:18", "e", $s$1], ["27:2-27:8", "e", $s$1], ["28:2-28:8", "e", $s$1], [], [], []]);
$M.fun("m$5", "e", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)("1");
        continue;

      case 1:
        if ($p) {
          return $M.ret();
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)("2");
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
}, null, null, [["31:6-31:14", "e", $s$1], [], ["32:2-32:10", "e", $s$1], [], [], []]);
$M.fun("m$6", "f", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)("1");
        continue;

      case 1:
        if ($p) {
          $.goto = 4;
          $p = ($M.context.call = eff)("i");
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)("2");
        continue;

      case 3:
        return $M.ret();

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
}, null, null, [["35:6-35:14", "e", $s$1], ["35:23-35:31", "e", $s$1], ["36:2-36:10", "e", $s$1], [], [], [], []]);
$M.fun("m$7", "g", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)("1");
        continue;

      case 1:
        if ($p) {
          return $M.ret();
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "2");
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
}, null, null, [["39:6-39:14", "e", $s$1], [], ["40:2-40:18", "e", $s$1], [], [], []]);
$M.fun("m$8", "h", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)("1");
        continue;

      case 1:
        if ($p) {
          return $M.ret();
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)("2");
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["43:6-43:14", "e", $s$1], [], ["44:2-44:18", "e", $s$1], ["45:2-45:10", "e", $s$1], [], [], []]);
$M.fun("m$9", "i", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)("1");
        continue;

      case 1:
        if ($p) {
          return $M.ret();
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        return $M.ret();

      case 5:
        return $M.ret($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["48:6-48:14", "e", $s$1], [], ["49:2-49:18", "e", $s$1], ["50:2-50:8", "e", $s$1], [], [], []]);
$M.fun("m$10", "j", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($M.context.call = eff)("1");
        continue;

      case 1:
        if ($p) {
          return $M.ret();
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = console.log).dbg$call(console, "2");
        continue;

      case 3:
        $.goto = 4;
        ($M.context.call = eff)(2);
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, "3");
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["53:6-53:14", "e", $s$1], [], ["54:2-54:18", "e", $s$1], ["55:2-55:8", "e", $s$1], ["56:2-56:18", "e", $s$1], [], [], []]);
$M.fun("m$11", "a1", "m$0", ["a", "b", "c", "d"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$4 = void 0;
        $.$.$5 = void 0;

        if (nb) {
          switch ($.$.$0) {
            case "compositionstart":
              $.$.$4 = sb.compositionStart;
              $.goto = 9;
              continue;

            case "compositionend":
              $.goto = 6;
              continue;

            case "compositionupdate":
              $.goto = 7;
              continue;

            default:
              $.goto = 8;
              continue;
          }
        } else {
          if (wb) {
            $.goto = 4;
            $p = ($M.context.call = ub)($.$.$0, $.$.$2);
            continue;
          } else {
            $0 = "keydown" === $.$.$0;

            if ($0) {
              $0 = 229 === $.$.$2.keyCode;
              $.state = 1;
            } else {
              $.state = 1;
            }
          }
        }

      case 1:
        if ($0) {
          $.$.$4 = sb.compositionStart;
          $.state = 2;
        } else {
          $.state = 2;
        }

      case 2:
        if (null === $.$.$5) {
          $.value = $.$.$1;
          $.state = 3;
        } else {
          if (null === $.$.$1) {
            $.value = $.$.$5;
            $.state = 3;
          } else {
            $.value = [$.$.$5, $.$.$1];
            $.state = 3;
          }
        }

      case 3:
        return $M.ret();

      case 4:
        if ($p) {
          $.$.$4 = sb.compositionEnd;
          $.state = 5;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 2;
        continue;

      case 6:
        $.$.$4 = sb.compositionEnd;
        $.goto = 9;
        continue;

      case 7:
        $.$.$4 = sb.compositionUpdate;
        $.goto = 9;
        continue;

      case 8:
        $.$.$4 = void 0;
        $.goto = 9;
        continue;

      case 9:
        $.goto = 2;
        continue;

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["79:8-79:16", "e", $s$2], [], [], [], [], [], [], [], [], [], [], []]);
module.exports = $M.exports();