var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  Comp: "$0"
}, null, false],
    $s$2 = [{
  x: "$0",
  z: "$1"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.Comp($);
        $.goto = 1;
        ($M.context.call = M.option).dbg$call(M, {
          jsxEnabled: true
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
}, null, null, [["1:0-1:30", "e", $s$1], [], [], []]);
$M.fun("m$1", "Comp", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = <>
      <EffT />
    </>;
        $.$.$2 = <C1>{<EffM />}</C1>;
        $.goto = 1;
        $p = ($M.context.call = eff1)();
        continue;

      case 1:
        $.$.$0 = <>
      $.$.$2
      {$p}
    </>;
        $.$.$1 = <C1>
      <EffC2 a1="a1" a2={a2}>
        <Eff3 />
        <Eff4 a4={a4} />
        {<Eff5 />}
      </EffC2>
    </C1>;
        $.$.$2 = <C>{$.$.$0}</C>;
        $.goto = 2;
        $p = ($M.context.call = eff2)();
        continue;

      case 2:
        return $M.ret(<EffR>
      {$.$.$1}
      $.$.$2
      {$p}
      {...ch}
    </EffR>);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:7-12:13", "e", $s$2], ["28:7-28:13", "e", $s$2], [], [], []]);
module.exports = $M.exports();