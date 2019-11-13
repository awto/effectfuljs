var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a1: "$0",
  a2: "$1",
  a3: "$2",
  a4: "$3",
  a5: "$4",
  a6: "$5",
  a7: "$6",
  a8: "$7",
  a9: "$8",
  rt_seq_nc: "$9",
  rs_seq_nc: "$10",
  rt_seq: "$11",
  rs_seq: "$12",
  lt_seq: "$13",
  ls_seq: "$14"
}, null, false],
    $s$2 = [{
  k: "$0"
}, $s$1, false],
    $s$3 = [{
  k: "$0"
}, $s$1, false],
    $s$4 = [{
  k: "$0"
}, $s$1, false],
    $s$5 = [{
  k: "$0"
}, $s$1, false],
    $s$6 = [{
  i: "$0"
}, $s$1, false],
    $s$7 = [{
  i: "$0"
}, $s$1, false],
    $s$8 = [{
  i: "$0"
}, $s$1, false],
    $s$9 = [{
  i: "$0"
}, $s$1, false],
    $s$10 = [{
  i: "$0"
}, $s$1, false],
    $s$11 = [{
  e: "$0"
}, $s$1, false],
    $s$12 = [{
  i: "$0"
}, $s$1, false],
    $s$13 = [{
  e: "$2"
}, $s$12, false],
    $s$14 = [{
  j: "$1"
}, $s$12, false],
    $s$15 = [{
  e: "$0"
}, $s$1, false],
    $s$16 = [{
  i: "$0"
}, $s$1, false],
    $s$17 = [{
  e: "$2"
}, $s$16, false],
    $s$18 = [{
  j: "$1"
}, $s$16, false],
    $s$19 = [{
  e: "$0"
}, $s$1, false],
    $s$20 = [{
  i: "$0"
}, $s$1, false],
    $s$21 = [{
  e: "$2"
}, $s$20, false],
    $s$22 = [{
  j: "$1"
}, $s$20, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a1($);
        $.$.$14 = $c.ls_seq($);
        $.$.$13 = $c.lt_seq($);
        $.$.$12 = $c.rs_seq($);
        $.$.$11 = $c.rt_seq($);
        $.$.$10 = $c.rs_seq_nc($);
        $.$.$9 = $c.rt_seq_nc($);
        $.$.$8 = $c.a9($);
        $.$.$7 = $c.a8($);
        $.$.$6 = $c.a7($);
        $.$.$5 = $c.a6($);
        $.$.$4 = $c.a5($);
        $.$.$3 = $c.a4($);
        $.$.$2 = $c.a3($);
        $.$.$1 = $c.a2($);
        $.goto = 1;
        $M.brk(0);
        continue;

      case 1:
        $.goto = 2;
        $M.mcall("profile", M, "es");
        continue;

      case 2:
        $.goto = 3;
        $M.brk(1);
        continue;

      case 3:
        $.goto = 4;
        $M.mcall("option", M, {
          scopeContext: true,
          state: false,
          contextState: true,
          static: true,
          scopeContext: true,
          scopePrefix: true
        });
        continue;

      case 4:
        $.goto = 5;
        $M.brk(6);
        continue;

      case 5:
        $.goto = 6;
        $M.mcall("option", M, {
          scopeContext: true,
          inlineChainOp: "promise",
          inlineScopeOp: "unwrap",
          inlineYieldOp: "iterator",
          inlineYieldStarOp: "iterator",
          inlinePureOp: "noop",
          inlineRaiseOp: "throw",
          inlinePureJumps: "call",
          inlineContAssign: true,
          inlineResultContAssign: true,
          inlineErrorContAssign: true,
          storeCont: "$step",
          storeResultCont: "$exit",
          storeErrorCont: "$handle"
        });
        continue;

      case 6:
        $.goto = 7;
        $M.brk(11);
        continue;

      case 7:
        $.goto = 8;
        $M.mcall("option", M, {
          defunct: true,
          inlineScopeOp: "call",
          inlineYieldOp: "iteratorResult",
          inlinePureOp: "iterator",
          inlineRaiseOp: "promise"
        });
        continue;

      case 8:
        $.goto = 9;
        $M.brk(16);
        continue;

      case 9:
        $.goto = 10;
        $M.mcall("option", M, {
          inlineScopeOp: "context",
          inlineYieldOp: "iteratorResultPromise",
          inlinePureOp: "promise",
          inlineJsExceptions: false
        });
        continue;

      case 10:
        $.goto = 11;
        $M.brk(25);
        continue;

      case 11:
        $.goto = 12;
        $M.mcall("option", M, {
          esForOf: true
        });
        continue;

      case 12:
        $.goto = 13;
        $M.brk(30);
        continue;

      case 13:
        $.goto = 14;
        $M.mcall("option", M, {
          esForAwaitOf: true
        });
        continue;

      case 14:
        $.goto = 15;
        $M.brk(33);
        continue;

      case 15:
        $.goto = 16;
        $M.mcall("option", M, {
          topLevel: false,
          defunct: true,
          inlineScopeOp: false,
          inlineErrorContAssign: false,
          inlineResultContAssign: false,
          inlineFork: "promise",
          inlinePureOp: "promise",
          inlineChainOp: "promise",
          inlineJsExceptions: false,
          storeRunningCont: "$cur",
          storeResultCont: false,
          contextMethodOps: true,
          contextMethodOpsSpec: {
            iterator: false
          },
          contextState: false,
          storeErrorCont: false
        });
        continue;

      case 16:
        $.goto = 17;
        $M.brk(49);
        continue;

      case 17:
        $.goto = 18;
        $M.mcall("option", M, {
          contextBy: "closure"
        });
        continue;

      case 18:
        $.goto = 19;
        $M.brk(65);
        continue;

      case 19:
        $.goto = 20;
        $M.mcall("option", M, {
          leftChain: true
        });
        continue;

      case 20:
        return $M.ret();

      case 21:
        return $M.ret($.value);

      case 22:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:16", "s", $s$1], ["1:0-1:15", "e", $s$1], ["2:0-9:3", "s", $s$1], ["2:0-9:2", "e", $s$1], ["19:0-34:3", "s", $s$1], ["19:0-34:2", "e", $s$1], ["44:0-50:3", "s", $s$1], ["44:0-50:2", "e", $s$1], ["60:0-65:3", "s", $s$1], ["60:0-65:2", "e", $s$1], ["87:0-87:28", "s", $s$1], ["87:0-87:27", "e", $s$1], ["101:0-101:33", "s", $s$1], ["101:0-101:32", "e", $s$1], ["109:0-125:3", "s", $s$1], ["109:0-125:2", "e", $s$1], ["152:0-152:35", "s", $s$1], ["152:0-152:34", "e", $s$1], ["179:0-179:30", "s", $s$1], ["179:0-179:29", "e", $s$1], [], [], []]);
$M.fun("m$1", "a1", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(2);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 8;
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld(1);
        continue;

      case 4:
        if ($p) {
          $.goto = 10;
          $M.brk(3);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $M.brk(5);
        continue;

      case 6:
        $.$.$2 = $M.iteratorM(b);
        $.state = 7;

      case 7:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 8;
        } else {
          $.goto = 9;
          continue;
        }

      case 8:
        return $M.retAG();

      case 9:
        $M.yld($0);
        $.goto = 7;
        continue;

      case 10:
        $.goto = 11;
        $p = $M.yld(2);
        continue;

      case 11:
        $.$.$0 = $p;
        $.goto = 12;
        $M.brk(4);
        continue;

      case 12:
        $.goto = 13;
        $p = $M.awt($.$.$0);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.yld($p);
        continue;

      case 14:
        return $M.retAG($p);

      case 15:
        return $M.retAG($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 16;
      $.goto = 1;
      break;

    case 9:
      $.goto = 2;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 9:
      $.$.$1 = 15;
      $.goto = 1;
      break;

    default:
      $.goto = 15;
      break;
  }
}, [["12:2-15:3", "s", $s$1], [], [], [null, null, null], ["13:4-13:22", "s", $s$2], ["16:2-16:11", "s", $s$1], [], [], [], [], [null, null, null], ["14:4-14:25", "s", $s$2], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$2", "a2", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(7);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 8;
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld(1);
        continue;

      case 4:
        if ($p) {
          $.goto = 10;
          $M.brk(8);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $M.brk(10);
        continue;

      case 6:
        $.$.$2 = $M.iteratorM(b);
        $.state = 7;

      case 7:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 8;
        } else {
          $.goto = 9;
          continue;
        }

      case 8:
        return $M.retAG();

      case 9:
        $M.yld($0);
        $.goto = 7;
        continue;

      case 10:
        $.goto = 11;
        $p = $M.yld(2);
        continue;

      case 11:
        $.$.$0 = $p;
        $.goto = 12;
        $M.brk(9);
        continue;

      case 12:
        $.goto = 13;
        $p = $M.awt($.$.$0);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.yld($p);
        continue;

      case 14:
        return $M.retAG($p);

      case 15:
        return $M.retAG($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 16;
      $.goto = 1;
      break;

    case 9:
      $.goto = 2;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 9:
      $.$.$1 = 15;
      $.goto = 1;
      break;

    default:
      $.goto = 15;
      break;
  }
}, [["37:2-40:3", "s", $s$1], [], [], [null, null, null], ["38:4-38:22", "s", $s$3], ["41:2-41:11", "s", $s$1], [], [], [], [], [null, null, null], ["39:4-39:25", "s", $s$3], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$3", "a3", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(12);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 8;
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld(1);
        continue;

      case 4:
        if ($p) {
          $.goto = 10;
          $M.brk(13);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $M.brk(15);
        continue;

      case 6:
        $.$.$2 = $M.iteratorM(b);
        $.state = 7;

      case 7:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 8;
        } else {
          $.goto = 9;
          continue;
        }

      case 8:
        return $M.retAG();

      case 9:
        $M.yld($0);
        $.goto = 7;
        continue;

      case 10:
        $.goto = 11;
        $p = $M.yld(2);
        continue;

      case 11:
        $.$.$0 = $p;
        $.goto = 12;
        $M.brk(14);
        continue;

      case 12:
        $.goto = 13;
        $p = $M.awt($.$.$0);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.yld($p);
        continue;

      case 14:
        return $M.retAG($p);

      case 15:
        return $M.retAG($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 16;
      $.goto = 1;
      break;

    case 9:
      $.goto = 2;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 9:
      $.$.$1 = 15;
      $.goto = 1;
      break;

    default:
      $.goto = 15;
      break;
  }
}, [["53:2-56:3", "s", $s$1], [], [], [null, null, null], ["54:4-54:22", "s", $s$4], ["57:2-57:11", "s", $s$1], [], [], [], [], [null, null, null], ["55:4-55:25", "s", $s$4], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$4", "a4", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(17);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 8;
        continue;

      case 3:
        $.goto = 4;
        $p = $M.yld(1);
        continue;

      case 4:
        if ($p) {
          $.goto = 10;
          $M.brk(18);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $M.brk(20);
        continue;

      case 6:
        $.$.$2 = $M.iteratorM(b);
        $.state = 7;

      case 7:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 8;
        } else {
          $.goto = 9;
          continue;
        }

      case 8:
        return $M.retAG();

      case 9:
        $M.yld($0);
        $.goto = 7;
        continue;

      case 10:
        $.goto = 11;
        $p = $M.yld(2);
        continue;

      case 11:
        $.$.$0 = $p;
        $.goto = 12;
        $M.brk(19);
        continue;

      case 12:
        $.goto = 13;
        $p = $M.awt($.$.$0);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.yld($p);
        continue;

      case 14:
        return $M.retAG($p);

      case 15:
        return $M.retAG($.value);

      case 16:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 16;
      $.goto = 1;
      break;

    case 9:
      $.goto = 2;
      break;

    default:
      $.goto = 16;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 9:
      $.$.$1 = 15;
      $.goto = 1;
      break;

    default:
      $.goto = 15;
      break;
  }
}, [["68:2-71:3", "s", $s$1], [], [], [null, null, null], ["69:4-69:22", "s", $s$5], ["72:2-72:11", "s", $s$1], [], [], [], [], [null, null, null], ["70:4-70:25", "s", $s$5], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$5", "a5", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(21);
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 6;
        continue;

      case 3:
        $.$.$2 = $M.iterator(b);
        $.state = 4;

      case 4:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 6;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 5;
          $M.brk(22);
          continue;
        }

      case 5:
        $.goto = 4;
        $M.yld($.$.$0);
        continue;

      case 6:
        return $M.retG();

      case 7:
        return $M.retG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 4:
    case 5:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
    case 5:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["76:2-78:3", "s", $s$1], [], [], [], ["77:4-77:12", "s", $s$6], [null, null, null], [], [], []]);
