var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  i: "$0",
  j: "$1",
  d: "$2",
  len: "$3",
  ref: "$4"
}, null, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $c.f($);
        return $M.ret();

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$4 = [1, 2, 3];
        $.$.$0 = 0;
        $.$.$3 = $.$.$4.lenght;
        $.state = 1;

      case 1:
        if ($.$.$0 < $.$.$3) {
          $.$.$1 = 0;
          $.$.$3 = $.$.$4.length;
          $.goto = 3;
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)(3);
          continue;
        }

      case 2:
        return $M.ret();

      case 3:
        if ($.$.$1 < $.$.$3) {
          $.$.$2 = $.$.$4[$.$.$1];
          $.goto = 5;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          $.goto = 4;
          ($M.context.call = eff)(2);
          continue;
        }

      case 4:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 5:
        $.$.$1++;
        $.goto = 3;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["11:2-11:8", "e", $s$1], [], ["7:6-7:12", "e", $s$1], [], [], [], []]);
module.exports = $M.exports();