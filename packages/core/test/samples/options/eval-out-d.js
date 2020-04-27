var $0M = require("@effectful/debugger"),
    $0context = $0M.context,
    $0ret = $0M.ret,
    $0unhandled = $0M.unhandled,
    $0brk = $0M.brk,
    $0evalAt = $0M.evalAt,
    $0mcall = $0M.mcall,
    $0m = $0M.module("file.js", {
  a: [4, 0],
  b: [5, 1],
  c: [6, 2]
}, typeof module === "undefined" ? null : module, null, "$0", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  aa: [1, "1:9-1:11"]
}, null, 0],
    $s$2 = [{
  $$: [1, "1:12-1:14"],
  cc: [2, "4:11-4:13"],
  cc2: [3, "8:11-8:14"],
  bb: [4, "11:11-11:13"]
}, $s$1, 1],
    $s$3 = [{
  b: [1, "4:14-4:15"]
}, $s$2, 2],
    $s$4 = [{
  c: [1, "8:15-8:16"]
}, $s$2, 2],
    $s$5 = [{
  $$: [1, "11:14-11:16"],
  cc: [2, "13:13-13:15"]
}, $s$2, 2],
    $s$6 = [{
  b: [1, "13:16-13:17"]
}, $s$5, 3],
    $s$7 = [{
  a: [2, "15:12-15:13"]
}, $s$6, 3],
    $0m$0 = $0M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-24:0", 36, function file_js($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[1] = $0m$1($0);
      $0.goto = 2;
      continue;

    case 1:
      $0.goto = 2;
      return $0unhandled($0.error);

    case 2:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[0, "1:0-23:1", $s$1], [16, "24:0-24:0", $s$1], [16, "24:0-24:0", $s$1]]),
    $0m$1 = $0M.fun("m$1", "aa", null, $0m$0, ["$$"], 0, 5, "1:0-23:1", 0, function aa($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[2] = $0m$2($0);
      $0l[3] = $0m$3($0);
      $0l[4] = $0m$4($0);
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = $0l[5])();
      $0.state = 2;

    case 2:
      $0p + $0l[6] + $0l[0][4];
      $0.goto = 3;
      $0brk();
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0mcall("option", M, {
        evalWrapArg: "preEval"
      });
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0brk();
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0mcall("option", M, {
        evalWrapArg: false,
        replaceGlobals: {
          eval: true
        }
      });
      $0.state = 6;

    case 6:
      $0.goto = 8;
      $0brk();
      continue;

    case 7:
      $0.goto = 8;
      return $0unhandled($0.error);

    case 8:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:14", $s$2], [2, "2:2-2:5", $s$2], [4, "3:2-3:39", $s$2], [2, "3:2-3:38", $s$2], [4, "7:2-7:67", $s$2], [2, "7:2-7:66", $s$2], [36, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2]]),
    $0m$2 = $0M.fun("m$2", "cc", null, $0m$1, ["b"], 0, 2, "4:2-6:3", 24, function cc($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = $0l[1])($0l[6], $0l[0][0][4]);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = $0evalAt($0p);
      $0.state = 3;

    case 3:
      $0.result = $0p;
      $0.goto = 5;
      continue;

    case 4:
      $0.goto = 5;
      return $0unhandled($0.error);

    case 5:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "5:4-5:25", $s$3], [2, "5:16-5:23", $s$3], [2, "5:11-5:24", $s$3], [0, null, $s$3], [16, "6:3-6:3", $s$3], [16, "6:3-6:3", $s$3]]),
    $0m$3 = $0M.fun("m$3", "cc2", null, $0m$1, ["c"], 0, 2, "8:2-10:3", 24, function cc2($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = $0l[1])($0l[0][5], $0l[0][0][4]);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0evalAt($0p);
      $0.state = 3;

    case 3:
      $0.goto = 5;
      $0brk();
      continue;

    case 4:
      $0.goto = 5;
      return $0unhandled($0.error);

    case 5:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "9:4-9:18", $s$4], [2, "9:9-9:16", $s$4], [2, "9:4-9:17", $s$4], [36, "10:3-10:3", $s$4], [16, "10:3-10:3", $s$4], [16, "10:3-10:3", $s$4]]),
    $0m$4 = $0M.fun("m$4", "bb", null, $0m$1, ["$$"], 0, 3, "11:2-22:3", 0, function bb($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[2] = $0m$5($0);
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = $0l[0][5])();
      $0.state = 2;

    case 2:
      $0p + $0l[6] + $0l[0][0][4];
      $0.goto = 4;
      $0brk();
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "12:4-12:16", $s$5], [2, "12:4-12:7", $s$5], [36, "22:3-22:3", $s$5], [16, "22:3-22:3", $s$5], [16, "22:3-22:3", $s$5]]),
    $0m$5 = $0M.fun("m$5", "cc", null, $0m$4, ["b"], 0, 3, "13:4-21:5", 24, function cc($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      if ($0l[0][0][0][4]) {
        $0.state = 2;
      } else {
        $0.goto = 10;
        continue;
      }

    case 2:
      $0.goto = 3;
      $0brk();
      $0.state = 3;

    case 3:
      $0l[2] = something;
      $0.goto = 4;
      $0brk();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0evalAt($0l[2]);
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0brk();
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      $0p = ($0context.call = $0l[1])($0l[0][6], $0l[0][0][0][4]);
      $0.state = 8;

    case 8:
      $0.goto = 9;
      $0p = $0evalAt($0p);
      $0.state = 9;

    case 9:
      $0.result = $0p;
      $0.goto = 14;
      continue;

    case 10:
      $0.goto = 11;
      $0brk();
      $0.state = 11;

    case 11:
      $0.goto = 12;
      $0evalAt($0l[0][0][0][4]);
      $0.state = 12;

    case 12:
      $0.goto = 6;
      $0brk();
      continue;

    case 13:
      $0.goto = 14;
      return $0unhandled($0.error);

    case 14:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "14:6-19:7", $s$6], [0, null, $s$6], [4, "15:8-15:26", $s$7], [4, "16:8-16:16", $s$7], [2, "16:8-16:15", $s$7], [36, "17:7-17:7", $s$6], [4, "20:6-20:27", $s$6], [2, "20:18-20:25", $s$6], [2, "20:13-20:26", $s$6], [0, null, $s$6], [4, "18:8-18:16", $s$6], [2, "18:8-18:15", $s$6], [36, "19:7-19:7", $s$6], [16, "21:5-21:5", $s$6], [16, "21:5-21:5", $s$6]]);

$0M.moduleExports();