$M.fun("m$6", "a6", "m$0", [], 3, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(23);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, false));
        $.goto = 6;
        continue;

      case 3:
        $.$.$2 = $M.iteratorM(b);
        $.state = 4;

      case 4:
        $.$.$3 = $M.awt($.$.$2.next());

        if ($.$.$3.done) {
          $.$.$1 = 6;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $.$.$3.value;
          $.goto = 5;
          $M.brk(24);
          continue;
        }

      case 5:
        $.goto = 4;
        $M.yld($.$.$0);
        continue;

      case 6:
        return $M.retAG();

      case 7:
        return $M.retAG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 4:
    case 5:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
    case 5:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["82:2-84:3", "s", $s$1], [], [], [], ["83:4-83:12", "s", $s$7], [null, null, null], [], [], []]);
$M.fun("m$7", "a7", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(26);
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 6;
        continue;

      case 3:
        $.$.$2 = $M.iterator(b);
        $.state = 4;

      case 4:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 6;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 5;
          $M.brk(27);
          continue;
        }

      case 5:
        $.goto = 4;
        $M.yld($.$.$0);
        continue;

      case 6:
        return $M.retG();

      case 7:
        return $M.retG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 4:
    case 5:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
    case 5:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["90:2-92:3", "s", $s$1], [], [], [], ["91:4-91:12", "s", $s$8], [null, null, null], [], [], []]);
