var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "2:9-2:10"]
  }, null, 0],
  $s$2 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-24:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
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
  }, null, null, 0, [[0, "2:0-23:1", $s$1], [16, "24:0-24:0", $s$1], [16, "24:0-24:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "2:0-23:1", 128, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.call = eff)();
        $.state = 1;
      case 1:
        $l[1] = $p;
        $.goto = 2;
        $p = ($x.call = check)(1);
        $.state = 2;
      case 2:
        if ($l[1] === $p) {
          $.goto = 13;
          ($x.call = effB)(1);
          continue;
        } else {
          $.goto = 3;
          $p = ($x.call = check)(2);
          $.state = 3;
        }
      case 3:
        if ($l[1] === $p) {
          $.goto = 13;
          continue;
        } else {
          $.goto = 4;
          $p = ($x.call = check)(3);
          $.state = 4;
        }
      case 4:
        if ($l[1] === $p) {
          $.state = 5;
        } else {
          $.goto = 7;
          $p = ($x.call = check)(4);
          continue;
        }
      case 5:
        $.goto = 6;
        ($x.call = effB)(2);
        $.state = 6;
      case 6:
        $.goto = 15;
        continue;
      case 7:
        if ($l[1] === $p) {
          $.state = 8;
        } else {
          if ($l[1] === 5) {
            $.goto = 9;
            continue;
          } else {
            if ($l[1] === 6) {
              $.goto = 10;
              continue;
            } else {
              $.goto = 11;
              $p = ($x.call = check)(8);
              continue;
            }
          }
        }
      case 8:
        $.goto = 6;
        $mcall("log", console, 5);
        continue;
      case 9:
        $.goto = 10;
        $mcall("log", console, 6);
        $.state = 10;
      case 10:
        $.goto = 6;
        $mcall("log", console, 7);
        continue;
      case 11:
        if ($l[1] === $p) {
          $.state = 12;
        } else {
          $.goto = 6;
          continue;
        }
      case 12:
        $.goto = 6;
        ($x.call = effB)(3);
        continue;
      case 13:
        $.goto = 5;
        $mcall("log", console, 2);
        continue;
      case 14:
        $.goto = 15;
        return $unhandled($.error);
      case 15:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[2, "3:10-3:15", $s$2], [2, "4:9-4:17", $s$2], [2, "5:6-5:13", $s$2], [2, "8:9-8:17", $s$2], [2, "11:9-11:17", $s$2], [2, "9:6-9:13", $s$2], [0, null, $s$2], [2, "19:9-19:17", $s$2], [2, "12:6-12:20", $s$2], [2, "15:6-15:20", $s$2], [2, "17:6-17:20", $s$2], [0, null, $s$2], [2, "20:6-20:13", $s$2], [2, "7:6-7:20", $s$2], [16, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2]]);
$M.moduleExports();