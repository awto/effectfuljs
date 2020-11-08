var $M = require("@effectful/debugger"),
    $awt = $M.awt,
    $x = $M.context,
    $ret = $M.ret,
    $retA = $M.retA,
    $unhandled = $M.unhandled,
    $unhandledA = $M.unhandledA,
    $brk = $M.brk,
    $get = $M.get,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $set = $M.set,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  _inheritsLoose: [1, null],
  aa: [2, "3:15-3:17"]
}, null, 0],
    $s$2 = [{
  subClass: [1, null],
  superClass: [2, null]
}, $s$1, 1],
    $s$3 = [{
  A: [1, "4:8-4:9"],
  B: [2, "13:8-13:9"]
}, $s$1, 1],
    $s$4 = [{
  A: [1, null],
  _proto: [2, null]
}, $s$3, 2],
    $s$5 = [{}, $s$4, 3],
    $s$6 = [{}, $s$4, 3],
    $s$7 = [{}, $s$4, 3],
    $s$8 = [{
  _A: [1, null],
  B: [2, null],
  _proto2: [3, null]
}, $s$3, 2],
    $s$9 = [{}, $s$8, 3],
    $s$10 = [{}, $s$8, 3],
    $s$11 = [{}, $s$8, 3],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 3, "1:0-22:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*_inheritsLoose*/
      $m$1($));
      $lset($l, 2,
      /*aa*/
      $m$2($));
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
    $m$1 = $M.fun("m$1", "_inheritsLoose", null, $m$0, ["subClass", "superClass"], 0, 3, null, 0, function _inheritsLoose($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = $get, $l[2].prototype);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $mcall("create", Object, $p);
      $.state = 2;

    case 2:
      $.goto = 3;
      $set($l[1], "prototype", $p);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = $get, $l[1].prototype);
      $.state = 4;

    case 4:
      $.goto = 5;
      $set($p, "constructor", $l[1]);
      $.state = 5;

    case 5:
      $.goto = 7;
      $set($l[1], "__proto__", $l[2]);
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, null, $s$2], [2, null, $s$2], [2, null, $s$2], [2, null, $s$2], [2, null, $s$2], [2, null, $s$2], [16, null, $s$2], [16, null, $s$2]]),
    $m$2 = $M.fun("m$2", "aa", null, $m$0, [], 0, 3, "3:0-21:1", 1, function aa($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = /*#__PURE__*/($x.call = $m$3($))();
      $.state = 2;

    case 2:
      $lset($l, 1,
      /*A*/
      $p);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = /*#__PURE__*/($x.call = $m$7($))($l[1]);
      $.state = 4;

    case 4:
      $lset($l, 2,
      /*B*/
      $p);
      $.goto = 6;
      $brk();
      continue;

    case 5:
      $.goto = 6;
      return $unhandledA($.error);

    case 6:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "4:8-10:24", $s$3], [2, null, $s$3], [4, "13:8-19:24", $s$3], [2, null, $s$3], [36, "21:1-21:1", $s$3], [16, "21:1-21:1", $s$3], [16, "21:1-21:1", $s$3]]),
    $m$3 = $M.fun("m$3", null, null, $m$2, [], 0, 3, "5:4-10:24", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*A*/
      $m$4($));
      $.goto = 1;
      $p = ($x.call = $get, $l[1].prototype);
      $.state = 1;

    case 1:
      $lset($l, 2,
      /*_proto*/
      $p);
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $.goto = 3;
      $set($l[2], "method", $m$5($));
      $.state = 3;

    case 3:
      $.goto = 4;
      $brk();
      $.state = 4;

    case 4:
      $.goto = 5;
      $set($l[1], "smethod", $m$6($));
      $.state = 5;

    case 5:
      $.result = $l[1];
      $.goto = 7;
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, null, $s$4], [4, "5:4-7:16", $s$4], [2, null, $s$4], [4, "8:4-10:24", $s$4], [2, null, $s$4], [0, null, $s$4], [16, "10:24-10:24", $s$4], [16, "10:24-10:24", $s$4]]),
    $m$4 = $M.fun("m$4", "A", null, $m$3, [], 0, 1, null, 0, function A($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
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
}, null, null, 3, [[0, null, $s$5], [16, null, $s$5], [16, null, $s$5]]),
    $m$5 = $M.fun("m$5", "method", null, $m$3, [], 0, 1, "5:4-7:5", 1, function method($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.result = "from A";
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "6:6-6:22", $s$6], [0, "6:13-6:21", $s$6], [16, "7:5-7:5", $s$6], [16, "7:5-7:5", $s$6]]),
    $m$6 = $M.fun("m$6", "smethod", null, $m$3, [], 0, 1, "8:4-10:5", 1, function smethod($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.result = "static from A";
      $.goto = 3;
      continue;

    case 2:
      $.goto = 3;
      return $unhandledA($.error);

    case 3:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "9:6-9:29", $s$7], [0, "9:13-9:28", $s$7], [16, "10:5-10:5", $s$7], [16, "10:5-10:5", $s$7]]),
    $m$7 = $M.fun("m$7", null, null, $m$2, ["_A"], 0, 4, "14:4-19:24", 0, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 2,
      /*B*/
      $m$8($));
      $.goto = 1;
      ($x.call = $l[0][0][1])($l[2], $l[1]);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = $get, $l[2].prototype);
      $.state = 2;

    case 2:
      $lset($l, 3,
      /*_proto2*/
      $p);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $set($l[3], "method", $m$9($));
      $.state = 4;

    case 4:
      $.goto = 5;
      $brk();
      $.state = 5;

    case 5:
      $.goto = 6;
      $set($l[2], "smethod", $m$10($));
      $.state = 6;

    case 6:
      $.result = $l[2];
      $.goto = 8;
      continue;

    case 7:
      $.goto = 8;
      return $unhandled($.error);

    case 8:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[2, null, $s$8], [2, null, $s$8], [4, "14:4-16:16", $s$8], [2, null, $s$8], [4, "17:4-19:24", $s$8], [2, null, $s$8], [0, null, $s$8], [16, "19:24-19:24", $s$8], [16, "19:24-19:24", $s$8]]),
    $m$8 = $M.fun("m$8", "B", null, $m$7, [], 0, 1, null, 24, function B($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = $mcall("apply", $l[0][1], $.self, $.args);
      $.state = 1;

    case 1:
      $.result = $p;

      if ($.result) {
        $.state = 2;
      } else {
        $.goto = 3;
        continue;
      }

    case 2:
      $.goto = 5;
      continue;

    case 3:
      $.result = $.self;
      $.goto = 2;
      continue;

    case 4:
      $.goto = 5;
      return $unhandled($.error);

    case 5:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[2, null, $s$9], [0, null, $s$9], [0, null, $s$9], [0, null, $s$9], [16, null, $s$9], [16, null, $s$9]]),
    $m$9 = $M.fun("m$9", "method", null, $m$7, [], 0, 1, "14:4-16:5", 9, function method($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = $get, $l[0][1].prototype);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = ($x.call = $get, $p.method);
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = $mcall("call", $p, $.self);
      $.state = 4;

    case 4:
      $.goto = 5;
      return $awt($p);

    case 5:
      $.result = "from B " + $p;
      $.goto = 7;
      continue;

    case 6:
      $.goto = 7;
      return $unhandledA($.error);

    case 7:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "15:6-15:48", $s$10], [2, null, $s$10], [2, null, $s$10], [2, null, $s$10], [2, "15:26-15:46", $s$10], [0, "15:13-15:47", $s$10], [16, "16:5-16:5", $s$10], [16, "16:5-16:5", $s$10]]),
    $m$10 = $M.fun("m$10", "smethod", null, $m$7, [], 0, 1, "17:4-19:5", 9, function smethod($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = $get, $l[0][1].method);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $mcall("call", $p, $.self);
      $.state = 3;

    case 3:
      $.goto = 4;
      return $awt($p);

    case 4:
      $.result = "static from B " + $p;
      $.goto = 6;
      continue;

    case 5:
      $.goto = 6;
      return $unhandledA($.error);

    case 6:
      return $retA($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 3, [[4, "18:6-18:55", $s$11], [2, null, $s$11], [2, null, $s$11], [2, "18:33-18:53", $s$11], [0, "18:13-18:54", $s$11], [16, "19:5-19:5", $s$11], [16, "19:5-19:5", $s$11]]);

$M.moduleExports();