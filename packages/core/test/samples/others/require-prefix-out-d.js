"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $force = $M.force,
  $dynImport = $M.dynImport,
  $mcall = $M.mcall,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:6-1:7"],
    b: [2, "2:6-2:7"],
    c: [3, "3:6-3:7"],
    d: [4, "4:6-4:7"],
    f: [5, "5:6-5:7"]
  }, null, 0],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-7:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.moduleId = require.resolve("@effectful/debugger/loader!module-A.edbg"), $force(require("@effectful/debugger/loader!module-A.edbg")));
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = $mcall("concat", "", $l[1], "module-B");
        $.state = 4;
      case 4:
        $.goto = 5;
        $p = ($x.moduleId = require.resolve("@effectful/debugger/loader!" + $p + ".edbg"), $force(require("@effectful/debugger/loader!" + $p + ".edbg")));
        $.state = 5;
      case 5:
        $l[2] = $p;
        $.goto = 6;
        $brk();
        $.state = 6;
      case 6:
        $.goto = 7;
        $p = ($x.moduleId = require.resolve("node:url"), $force(require("node:url")));
        $.state = 7;
      case 7:
        $l[3] = $p;
        $.goto = 8;
        $brk();
        $.state = 8;
      case 8:
        $.goto = 9;
        $p = $dynImport(import("@effectful/debugger/loader!module-D.edbg"));
        $.state = 9;
      case 9:
        $l[4] = $p;
        $.goto = 10;
        $brk();
        $.state = 10;
      case 10:
        $.goto = 11;
        $p = $mcall("concat", "module-", $l[4].name);
        $.state = 11;
      case 11:
        $.goto = 12;
        $p = $dynImport(import("@effectful/debugger/loader!" + $p + ".edbg"));
        $.state = 12;
      case 12:
        $l[5] = $p;
        $.goto = 13;
        $brk();
        $.state = 13;
      case 13:
        module.exports = $l[2];
        $.goto = 15;
        continue;
      case 14:
        $.goto = 15;
        return $unhandled($.error);
      case 15:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-1:30", $s$1], [2, "1:10-1:29", $s$1], [4, "2:0-2:34", $s$1], [2, null, $s$1], [2, "2:10-2:33", $s$1], [4, "3:0-3:30", $s$1], [2, "3:10-3:29", $s$1], [4, "4:0-4:29", $s$1], [2, "4:10-4:28", $s$1], [4, "5:0-5:37", $s$1], [2, null, $s$1], [2, "5:10-5:36", $s$1], [4, "6:0-6:19", $s$1], [0, "6:0-6:18", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]);
$M.moduleExports();