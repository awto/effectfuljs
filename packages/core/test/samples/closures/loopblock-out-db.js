var $M = require("@effectful/debugger"),
    $iterator = $M.iterator,
    $iterFin = $M.iterFin,
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $raise = $M.raise,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a: [1, "1:9-1:10"]
}, null, 0],
    $s$2 = [{
  p: [1, "1:11-1:12"],
  a: [2, "3:6-3:7"]
}, $s$1, 1],
    $s$3 = [{
  i: [1, "4:11-4:12"],
  j: [2, "6:8-6:9"],
  k: [3, "7:6-7:7"]
}, $s$2, 2],
    $s$4 = [{
  k: [1, "9:19-9:20"]
}, $s$3, 3],
    $s$5 = [{
  k: [2, "12:14-12:15"]
}, $s$4, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-25:0", 160, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 2;
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[0, "1:0-24:1", $s$1], [16, "25:0-25:0", $s$1], [16, "25:0-25:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a", null, $m$0, ["p"], 0, 4, "1:0-24:1", 128, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($context.call = eff)(1);
      $.state = 1;

    case 1:
      $l[2] = 0;
      $.state = 2;

    case 2:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0];
      $.goto = 3;
      $p = ($context.call = eff)(2, $l[0][2]);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $iterator($p);
      $.state = 4;

    case 4:
      $l[5] = $p;
      $.state = 5;

    case 5:
      $.state = 6;

    case 6:
      $context.call = $l[5].next;
      $.goto = 7;
      $p = $l[5].next();
      $.state = 7;

    case 7:
      if ($p.done) {
        $.state = 8;
      } else {
        $l[1] = $p.value;
        $.goto = 9;
        ($context.call = eff)(3, $l[0][2], $l[0][2]);
        continue;
      }

    case 8:
      $l[0][3] = 17;
      $.goto = 16;
      continue;

    case 9:
      $l[2] = $l[1] + 1;
      $l[3] = $l[1] + 1;
      $l[1] = $l[1] + 1;
      $.goto = 10;
      ($context.call = eff)($m$2($));
      $.state = 10;

    case 10:
      $.goto = 11;
      ($context.call = eff)(7, $l[0][2], $l[1], $l[2]);
      $.state = 11;

    case 11:
      $l = $.$ = [$l[0], void 0, void 0, void 0, void 0, $l[5], void 0, void 0, void 0, void 0];
      $.goto = 6;
      continue;

    case 12:
      return $raise($.error);

    case 13:
      $.goto = 14;
      $iterFin($l[5]);
      $.state = 14;

    case 14:
      $.goto = $l[4];
      continue;

    case 15:
      return $raise($.error);

    case 16:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 17:
      $.goto = 19;
      ($context.call = eff)(8, $l[2], $l[1]);
      continue;

    case 18:
      $.goto = 19;
      return $unhandled($.error);

    case 19:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 14:
    case 13:
    case 12:
    case 8:
    case 5:
      $.goto = 16;
      $l[0][3] = 15;
      break;

    case 11:
    case 10:
    case 9:
    case 7:
    case 6:
      $.goto = 13;
      $l[4] = 12;
      break;

    default:
      $.goto = 18;
  }
}, function ($, $l) {
  switch ($.state) {
    case 14:
    case 13:
    case 12:
    case 8:
    case 5:
      $l[0][3] = 19;
      $.goto = 16;
      break;

    case 11:
    case 10:
    case 9:
    case 7:
    case 6:
      $l[4] = 16;
      $l[0][3] = 19;
      $.goto = 13;
      break;

    default:
      $.goto = 19;
      break;
  }
}, 1, [[2, "2:2-2:8", $s$2], [0, "3:6-3:11", $s$2], [2, "4:16-4:25", $s$3], [2, "4:16-4:25", $s$3], [0, null, $s$3], [0, null, $s$3], [2, "4:16-4:25", $s$3], [2, "5:4-5:16", $s$3], [0, null, $s$3], [2, "9:4-20:6", $s$3], [2, "21:4-21:19", $s$3], [0, null, $s$3], [0, null, $s$3], [2, "4:16-4:25", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [2, "23:2-23:14", $s$2], [16, "24:1-24:1", $s$2], [16, "24:1-24:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$1, ["k"], 2, 3, "9:8-20:5", 128, function b($, $l, $p) {
  var $2, $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $1 = $l[0][2];
      $2 = $l[1];
      $l[1] = $2 + 1;
      $.goto = 1;
      ($context.call = eff)(4, $l[0][0][2], $1, $2, $l[0][0][1]);
      $.state = 1;

    case 1:
      $l[2] = 10;
      $l[0][2] = $l[0][2] + 1;
      $l[0][0][2] = $l[0][0][2] + 1;
      $l[0][1] = $l[0][1] + 1;
      $l[2] = $l[2] + 1;
      $l[0][0][1] = $l[0][0][1] + 1;
      $.goto = 2;
      ($context.call = eff)(5, $l[0][0][2], $l[0][1], $l[2], $l[0][0][1]);
      $.state = 2;

    case 2:
      $.goto = 4;
      ($context.call = eff)(6, $l[0][0][2], $l[0][1], $l[1], $l[0][0][1]);
      continue;

    case 3:
      $.goto = 4;
      return $unhandled($.error);

    case 4:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, "10:6-10:26", $s$4], [2, "17:8-17:26", $s$5], [2, "19:6-19:24", $s$4], [16, "20:5-20:5", $s$4], [16, "20:5-20:5", $s$4]]);

$M.moduleExports();