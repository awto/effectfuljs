var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  Z: "$0",
  _getRequireWildcardCache: "$1",
  _interopRequireWildcard: "$2",
  a: "$3"
}, null, false],
    $s$2 = [{
  cache: "$0"
}, $s$1, false],
    $s$3 = [{
  obj: "$0",
  cache: "$1",
  newObj: "$2",
  hasPropertyDescriptor: "$3",
  key: "$4",
  desc: "$5"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$1 = $c._getRequireWildcardCache($);
        $.$.$3 = $c.a($);
        $.$.$2 = $c._interopRequireWildcard($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $p = $M.evalDir("@effectful/generators");
        continue;

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$.$2)($p);
        continue;

      case 3:
        $.$.$0 = $p;
        return $M.ret();

      case 4:
        return $M.ret($.value);

      case 5:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:43", "s", $s$1], [null, "e", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "_getRequireWildcardCache", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(1);
        continue;

      case 1:
        if (typeof WeakMap !== "function") {
          $.goto = 7;
          $M.brk(2);
          continue;
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $M.brk(3);
        continue;

      case 3:
        $.goto = 4;
        $p = new ($M.context.call = WeakMap)();
        continue;

      case 4:
        $.$.$0 = $p;
        $.goto = 5;
        $M.brk(4);
        continue;

      case 5:
        $.$$.$.$1 = $c.f($);
        $.goto = 6;
        $M.brk(6);
        continue;

      case 6:
        return $M.ret($.$.$0);

      case 7:
        return $M.ret(null);

      case 8:
        return $M.ret($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$2], [null, "s", $s$2], [null, "s", $s$2], [null, "e", $s$2], [null, "s", $s$2], [null, "s", $s$2], [], [], [], []]);
$M.fun("m$2", null, "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(5);
        continue;

      case 1:
        return $M.ret($.$$.$.$0);

      case 2:
        return $M.ret($.value);

      case 3:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$2], [], [], []]);
$M.fun("m$3", "_interopRequireWildcard", "m$0", ["obj"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(7);
        continue;

      case 1:
        $0 = $.$.$0;

        if ($0) {
          $0 = $.$.$0.__esModule;
          $.state = 2;
        } else {
          $.state = 2;
        }

      case 2:
        if ($0) {
          $.goto = 35;
          $M.brk(8);
          continue;
        } else {
          $.state = 3;
        }

      case 3:
        $.goto = 4;
        $M.brk(9);
        continue;

      case 4:
        $.goto = 5;
        $p = ($M.context.call = $.$$.$.$1)();
        continue;

      case 5:
        $.$.$1 = $p;
        $.goto = 6;
        $M.brk(10);
        continue;

      case 6:
        $.$.$6 = $.$.$1;

        if ($.$.$6) {
          $.goto = 34;
          $p = ($M.context.call = $.$.$1.has).dbg$call($.$.$1, $.$.$0);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        if ($.$.$6) {
          $.goto = 32;
          $M.brk(11);
          continue;
        } else {
          $.state = 8;
        }

      case 8:
        $.goto = 9;
        $M.brk(12);
        continue;

      case 9:
        $.$.$2 = {};
        $.goto = 10;
        $M.brk(13);
        continue;

      case 10:
        if ($.$.$0 != null) {
          $.goto = 17;
          $M.brk(14);
          continue;
        } else {
          $.state = 11;
        }

      case 11:
        $.goto = 12;
        $M.brk(20);
        continue;

      case 12:
        $.$.$2.default = $.$.$0;
        $.goto = 13;
        $M.brk(21);
        continue;

      case 13:
        if ($.$.$1) {
          $.goto = 16;
          $M.brk(22);
          continue;
        } else {
          $.state = 14;
        }

      case 14:
        $.goto = 15;
        $M.brk(23);
        continue;

      case 15:
        return $M.ret($.$.$2);

      case 16:
        $.goto = 14;
        ($M.context.call = $.$.$1.set).dbg$call($.$.$1, $.$.$0, $.$.$2);
        continue;

      case 17:
        $0 = Object.defineProperty;

        if ($0) {
          $0 = Object.getOwnPropertyDescriptor;
          $.state = 18;
        } else {
          $.state = 18;
        }

      case 18:
        $.$.$3 = $0;
        $.$.$6 = $M.forInIterator($.$.$0);
        $.state = 19;

      case 19:
        $0 = $.$.$6.next();

        if ($0.done) {
          $.goto = 11;
          continue;
        } else {
          $.$.$4 = $0.value;
          $.goto = 20;
          $M.brk(15);
          continue;
        }

      case 20:
        $0 = Object.prototype.hasOwnProperty;
        $.goto = 21;
        $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0, $.$.$4);
        continue;

      case 21:
        if ($p) {
          $.goto = 23;
          $M.brk(16);
          continue;
        } else {
          $.state = 22;
        }

      case 22:
        $.goto = 19;
        continue;

      case 23:
        if ($.$.$3) {
          $.goto = 31;
          $p = ($M.context.call = Object.getOwnPropertyDescriptor).dbg$call(Object, $.$.$0, $.$.$4);
          continue;
        } else {
          $.$.$7 = null;
          $.state = 24;
        }

      case 24:
        $.$.$5 = $.$.$7;
        $.goto = 25;
        $M.brk(17);
        continue;

      case 25:
        $0 = $.$.$5;

        if ($0) {
          $0 = $.$.$5.get;

          if ($0) {
            $.goto = 30;
            continue;
          } else {
            $0 = $.$.$5.set;
            $.goto = 30;
            continue;
          }
        } else {
          $.state = 26;
        }

      case 26:
        if ($0) {
          $.goto = 29;
          $M.brk(18);
          continue;
        } else {
          $.goto = 27;
          $M.brk(19);
          continue;
        }

      case 27:
        $.$.$2[$.$.$4] = $.$.$0[$.$.$4];
        $.state = 28;

      case 28:
        $.goto = 22;
        continue;

      case 29:
        $.goto = 28;
        ($M.context.call = Object.defineProperty).dbg$call(Object, $.$.$2, $.$.$4, $.$.$5);
        continue;

      case 30:
        $.goto = 26;
        continue;

      case 31:
        $.$.$7 = $p;
        $.goto = 24;
        continue;

      case 32:
        $.goto = 33;
        $p = ($M.context.call = $.$.$1.get).dbg$call($.$.$1, $.$.$0);
        continue;

      case 33:
        return $M.ret($p);

      case 34:
        $.$.$6 = $p;
        $.goto = 7;
        continue;

      case 35:
        return $M.ret($.$.$0);

      case 36:
        return $M.ret($.value);

      case 37:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$3], [], [null, "s", $s$3], [null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [], [null, "e", $s$3], [], [], [null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [], [null, "e", $s$3], [null, "s", $s$3], [], [null, "s", $s$3], [], [], [null, "e", $s$3], [], [], [null, "e", $s$3], [], [], [], [], []]);
$M.fun("m$4", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(24);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(25);
        continue;

      case 3:
        $.goto = 4;
        $M.yld(2);
        continue;

      case 4:
        return $M.retG();

      case 5:
        return $M.retG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["4:2-4:10", "s", $s$1], [null, null, null], ["5:2-5:10", "s", $s$1], [null, null, null], [], [], []]);
module.exports = $M.exports();