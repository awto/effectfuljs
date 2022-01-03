var $M = require("@effectful/debugger"),
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $raise = $M.raise,
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
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-22:0", 160, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $.goto = 2;
      $mcall("profile", M, "es");
      continue;

    case 1:
      $.goto = 2;
      return $unhandled($.error);

    case 2:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:15", $s$1], [16, "22:0-22:0", $s$1], [16, "22:0-22:0", $s$1]]),
    $m$1 = $M.fun("m$1", "main", null, $m$0, ["arg1"], 0, 5, "3:0-21:1", 129, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = [];
      $l[3] = false;
      $l = $.$ = [$l, void 0, void 0];
      $.state = 1;

    case 1:
      $l[1] = $l[0][2][0];

      switch (signal.type) {
        case "timeout":
          $.goto = 4;
          $p = $mcall("find", $l[0][2], $m$2($));
          continue;

        case "checkout":
          $.state = 2;
          break;

        default:
          $.goto = 3;
          continue;
      }

    case 2:
      $l[0][4] = 9;
      $.goto = 7;
      continue;

    case 3:
      $l = $.$ = [$l[0], void 0, void 0];
      $.goto = 1;
      continue;

    case 4:
      $l[2] = $p;

      if ($l[0][3]) {
        $l[0][4] = 9;
        $.goto = 7;
        continue;
      } else {
        $.state = 5;
      }

    case 5:
      $.goto = 3;
      continue;

    case 6:
      return $raise($.error);

    case 7:
      $l = $.$ = $l[0];
      $.goto = $l[4];
      continue;

    case 8:
      $.goto = 9;
      return $unhandledA($.error);

    case 9:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $.goto = 7;
      $l[0][4] = 6;
      break;

    default:
      $.goto = 8;
  }
}, function ($, $l) {
  switch ($.state) {
    case 5:
    case 4:
    case 3:
    case 2:
    case 1:
      $l[0][4] = 9;
      $.goto = 7;
      break;

    default:
      $.goto = 9;
      break;
  }
}, 1, [[0, "4:8-4:17", $s$2], [2, "10:31-12:11", $s$5], [0, null, $s$3], [0, null, $s$3], [0, "10:16-12:11", $s$5], [0, null, $s$3], [0, null, $s$2], [0, null, $s$2], [16, "21:1-21:1", $s$2], [16, "21:1-21:1", $s$2]]),
    $m$2 = $M.fun("m$2", null, null, $m$1, ["_ref"], 0, 3, "11:12-11:59", 132, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[2] = $l[1].productId;
      $.result = $l[2] === $l[0][1].productId;
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
}, null, null, 3, [[0, null, $s$6], [16, "11:59-11:59", $s$6], [16, "11:59-11:59", $s$6]]);

$M.moduleExports();