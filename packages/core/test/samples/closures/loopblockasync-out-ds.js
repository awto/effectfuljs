var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $raise = $M.raise,
    $brk = $M.brk,
    $get = $M.get,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  main: [1, "3:15-3:19"]
}, null, 0],
    $s$2 = [{
  arg1: [1, "3:20-3:24"],
  items: [2, "4:8-4:13"],
  abandoned: [3, "5:6-5:15"]
}, $s$1, 1],
    $s$3 = [{}, $s$2, 2],
    $s$4 = [{
  item: [1, "7:6-7:10"]
}, $s$3, 2],
    $s$5 = [{
  existingItem: [2, "10:16-10:28"]
}, $s$4, 2],
    $s$6 = [{
  _ref: [1, null],
  productId: [2, "11:15-11:24"]
}, $s$5, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-22:0", 32, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1, $m$1($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 3;
      $mcall("profile", M, "es");
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[4, "1:0-1:16", $s$1], [2, "1:0-1:15", $s$1], [16, "22:0-22:0", $s$1], [16, "22:0-22:0", $s$1]]),
    $m$1 = $M.fun("m$1", "main", null, $m$0, ["arg1"], 0, 5, "3:0-21:1", 1, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $lset($l, 2, []);
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $lset($l, 3, false);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $l = $.$ = [$l, void 0, void 0];
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $p = ($x.call = $get, $l[0][2][0]);
      $.state = 6;

    case 6:
      $lset($l, 1, $p);
      $.goto = 7;
      $brk();
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = ($x.call = $get, signal.type);
      $.state = 8;

    case 8:
      switch ($p) {
        case "timeout":
          $.state = 9;
          break;

        case "checkout":
          $.goto = 15;
          continue;

        default:
          $.goto = 16;
          continue;
      }

    case 9:
      $.goto = 10;
      $brk();
      $.state = 10;

    case 10:
      $.goto = 11;
      $p = $mcall("find", $l[0][2], $m$2($));
      $.state = 11;

    case 11:
      $lset($l, 2, $p);
      $.goto = 12;
      $brk();
      $.state = 12;

    case 12:
      if ($l[0][3]) {
        $.state = 13;
      } else {
        $.goto = 14;
        continue;
      }

    case 13:
      $l[0][4] = 21;
      $.goto = 19;
      $brk();
      continue;

    case 14:
      $.goto = 16;
      $brk();
      continue;

    case 15:
      $l[0][4] = 21;
      $.goto = 19;
      $brk();
      continue;

    case 16:
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $l = $.$ = [$l[0], void 0, void 0];
      $.goto = 4;
      continue;

    case 18:
      return $raise($.error);

    case 19:
      $l = $.$ = $l[0];
      $.goto = $l[4];
      continue;

    case 20:
      $.goto = 21;
      return $unhandledA($.error);

    case 21:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $.goto = 19;
      $l[0][4] = 18;
      break;

    default:
      $.goto = 20;
  }
}, function ($, $l) {
  switch ($.state) {
    case 17:
    case 16:
    case 15:
    case 14:
    case 13:
    case 12:
    case 11:
    case 10:
    case 9:
    case 8:
    case 7:
    case 6:
    case 5:
    case 4:
      $l[0][4] = 21;
      $.goto = 19;
      break;

    default:
      $.goto = 21;
      break;
  }
}, 1, [[4, "4:2-4:18", $s$2], [4, "5:2-5:24", $s$2], [4, "6:2-20:3", $s$2], [0, null, $s$2], [4, "7:2-7:22", $s$4], [2, "7:13-7:21", $s$4], [4, "8:4-19:5", $s$4], [2, "8:12-8:23", $s$5], [0, null, $s$3], [4, "10:10-12:12", $s$5], [2, "10:31-12:11", $s$5], [4, "13:8-15:9", $s$5], [0, null, $s$3], [4, "14:10-14:17", $s$5], [4, "16:8-16:14", $s$5], [4, "18:8-18:15", $s$5], [36, "20:3-20:3", $s$3], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [16, "21:1-21:1", $s$2], [16, "21:1-21:1", $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, ["_ref"], 0, 3, "11:12-11:59", 4, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = $get, $l[1].productId);
      $.state = 2;

    case 2:
      $lset($l, 2, $p);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = $get, $l[0][1].productId);
      $.state = 4;

    case 4:
      $.result = $l[2] === $p;
      $.goto = 6;
      continue;

    case 5:
      $.goto = 6;
      return $unhandled($.error);

    case 6:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "11:15-11:24", $s$6], [2, null, $s$6], [4, "11:31-11:59", $s$6], [2, "11:45-11:59", $s$6], [0, "11:31-11:59", $s$6], [16, "11:59-11:59", $s$6], [16, "11:59-11:59", $s$6]]);

$M.moduleExports();