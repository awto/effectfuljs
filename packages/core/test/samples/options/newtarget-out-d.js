var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a1: [1, "3:9-3:11"],
    b: [2, "7:9-7:10"]
  }, null, 0],
  $s$2 = [{
    a: [1, "3:12-3:13"]
  }, $s$1, 1],
  $s$3 = [{}, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-10:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $l[2] = $m$2($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 3;
        $mcall("option", M, {
          scopePrefix: true,
          passNewTarget: true
        });
        continue;
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-1:53", $s$1], [2, "1:0-1:52", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
  $m$1 = $M.fun("m$1", "a1", null, $m$0, ["a"], 0, 2, "3:0-5:1", 8, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.self.a = $l[1];
        $.goto = 3;
        $brk();
        continue;
      case 2:
        $.goto = 3;
        return $unhandled($.error);
      case 3:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "4:2-4:13", $s$2], [36, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
  $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "7:0-9:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        ($x.call = $l[0][1])();
        $.state = 2;
      case 2:
        $.goto = 4;
        $brk();
        continue;
      case 3:
        $.goto = 4;
        return $unhandled($.error);
      case 4:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "8:2-8:7", $s$3], [2, "8:2-8:6", $s$3], [36, "9:1-9:1", $s$3], [16, "9:1-9:1", $s$3], [16, "9:1-9:1", $s$3]]);
$M.moduleExports();