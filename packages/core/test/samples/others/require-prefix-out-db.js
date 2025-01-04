"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
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
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 6, "1:0-7:0", 160, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $p = ($x.moduleId = require.resolve("@effectful/debugger/loader!module-A.edbg"), $force(require("@effectful/debugger/loader!module-A.edbg")));
        $.state = 1;
      case 1:
        $l[1] = $p;
        $.goto = 2;
        $p = $mcall("concat", "", $l[1], "module-B");
        $.state = 2;
      case 2:
        $.goto = 3;
        $p = ($x.moduleId = require.resolve("@effectful/debugger/loader!" + $p + ".edbg"), $force(require("@effectful/debugger/loader!" + $p + ".edbg")));
        $.state = 3;
      case 3:
        $l[2] = $p;
        $.goto = 4;
        $p = ($x.moduleId = require.resolve("node:url"), $force(require("node:url")));
        $.state = 4;
      case 4:
        $l[3] = $p;
        $.goto = 5;
        $p = $dynImport(import("@effectful/debugger/loader!module-D.edbg"));
        $.state = 5;
      case 5:
        $l[4] = $p;
        $.goto = 6;
        $p = $mcall("concat", "module-", $l[4].name);
        $.state = 6;
      case 6:
        $.goto = 7;
        $p = $dynImport(import("@effectful/debugger/loader!" + $p + ".edbg"));
        $.state = 7;
      case 7:
        $l[5] = $p;
        module.exports = $l[2];
        $.goto = 9;
        continue;
      case 8:
        $.goto = 9;
        return $unhandled($.error);
      case 9:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[2, "1:10-1:29", $s$1], [2, null, $s$1], [2, "2:10-2:33", $s$1], [2, "3:10-3:29", $s$1], [2, "4:10-4:28", $s$1], [2, null, $s$1], [2, "5:10-5:36", $s$1], [0, "5:6-5:36", $s$1], [16, "7:0-7:0", $s$1], [16, "7:0-7:0", $s$1]]);
$M.moduleExports();