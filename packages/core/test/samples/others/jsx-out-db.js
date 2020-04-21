var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  Comp: [1, "3:9-3:13"]
}, null, 0],
    $s$2 = [{
  x: [1, "9:6-9:7"],
  z: [2, "15:6-15:7"]
}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-33:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 2;
      $mcall("option", M, {
        jsxEnabled: true
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
}, null, null, 0, [[2, "1:0-1:30", $s$1], [16, "33:0-33:0", $s$1], [16, "33:0-33:0", $s$1]]),
    $m$1 = $M.fun("m$1", "Comp", null, $m$0, [], 0, 4, "3:0-32:1", 128, function Comp($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = <>
      <EffT />
    </>;
      $l[3] = <C1>{<EffM />}</C1>;
      $.goto = 1;
      $p = ($context.call = eff1)();
      $.state = 1;

    case 1:
      $l[1] = <>
      $l[3]
      {$p}
    </>;
      $l[2] = <C1>
      <EffC2 a1="a1" a2={a2}>
        <Eff3 />
        <Eff4 a4={a4} />
        {<Eff5 />}
      </EffC2>
    </C1>;
      $l[3] = <C>{$l[1]}</C>;
      $.goto = 2;
      $p = ($context.call = eff2)();
      $.state = 2;

    case 2:
      $.result = <EffR>
      {$l[2]}
      $l[3]
      {$p}
      {...ch}
    </EffR>;
      $.goto = 4;
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "12:7-12:13", $s$2], [2, "28:7-28:13", $s$2], [0, "25:4-30:11", $s$2], [16, "32:1-32:1", $s$2], [16, "32:1-32:1", $s$2]]);

$M.moduleExports();