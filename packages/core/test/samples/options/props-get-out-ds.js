var $M = require("@effectful/debugger"),
    $context = $M.context,
    $ret = $M.ret,
    $unhandled = $M.unhandled,
    $brk = $M.brk,
    $lset = $M.lset,
    $mcall = $M.mcall,
    $get = $M.get,
    $set = $M.set,
    $gset = $M.gset,
    $del = $M.del,
    $m = $M.module("file.js", null, typeof module === "undefined" ? null : module, null, "$", {
  __webpack_require__: typeof __webpack_require__ !== "undefined" && __webpack_require__
}, null),
    $s$1 = [{
  tuza: [1, "1:9-1:13"]
}, null, 0],
    $s$2 = [{
  av: [1, "2:6-2:8"],
  tuzb: [2, "4:11-4:15"]
}, $s$1, 1],
    $s$3 = [{
  b: [1, "5:8-5:9"],
  mv: [2, "6:6-6:8"],
  v: [3, "12:10-12:11"]
}, $s$2, 2],
    $m$0 = $M.fun("m$0", "file.js", null, null, [], 0, 2, "1:0-24:0", 32, function file_js($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 1,
      /*tuza*/
      $m$1($));
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
}, null, null, 0, [[0, "1:0-23:1", $s$1], [16, "24:0-24:0", $s$1], [16, "24:0-24:0", $s$1]]),
    $m$1 = $M.fun("m$1", "tuza", null, $m$0, [], 0, 3, "1:0-23:1", 0, function tuza($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $lset($l, 2,
      /*tuzb*/
      $m$2($));
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*av*/
      1);
      $.goto = 3;
      $brk();
      continue;

    case 2:
      $.goto = 3;
      return $unhandled($.error);

    case 3:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 1, [[4, "2:2-2:13", $s$2], [36, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2], [16, "23:1-23:1", $s$2]]),
    $m$2 = $M.fun("m$2", "tuzb", null, $m$1, [], 0, 16, "4:2-22:3", 0, function tuzb($, $l, $p) {
  for (;;) switch ($.state = $.goto) {
    case 0:
      $.goto = 1;
      $brk();
      $.state = 1;

    case 1:
      $lset($l, 1,
      /*b*/
      2);
      $.goto = 2;
      $brk();
      $.state = 2;

    case 2:
      $lset($l, 2,
      /*mv*/
      3);
      $.goto = 3;
      $brk();
      $.state = 3;

    case 3:
      $.goto = 4;
      $p = ($context.call = $l[1])();
      $.state = 4;

    case 4:
      $.goto = 5;
      ($context.call = che)($lset($l[0], 1,
      /*av*/
      $p));
      $.state = 5;

    case 5:
      $.goto = 6;
      $brk();
      $.state = 6;

    case 6:
      $.goto = 7;
      ($context.call = me)();
      $.state = 7;

    case 7:
      $.goto = 8;
      $brk();
      $.state = 8;

    case 8:
      $.goto = 9;
      $p = $get(c, "b");
      $.state = 9;

    case 9:
      $l[4] = $p;
      $.goto = 10;
      $p = $get($l[4], "a");
      $.state = 10;

    case 10:
      $l[5] = $p;
      $.goto = 11;
      $set($l[4], "a", $l[5] + 1);
      $.state = 11;

    case 11:
      $.goto = 12;
      $p = $get($l[1], "a");
      $.state = 12;

    case 12:
      $.goto = 13;
      $p = $get($p, "d");
      $.state = 13;

    case 13:
      $l[7] = $p;
      $.goto = 14;
      $p = $get($l[7], $l[6]);
      $.state = 14;

    case 14:
      $.goto = 15;
      $p = $set($l[7], $l[6], $p - 1);
      $.state = 15;

    case 15:
      $lset($l, 3,
      /*v*/
      $p);
      $.goto = 16;
      $brk();
      $.state = 16;

    case 16:
      $gset(global, "c", $l[3]);
      $.goto = 17;
      $brk();
      $.state = 17;

    case 17:
      $.goto = 18;
      ($context.call = be)();
      $.state = 18;

    case 18:
      $.goto = 19;
      $brk();
      $.state = 19;

    case 19:
      if (process === 1000) {
        $.state = 20;
      } else {
        $.goto = 43;
        continue;
      }

    case 20:
      $.goto = 21;
      $p = ($context.call = c_fun)("a");
      $.state = 21;

    case 21:
      $.goto = 22;
      $p = $mcall($p, process, "b");
      $.state = 22;

    case 22:
      $l[8] = $p;
      $.goto = 23;
      $p = ($context.call = d_fun)("c");
      $.state = 23;

    case 23:
      $l[9] = $p;
      $.goto = 24;
      $p = $get(process, "D");
      $.state = 24;

    case 24:
      $.goto = 25;
      $p = new ($context.call = $p)("e");
      $.state = 25;

    case 25:
      $.goto = 26;
      $p = ($context.call = $l[8])($l[9], "d", $p);
      $.state = 26;

    case 26:
      $.goto = 27;
      $p = ($context.call = a_fun)($p);
      $.state = 27;

    case 27:
      $l[10] = $p;
      $.state = 28;

    case 28:
      $gset(global, "c", $l[10]);
      $.goto = 29;
      $brk();
      $.state = 29;

    case 29:
      $.goto = 30;
      $p = $get($l[0][1], "m");
      $.state = 30;

    case 30:
      $l[11] = $p;
      $.goto = 31;
      $p = $get($l[1], "a");
      $.state = 31;

    case 31:
      $l[12] = $p;
      $.goto = 32;
      $p = $get($l[12], $l[11]);
      $.state = 32;

    case 32:
      $l[13] = $p;
      $.goto = 33;
      $set($l[12], $l[11], $l[13] + 1);
      $.state = 33;

    case 33:
      if ($l[13]) {
        $.state = 34;
      } else {
        $.goto = 36;
        continue;
      }

    case 34:
      $.goto = 35;
      $brk();
      $.state = 35;

    case 35:
      $.goto = 36;
      $del($l[1], $l[0][1]);
      $.state = 36;

    case 36:
      $.goto = 37;
      $brk();
      $.state = 37;

    case 37:
      $.goto = 38;
      $p = ($context.call = $l[1])();
      $.state = 38;

    case 38:
      $l[14] = $p;
      $.goto = 39;
      $p = ($context.call = $l[0][1])();
      $.state = 39;

    case 39:
      $l[15] = $p;
      $.goto = 40;
      $p = $get($l[0][1], "z");
      $.state = 40;

    case 40:
      $.goto = 41;
      $p = $del($p, 2 + 2);
      $.state = 41;

    case 41:
      $.goto = 42;
      $del($l[14], $l[15] + $p);
      $.state = 42;

    case 42:
      $.goto = 45;
      $brk();
      continue;

    case 43:
      $l[10] = 2;
      $.goto = 28;
      continue;

    case 44:
      $.goto = 45;
      return $unhandled($.error);

    case 45:
      return $ret($.result);

    default:
      throw new Error("Invalid state");
  }
}, null, null, 2, [[4, "5:4-6:13", $s$3], [4, "6:6-6:12", $s$3], [4, "7:4-7:20", $s$3], [2, "7:14-7:17", $s$3], [2, "7:4-7:19", $s$3], [4, "11:4-11:9", $s$3], [2, "11:4-11:8", $s$3], [4, "12:4-12:31", $s$3], [2, "12:22-12:25", $s$3], [0, null, $s$3], [2, "12:22-12:29", $s$3], [2, "12:16-12:19", $s$3], [2, "12:16-12:21", $s$3], [0, null, $s$3], [2, "12:14-12:30", $s$3], [4, "13:4-13:10", $s$3], [4, "14:4-14:9", $s$3], [2, "14:4-14:8", $s$3], [4, "15:4-18:12", $s$3], [0, null, $s$3], [2, "17:24-17:34", $s$3], [2, "17:16-17:40", $s$3], [2, "17:41-17:51", $s$3], [2, "17:62-17:71", $s$3], [2, "17:58-17:76", $s$3], [2, "17:16-17:77", $s$3], [2, "17:10-17:78", $s$3], [0, null, $s$3], [4, "19:4-19:34", $s$3], [2, "19:12-19:16", $s$3], [2, "19:8-19:11", $s$3], [0, null, $s$3], [2, "19:8-19:19", $s$3], [0, null, $s$3], [4, "19:21-19:34", $s$3], [2, "19:21-19:33", $s$3], [4, "21:4-21:42", $s$3], [2, "21:11-21:14", $s$3], [2, "21:15-21:19", $s$3], [2, "21:29-21:33", $s$3], [2, "21:22-21:40", $s$3], [2, "21:4-21:41", $s$3], [36, "22:3-22:3", $s$3], [0, "18:10-18:11", $s$3], [16, "22:3-22:3", $s$3], [16, "22:3-22:3", $s$3]]);

$M.moduleExports();