$M.fun("m$8", "a8", "m$0", [], 3, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(28);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, false));
        $.goto = 6;
        continue;

      case 3:
        $.$.$2 = $M.iteratorM(b);
        $.state = 4;

      case 4:
        $.$.$3 = $M.awt($.$.$2.next());

        if ($.$.$3.done) {
          $.$.$1 = 6;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $.$.$3.value;
          $.goto = 5;
          $M.brk(29);
          continue;
        }

      case 5:
        $.goto = 4;
        $M.yld($.$.$0);
        continue;

      case 6:
        return $M.retAG();

      case 7:
        return $M.retAG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 4:
    case 5:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
    case 5:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["96:2-98:3", "s", $s$1], [], [], [], ["97:4-97:12", "s", $s$9], [null, null, null], [], [], []]);
$M.fun("m$9", "a9", "m$0", [], 3, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $M.brk(31);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, false));
        $.goto = 6;
        continue;

      case 3:
        $.$.$2 = $M.iteratorM(b);
        $.state = 4;

      case 4:
        $.$.$3 = $M.awt($.$.$2.next());

        if ($.$.$3.done) {
          $.$.$1 = 6;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $.$.$3.value;
          $.goto = 5;
          $M.brk(32);
          continue;
        }

      case 5:
        $.goto = 4;
        $M.yld($.$.$0);
        continue;

      case 6:
        return $M.retAG();

      case 7:
        return $M.retAG($.value);

      case 8:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 8;
      $.goto = 1;
      break;

    case 4:
    case 5:
      $.goto = 2;
      break;

    default:
      $.goto = 8;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 4:
    case 5:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["104:2-106:3", "s", $s$1], [], [], [], ["105:4-105:12", "s", $s$10], [null, null, null], [], [], []]);
