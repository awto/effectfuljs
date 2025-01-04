"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $force = $M.force,
  $dynImport = $M.dynImport,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:6-1:7"],
    b: [2, "2:6-2:7"],
    c: [3, "3:6-3:7"],
    d: [4, "4:6-4:7"]
  }, null, 0],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 5, "1:0-6:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 2;
        $p = ($x.moduleId = require.resolve("module-A"), $force(require("module-A")));
        $.state = 2;
      case 2:
        $l[1] = $p;
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.moduleId = require.resolve($l[1] + "module-B"), $force(require($l[1] + "module-B")));
        $.state = 4;
      case 4:
        $l[2] = $p;
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 6;
        $p = ($x.moduleId = require.resolve("node:url"), $force(require("node:url")));
        $.state = 6;
      case 6:
        $l[3] = $p;
        $.goto = 7;
        $brk();
        $.state = 7;
      case 7:
        $.goto = 8;
        $p = $dynImport(import("module-D"));
        $.state = 8;
      case 8:
        $l[4] = $p;
        $.goto = 9;
        $brk();
        $.state = 9;
      case 9:
        module.exports = $l[2];
        $.goto = 11;
        continue;
      case 10:
        $.goto = 11;
        return $unhandled($.error);
      case 11:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-1:30", $s$1], [2, "1:10-1:29", $s$1], [4, "2:0-2:32", $s$1], [2, "2:10-2:31", $s$1], [4, "3:0-3:30", $s$1], [2, "3:10-3:29", $s$1], [4, "4:0-4:29", $s$1], [2, "4:10-4:28", $s$1], [4, "5:0-5:19", $s$1], [0, "5:0-5:18", $s$1], [16, "6:0-6:0", $s$1], [16, "6:0-6:0", $s$1]]);
$M.moduleExports();