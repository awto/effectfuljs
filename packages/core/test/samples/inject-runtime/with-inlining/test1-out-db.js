var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0"
}, null, false],
    $s$2 = [{
  something: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.goto = 1;
        ($M.context.call = M.option).dbg$call(M, {
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

      case 1:
        return $M.ret();

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-25:2", "e", $s$1], [], [], []]);
$M.fun("m$1", "a", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff1)();
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = chain)();
        continue;

      case 2:
        $.$.$0 = "vo";
        $.goto = 3;
        ($M.context.call = eff2)($.$.$0);
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
}, null, null, [["28:2-28:8", "e", $s$2], ["29:2-29:9", "e", $s$2], ["31:2-31:17", "e", $s$2], [], [], []]);
module.exports = $M.exports();