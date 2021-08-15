var $M = require("@effectful/debugger"),
    $x = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $mcall = $M.mcall,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  a1: [1, "3:9-3:11"],
  a2: [2, "14:9-14:11"],
  a3: [3, "26:9-26:11"],
  a4: [4, "37:9-37:11"],
  a5: [5, "46:9-46:11"],
  a6: [6, "55:9-55:11"]
}, null, 0],
    $s$2 = [{
  a: [1, "3:12-3:13"],
  b: [2, "3:15-3:16"]
}, $s$1, 1],
    $s$3 = [{
  a: [1, "14:12-14:13"],
  b: [2, "14:15-14:16"]
}, $s$1, 1],
    $s$4 = [{
  a: [1, "26:12-26:13"],
  b: [2, "26:15-26:16"]
}, $s$1, 1],
    $s$5 = [{}, $s$1, 1],
    $s$6 = [{}, $s$1, 1],
    $s$7 = [{}, $s$1, 1],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 7, "1:0-61:0", 160, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = $m$1($);
      $l[2] = $m$2($);
      $l[3] = $m$3($);
      $l[4] = $m$4($);
      $l[5] = $m$5($);
      $l[6] = $m$6($);
      $.goto = 1;
      $mcall("option", M, {
        callProtocol: "apply"
      });
      $.state = 1;

    case 1:
      $.goto = 2;
      $mcall("option", M, {
        callProtocol: "call"
      });
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        callProtocol: false
      });
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("option", M, {
        newProtocol: "method"
      });
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("option", M, {
        newProtocol: "op"
      });
      $.state = 5;

    case 5:
      $.goto = 7;
      $mcall("option", M, {
        newProtocol: false
      });
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 0, [[2, "1:0-1:35", $s$1], [2, "12:0-12:34", $s$1], [2, "24:0-24:33", $s$1], [2, "35:0-35:35", $s$1], [2, "44:0-44:31", $s$1], [2, "53:0-53:32", $s$1], [16, "61:0-61:0", $s$1], [16, "61:0-61:0", $s$1]]),
    $m$1 = $M.fun("m$1", "a1", null, $m$0, ["a", "b"], 0, 3, "3:0-10:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $p = ($x.call = eff)($l[1]);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = $mcall("eff", $l[1], $p);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("eff", $p, d);
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("option", M, {
        callName: "APPLY"
      });
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("eff", $l[1].b, d);
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("eff", [$l[1].b], d);
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("eff", {
        a: $l[1]
      }, d);
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = new ($x.call = A)({
        a: $l[1]
      });
      $.state = 8;

    case 8:
      $.goto = 10;
      $mcall("eff", $p, d);
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "4:8-4:14", $s$2], [2, "4:2-4:15", $s$2], [2, "4:2-4:22", $s$2], [2, "5:2-5:33", $s$2], [2, "6:2-6:12", $s$2], [2, "7:2-7:14", $s$2], [2, "8:3-8:15", $s$2], [2, "9:2-9:14", $s$2], [2, "9:2-9:21", $s$2], [16, "10:1-10:1", $s$2], [16, "10:1-10:1", $s$2]]),
    $m$2 = $M.fun("m$2", "a2", null, $m$0, ["a", "b"], 0, 3, "14:0-22:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($x.call = eff)($l[1]);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)($l[1]);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $mcall("eff", $l[1], $p);
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("eff", $p, d);
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("option", M, {
        callName: "CALL"
      });
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("eff", $l[1].b, d);
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("eff", [$l[1].b], d);
      $.state = 7;

    case 7:
      $.goto = 8;
      $mcall("eff", {
        a: $l[1]
      }, d);
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = new ($x.call = A)({
        a: $l[1]
      });
      $.state = 9;

    case 9:
      $.goto = 11;
      $mcall("eff", $p, d);
      continue;

    case 10:
      $.goto = 11;
      return $unhandled($.error);

    case 11:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "15:2-15:8", $s$3], [2, "16:8-16:14", $s$3], [2, "16:2-16:15", $s$3], [2, "16:2-16:22", $s$3], [2, "17:2-17:32", $s$3], [2, "18:2-18:12", $s$3], [2, "19:2-19:14", $s$3], [2, "20:3-20:15", $s$3], [2, "21:2-21:14", $s$3], [2, "21:2-21:21", $s$3], [16, "22:1-22:1", $s$3], [16, "22:1-22:1", $s$3]]),
    $m$3 = $M.fun("m$3", "a3", null, $m$0, ["a", "b"], 0, 3, "26:0-33:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      ($x.call = eff)($l[1]);
      $.state = 1;

    case 1:
      $.goto = 2;
      $p = ($x.call = eff)($l[1]);
      $.state = 2;

    case 2:
      $.goto = 3;
      $p = $mcall("eff", $l[1], $p);
      $.state = 3;

    case 3:
      $.goto = 4;
      $mcall("eff", $p, d);
      $.state = 4;

    case 4:
      $.goto = 5;
      $mcall("eff", $l[1].b, d);
      $.state = 5;

    case 5:
      $.goto = 6;
      $mcall("eff", [$l[1].b], d);
      $.state = 6;

    case 6:
      $.goto = 7;
      $mcall("eff", {
        a: $l[1]
      }, d);
      $.state = 7;

    case 7:
      $.goto = 8;
      $p = new ($x.call = A)({
        a: $l[1]
      });
      $.state = 8;

    case 8:
      $.goto = 10;
      $mcall("eff", $p, d);
      continue;

    case 9:
      $.goto = 10;
      return $unhandled($.error);

    case 10:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "27:2-27:8", $s$4], [2, "28:8-28:14", $s$4], [2, "28:2-28:15", $s$4], [2, "28:2-28:22", $s$4], [2, "29:2-29:12", $s$4], [2, "30:2-30:14", $s$4], [2, "31:3-31:15", $s$4], [2, "32:2-32:14", $s$4], [2, "32:2-32:21", $s$4], [16, "33:1-33:1", $s$4], [16, "33:1-33:1", $s$4]]),
    $m$4 = $M.fun("m$4", "a4", null, $m$0, [], 0, 2, "37:0-42:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = B.B;
      $.goto = 1;
      $p = new ($x.call = A)(a);
      $.state = 1;

    case 1:
      $.goto = 2;
      new ($x.call = $l[1])($p);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        newName: "NEW"
      });
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)();
      $.state = 4;

    case 4:
      $.goto = 5;
      new ($x.call = $p.Z)(b);
      $.state = 5;

    case 5:
      $.goto = 7;
      new ($x.call = {
        a: a
      }.a)();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "38:10-38:18", $s$5], [2, "38:2-38:19", $s$5], [2, "39:2-39:30", $s$5], [2, "40:7-40:12", $s$5], [2, "40:2-40:18", $s$5], [2, "41:2-41:15", $s$5], [16, "42:1-42:1", $s$5], [16, "42:1-42:1", $s$5]]),
    $m$5 = $M.fun("m$5", "a5", null, $m$0, [], 0, 2, "46:0-51:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = B.B;
      $.goto = 1;
      $p = new ($x.call = A)(a);
      $.state = 1;

    case 1:
      $.goto = 2;
      new ($x.call = $l[1])($p);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        newName: "NEW"
      });
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)();
      $.state = 4;

    case 4:
      $.goto = 5;
      new ($x.call = $p.Z)(b);
      $.state = 5;

    case 5:
      $.goto = 7;
      new ($x.call = {
        a: a
      }.a)();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "47:10-47:18", $s$6], [2, "47:2-47:19", $s$6], [2, "48:2-48:30", $s$6], [2, "49:7-49:12", $s$6], [2, "49:2-49:18", $s$6], [2, "50:2-50:15", $s$6], [16, "51:1-51:1", $s$6], [16, "51:1-51:1", $s$6]]),
    $m$6 = $M.fun("m$6", "a6", null, $m$0, [], 0, 2, "55:0-60:1", 128, function ($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $l[1] = B.B;
      $.goto = 1;
      $p = new ($x.call = A)(a);
      $.state = 1;

    case 1:
      $.goto = 2;
      new ($x.call = $l[1])($p);
      $.state = 2;

    case 2:
      $.goto = 3;
      $mcall("option", M, {
        newName: "NEW"
      });
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($x.call = eff)();
      $.state = 4;

    case 4:
      $.goto = 5;
      new ($x.call = $p.Z)(b);
      $.state = 5;

    case 5:
      $.goto = 7;
      new ($x.call = {
        a: a
      }.a)();
      continue;

    case 6:
      $.goto = 7;
      return $unhandled($.error);

    case 7:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[2, "56:10-56:18", $s$7], [2, "56:2-56:19", $s$7], [2, "57:2-57:30", $s$7], [2, "58:7-58:12", $s$7], [2, "58:2-58:18", $s$7], [2, "59:2-59:15", $s$7], [16, "60:1-60:1", $s$7], [16, "60:1-60:1", $s$7]]);

$M.moduleExports();