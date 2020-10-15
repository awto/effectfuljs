var $0M = require("@effectful/debugger"),
    $0context = $0M.context,
    $0ret = $0M.ret,
    $0unhandled = $0M.unhandled,
    $0mcall = $0M.mcall,
    $0m = $0M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$0", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{}, null, 0],
    $s$2 = [{}, $s$1, 1],
    $s$3 = [{
  done: [1, "6:62-6:66"],
  addLater: [2, "20:13-20:21"]
}, $s$2, 2],
    $s$4 = [{
  result: [1, "9:10-9:16"]
}, $s$3, 3],
    $s$5 = [{
  $dm$b: [1, "10:47-10:52"]
}, $s$4, 4],
    $s$6 = [{
  err: [2, "15:17-15:20"]
}, $s$5, 4],
    $s$7 = [{
  a: [1, "20:22-20:23"],
  b: [2, "20:25-20:26"],
  deferred: [3, "21:10-21:18"]
}, $s$3, 3],
    $s$8 = [{}, $s$7, 4],
    $s$9 = [{
  done: [1, "29:72-29:76"],
  throwErrorLater: [2, "50:13-50:28"]
}, $s$2, 2],
    $s$10 = [{}, $s$9, 3],
    $s$11 = [{
  $dm$root: [1, "32:30-32:38"]
}, $s$10, 4],
    $s$12 = [{
  err: [1, "34:28-34:31"]
}, $s$11, 5],
    $s$13 = [{
  expectErr: [2, "38:21-38:30"]
}, $s$12, 5],
    $s$14 = [{}, $s$11, 5],
    $s$15 = [{
  deferred: [1, "51:10-51:18"]
}, $s$9, 3],
    $s$16 = [{}, $s$15, 4],
    $s$17 = [{
  done: [1, "59:80-59:84"]
}, $s$2, 2],
    $s$18 = [{
  result: [1, "62:10-62:16"]
}, $s$17, 3],
    $s$19 = [{
  $dm$b: [1, "63:38-63:43"]
}, $s$18, 4],
    $s$20 = [{
  err: [2, "68:17-68:20"]
}, $s$19, 4],
    $0m$0 = $0M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-75:0", 160, function file_js($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = ($0context.moduleId = require.resolve("@effectfuljs/core"), $0M.force(require("@effectfuljs/core")));
      $0.state = 1;

    case 1:
      M = $0p;
      $0.goto = 2;
      $0p = ($0context.moduleId = require.resolve("Q"), $0M.force(require("Q")));
      $0.state = 2;

    case 2:
      Q = $0p;
      $0.goto = 3;
      $0p = ($0context.moduleId = require.resolve("@effectfuljs/promise"), $0M.force(require("@effectfuljs/promise")));
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = ($0context.call = $0p)(Q);
      $0.state = 4;

    case 4:
      QM = $0p;
      $0.goto = 6;
      ($0context.call = describe)("yop", $0m$1($0));
      continue;

    case 5:
      $0.goto = 6;
      return $0unhandled($0.error);

    case 6:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "2:4-2:32", $s$1], [2, "3:4-3:16", $s$1], [2, "4:5-4:36", $s$1], [2, "4:5-4:39", $s$1], [2, "5:0-74:2", $s$1], [16, "75:0-75:0", $s$1], [16, "75:0-75:0", $s$1]]),
    $0m$1 = $0M.fun("m$1", null, null, $0m$0, [], 0, 1, "5:16-74:1", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      ($0context.call = it)("should yield fiber until promise is resolved", $0m$2($0));
      $0.state = 1;

    case 1:
      $0.goto = 2;
      ($0context.call = it)("should throw reasons from rejected promises into fiber", $0m$7($0));
      $0.state = 2;

    case 2:
      $0.goto = 4;
      ($0context.call = it)("should work just fine with passed a value instead of a promise", $0m$14($0));
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "6:2-28:4", $s$2], [2, "29:2-58:4", $s$2], [2, "59:2-73:4", $s$2], [16, "74:1-74:1", $s$2], [16, "74:1-74:1", $s$2]]),
    $0m$2 = $0M.fun("m$2", null, null, $0m$1, ["done"], 0, 3, "6:53-28:3", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[2] = $0m$5($0);

      if ($0l[1].async) {
        $0.goto = 2;
        $0p = $0mcall("async", $0l[1]);
        continue;
      } else {
        $0.state = 1;
      }

    case 1:
      $0.goto = 4;
      $0mcall("run", M, QM, $0m$3($0));
      continue;

    case 2:
      $0l[1] = $0p;
      $0.goto = 1;
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "7:27-7:39", $s$3], [2, "8:4-19:6", $s$3], [0, "7:20-7:39", $s$3], [16, "28:3-28:3", $s$3], [16, "28:3-28:3", $s$3]]),
    $0m$3 = $0M.fun("m$3", null, null, $0m$2, [], 0, 2, "8:14-19:5", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = ($0context.call = $0l[0][2])(1, 2);
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = M)($0p);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = $0mcall("mapply", $0p, $0m$4($0));
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
}, null, null, 3, [[2, "10:15-10:29", $s$4], [2, "10:13-10:30", $s$4], [2, "10:13-18:8", $s$4], [0, null, $s$4], [16, "19:5-19:5", $s$4], [16, "19:5-19:5", $s$4]]),
    $0m$4 = $0M.fun("m$4", null, null, $0m$3, ["$dm$b"], 0, 3, "10:38-18:7", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[0][1] = $0l[1];
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = expect)($0l[0][1]);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0mcall("equal", $0p.to, 3);
      $0.state = 3;

    case 3:
      $0.goto = 4;
      ($0context.call = $0l[0][0][1])();
      $0.state = 4;

    case 4:
      $0.goto = 7;
      continue;

    case 5:
      $0l[2] = $0.error;
      $0.error = void 0;
      $0.goto = 4;
      ($0context.call = $0l[0][0][1])($0l[2]);
      continue;

    case 6:
      $0.goto = 7;
      return $0unhandled($0.error);

    case 7:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($0, $0l) {
  switch ($0.state) {
    case 3:
    case 2:
    case 1:
      $0.goto = 5;
      break;

    default:
      $0.goto = 6;
  }
}, null, 4, [[0, "11:8-11:22", $s$5], [3, "13:10-13:24", $s$5], [3, "13:10-13:36", $s$5], [3, "14:10-14:16", $s$5], [0, null, $s$5], [2, "16:10-16:19", $s$6], [16, "18:7-18:7", $s$5], [16, "18:7-18:7", $s$5]]),
    $0m$5 = $0M.fun("m$5", "addLater", null, $0m$2, ["a", "b"], 0, 4, "20:4-27:5", 128, function addLater($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = $0mcall("defer", Q);
      $0.state = 1;

    case 1:
      $0l[3] = $0p;
      $0.goto = 2;
      $0mcall("nextTick", process, $0m$6($0));
      $0.state = 2;

    case 2:
      $0.result = $0l[3].promise;
      $0.goto = 4;
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "22:17-22:26", $s$7], [2, "23:6-25:8", $s$7], [0, "26:13-26:29", $s$7], [16, "27:5-27:5", $s$7], [16, "27:5-27:5", $s$7]]),
    $0m$6 = $0M.fun("m$6", null, null, $0m$5, [], 0, 1, "23:23-25:7", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 2;
      $0mcall("resolve", $0l[0][3], $0l[0][1] + $0l[0][2]);
      continue;

    case 1:
      $0.goto = 2;
      return $0unhandled($0.error);

    case 2:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 4, [[2, "24:8-24:31", $s$8], [16, "25:7-25:7", $s$8], [16, "25:7-25:7", $s$8]]),
    $0m$7 = $0M.fun("m$7", null, null, $0m$1, ["done"], 0, 3, "29:63-58:3", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[2] = $0m$12($0);

      if ($0l[1].async) {
        $0.goto = 2;
        $0p = $0mcall("async", $0l[1]);
        continue;
      } else {
        $0.state = 1;
      }

    case 1:
      $0.goto = 4;
      $0mcall("run", M, QM, $0m$8($0));
      continue;

    case 2:
      $0l[1] = $0p;
      $0.goto = 1;
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "30:27-30:39", $s$9], [2, "31:4-49:6", $s$9], [0, "30:20-30:39", $s$9], [16, "58:3-58:3", $s$9], [16, "58:3-58:3", $s$9]]),
    $0m$8 = $0M.fun("m$8", null, null, $0m$7, [], 0, 1, "31:14-49:5", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = $0mcall("scope", M, $0m$9($0));
      $0.state = 1;

    case 1:
      $0.result = $0p;
      $0.goto = 3;
      continue;

    case 2:
      $0.goto = 3;
      return $0unhandled($0.error);

    case 3:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "32:13-48:8", $s$10], [0, null, $s$10], [16, "49:5-49:5", $s$10], [16, "49:5-49:5", $s$10]]),
    $0m$9 = $0M.fun("m$9", null, null, $0m$8, ["$dm$root"], 0, 2, "32:21-48:7", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = ($0context.call = $0l[0][0][2])();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = M)($0p);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = $0mcall("mhandle", $0p, $0m$10($0));
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = $0mcall("mapply", $0p, $0m$11($0));
      $0.state = 4;

    case 4:
      $0.result = $0p;
      $0.goto = 6;
      continue;

    case 5:
      $0.goto = 6;
      return $0unhandled($0.error);

    case 6:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 4, [[2, "33:17-33:34", $s$11], [2, "33:15-33:35", $s$11], [2, "33:15-42:12", $s$11], [2, "33:15-47:12", $s$11], [0, null, $s$11], [16, "48:7-48:7", $s$11], [16, "48:7-48:7", $s$11]]),
    $0m$10 = $0M.fun("m$10", null, null, $0m$9, ["err"], 0, 3, "34:19-42:11", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = expect)($0l[1].message);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0mcall("equal", $0p.to, "promise rejected");
      $0.state = 3;

    case 3:
      $0.goto = 4;
      ($0context.call = $0l[0][0][0][1])();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0mcall("brk", $0l[0][1]);
      $0.state = 5;

    case 5:
      $0.result = $0p;
      $0.goto = 8;
      continue;

    case 6:
      $0l[2] = $0.error;
      $0.error = void 0;
      $0.goto = 4;
      ($0context.call = $0l[0][0][0][1])($0l[2]);
      continue;

    case 7:
      $0.goto = 8;
      return $0unhandled($0.error);

    case 8:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($0, $0l) {
  switch ($0.state) {
    case 3:
    case 2:
    case 1:
      $0.goto = 6;
      break;

    default:
      $0.goto = 7;
  }
}, null, 5, [[0, null, $s$12], [3, "36:14-36:33", $s$12], [3, "36:14-36:62", $s$12], [3, "37:14-37:20", $s$12], [2, "41:19-41:33", $s$12], [0, null, $s$12], [2, "39:14-39:29", $s$13], [16, "42:11-42:11", $s$12], [16, "42:11-42:11", $s$12]]),
    $0m$11 = $0M.fun("m$11", null, null, $0m$9, [], 0, 2, "43:18-47:11", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[1] = $0l[0][0][0][1];
      $0.goto = 1;
      $0p = new ($0context.call = Error)("yop should have thrown reason from rejected promise");
      $0.state = 1;

    case 1:
      $0.goto = 3;
      ($0context.call = $0l[1])($0p);
      continue;

    case 2:
      $0.goto = 3;
      return $0unhandled($0.error);

    case 3:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 5, [[2, "45:14-45:78", $s$14], [2, "44:12-46:13", $s$14], [16, "47:11-47:11", $s$14], [16, "47:11-47:11", $s$14]]),
    $0m$12 = $0M.fun("m$12", "throwErrorLater", null, $0m$7, [], 0, 2, "50:4-57:5", 128, function throwErrorLater($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = $0mcall("defer", Q);
      $0.state = 1;

    case 1:
      $0l[1] = $0p;
      $0.goto = 2;
      $0mcall("nextTick", process, $0m$13($0));
      $0.state = 2;

    case 2:
      $0.result = $0l[1].promise;
      $0.goto = 4;
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "52:17-52:26", $s$15], [2, "53:6-55:8", $s$15], [0, "56:13-56:29", $s$15], [16, "57:5-57:5", $s$15], [16, "57:5-57:5", $s$15]]),
    $0m$13 = $0M.fun("m$13", null, null, $0m$12, [], 0, 1, "53:23-55:7", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = new ($0context.call = Error)("promise rejected");
      $0.state = 1;

    case 1:
      $0.goto = 3;
      $0mcall("reject", $0l[0][1], $0p);
      continue;

    case 2:
      $0.goto = 3;
      return $0unhandled($0.error);

    case 3:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 4, [[2, "54:24-54:53", $s$16], [2, "54:8-54:54", $s$16], [16, "55:7-55:7", $s$16], [16, "55:7-55:7", $s$16]]),
    $0m$14 = $0M.fun("m$14", null, null, $0m$1, ["done"], 0, 2, "59:71-73:3", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      if ($0l[1].async) {
        $0.goto = 2;
        $0p = $0mcall("async", $0l[1]);
        continue;
      } else {
        $0.state = 1;
      }

    case 1:
      $0.goto = 4;
      $0mcall("run", M, QM, $0m$15($0));
      continue;

    case 2:
      $0l[1] = $0p;
      $0.goto = 1;
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, "60:27-60:39", $s$17], [2, "61:4-72:6", $s$17], [0, "60:20-60:39", $s$17], [16, "73:3-73:3", $s$17], [16, "73:3-73:3", $s$17]]),
    $0m$15 = $0M.fun("m$15", null, null, $0m$14, [], 0, 2, "61:14-72:5", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0p = ($0context.call = M)(1 + 2);
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = $0mcall("mapply", $0p, $0m$16($0));
      $0.state = 2;

    case 2:
      $0.result = $0p;
      $0.goto = 4;
      continue;

    case 3:
      $0.goto = 4;
      return $0unhandled($0.error);

    case 4:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "63:13-63:21", $s$18], [2, "63:13-71:8", $s$18], [0, null, $s$18], [16, "72:5-72:5", $s$18], [16, "72:5-72:5", $s$18]]),
    $0m$16 = $0M.fun("m$16", null, null, $0m$15, ["$dm$b"], 0, 3, "63:29-71:7", 128, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0l[0][1] = $0l[1];
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = expect)($0l[0][1]);
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0mcall("equal", $0p.to, 3);
      $0.state = 3;

    case 3:
      $0.goto = 4;
      ($0context.call = $0l[0][0][1])();
      $0.state = 4;

    case 4:
      $0.goto = 7;
      continue;

    case 5:
      $0l[2] = $0.error;
      $0.error = void 0;
      $0.goto = 4;
      ($0context.call = $0l[0][0][1])($0l[2]);
      continue;

    case 6:
      $0.goto = 7;
      return $0unhandled($0.error);

    case 7:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($0, $0l) {
  switch ($0.state) {
    case 3:
    case 2:
    case 1:
      $0.goto = 5;
      break;

    default:
      $0.goto = 6;
  }
}, null, 4, [[0, "64:8-64:22", $s$19], [3, "66:10-66:24", $s$19], [3, "66:10-66:36", $s$19], [3, "67:10-67:16", $s$19], [0, null, $s$19], [2, "69:10-69:19", $s$20], [16, "71:7-71:7", $s$19], [16, "71:7-71:7", $s$19]]);

$0M.moduleExports();