var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  f1: "$0",
  f2: "$1",
  f3: "$2",
  f4: "$3",
  f5: "$4"
}, null, false],
    $s$2 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, $s$1, false],
    $s$3 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, $s$1, false],
    $s$4 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, $s$1, false],
    $s$5 = [{
  i: "$0",
  j: "$1",
  len: "$2",
  ref: "$3"
}, $s$1, false],
    $s$6 = [{
  j: "$0",
  len: "$1"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.f1($);
        $.$.$4 = $c.f5($);
        $.$.$3 = $c.f4($);
        $.$.$2 = $c.f3($);
        $.$.$1 = $c.f2($);
        return $M.ret();

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$1", "f1", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(1);
        continue;

      case 2:
        $.$.$3 = [1, 2, 3];
        $.goto = 3;
        $M.brk(2);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(3);
        continue;

      case 4:
        $.$.$0 = 0;
        $.state = 5;

      case 5:
        if ($.$.$0 < 3) {
          $.goto = 6;
          $M.brk(4);
          continue;
        } else {
          return $M.ret();
        }

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(5);
        continue;

      case 8:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 9;

      case 9:
        if ($.$.$1 < $.$.$2) {
          $.goto = 11;
          $M.brk(6);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.$.$0++;
        $.goto = 5;
        continue;

      case 11:
        d = $.$.$3[$.$.$1];
        $.goto = 12;
        $M.brk(7);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = eff)(d);
        continue;

      case 13:
        if ($p) {
          $.goto = 16;
          $M.brk(8);
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 15;
        $M.brk(9);
        continue;

      case 15:
        if (t1) {
          $.goto = 10;
          $M.brk(10);
          continue;
        } else {
          $.state = 16;
        }

      case 16:
        $.$.$1++;
        $.goto = 9;
        continue;

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:21", "s", $s$2], ["3:2-3:18", "s", $s$2], ["4:2-11:3", "s", $s$2], ["4:7-11:3", "s", $s$2], [], ["5:4-5:11", "s", $s$2], ["5:4-5:10", "e", $s$2], ["6:4-10:5", "s", $s$2], [], ["7:6-7:17", "s", $s$2], [], ["8:6-8:27", "s", $s$2], ["8:10-8:16", "e", $s$2], ["8:18-8:27", "s", $s$2], ["9:6-9:27", "s", $s$2], ["9:14-9:27", "s", $s$2], [], [], []]);
$M.fun("m$2", "f2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(11);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(12);
        continue;

      case 2:
        $.$.$3 = [1, 2, 3];
        $.goto = 3;
        $M.brk(13);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(14);
        continue;

      case 4:
        $.$.$0 = 0;
        $.state = 5;

      case 5:
        if ($.$.$0 < 3) {
          $.goto = 6;
          $M.brk(15);
          continue;
        } else {
          return $M.ret();
        }

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(16);
        continue;

      case 8:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 9;

      case 9:
        if ($.$.$1 < $.$.$2) {
          $.goto = 11;
          $M.brk(17);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.$.$0++;
        $.goto = 5;
        continue;

      case 11:
        d = $.$.$3[$.$.$1];
        $.goto = 12;
        $M.brk(18);
        continue;

      case 12:
        $.goto = 13;
        $p = ($M.context.call = eff)(d);
        continue;

      case 13:
        if ($p) {
          $.goto = 17;
          $M.brk(19);
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 15;
        $M.brk(20);
        continue;

      case 15:
        $.goto = 16;
        $p = ($M.context.call = eff)(2);
        continue;

      case 16:
        if ($p) {
          $.goto = 10;
          $M.brk(21);
          continue;
        } else {
          $.state = 17;
        }

      case 17:
        $.$.$1++;
        $.goto = 9;
        continue;

      case 18:
        return $M.ret($.value);

      case 19:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["15:2-15:21", "s", $s$3], ["16:2-16:18", "s", $s$3], ["17:2-24:3", "s", $s$3], ["17:7-24:3", "s", $s$3], [], ["18:4-18:11", "s", $s$3], ["18:4-18:10", "e", $s$3], ["19:4-23:5", "s", $s$3], [], ["20:6-20:17", "s", $s$3], [], ["21:6-21:27", "s", $s$3], ["21:10-21:16", "e", $s$3], ["21:18-21:27", "s", $s$3], ["22:6-22:31", "s", $s$3], ["22:10-22:16", "e", $s$3], ["22:18-22:31", "s", $s$3], [], [], []]);
$M.fun("m$3", "f3", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(22);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(23);
        continue;

      case 2:
        $.$.$3 = [1, 2, 3];
        $.goto = 3;
        $M.brk(24);
        continue;

      case 3:
        $.goto = 4;
        $M.brk(25);
        continue;

      case 4:
        $.$.$0 = 0;
        $.state = 5;

      case 5:
        if ($.$.$0 < 3) {
          $.goto = 8;
          $M.brk(26);
          continue;
        } else {
          $.goto = 6;
          $M.brk(33);
          continue;
        }

      case 6:
        $.goto = 7;
        ($M.context.call = eff)($.$.$1);
        continue;

      case 7:
        return $M.ret();

      case 8:
        $.goto = 9;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $M.brk(27);
        continue;

      case 10:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 11;

      case 11:
        if ($.$.$1 < $.$.$2) {
          $.goto = 13;
          $M.brk(28);
          continue;
        } else {
          $.state = 12;
        }

      case 12:
        $.$.$0++;
        $.goto = 5;
        continue;

      case 13:
        d = $.$.$3[$.$.$1];
        $.goto = 14;
        $M.brk(29);
        continue;

      case 14:
        $.goto = 15;
        ($M.context.call = eff)(d);
        continue;

      case 15:
        $.goto = 16;
        $M.brk(30);
        continue;

      case 16:
        $.$.$1++;
        $.goto = 17;
        $M.brk(31);
        continue;

      case 17:
        if (t2) {
          $.goto = 12;
          $M.brk(32);
          continue;
        } else {
          $.state = 18;
        }

      case 18:
        $.$.$1++;
        $.goto = 11;
        continue;

      case 19:
        return $M.ret($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["27:2-27:21", "s", $s$4], ["28:2-28:18", "s", $s$4], ["29:2-37:3", "s", $s$4], ["29:7-37:3", "s", $s$4], [], ["30:4-30:11", "s", $s$4], ["38:2-38:8", "e", $s$4], [], ["30:4-30:10", "e", $s$4], ["31:4-36:5", "s", $s$4], [], ["32:6-32:17", "s", $s$4], [], ["33:6-33:13", "s", $s$4], ["33:6-33:12", "e", $s$4], ["34:6-34:10", "s", $s$4], ["35:6-35:27", "s", $s$4], ["35:14-35:27", "s", $s$4], [], [], []]);
$M.fun("m$4", "f4", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(34);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(35);
        continue;

      case 2:
        $.$.$3 = [1, 2, 3];
        $.goto = 3;
        $M.brk(36);
        continue;

      case 3:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 4;

      case 4:
        if ($.$.$1 < $.$.$2) {
          $.goto = 5;
          $M.brk(37);
          continue;
        } else {
          return $M.ret();
        }

      case 5:
        d = $.$.$3[$.$.$1];
        $.goto = 6;
        $M.brk(38);
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = eff)(d);
        continue;

      case 7:
        $.goto = 8;
        $M.brk(39);
        continue;

      case 8:
        $.$.$0++;
        $.goto = 9;
        $M.brk(40);
        continue;

      case 9:
        if (t2) {
          $.goto = 10;
          $M.brk(41);
          continue;
        } else {
          $.state = 10;
        }

      case 10:
        $.$.$1++;
        $.goto = 4;
        continue;

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["41:2-41:21", "s", $s$5], ["42:2-42:18", "s", $s$5], ["43:2-48:3", "s", $s$5], [], ["44:4-44:15", "s", $s$5], ["45:4-45:11", "s", $s$5], ["45:4-45:10", "e", $s$5], ["46:4-46:8", "s", $s$5], ["47:4-47:21", "s", $s$5], ["47:12-47:21", "s", $s$5], [], [], []]);
$M.fun("m$5", "f5", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(42);
        continue;

      case 1:
        $.goto = 2;
        $M.brk(43);
        continue;

      case 2:
        $.$.$0 = 0;
        $.state = 3;

      case 3:
        if (true) {
          $.goto = 7;
          $M.brk(44);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.goto = 5;
        $M.brk(48);
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 6:
        return $M.ret();

      case 7:
        $.goto = 8;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(45);
        continue;

      case 9:
        $.$.$0++;
        $.goto = 10;
        $M.brk(46);
        continue;

      case 10:
        if (t2) {
          $.goto = 4;
          $M.brk(47);
          continue;
        } else {
          $.state = 11;
        }

      case 11:
        $.$.$0--;
        $.goto = 3;
        continue;

      case 12:
        return $M.ret($.value);

      case 13:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["52:2-52:13", "s", $s$6], ["53:2-57:3", "s", $s$6], [], ["54:4-54:11", "s", $s$6], ["58:2-58:9", "s", $s$6], ["58:2-58:8", "e", $s$6], [], ["54:4-54:10", "e", $s$6], ["55:4-55:8", "s", $s$6], ["56:4-56:18", "s", $s$6], ["56:12-56:18", "s", $s$6], [], [], []]);
module.exports = $M.exports();