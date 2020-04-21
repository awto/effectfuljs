var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "27:9-27:10"]
}, null, 0],
    $s$2 = [{
  something: [1, "30:6-30:15"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-33:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 1;
      $brk("1:0-25:3");
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("option", M, {
        keepLastPure: true,
        keepLastRaise: true,
        coerce: false,
        static: true,
        injectOps: {
          chain: {
            init: "function $I(somevar1) { return $I.chainOperation($I,$I,somevar1) }",
            deps: ["somevar1", "somevar2"]
          },
          somevar1: {},
          somevar2: {
            init: "var $I = $I.somevar2($I,$I)",
            deps: ["pure", "somevar1"]
          },
          pure: {}
        },
        inlineOps: {
          raise: {
            inline: "*var somevar1 = $E; return something($1,$2,somevar1)",
            deps: ["somevar1"]
          }
        }
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
}, null, null, 0, [[4, "1:0-25:3", $s$1], [2, "1:0-25:2", $s$1], [16, "33:0-33:0", $s$1], [16, "33:0-33:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, [], 0, 2, "27:0-32:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("28:2-28:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff1)();
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("29:2-29:10");
      $.state = 3;

    case 3:
      $.goto = 4;
      ($context.call = chain)();
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk("30:2-30:23");
      $.state = 5;

    case 5:
      $l[1] = "vo";
      $.goto = 6;
      $brk("31:2-31:18");
      $.state = 6;

    case 6:
      $.goto = 8;
      ($context.call = eff2)($l[1]);
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "28:2-28:9", $s$2], [2, "28:2-28:8", $s$2], [4, "29:2-29:10", $s$2], [2, "29:2-29:9", $s$2], [4, "30:2-30:23", $s$2], [4, "31:2-31:18", $s$2], [2, "31:2-31:17", $s$2], [16, "32:1-32:1", $s$2], [16, "32:1-32:1", $s$2]]);

$M.moduleExports();