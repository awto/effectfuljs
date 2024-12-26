"no-ctrl";

var $M = require("@effectful/debugger"),
  $x = $M.context,
  $ret = $M.ret,
  $unhandled = $M.unhandled,
  $brk = $M.brk,
  $force = $M.force,
  $lset = $M.lset,
  $set = $M.set,
  $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
    __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
  }, null),
  $s$1 = [{
    a: [1, "1:6-1:7"],
    b: [2, "2:6-2:7"]
  }, null, 0],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-3:19", 32, function ($, $l, $p) {
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
        $lset($l, 1, $p);
        $.goto = 3;
        $brk();
        $.state = 3;
      case 3:
        $.goto = 4;
        $p = ($x.moduleId = require.resolve($l[1] + "module-B"), $force(require($l[1] + "module-B")));
        $.state = 4;
      case 4:
        $lset($l, 2, $p);
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $.goto = 7;
        $set(module, "exports", $l[2]);
        continue;
      case 6:
        $.goto = 7;
        return $unhandled($.error);
      case 7:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 0, [[4, "1:0-1:30", $s$1], [2, "1:10-1:29", $s$1], [4, "2:0-2:32", $s$1], [2, "2:10-2:31", $s$1], [4, "3:0-3:19", $s$1], [2, "3:0-3:18", $s$1], [16, "3:19-3:19", $s$1], [16, "3:19-3:19", $s$1]]);
$M.moduleExports();