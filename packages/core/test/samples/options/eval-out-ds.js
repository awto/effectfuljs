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
        $0M.brk(0);
        continue;

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = b)();
        continue;

      case 2:
        $0p + c + a;
        $0.goto = 3;
        $0M.brk(1);
        continue;

      case 3:
        $0.goto = 4;
        $0M.mcall("option", M, {
          evalWrapArg: "preEval"
        });
        continue;

      case 4:
        $0.goto = 5;
        $0M.brk(3);
        continue;

      case 5:
        $0.goto = 6;
        $0M.mcall("option", M, {
          evalWrapArg: false,
          replaceGlobals: {
            eval: true
          }
        });
        continue;

      case 6:
        return $0M.ret();

      case 7:
        return $0M.ret($0.value);

      case 8:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:14", "s", $s$2], ["2:2-2:5", "e", $s$2], ["3:2-3:39", "s", $s$2], ["3:2-3:38", "e", $s$2], ["7:2-7:67", "s", $s$2], ["7:2-7:66", "e", $s$2], [], [], []]);
$0M.fun("m$2", "cc", "m$1", ["b"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0M.brk(2);
        continue;

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
}, null, null, [["5:4-5:25", "s", $s$3], ["5:16-5:23", "e", $s$3], ["5:11-5:24", "e", $s$3], [], [], []]);
$0M.fun("m$3", "cc2", "m$1", ["c"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0M.brk(4);
        continue;

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = $0.$.$0)(b, a);
        continue;

      case 2:
        $0.goto = 3;
        $0M.evalDir($0p);
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
}, null, null, [["9:4-9:18", "s", $s$4], ["9:9-9:16", "e", $s$4], ["9:4-9:17", "e", $s$4], [], [], []]);
$0M.fun("m$4", "bb", "m$1", ["$$"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$.$1 = $0c.cc($0);
        $0.goto = 1;
        $0M.brk(5);
        continue;

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = b)();
        continue;

      case 2:
        $0p + c + a;
        return $0M.ret();

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["12:4-12:16", "s", $s$5], ["12:4-12:7", "e", $s$5], [], [], []]);
$0M.fun("m$5", "cc", "m$4", ["b"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0M.brk(6);
        continue;

      case 1:
        if (a) {
          $0.goto = 7;
          $0M.brk(7);
          continue;
        } else {
          $0.goto = 2;
          $0M.brk(9);
          continue;
        }

      case 2:
        $0.goto = 3;
        $0M.evalDir(a);
        continue;

      case 3:
        $0.goto = 4;
        $0M.brk(10);
        continue;

      case 4:
        $0.goto = 5;
        $0p = ($0M.context.call = $0.$.$0)(c, a);
        continue;

      case 5:
        $0.goto = 6;
        $0p = $0M.evalDir($0p);
        continue;

      case 6:
        return $0M.ret($0p);

      case 7:
        $0.$.$1 = something;
        $0.goto = 8;
        $0M.brk(8);
        continue;

      case 8:
        $0.goto = 3;
        $0M.evalDir($0.$.$1);
        continue;

      case 9:
        return $0M.ret($0.value);

      case 10:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["14:6-19:7", "s", $s$6], ["15:8-15:26", "s", $s$7], ["18:8-18:15", "e", $s$6], ["20:6-20:27", "s", $s$6], ["20:18-20:25", "e", $s$6], ["20:13-20:26", "e", $s$6], [], ["16:8-16:16", "s", $s$7], ["16:8-16:15", "e", $s$7], [], []]);
module.exports = $0M.exports();