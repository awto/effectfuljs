var $M = require("@effectful/debugger/api"),
    $iterator = $M.iterator,
    $iterFin = $M.iterFin,
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-25:0", 32, function file_js($, $l, $p) {
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
    $m$1 = $M.fun("m$1", "a", null, $m$0, ["p"], 0, 4, "1:0-24:1", 0, function a($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("2:2-2:9");
      $.state = 1;

    case 1:
      $.goto = 2;
      ($context.call = eff)(1);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("3:2-3:12");
      $.state = 3;

    case 3:
      $l[2] = 0;
      $.goto = 4;
      $brk("4:2-22:3");
      $.state = 4;

    case 4:
      $l = $.$ = [$l, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0];
      $.goto = 5;
      $p = ($context.call = eff)(2, $l[0][2]);
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = $iterator($p);
      $.state = 6;

    case 6:
      $l[5] = $p;
      $.state = 7;

    case 7:
      $l = $.$ = $l.slice();
      $.state = 8;

    case 8:
      $context.call = $l[5].next;
      $.goto = 9;
      $p = $l[5].next();
      $.state = 9;

    case 9:
      if ($p.done) {
        $.state = 10;
      } else {
        $l[1] = $p.value;
        $.goto = 11;
        $brk("5:4-5:17");
        continue;
      }

    case 10:
      $l[0][3] = 22;
      $.goto = 21;
      continue;

    case 11:
      $.goto = 12;
      ($context.call = eff)(3, $l[0][2], $l[0][2]);
      $.state = 12;

    case 12:
      $.goto = 13;
      $brk("6:4-7:16");
      $.state = 13;

    case 13:
      $l[2] = $l[1] + 1;
      $l[3] = $l[1] + 1;
      $.goto = 14;
      $brk("8:4-8:8");
      $.state = 14;

    case 14:
      $l[1] = $l[1] + 1;
      $.goto = 15;
      $brk("9:4-20:7");
      $.state = 15;

    case 15:
      $.goto = 16;
      ($context.call = eff)($m$2($));
      $.state = 16;

    case 16:
      $.goto = 17;
      $brk("21:4-21:20");
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = eff)(7, $l[0][2], $l[1], $l[2]);
      $.state = 18;

    case 18:
      $l = $.$ = $l.slice();
      $.goto = 8;
      continue;

    case 19:
      $.goto = 20;
      $iterFin($l[5]);
      $.state = 20;

    case 20:
      $.goto = $l[4];
      continue;

    case 21:
      $l = $.$ = $l[0];
      $.goto = $l[3];
      continue;

    case 22:
      $.goto = 23;
      $brk("23:2-23:15");
      $.state = 23;

    case 23:
      $.goto = 25;
      ($context.call = eff)(8, $l[2], $l[1]);
      continue;

    case 24:
      $.goto = 25;
      return $unhandled($.error);

    case 25:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 10:
    case 7:
      $l[0][3] = 24;
      $.goto = 21;
      break;

    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 9:
    case 8:
      $l[4] = 21;
      $l[0][3] = 24;
      $.goto = 19;
      break;

    default:
      $.goto = 24;
      break;
  }
}, function ($, $l) {
  switch ($.state) {
    case 20:
    case 19:
    case 10:
    case 7:
      $l[0][3] = 25;
      $.goto = 21;
      break;

    case 18:
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 9:
    case 8:
      $l[4] = 21;
      $l[0][3] = 25;
      $.goto = 19;
      break;

    default:
      $.goto = 25;
      break;
  }
}, 1, [[4, "2:2-2:9", $s$2], [2, "2:2-2:8", $s$2], [4, "3:2-3:12", $s$2], [4, "4:2-22:3", $s$2], [2, "4:16-4:25", $s$3], [0, null, $s$2], [0, null, $s$2], [1, null, $s$2], [1, "4:11-4:12", $s$2], [5, "5:4-5:17", $s$3], [1, null, $s$2], [3, "5:4-5:16", $s$3], [5, "6:4-7:16", $s$3], [5, "8:4-8:8", $s$3], [5, "9:4-20:7", $s$3], [3, "9:4-20:6", $s$3], [5, "21:4-21:20", $s$3], [3, "21:4-21:19", $s$3], [1, null, $s$2], [1, null, $s$2], [1, null, $s$2], [0, null, $s$2], [4, "23:2-23:15", $s$2], [2, "23:2-23:14", $s$2], [16, "24:1-24:1", $s$2], [16, "24:1-24:1", $s$2]]),
    $m$2 = $M.fun("m$2", "b", null, $m$1, ["k"], 2, 3, "9:8-20:5", 0, function b($, $l, $p) {
  var $2, $1;

  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk("10:6-10:27");
      $.state = 1;

    case 1:
      $1 = $l[0][2];
      $2 = $l[1];
      $l[1] = $2 + 1;
      $.goto = 2;
      ($context.call = eff)(4, $l[0][0][2], $1, $2, $l[0][0][1]);
      $.state = 2;

    case 2:
      $.goto = 3;
      $brk("12:8-12:21");
      $.state = 3;

    case 3:
      $l[2] = 10;
      $.goto = 4;
      $brk("13:8-13:12");
      $.state = 4;

    case 4:
      $l[0][2] = $l[0][2] + 1;
      $.goto = 5;
      $brk("14:8-14:12");
      $.state = 5;

    case 5:
      $l[0][0][2] = $l[0][0][2] + 1;
      $.goto = 6;
      $brk("15:8-15:12");
      $.state = 6;

    case 6:
      $l[0][1] = $l[0][1] + 1;
      $.goto = 7;
      $brk("16:8-16:17");
      $.state = 7;

    case 7:
      $l[2] = $l[2] + 1;
      $l[0][0][1] = $l[0][0][1] + 1;
      $.goto = 8;
      $brk("17:8-17:27");
      $.state = 8;

    case 8:
      $.goto = 9;
      ($context.call = eff)(5, $l[0][0][2], $l[0][1], $l[2], $l[0][0][1]);
      $.state = 9;

    case 9:
      $.goto = 10;
      $brk("19:6-19:25");
      $.state = 10;

    case 10:
      $.goto = 12;
      ($context.call = eff)(6, $l[0][0][2], $l[0][1], $l[1], $l[0][0][1]);
      continue;

    case 11:
      $.goto = 12;
      return $unhandled($.error);

    case 12:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "10:6-10:27", $s$4], [2, "10:6-10:26", $s$4], [4, "12:8-12:21", $s$5], [4, "13:8-13:12", $s$5], [4, "14:8-14:12", $s$5], [4, "15:8-15:12", $s$5], [4, "16:8-16:17", $s$5], [4, "17:8-17:27", $s$5], [2, "17:8-17:26", $s$5], [4, "19:6-19:25", $s$4], [2, "19:6-19:24", $s$4], [16, "20:5-20:5", $s$4], [16, "20:5-20:5", $s$4]]);

$M.moduleExports();