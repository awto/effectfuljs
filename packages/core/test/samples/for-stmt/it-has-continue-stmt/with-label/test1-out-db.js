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
        $.$.$3 = [1, 2, 3];
        $.$.$0 = 0;
        $.state = 1;

      case 1:
        if ($.$.$0 < 3) {
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          return $M.ret();
        }

      case 2:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 3;

      case 3:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 5;
          $p = ($M.context.call = eff)(d);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 5:
        if ($p) {
          $.goto = 7;
          continue;
        } else {
          $.state = 6;
        }

      case 6:
        if (t1) {
          $.goto = 4;
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.$.$1++;
        $.goto = 3;
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["5:4-5:10", "e", $s$2], [], ["8:10-8:16", "e", $s$2], [], [], [], [], [], []]);
$M.fun("m$2", "f2", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = [1, 2, 3];
        $.$.$0 = 0;
        $.state = 1;

      case 1:
        if ($.$.$0 < 3) {
          $.goto = 2;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          return $M.ret();
        }

      case 2:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 3;

      case 3:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 5;
          $p = ($M.context.call = eff)(d);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 5:
        if ($p) {
          $.goto = 8;
          continue;
        } else {
          $.state = 6;
        }

      case 6:
        $.goto = 7;
        $p = ($M.context.call = eff)(2);
        continue;

      case 7:
        if ($p) {
          $.goto = 4;
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.$.$1++;
        $.goto = 3;
        continue;

      case 9:
        return $M.ret($.value);

      case 10:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["18:4-18:10", "e", $s$3], [], ["21:10-21:16", "e", $s$3], [], [], ["22:10-22:16", "e", $s$3], [], [], [], []]);
$M.fun("m$3", "f3", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = [1, 2, 3];
        $.$.$0 = 0;
        $.state = 1;

      case 1:
        if ($.$.$0 < 3) {
          $.goto = 3;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          $.goto = 2;
          ($M.context.call = eff)($.$.$1);
          continue;
        }

      case 2:
        return $M.ret();

      case 3:
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 4;

      case 4:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 6;
          ($M.context.call = eff)(d);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.$.$0++;
        $.goto = 1;
        continue;

      case 6:
        $.$.$1++;

        if (t2) {
          $.goto = 5;
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.$.$1++;
        $.goto = 4;
        continue;

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["30:4-30:10", "e", $s$4], [], [], ["33:6-33:12", "e", $s$4], [], [], [], [], []]);
$M.fun("m$4", "f4", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$3 = [1, 2, 3];
        $.$.$1 = 0;
        $.$.$2 = $.$.$3.length;
        $.state = 1;

      case 1:
        if ($.$.$1 < $.$.$2) {
          d = $.$.$3[$.$.$1];
          $.goto = 2;
          ($M.context.call = eff)(d);
          continue;
        } else {
          return $M.ret();
        }

      case 2:
        $.$.$0++;

        if (t2) {
          $.state = 3;
        } else {
          $.state = 3;
        }

      case 3:
        $.$.$1++;
        $.goto = 1;
        continue;

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["45:4-45:10", "e", $s$5], [], [], [], []]);
$M.fun("m$5", "f5", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.state = 1;

      case 1:
        if (true) {
          $.goto = 4;
          ($M.context.call = eff)($.$.$0);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 3:
        return $M.ret();

      case 4:
        $.$.$0++;

        if (t2) {
          $.goto = 2;
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.$.$0--;
        $.goto = 1;
        continue;

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], ["54:4-54:10", "e", $s$6], ["58:2-58:8", "e", $s$6], [], [], [], [], []]);
module.exports = $M.exports();