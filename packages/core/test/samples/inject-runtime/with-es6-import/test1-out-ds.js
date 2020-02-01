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
        $M.lset($.$$.$, "_getRequireWildcardCache", $c.f($));
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
          $.goto = 38;
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
        $0 = $.$.$0 === null;

        if ($0) {
          $.state = 5;
        } else {
          $0 = typeof $.$.$0 !== "object";

          if ($0) {
            $0 = typeof $.$.$0 !== "function";
            $.goto = 6;
            continue;
          } else {
            $.goto = 6;
            continue;
          }
        }

      case 5:
        if ($0) {
          $.goto = 37;
          $M.brk(10);
          continue;
        } else {
          $.goto = 7;
          continue;
        }

      case 6:
        $.goto = 5;
        continue;

      case 7:
        $.goto = 8;
        $M.brk(11);
        continue;

      case 8:
        $.goto = 9;
        $p = ($M.context.call = $.$$.$.$1)();
        continue;

      case 9:
        $.$.$1 = $p;
        $.goto = 10;
        $M.brk(12);
        continue;

      case 10:
        $.$.$6 = $.$.$1;

        if ($.$.$6) {
          $.goto = 36;
          $p = $M.mcall("has", $.$.$1, $.$.$0);
          continue;
        } else {
          $.state = 11;
        }

      case 11:
        if ($.$.$6) {
          $.goto = 34;
          $M.brk(13);
          continue;
        } else {
          $.state = 12;
        }

      case 12:
        $.goto = 13;
        $M.brk(14);
        continue;

      case 13:
        $.$.$2 = {};
        $.goto = 14;
        $M.brk(15);
        continue;

      case 14:
        $0 = Object.defineProperty;

        if ($0) {
          $0 = Object.getOwnPropertyDescriptor;
          $.state = 15;
        } else {
          $.state = 15;
        }

      case 15:
        $.$.$3 = $0;
        $.$.$6 = $M.forInIterator($.$.$0);
        $.state = 16;

      case 16:
        $0 = $.$.$6.next();

        if ($0.done) {
          $.goto = 29;
          $M.brk(21);
          continue;
        } else {
          $.$.$4 = $0.value;
          $.goto = 17;
          $M.brk(16);
          continue;
        }

      case 17:
        $.goto = 18;
        $p = $M.mcall("call", Object.prototype.hasOwnProperty, $.$.$0, $.$.$4);
        continue;

      case 18:
        if ($p) {
          $.goto = 20;
          $M.brk(17);
          continue;
        } else {
          $.state = 19;
        }

      case 19:
        $.goto = 16;
        continue;

      case 20:
        if ($.$.$3) {
          $.goto = 28;
          $p = $M.mcall("getOwnPropertyDescriptor", Object, $.$.$0, $.$.$4);
          continue;
        } else {
          $.$.$7 = null;
          $.state = 21;
        }

      case 21:
        $.$.$5 = $.$.$7;
        $.goto = 22;
        $M.brk(18);
        continue;

      case 22:
        $0 = $.$.$5;

        if ($0) {
          $0 = $.$.$5.get;

          if ($0) {
            $.goto = 27;
            continue;
          } else {
            $0 = $.$.$5.set;
            $.goto = 27;
            continue;
          }
        } else {
          $.state = 23;
        }

      case 23:
        if ($0) {
          $.goto = 26;
          $M.brk(19);
          continue;
        } else {
          $.goto = 24;
          $M.brk(20);
          continue;
        }

      case 24:
        $M.set($.$.$2, $.$.$4, $.$.$0[$.$.$4]);
        $.state = 25;

      case 25:
        $.goto = 19;
        continue;

      case 26:
        $.goto = 25;
        $M.mcall("defineProperty", Object, $.$.$2, $.$.$4, $.$.$5);
        continue;

      case 27:
        $.goto = 23;
        continue;

      case 28:
        $.$.$7 = $p;
        $.goto = 21;
        continue;

      case 29:
        $M.set($.$.$2, "default", $.$.$0);
        $.goto = 30;
        $M.brk(22);
        continue;

      case 30:
        if ($.$.$1) {
          $.goto = 33;
          $M.brk(23);
          continue;
        } else {
          $.state = 31;
        }

      case 31:
        $.goto = 32;
        $M.brk(24);
        continue;

      case 32:
        return $M.ret($.$.$2);

      case 33:
        $.goto = 31;
        $M.mcall("set", $.$.$1, $.$.$0, $.$.$2);
        continue;

      case 34:
        $.goto = 35;
        $p = $M.mcall("get", $.$.$1, $.$.$0);
        continue;

      case 35:
        return $M.ret($p);

      case 36:
        $.$.$6 = $p;
        $.goto = 11;
        continue;

      case 37:
        return $M.ret({
          default: $.$.$0
        });

      case 38:
        return $M.ret($.$.$0);

      case 39:
        return $M.ret($.value);

      case 40:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "s", $s$3], [], [null, "s", $s$3], [null, "s", $s$3], [], [null, "s", $s$3], [], [null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [], [], [null, "s", $s$3], [null, "e", $s$3], [null, "s", $s$3], [], [null, "e", $s$3], [null, "s", $s$3], [], [null, "s", $s$3], [], [], [null, "e", $s$3], [], [], [null, "s", $s$3], [null, "s", $s$3], [null, "s", $s$3], [], [null, "e", $s$3], [null, "e", $s$3], [], [], [], [], [], []]);
$M.fun("m$4", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.brk(25);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(1);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(26);
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