$M.fun("m$10", "rt_seq_nc", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(34);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 7;
        $M.brk(37);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(35);
        continue;

      case 3:
        $.goto = 4;
        $M.awt(a_1);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(36);
        continue;

      case 5:
        $.goto = 6;
        $M.awt(a_2);
        continue;

      case 6:
        return $M.retA();

      case 7:
        $.goto = 6;
        $M.awt(e_1);
        continue;

      case 8:
        return $M.retA($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [["128:2-133:3", "s", $s$1], ["132:4-132:14", "s", $s$11], ["129:4-129:14", "s", $s$1], [null, null, null], ["130:4-130:14", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
$M.fun("m$11", "rs_seq_nc", "m$0", [], 1, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(38);
        continue;

      case 1:
        $.goto = 27;
        $M.brk(47);
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 3:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 21;
        continue;

      case 4:
        $2 = $.value;
        $.goto = 26;
        $M.brk(46);
        continue;

      case 5:
        $.$.$0 = 0;
        $.goto = 6;
        $M.brk(39);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = hi)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.awt($p);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(40);
        continue;

      case 9:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 10;
        $M.brk(41);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(42);
        continue;

      case 11:
        $.goto = 12;
        $M.awt(a_1);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(43);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.awt(a_2);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = a_3)($p);
        continue;

      case 15:
        $.goto = 16;
        $M.awt($p);
        continue;

      case 16:
        $.goto = 17;
        $M.brk(44);
        continue;

      case 17:
        $.$.$5 = $M.iterator(something);
        $.state = 18;

      case 18:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$4 = 21;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 19;
          $M.brk(45);
          continue;
        }

      case 19:
        $.goto = 20;
        $p = ($M.context.call = a_4)($.$.$1);
        continue;

      case 20:
        $.goto = 18;
        $M.awt($p);
        continue;

      case 21:
        $.$.$3 = 22;
        $.goto = 1;
        continue;

      case 22:
        $.goto = 23;
        $M.brk(48);
        continue;

      case 23:
        $.goto = 24;
        $p = ($M.context.call = m_1)($.$.$0);
        continue;

      case 24:
        $.goto = 25;
        $M.awt($p);
        continue;

      case 25:
        return $M.retA();

      case 26:
        $.goto = 22;
        $M.awt($.$.$2);
        continue;

      case 27:
        $.goto = 28;
        $M.awt(f_1);
        continue;

      case 28:
        $.goto = $.$.$3;
        continue;

      case 29:
        return $M.retA($.value);

      case 30:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 26:
      $.$.$3 = 30;
      $.goto = 1;
      break;

    case 3:
      $.$.$4 = 4;
      $.goto = 2;
      break;

    case 2:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 21:
      $.goto = 4;
      break;

    case 18:
    case 19:
    case 20:
      $.goto = 3;
      break;

    default:
      $.goto = 30;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 18:
    case 19:
    case 20:
      $.$.$4 = 1;
      $.$.$3 = 29;
      $.goto = 2;
      break;

    case 2:
    case 4:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 21:
    case 26:
      $.$.$3 = 29;
      $.goto = 1;
      break;

    default:
      $.goto = 29;
      break;
  }
}, [["137:2-137:12", "s", $s$12], ["147:4-147:14", "s", $s$12], [], [], ["145:4-145:12", "s", $s$13], ["138:2-138:14", "s", $s$12], ["138:8-138:13", "e", $s$12], [null, null, null], ["139:2-139:6", "s", $s$12], ["140:2-148:3", "s", $s$12], ["141:4-141:14", "s", $s$12], [null, null, null], ["142:4-142:25", "s", $s$12], [null, null, null], ["142:10-142:24", "e", $s$12], [null, null, null], ["143:4-143:44", "s", $s$12], [], ["143:31-143:44", "s", $s$14], ["143:37-143:43", "e", $s$14], [null, null, null], [], ["149:2-149:15", "s", $s$12], ["149:8-149:14", "e", $s$12], [null, null, null], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$12", "rt_seq", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(50);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 7;
        $M.brk(53);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(51);
        continue;

      case 3:
        $.goto = 4;
        $M.awt(a_1);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(52);
        continue;

      case 5:
        $.goto = 6;
        $M.awt(a_2);
        continue;

      case 6:
        return $M.retA();

      case 7:
        $.goto = 6;
        $M.awt(e_1);
        continue;

      case 8:
        return $M.retA($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [["155:2-160:3", "s", $s$1], ["159:4-159:14", "s", $s$15], ["156:4-156:14", "s", $s$1], [null, null, null], ["157:4-157:14", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
$M.fun("m$13", "rs_seq", "m$0", [], 1, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(54);
        continue;

      case 1:
        $.goto = 27;
        $M.brk(63);
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 3:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 21;
        continue;

      case 4:
        $2 = $.value;
        $.goto = 26;
        $M.brk(62);
        continue;

      case 5:
        $.$.$0 = 0;
        $.goto = 6;
        $M.brk(55);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = hi)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.awt($p);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(56);
        continue;

      case 9:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 10;
        $M.brk(57);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(58);
        continue;

      case 11:
        $.goto = 12;
        $M.awt(a_1);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(59);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.awt(a_2);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = a_3)($p);
        continue;

      case 15:
        $.goto = 16;
        $M.awt($p);
        continue;

      case 16:
        $.goto = 17;
        $M.brk(60);
        continue;

      case 17:
        $.$.$5 = $M.iterator(something);
        $.state = 18;

      case 18:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$4 = 21;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 19;
          $M.brk(61);
          continue;
        }

      case 19:
        $.goto = 20;
        $p = ($M.context.call = a_4)($.$.$1);
        continue;

      case 20:
        $.goto = 18;
        $M.awt($p);
        continue;

      case 21:
        $.$.$3 = 22;
        $.goto = 1;
        continue;

      case 22:
        $.goto = 23;
        $M.brk(64);
        continue;

      case 23:
        $.goto = 24;
        $p = ($M.context.call = m_1)($.$.$0);
        continue;

      case 24:
        $.goto = 25;
        $M.awt($p);
        continue;

      case 25:
        return $M.retA();

      case 26:
        $.goto = 22;
        $M.awt($.$.$2);
        continue;

      case 27:
        $.goto = 28;
        $M.awt(f_1);
        continue;

      case 28:
        $.goto = $.$.$3;
        continue;

      case 29:
        return $M.retA($.value);

      case 30:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 26:
      $.$.$3 = 30;
      $.goto = 1;
      break;

    case 3:
      $.$.$4 = 4;
      $.goto = 2;
      break;

    case 2:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 21:
      $.goto = 4;
      break;

    case 18:
    case 19:
    case 20:
      $.goto = 3;
      break;

    default:
      $.goto = 30;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 18:
    case 19:
    case 20:
      $.$.$4 = 1;
      $.$.$3 = 29;
      $.goto = 2;
      break;

    case 2:
    case 4:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 21:
    case 26:
      $.$.$3 = 29;
      $.goto = 1;
      break;

    default:
      $.goto = 29;
      break;
  }
}, [["164:2-164:12", "s", $s$16], ["174:4-174:14", "s", $s$16], [], [], ["172:4-172:12", "s", $s$17], ["165:2-165:14", "s", $s$16], ["165:8-165:13", "e", $s$16], [null, null, null], ["166:2-166:6", "s", $s$16], ["167:2-175:3", "s", $s$16], ["168:4-168:14", "s", $s$16], [null, null, null], ["169:4-169:25", "s", $s$16], [null, null, null], ["169:10-169:24", "e", $s$16], [null, null, null], ["170:4-170:44", "s", $s$16], [], ["170:31-170:44", "s", $s$18], ["170:37-170:43", "e", $s$18], [null, null, null], [], ["176:2-176:15", "s", $s$16], ["176:8-176:14", "e", $s$16], [null, null, null], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$14", "lt_seq", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        $M.brk(66);
        continue;

      case 1:
        $0 = $.value;
        $.goto = 7;
        $M.brk(69);
        continue;

      case 2:
        $.goto = 3;
        $M.brk(67);
        continue;

      case 3:
        $.goto = 4;
        $M.awt(a_1);
        continue;

      case 4:
        $.goto = 5;
        $M.brk(68);
        continue;

      case 5:
        $.goto = 6;
        $M.awt(a_2);
        continue;

      case 6:
        return $M.retA();

      case 7:
        $.goto = 6;
        $M.awt(e_1);
        continue;

      case 8:
        return $M.retA($.value);

      case 9:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
    case 4:
    case 5:
      $.goto = 1;
      break;

    default:
      $.goto = 9;
      break;
  }
}, null, [["182:2-187:3", "s", $s$1], ["186:4-186:14", "s", $s$19], ["183:4-183:14", "s", $s$1], [null, null, null], ["184:4-184:14", "s", $s$1], [null, null, null], [], [null, null, null], [], []]);
$M.fun("m$15", "ls_seq", "m$0", [], 1, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 5;
        $M.brk(70);
        continue;

      case 1:
        $.goto = 27;
        $M.brk(79);
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 3:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 21;
        continue;

      case 4:
        $2 = $.value;
        $.goto = 26;
        $M.brk(78);
        continue;

      case 5:
        $.$.$0 = 0;
        $.goto = 6;
        $M.brk(71);
        continue;

      case 6:
        $.goto = 7;
        $p = ($M.context.call = hi)($.$.$0);
        continue;

      case 7:
        $.goto = 8;
        $M.awt($p);
        continue;

      case 8:
        $.goto = 9;
        $M.brk(72);
        continue;

      case 9:
        $M.lset($.$, "i", $.$.$0 + 1);
        $.goto = 10;
        $M.brk(73);
        continue;

      case 10:
        $.goto = 11;
        $M.brk(74);
        continue;

      case 11:
        $.goto = 12;
        $M.awt(a_1);
        continue;

      case 12:
        $.goto = 13;
        $M.brk(75);
        continue;

      case 13:
        $.goto = 14;
        $p = $M.awt(a_2);
        continue;

      case 14:
        $.goto = 15;
        $p = ($M.context.call = a_3)($p);
        continue;

      case 15:
        $.goto = 16;
        $M.awt($p);
        continue;

      case 16:
        $.goto = 17;
        $M.brk(76);
        continue;

      case 17:
        $.$.$5 = $M.iterator(something);
        $.state = 18;

      case 18:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$4 = 21;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 19;
          $M.brk(77);
          continue;
        }

      case 19:
        $.goto = 20;
        $p = ($M.context.call = a_4)($.$.$1);
        continue;

      case 20:
        $.goto = 18;
        $M.awt($p);
        continue;

      case 21:
        $.$.$3 = 22;
        $.goto = 1;
        continue;

      case 22:
        $.goto = 23;
        $M.brk(80);
        continue;

      case 23:
        $.goto = 24;
        $p = ($M.context.call = m_1)($.$.$0);
        continue;

      case 24:
        $.goto = 25;
        $M.awt($p);
        continue;

      case 25:
        return $M.retA();

      case 26:
        $.goto = 22;
        $M.awt($.$.$2);
        continue;

      case 27:
        $.goto = 28;
        $M.awt(f_1);
        continue;

      case 28:
        $.goto = $.$.$3;
        continue;

      case 29:
        return $M.retA($.value);

      case 30:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 26:
      $.$.$3 = 30;
      $.goto = 1;
      break;

    case 3:
      $.$.$4 = 4;
      $.goto = 2;
      break;

    case 2:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 21:
      $.goto = 4;
      break;

    case 18:
    case 19:
    case 20:
      $.goto = 3;
      break;

    default:
      $.goto = 30;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 18:
    case 19:
    case 20:
      $.$.$4 = 1;
      $.$.$3 = 29;
      $.goto = 2;
      break;

    case 2:
    case 4:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 21:
    case 26:
      $.$.$3 = 29;
      $.goto = 1;
      break;

    default:
      $.goto = 29;
      break;
  }
}, [["191:2-191:12", "s", $s$20], ["201:4-201:14", "s", $s$20], [], [], ["199:4-199:12", "s", $s$21], ["192:2-192:14", "s", $s$20], ["192:8-192:13", "e", $s$20], [null, null, null], ["193:2-193:6", "s", $s$20], ["194:2-202:3", "s", $s$20], ["195:4-195:14", "s", $s$20], [null, null, null], ["196:4-196:25", "s", $s$20], [null, null, null], ["196:10-196:24", "e", $s$20], [null, null, null], ["197:4-197:44", "s", $s$20], [], ["197:31-197:44", "s", $s$22], ["197:37-197:43", "e", $s$22], [null, null, null], [], ["203:2-203:15", "s", $s$20], ["203:8-203:14", "e", $s$20], [null, null, null], [], [null, null, null], [null, null, null], [], [], []]);
module.exports = $M.exports();