var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-10:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $.goto = 2;
      $mcall("option", M, {
        scopePrefix: true,
        passNewTarget: true
      });
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:52", $s$1], [16, "10:0-10:0", $s$1], [16, "10:0-10:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a1", null, $m$0, ["a"], 0, 2, "3:0-5:1", 136, function a1($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.self.a = $l[1];
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
}, null, null, 1, [[0, "4:2-4:12", $s$2], [16, "5:1-5:1", $s$2], [16, "5:1-5:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$0, [], 0, 1, "7:0-9:1", 128, function b($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 2;
      ($context.call = $l[0][1])();
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "8:2-8:6", $s$3], [16, "9:1-9:1", $s$3], [16, "9:1-9:1", $s$3]]);

$M.moduleExports();