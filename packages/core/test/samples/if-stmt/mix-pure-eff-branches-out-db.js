var $M = require("@effectful/debugger/api"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "2:9-2:10"],
  b: [2, "6:9-6:10"],
  c: [3, "12:9-12:10"],
  d: [4, "21:9-21:10"],
  e: [5, "30:9-30:10"],
  f: [6, "34:9-34:10"],
  g: [7, "38:9-38:10"],
  h: [8, "42:9-42:10"],
  i: [9, "47:9-47:10"],
  j: [10, "52:9-52:10"],
  a1: [11, "59:9-59:11"]
}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{}, $s$1, 1],
    $s$4 = [{}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $s$8 = [{}, $s$1, 1],
    $s$9 = [{}, $s$1, 1],
    $s$10 = [{}, $s$1, 1],
    $s$11 = [{}, $s$1, 1],
    $s$12 = [{
  a: [1, "59:12-59:13"],
  b: [2, "59:15-59:16"],
  c: [3, "59:18-59:19"],
  d: [4, "59:21-59:22"],
  e: [5, "60:6-60:7"],
  f: [6, "61:6-61:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 12, "1:0-84:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $l[7] = $m$7($);
      $l[8] = $m$8($);
      $l[9] = $m$9($);
      $l[10] = $m$10($);
      $l[11] = $m$11($);
      $.goto = 2;
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[0, "2:0-5:1", $s$1], [16, "84:0-84:0", $s$1], [16, "84:0-84:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 1, "2:0-5:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (true) {
        $.goto = 1;
        $p = ($context.call = eff)(1);
        $.state = 1;
      } else {
        $.result = 3;
        $.goto = 3;
        continue;
      }

    case 1:
      $.result = $p;
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "3:19-3:25", $s$2], [0, null, $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "6:0-11:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (true) {
        $.goto = 1;
        ($context.call = eff)(1);
        $.state = 1;
      } else {
        $.goto = 1;
        $mcall("log", console, 3);
        $.state = 1;
      }

    case 1:
      $.goto = 2;
      ($context.call = eff)(3);
      $.state = 2;

    case 2:
      $.goto = 4;
      ($context.call = eff)(4);
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "7:12-7:18", $s$3], [2, "9:2-9:8", $s$3], [2, "10:2-10:8", $s$3], [16, "11:1-11:1", $s$3], [16, "11:1-11:1", $s$3]]),
    $m$3 = $M.fun("m$3", "c", null, $m$0, [], 0, 1, "12:0-20:1", 128, function c($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      if (true) {
        $.goto = 2;
        ($context.call = eff)(1);
        continue;
      } else {
        $.goto = 1;
        $mcall("log", console, 3);
        $.state = 1;
      }

    case 1:
      $.result = 3;
      $.goto = 5;
      continue;

    case 2:
      $.goto = 3;
      ($context.call = eff)(3);
      $.state = 3;

    case 3:
      $.goto = 5;
      ($context.call = eff)(4);
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "13:12-13:18", $s$4], [0, "16:11-16:12", $s$4], [2, "18:2-18:8", $s$4], [2, "19:2-19:8", $s$4], [16, "20:1-20:1", $s$4], [16, "20:1-20:1", $s$4]]),
    $m$4 = $M.fun("m$4", "d", null, $m$0, [], 0, 1, "21:0-29:1", 128, function d($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)("a");
      $.state = 1;

    case 1:
      if (true) {
        $.goto = 2;
        ($context.call = eff)(1);
        $.state = 2;
      } else {
        $.goto = 2;
        $mcall("log", console, 3);
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      ($context.call = eff)(3);
      $.state = 3;

    case 3:
      $.goto = 5;
      ($context.call = eff)(4);
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "22:2-22:10", $s$5], [2, "23:12-23:18", $s$5], [2, "27:2-27:8", $s$5], [2, "28:2-28:8", $s$5], [16, "29:1-29:1", $s$5], [16, "29:1-29:1", $s$5]]),
    $m$5 = $M.fun("m$5", "e", null, $m$0, [], 0, 1, "30:0-33:1", 128, function e($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("1");
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 4;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 4;
      ($context.call = eff)("2");
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "31:6-31:14", $s$6], [0, null, $s$6], [2, "32:2-32:10", $s$6], [16, "33:1-33:1", $s$6], [16, "33:1-33:1", $s$6]]),
    $m$6 = $M.fun("m$6", "f", null, $m$0, [], 0, 1, "34:0-37:1", 128, function f($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("1");
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 3;
        $p = ($context.call = eff)("i");
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 5;
      ($context.call = eff)("2");
      continue;

    case 3:
      $.result = $p;
      $.goto = 5;
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "35:6-35:14", $s$7], [2, "35:23-35:31", $s$7], [2, "36:2-36:10", $s$7], [0, null, $s$7], [16, "37:1-37:1", $s$7], [16, "37:1-37:1", $s$7]]),
    $m$7 = $M.fun("m$7", "g", null, $m$0, [], 0, 1, "38:0-41:1", 128, function g($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("1");
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 4;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 4;
      $mcall("log", console, "2");
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "39:6-39:14", $s$8], [0, null, $s$8], [2, "40:2-40:18", $s$8], [16, "41:1-41:1", $s$8], [16, "41:1-41:1", $s$8]]),
    $m$8 = $M.fun("m$8", "h", null, $m$0, [], 0, 1, "42:0-46:1", 128, function h($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("1");
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 5;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $mcall("log", console, "2");
      $.state = 3;

    case 3:
      $.goto = 5;
      ($context.call = eff)("2");
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "43:6-43:14", $s$9], [0, null, $s$9], [2, "44:2-44:18", $s$9], [2, "45:2-45:10", $s$9], [16, "46:1-46:1", $s$9], [16, "46:1-46:1", $s$9]]),
    $m$9 = $M.fun("m$9", "i", null, $m$0, [], 0, 1, "47:0-51:1", 128, function i($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("1");
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 5;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $mcall("log", console, "2");
      $.state = 3;

    case 3:
      $.goto = 5;
      ($context.call = eff)(2);
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "48:6-48:14", $s$10], [0, null, $s$10], [2, "49:2-49:18", $s$10], [2, "50:2-50:8", $s$10], [16, "51:1-51:1", $s$10], [16, "51:1-51:1", $s$10]]),
    $m$10 = $M.fun("m$10", "j", null, $m$0, [], 0, 1, "52:0-57:1", 128, function j($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($context.call = eff)("1");
      $.state = 1;

    case 1:
      if ($p) {
        $.goto = 6;
        continue;
      } else {
        $.state = 2;
      }

    case 2:
      $.goto = 3;
      $mcall("log", console, "2");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = eff)(2);
      $.state = 4;

    case 4:
      $.goto = 6;
      $mcall("log", console, "3");
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "53:6-53:14", $s$11], [0, null, $s$11], [2, "54:2-54:18", $s$11], [2, "55:2-55:8", $s$11], [2, "56:2-56:18", $s$11], [16, "57:1-57:1", $s$11], [16, "57:1-57:1", $s$11]]),
    $m$11 = $M.fun("m$11", "a1", null, $m$0, ["a", "b", "c", "d"], 1, 7, "59:0-83:1", 128, function a1($, $l, $p) {
  var $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[5] = void 0;
      $l[6] = void 0;

      if (nb) {
        switch ($l[1]) {
          case "compositionstart":
            $l[5] = sb.compositionStart;
            $.goto = 7;
            continue;

          case "compositionend":
            $.goto = 4;
            continue;

          case "compositionupdate":
            $.goto = 5;
            continue;

          default:
            $.goto = 6;
            continue;
        }
      } else {
        if (wb) {
          $.goto = 8;
          $p = ($context.call = ub)($l[1], $l[3]);
          continue;
        } else {
          $1 = "keydown" === $l[1];

          if ($1) {
            $1 = 229 === $l[3].keyCode;
            $.state = 1;
          } else {
            $.state = 1;
          }
        }
      }

    case 1:
      if ($1) {
        $l[5] = sb.compositionStart;
        $.state = 2;
      } else {
        $.state = 2;
      }

    case 2:
      if (null === $l[6]) {
        $.result = $l[2];
        $.state = 3;
      } else {
        if (null === $l[2]) {
          $.result = $l[6];
          $.state = 3;
        } else {
          $.result = [$l[6], $l[2]];
          $.state = 3;
        }
      }

    case 3:
      $.goto = 11;
      continue;

    case 4:
      $l[5] = sb.compositionEnd;
      $.goto = 7;
      continue;

    case 5:
      $l[5] = sb.compositionUpdate;
      $.goto = 7;
      continue;

    case 6:
      $l[5] = void 0;
      $.state = 7;

    case 7:
      $.goto = 2;
      continue;

    case 8:
      if ($p) {
        $l[5] = sb.compositionEnd;
        $.state = 9;
      } else {
        $.state = 9;
      }

    case 9:
      $.goto = 2;
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "79:8-79:16", $s$12], [0, null, $s$12], [0, null, $s$12], [0, null, $s$12], [0, "69:10-69:31", $s$12], [0, "72:10-72:34", $s$12], [0, "75:6-75:16", $s$12], [0, null, $s$12], [0, null, $s$12], [0, null, $s$12], [16, "83:1-83:1", $s$12], [16, "83:1-83:1", $s$12]]);

$M.moduleExports();