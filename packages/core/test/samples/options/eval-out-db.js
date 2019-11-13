var $0M = require("@effectful/debugger/api");

$0M.module("file.js", null, module, null, "$0");
var $s$1 = [{
  aa: "$0"
}, null, false],
    $s$2 = [{
  $$: "$0",
  cc: "$1",
  cc2: "$2",
  bb: "$3"
}, $s$1, false],
    $s$3 = [{
  b: "$0"
}, $s$2, false],
    $s$4 = [{
  c: "$0"
}, $s$2, false],
    $s$5 = [{
  $$: "$0",
  cc: "$1"
}, $s$2, false],
    $s$6 = [{
  b: "$0"
}, $s$5, false],
    $s$7 = [{
  a: "$1"
}, $s$6, false];
$0M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$.$0 = $0c.aa($0);
        return $0M.ret();

      case 1:
        return $0M.ret($0.value);

      case 2:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$0M.fun("m$1", "aa", "m$0", ["$$"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$.$1 = $0c.cc($0);
        $0.$.$3 = $0c.bb($0);
        $0.$.$2 = $0c.cc2($0);
        $0.goto = 1;
        $0p = ($0M.context.call = b)();
        continue;

      case 1:
        $0p + c + a;
        $0.goto = 2;
        ($0M.context.call = M.option).dbg$call(M, {
          evalWrapArg: "preEval"
        });
        continue;

      case 2:
        $0.goto = 3;
        ($0M.context.call = M.option).dbg$call(M, {
          evalWrapArg: false,
          replaceGlobals: {
            eval: true
          }
        });
        continue;

      case 3:
        return $0M.ret();

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:5", "e", $s$2], ["3:2-3:38", "e", $s$2], ["7:2-7:66", "e", $s$2], [], [], []]);
$0M.fun("m$2", "cc", "m$1", ["b"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = $0.$.$0)(c, a);
        continue;

      case 1:
        $0.goto = 2;
        $0p = $0M.evalDir($0p);
        continue;

      case 2:
        return $0M.ret($0p);

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["5:16-5:23", "e", $s$3], ["5:11-5:24", "e", $s$3], [], [], []]);
$0M.fun("m$3", "cc2", "m$1", ["c"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = $0.$.$0)(b, a);
        continue;

      case 1:
        $0.goto = 2;
        $0M.evalDir($0p);
        continue;

      case 2:
        return $0M.ret();

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["9:9-9:16", "e", $s$4], ["9:4-9:17", "e", $s$4], [], [], []]);
$0M.fun("m$4", "bb", "m$1", ["$$"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$.$1 = $0c.cc($0);
        $0.goto = 1;
        $0p = ($0M.context.call = b)();
        continue;

      case 1:
        $0p + c + a;
        return $0M.ret();

      case 2:
        return $0M.ret($0.value);

      case 3:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:4-12:7", "e", $s$5], [], [], []]);
$0M.fun("m$5", "cc", "m$4", ["b"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        if (a) {
          $0.$.$1 = something;
          $0.goto = 1;
          $0M.evalDir($0.$.$1);
          continue;
        } else {
          $0.goto = 1;
          $0M.evalDir(a);
          continue;
        }

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = $0.$.$0)(c, a);
        continue;

      case 2:
        $0.goto = 3;
        $0p = $0M.evalDir($0p);
        continue;

      case 3:
        return $0M.ret($0p);

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["16:8-16:15", "e", $s$7], ["20:18-20:25", "e", $s$6], ["20:13-20:26", "e", $s$6], [], [], []]);
module.exports = $0M.exports();