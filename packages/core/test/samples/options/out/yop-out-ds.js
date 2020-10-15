var $0M = require("@effectful/debugger"),
    $0context = $0M.context,
    $0ret = $0M.ret,
    $0unhandled = $0M.unhandled,
    $0brk = $0M.brk,
    $0lset = $0M.lset,
    $0mcall = $0M.mcall,
    $0get = $0M.get,
    $0gset = $0M.gset,
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
    $0m$0 = $0M.fun("m$0", "file.js", null, null, [], 0, 1, "1:0-75:0", 32, function file_js($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.moduleId = require.resolve("@effectfuljs/core"), $0M.force(require("@effectfuljs/core")));
      $0.state = 2;

    case 2:
      $0gset(global, "M", $0p);
      $0.goto = 3;
      $0brk();
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = ($0context.moduleId = require.resolve("Q"), $0M.force(require("Q")));
      $0.state = 4;

    case 4:
      $0gset(global, "Q", $0p);
      $0.goto = 5;
      $0brk();
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0p = ($0context.moduleId = require.resolve("@effectfuljs/promise"), $0M.force(require("@effectfuljs/promise")));
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0p = ($0context.call = $0p)(Q);
      $0.state = 7;

    case 7:
      $0gset(global, "QM", $0p);
      $0.goto = 8;
      $0brk();
      $0.state = 8;

    case 8:
      $0.goto = 10;
      ($0context.call = describe)("yop", $0m$1($0));
      continue;

    case 9:
      $0.goto = 10;
      return $0unhandled($0.error);

    case 10:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "2:0-2:33", $s$1], [2, "2:4-2:32", $s$1], [4, "3:0-3:17", $s$1], [2, "3:4-3:16", $s$1], [4, "4:0-4:40", $s$1], [2, "4:5-4:36", $s$1], [2, "4:5-4:39", $s$1], [4, "5:0-74:3", $s$1], [2, "5:0-74:2", $s$1], [16, "75:0-75:0", $s$1], [16, "75:0-75:0", $s$1]]),
    $0m$1 = $0M.fun("m$1", null, null, $0m$0, [], 0, 1, "5:16-74:1", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      ($0context.call = it)("should yield fiber until promise is resolved", $0m$2($0));
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0brk();
      $0.state = 3;

    case 3:
      $0.goto = 4;
      ($0context.call = it)("should throw reasons from rejected promises into fiber", $0m$7($0));
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0brk();
      $0.state = 5;

    case 5:
      $0.goto = 6;
      ($0context.call = it)("should work just fine with passed a value instead of a promise", $0m$14($0));
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
}, null, null, 1, [[4, "6:2-28:5", $s$2], [2, "6:2-28:4", $s$2], [4, "29:2-58:5", $s$2], [2, "29:2-58:4", $s$2], [4, "59:2-73:5", $s$2], [2, "59:2-73:4", $s$2], [36, "74:1-74:1", $s$2], [16, "74:1-74:1", $s$2], [16, "74:1-74:1", $s$2]]),
    $0m$2 = $0M.fun("m$2", null, null, $0m$1, ["done"], 0, 3, "6:53-28:3", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0lset($0l, 2,
      /*addLater*/
      $0m$5($0));
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = $0get($0l[1], "async");
      $0.state = 2;

    case 2:
      if ($0p) {
        $0.state = 3;
      } else {
        $0.goto = 6;
        continue;
      }

    case 3:
      $0.goto = 4;
      $0brk();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0mcall("async", $0l[1]);
      $0.state = 5;

    case 5:
      $0lset($0l, 1,
      /*done*/
      $0p);
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      $0mcall("run", M, QM, $0m$3($0));
      $0.state = 8;

    case 8:
      $0.goto = 10;
      $0brk();
      continue;

    case 9:
      $0.goto = 10;
      return $0unhandled($0.error);

    case 10:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "7:4-7:40", $s$3], [2, "7:8-7:18", $s$3], [0, null, $s$3], [4, "7:20-7:40", $s$3], [2, "7:27-7:39", $s$3], [0, "7:20-7:39", $s$3], [4, "8:4-19:7", $s$3], [2, "8:4-19:6", $s$3], [36, "28:3-28:3", $s$3], [16, "28:3-28:3", $s$3], [16, "28:3-28:3", $s$3]]),
    $0m$3 = $0M.fun("m$3", null, null, $0m$2, [], 0, 2, "8:14-19:5", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = ($0context.call = $0l[0][2])(1, 2);
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = ($0context.call = M)($0p);
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0mcall("mapply", $0p, $0m$4($0));
      $0.state = 5;

    case 5:
      $0.result = $0p;
      $0.goto = 7;
      continue;

    case 6:
      $0.goto = 7;
      return $0unhandled($0.error);

    case 7:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "9:6-9:17", $s$4], [4, "10:6-18:9", $s$4], [2, "10:15-10:29", $s$4], [2, "10:13-10:30", $s$4], [2, "10:13-18:8", $s$4], [0, null, $s$4], [16, "19:5-19:5", $s$4], [16, "19:5-19:5", $s$4]]),
    $0m$4 = $0M.fun("m$4", null, null, $0m$3, ["$dm$b"], 0, 3, "10:38-18:7", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0lset($0l[0], 1,
      /*result*/
      $0l[1]);
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0brk();
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = ($0context.call = expect)($0l[0][1]);
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0get($0p, "to");
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0mcall("equal", $0p, 3);
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      ($0context.call = $0l[0][0][1])();
      $0.state = 8;

    case 8:
      $0.goto = 9;
      $0brk();
      $0.state = 9;

    case 9:
      $0.goto = 14;
      $0brk();
      continue;

    case 10:
      $0lset($0l, 2,
      /*err*/
      $0.error);
      $0.error = void 0;
      $0.goto = 11;
      $0brk();
      $0.state = 11;

    case 11:
      $0.goto = 12;
      ($0context.call = $0l[0][0][1])($0l[2]);
      $0.state = 12;

    case 12:
      $0.goto = 9;
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
}, function ($0, $0l) {
  switch ($0.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $0.goto = 10;
      break;

    default:
      $0.goto = 13;
  }
}, null, 4, [[4, "11:8-11:23", $s$5], [4, "12:8-17:9", $s$5], [5, "13:10-13:37", $s$5], [3, "13:10-13:24", $s$5], [3, "13:10-13:27", $s$5], [3, "13:10-13:36", $s$5], [5, "14:10-14:17", $s$5], [3, "14:10-14:16", $s$5], [37, "15:9-15:9", $s$5], [36, "18:7-18:7", $s$5], [4, "16:10-16:20", $s$6], [2, "16:10-16:19", $s$6], [36, "17:9-17:9", $s$5], [16, "18:7-18:7", $s$5], [16, "18:7-18:7", $s$5]]),
    $0m$5 = $0M.fun("m$5", "addLater", null, $0m$2, ["a", "b"], 0, 4, "20:4-27:5", 0, function addLater($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = $0mcall("defer", Q);
      $0.state = 3;

    case 3:
      $0lset($0l, 3,
      /*deferred*/
      $0p);
      $0.goto = 4;
      $0brk();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0mcall("nextTick", process, $0m$6($0));
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0brk();
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0p = $0get($0l[3], "promise");
      $0.state = 7;

    case 7:
      $0.result = $0p;
      $0.goto = 9;
      continue;

    case 8:
      $0.goto = 9;
      return $0unhandled($0.error);

    case 9:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "21:6-21:19", $s$7], [4, "22:6-22:27", $s$7], [2, "22:17-22:26", $s$7], [4, "23:6-25:9", $s$7], [2, "23:6-25:8", $s$7], [4, "26:6-26:30", $s$7], [2, "26:13-26:29", $s$7], [0, null, $s$7], [16, "27:5-27:5", $s$7], [16, "27:5-27:5", $s$7]]),
    $0m$6 = $0M.fun("m$6", null, null, $0m$5, [], 0, 1, "23:23-25:7", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0mcall("resolve", $0l[0][3], $0l[0][1] + $0l[0][2]);
      $0.state = 2;

    case 2:
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
}, null, null, 4, [[4, "24:8-24:32", $s$8], [2, "24:8-24:31", $s$8], [36, "25:7-25:7", $s$8], [16, "25:7-25:7", $s$8], [16, "25:7-25:7", $s$8]]),
    $0m$7 = $0M.fun("m$7", null, null, $0m$1, ["done"], 0, 3, "29:63-58:3", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0lset($0l, 2,
      /*throwErrorLater*/
      $0m$12($0));
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = $0get($0l[1], "async");
      $0.state = 2;

    case 2:
      if ($0p) {
        $0.state = 3;
      } else {
        $0.goto = 6;
        continue;
      }

    case 3:
      $0.goto = 4;
      $0brk();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0mcall("async", $0l[1]);
      $0.state = 5;

    case 5:
      $0lset($0l, 1,
      /*done*/
      $0p);
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      $0mcall("run", M, QM, $0m$8($0));
      $0.state = 8;

    case 8:
      $0.goto = 10;
      $0brk();
      continue;

    case 9:
      $0.goto = 10;
      return $0unhandled($0.error);

    case 10:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "30:4-30:40", $s$9], [2, "30:8-30:18", $s$9], [0, null, $s$9], [4, "30:20-30:40", $s$9], [2, "30:27-30:39", $s$9], [0, "30:20-30:39", $s$9], [4, "31:4-49:7", $s$9], [2, "31:4-49:6", $s$9], [36, "58:3-58:3", $s$9], [16, "58:3-58:3", $s$9], [16, "58:3-58:3", $s$9]]),
    $0m$8 = $0M.fun("m$8", null, null, $0m$7, [], 0, 1, "31:14-49:5", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = $0mcall("scope", M, $0m$9($0));
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
}, null, null, 3, [[4, "32:6-48:9", $s$10], [2, "32:13-48:8", $s$10], [0, null, $s$10], [16, "49:5-49:5", $s$10], [16, "49:5-49:5", $s$10]]),
    $0m$9 = $0M.fun("m$9", null, null, $0m$8, ["$dm$root"], 0, 2, "32:21-48:7", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = ($0context.call = $0l[0][0][2])();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = ($0context.call = M)($0p);
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = $0mcall("mhandle", $0p, $0m$10($0));
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0mcall("mapply", $0p, $0m$11($0));
      $0.state = 5;

    case 5:
      $0.result = $0p;
      $0.goto = 7;
      continue;

    case 6:
      $0.goto = 7;
      return $0unhandled($0.error);

    case 7:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 4, [[4, "33:8-47:13", $s$11], [2, "33:17-33:34", $s$11], [2, "33:15-33:35", $s$11], [2, "33:15-42:12", $s$11], [2, "33:15-47:12", $s$11], [0, null, $s$11], [16, "48:7-48:7", $s$11], [16, "48:7-48:7", $s$11]]),
    $0m$10 = $0M.fun("m$10", null, null, $0m$9, ["err"], 0, 3, "34:19-42:11", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = $0get($0l[1], "message");
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = ($0context.call = expect)($0p);
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0get($0p, "to");
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0mcall("equal", $0p, "promise rejected");
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      ($0context.call = $0l[0][0][0][1])();
      $0.state = 8;

    case 8:
      $0.goto = 9;
      $0brk();
      $0.state = 9;

    case 9:
      $0.goto = 10;
      $0brk();
      $0.state = 10;

    case 10:
      $0.goto = 11;
      $0p = $0mcall("brk", $0l[0][1]);
      $0.state = 11;

    case 11:
      $0.result = $0p;
      $0.goto = 16;
      continue;

    case 12:
      $0lset($0l, 2,
      /*expectErr*/
      $0.error);
      $0.error = void 0;
      $0.goto = 13;
      $0brk();
      $0.state = 13;

    case 13:
      $0.goto = 14;
      ($0context.call = $0l[0][0][0][1])($0l[2]);
      $0.state = 14;

    case 14:
      $0.goto = 9;
      $0brk();
      continue;

    case 15:
      $0.goto = 16;
      return $0unhandled($0.error);

    case 16:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($0, $0l) {
  switch ($0.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $0.goto = 12;
      break;

    default:
      $0.goto = 15;
  }
}, null, 5, [[4, "35:12-40:13", $s$12], [5, "36:14-36:63", $s$12], [3, "36:21-36:32", $s$12], [3, "36:14-36:33", $s$12], [3, "36:14-36:36", $s$12], [3, "36:14-36:62", $s$12], [5, "37:14-37:21", $s$12], [3, "37:14-37:20", $s$12], [37, "38:13-38:13", $s$12], [4, "41:12-41:34", $s$12], [2, "41:19-41:33", $s$12], [0, null, $s$12], [4, "39:14-39:30", $s$13], [2, "39:14-39:29", $s$13], [36, "40:13-40:13", $s$12], [16, "42:11-42:11", $s$12], [16, "42:11-42:11", $s$12]]),
    $0m$11 = $0M.fun("m$11", null, null, $0m$9, [], 0, 2, "43:18-47:11", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0l[1] = $0l[0][0][0][1];
      $0.goto = 2;
      $0p = new ($0context.call = Error)("yop should have thrown reason from rejected promise");
      $0.state = 2;

    case 2:
      $0.goto = 3;
      ($0context.call = $0l[1])($0p);
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
}, null, null, 5, [[4, "44:12-46:14", $s$14], [2, "45:14-45:78", $s$14], [2, "44:12-46:13", $s$14], [36, "47:11-47:11", $s$14], [16, "47:11-47:11", $s$14], [16, "47:11-47:11", $s$14]]),
    $0m$12 = $0M.fun("m$12", "throwErrorLater", null, $0m$7, [], 0, 2, "50:4-57:5", 0, function throwErrorLater($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = $0mcall("defer", Q);
      $0.state = 3;

    case 3:
      $0lset($0l, 1,
      /*deferred*/
      $0p);
      $0.goto = 4;
      $0brk();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0mcall("nextTick", process, $0m$13($0));
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0brk();
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0p = $0get($0l[1], "promise");
      $0.state = 7;

    case 7:
      $0.result = $0p;
      $0.goto = 9;
      continue;

    case 8:
      $0.goto = 9;
      return $0unhandled($0.error);

    case 9:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "51:6-51:19", $s$15], [4, "52:6-52:27", $s$15], [2, "52:17-52:26", $s$15], [4, "53:6-55:9", $s$15], [2, "53:6-55:8", $s$15], [4, "56:6-56:30", $s$15], [2, "56:13-56:29", $s$15], [0, null, $s$15], [16, "57:5-57:5", $s$15], [16, "57:5-57:5", $s$15]]),
    $0m$13 = $0M.fun("m$13", null, null, $0m$12, [], 0, 1, "53:23-55:7", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = new ($0context.call = Error)("promise rejected");
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0mcall("reject", $0l[0][1], $0p);
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
}, null, null, 4, [[4, "54:8-54:55", $s$16], [2, "54:24-54:53", $s$16], [2, "54:8-54:54", $s$16], [36, "55:7-55:7", $s$16], [16, "55:7-55:7", $s$16], [16, "55:7-55:7", $s$16]]),
    $0m$14 = $0M.fun("m$14", null, null, $0m$1, ["done"], 0, 2, "59:71-73:3", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0p = $0get($0l[1], "async");
      $0.state = 2;

    case 2:
      if ($0p) {
        $0.state = 3;
      } else {
        $0.goto = 6;
        continue;
      }

    case 3:
      $0.goto = 4;
      $0brk();
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0mcall("async", $0l[1]);
      $0.state = 5;

    case 5:
      $0lset($0l, 1,
      /*done*/
      $0p);
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      $0mcall("run", M, QM, $0m$15($0));
      $0.state = 8;

    case 8:
      $0.goto = 10;
      $0brk();
      continue;

    case 9:
      $0.goto = 10;
      return $0unhandled($0.error);

    case 10:
      return $0ret($0.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "60:4-60:40", $s$17], [2, "60:8-60:18", $s$17], [0, null, $s$17], [4, "60:20-60:40", $s$17], [2, "60:27-60:39", $s$17], [0, "60:20-60:39", $s$17], [4, "61:4-72:7", $s$17], [2, "61:4-72:6", $s$17], [36, "73:3-73:3", $s$17], [16, "73:3-73:3", $s$17], [16, "73:3-73:3", $s$17]]),
    $0m$15 = $0M.fun("m$15", null, null, $0m$14, [], 0, 2, "61:14-72:5", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0p = ($0context.call = M)(1 + 2);
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = $0mcall("mapply", $0p, $0m$16($0));
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
}, null, null, 3, [[4, "62:6-62:17", $s$18], [4, "63:6-71:9", $s$18], [2, "63:13-63:21", $s$18], [2, "63:13-71:8", $s$18], [0, null, $s$18], [16, "72:5-72:5", $s$18], [16, "72:5-72:5", $s$18]]),
    $0m$16 = $0M.fun("m$16", null, null, $0m$15, ["$dm$b"], 0, 3, "63:29-71:7", 0, function ($0, $0l, $0p) {
  for (;;) switch ($0.state = $0.goto) {
    case 0:
      $0.goto = 1;
      $0brk();
      $0.state = 1;

    case 1:
      $0lset($0l[0], 1,
      /*result*/
      $0l[1]);
      $0.goto = 2;
      $0brk();
      $0.state = 2;

    case 2:
      $0.goto = 3;
      $0brk();
      $0.state = 3;

    case 3:
      $0.goto = 4;
      $0p = ($0context.call = expect)($0l[0][1]);
      $0.state = 4;

    case 4:
      $0.goto = 5;
      $0p = $0get($0p, "to");
      $0.state = 5;

    case 5:
      $0.goto = 6;
      $0mcall("equal", $0p, 3);
      $0.state = 6;

    case 6:
      $0.goto = 7;
      $0brk();
      $0.state = 7;

    case 7:
      $0.goto = 8;
      ($0context.call = $0l[0][0][1])();
      $0.state = 8;

    case 8:
      $0.goto = 9;
      $0brk();
      $0.state = 9;

    case 9:
      $0.goto = 14;
      $0brk();
      continue;

    case 10:
      $0lset($0l, 2,
      /*err*/
      $0.error);
      $0.error = void 0;
      $0.goto = 11;
      $0brk();
      $0.state = 11;

    case 11:
      $0.goto = 12;
      ($0context.call = $0l[0][0][1])($0l[2]);
      $0.state = 12;

    case 12:
      $0.goto = 9;
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
}, function ($0, $0l) {
  switch ($0.state) {
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
    case 3:
    case 2:
      $0.goto = 10;
      break;

    default:
      $0.goto = 13;
  }
}, null, 4, [[4, "64:8-64:23", $s$19], [4, "65:8-70:9", $s$19], [5, "66:10-66:37", $s$19], [3, "66:10-66:24", $s$19], [3, "66:10-66:27", $s$19], [3, "66:10-66:36", $s$19], [5, "67:10-67:17", $s$19], [3, "67:10-67:16", $s$19], [37, "68:9-68:9", $s$19], [36, "71:7-71:7", $s$19], [4, "69:10-69:20", $s$20], [2, "69:10-69:19", $s$20], [36, "70:9-70:9", $s$19], [16, "71:7-71:7", $s$19], [16, "71:7-71:7", $s$19]]);

$0M.moduleExports();