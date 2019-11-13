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
        $p = $M.evalDir("@effectful/generators");
        continue;

      case 1:
        $.goto = 2;
        $p = ($M.context.call = $.$.$2)($p);
        continue;

      case 2:
        $.$.$0 = $p;
        return $M.ret();

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, "e", $s$1], [null, "e", $s$1], [], [], []]);
$M.fun("m$1", "_getRequireWildcardCache", "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        if (typeof WeakMap !== "function") {
          return $M.ret(null);
        } else {
          $.state = 1;
        }

      case 1:
        $.goto = 2;
        $p = new ($M.context.call = WeakMap)();
        continue;

      case 2:
        $.$.$0 = $p;
        $.$$.$.$1 = $c.f($);
        return $M.ret($.$.$0);

      case 3:
        return $M.ret($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [null, "e", $s$2], [], [], []]);
$M.fun("m$2", null, "m$1", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        return $M.ret($.$$.$.$0);

      case 1:
        return $M.ret($.value);

      case 2:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], []]);
$M.fun("m$3", "_interopRequireWildcard", "m$0", ["obj"], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $0 = $.$.$0;

        if ($0) {
          $0 = $.$.$0.__esModule;
          $.state = 1;
        } else {
          $.state = 1;
        }

      case 1:
        if ($0) {
          return $M.ret($.$.$0);
        } else {
          $.state = 2;
        }

      case 2:
        $.goto = 3;
        $p = ($M.context.call = $.$$.$.$1)();
        continue;

      case 3:
        $.$.$1 = $p;
        $.$.$6 = $.$.$1;

        if ($.$.$6) {
          $.goto = 18;
          $p = ($M.context.call = $.$.$1.has).dbg$call($.$.$1, $.$.$0);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        if ($.$.$6) {
          $.goto = 17;
          $p = ($M.context.call = $.$.$1.get).dbg$call($.$.$1, $.$.$0);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.$.$2 = {};

        if ($.$.$0 != null) {
          $0 = Object.defineProperty;

          if ($0) {
            $0 = Object.getOwnPropertyDescriptor;
            $.goto = 8;
            continue;
          } else {
            $.goto = 8;
            continue;
          }
        } else {
          $.state = 6;
        }

      case 6:
        $.$.$2.default = $.$.$0;

        if ($.$.$1) {
          $.goto = 7;
          ($M.context.call = $.$.$1.set).dbg$call($.$.$1, $.$.$0, $.$.$2);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        return $M.ret($.$.$2);

      case 8:
        $.$.$3 = $0;
        $.$.$6 = $M.forInIterator($.$.$0);
        $.state = 9;

      case 9:
        $0 = $.$.$6.next();

        if ($0.done) {
          $.goto = 6;
          continue;
        } else {
          $.$.$4 = $0.value;
          $0 = Object.prototype.hasOwnProperty;
          $.goto = 10;
          $p = ($M.context.call = $0.call).dbg$call($0, $.$.$0, $.$.$4);
          continue;
        }

      case 10:
        if ($p) {
          if ($.$.$3) {
            $.goto = 16;
            $p = ($M.context.call = Object.getOwnPropertyDescriptor).dbg$call(Object, $.$.$0, $.$.$4);
            continue;
          } else {
            $.$.$7 = null;
            $.goto = 12;
            continue;
          }
        } else {
          $.state = 11;
        }

      case 11:
        $.goto = 9;
        continue;

      case 12:
        $.$.$5 = $.$.$7;
        $0 = $.$.$5;

        if ($0) {
          $0 = $.$.$5.get;

          if ($0) {
            $.goto = 15;
            continue;
          } else {
            $0 = $.$.$5.set;
            $.goto = 15;
            continue;
          }
        } else {
          $.state = 13;
        }

      case 13:
        if ($0) {
          $.goto = 14;
          ($M.context.call = Object.defineProperty).dbg$call(Object, $.$.$2, $.$.$4, $.$.$5);
          continue;
        } else {
          $.$.$2[$.$.$4] = $.$.$0[$.$.$4];
          $.state = 14;
        }

      case 14:
        $.goto = 11;
        continue;

      case 15:
        $.goto = 13;
        continue;

      case 16:
        $.$.$7 = $p;
        $.goto = 12;
        continue;

      case 17:
        return $M.ret($p);

      case 18:
        $.$.$6 = $p;
        $.goto = 4;
        continue;

      case 19:
        return $M.ret($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[], [], [null, "e", $s$3], [null, "e", $s$3], [null, "e", $s$3], [], [null, "e", $s$3], [], [], [null, "e", $s$3], [null, "e", $s$3], [], [], [null, "e", $s$3], [], [], [], [], [], [], []]);
$M.fun("m$4", "a", "m$0", [], 2, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        $M.yld(1);
        continue;

      case 1:
        $.goto = 2;
        $M.yld(2);
        continue;

      case 2:
        return $M.retG();

      case 3:
        return $M.retG($.value);

      case 4:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [[null, null, null], [null, null, null], [], [], []]);
module.exports = $M.exports();