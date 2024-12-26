"no-ctrl";

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
    Comp: [1, "3:9-3:13"]
  }, null, 0],
  $s$2 = [{
    x: [1, "9:6-9:7"],
    z: [2, "15:6-15:7"]
  }, $s$1, 1],
  $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-33:0", 32, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $l[1] = $m$1($);
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $.goto = 3;
        $mcall("option", M, {
          jsxEnabled: true
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
  }, null, null, 0, [[4, "1:0-1:31", $s$1], [2, "1:0-1:30", $s$1], [16, "33:0-33:0", $s$1], [16, "33:0-33:0", $s$1]]),
  $m$1 = $M.fun("m$1", "Comp", null, $m$0, [], 0, 4, "3:0-32:1", 0, function ($, $l, $p) {
    for (;;) switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $brk();
        $.state = 1;
      case 1:
        $l[1] = <>
      <EffT />
    </>;
        $.goto = 2;
        $brk();
        $.state = 2;
      case 2:
        $l[3] = <C1>{<EffM />}</C1>;
        $.goto = 3;
        $p = ($x.call = eff1)();
        $.state = 3;
      case 3:
        $l[1] = <>
      $l[3]
      {$p}
    </>;
        $.goto = 4;
        $brk();
        $.state = 4;
      case 4:
        $l[2] = <C1>
      <EffC2 a1="a1" a2={a2}>
        <Eff3 />
        <Eff4 a4={a4} />
        {<Eff5 />}
      </EffC2>
    </C1>;
        $.goto = 5;
        $brk();
        $.state = 5;
      case 5:
        $l[3] = <C>{$l[1]}</C>;
        $.goto = 6;
        $p = ($x.call = eff2)();
        $.state = 6;
      case 6:
        $.result = <EffR>
      {$l[2]}
      $l[3]
      {$p}
      {...ch}
    </EffR>;
        $.goto = 8;
        continue;
      case 7:
        $.goto = 8;
        return $unhandled($.error);
      case 8:
        return $ret($.result);
      default:
        throw new Error("Invalid state");
    }
  }, null, null, 1, [[4, "4:2-8:4", $s$2], [4, "9:2-14:4", $s$2], [2, "12:7-12:13", $s$2], [4, "15:2-23:4", $s$2], [4, "24:2-31:4", $s$2], [2, "28:7-28:13", $s$2], [0, "25:4-30:11", $s$2], [16, "32:1-32:1", $s$2], [16, "32:1-32:1", $s$2]]);
$M.moduleExports();