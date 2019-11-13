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
  i: "$0"
}, $s$1, false],
    $s$3 = [{
  j: "$1"
}, $s$2, false],
    $s$4 = [{
  i: "$0"
}, $s$1, false],
    $s$5 = [{
  j: "$1"
}, $s$4, false],
    $s$6 = [{
  i: "$0"
}, $s$1, false],
    $s$7 = [{
  j: "$1"
}, $s$6, false];
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
        ($M.context.call = M.profile).dbg$call(M, "es");
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = M.option).dbg$call(M, {
          scopeContext: true,
          state: false,
          contextState: true,
          static: true,
          scopeContext: true,
          scopePrefix: true
        });
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = M.option).dbg$call(M, {
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

      case 3:
        $.goto = 4;
        ($M.context.call = M.option).dbg$call(M, {
          defunct: true,
          inlineScopeOp: "call",
          inlineYieldOp: "iteratorResult",
          inlinePureOp: "iterator",
          inlineRaiseOp: "promise"
        });
        continue;

      case 4:
        $.goto = 5;
        ($M.context.call = M.option).dbg$call(M, {
          inlineScopeOp: "context",
          inlineYieldOp: "iteratorResultPromise",
          inlinePureOp: "promise",
          inlineJsExceptions: false
        });
        continue;

      case 5:
        $.goto = 6;
        ($M.context.call = M.option).dbg$call(M, {
          esForOf: true
        });
        continue;

      case 6:
        $.goto = 7;
        ($M.context.call = M.option).dbg$call(M, {
          esForAwaitOf: true
        });
        continue;

      case 7:
        $.goto = 8;
        ($M.context.call = M.option).dbg$call(M, {
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

      case 8:
        $.goto = 9;
        ($M.context.call = M.option).dbg$call(M, {
          contextBy: "closure"
        });
        continue;

      case 9:
        $.goto = 10;
        ($M.context.call = M.option).dbg$call(M, {
          leftChain: true
        });
        continue;

      case 10:
        return $M.ret();

      case 11:
        return $M.ret($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["1:0-1:15", "e", $s$1], ["2:0-9:2", "e", $s$1], ["19:0-34:2", "e", $s$1], ["44:0-50:2", "e", $s$1], ["60:0-65:2", "e", $s$1], ["87:0-87:27", "e", $s$1], ["101:0-101:32", "e", $s$1], ["109:0-125:2", "e", $s$1], ["152:0-152:34", "e", $s$1], ["179:0-179:29", "e", $s$1], [], [], []]);
$M.fun("m$1", "a1", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = $M.yld(1);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 6;
        continue;

      case 3:
        if ($p) {
          $.goto = 8;
          $p = $M.yld(2);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$2 = $M.iteratorM(b);
        $.state = 5;

      case 5:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 6;
        } else {
          $.goto = 7;
          continue;
        }

      case 6:
        return $M.retAG();

      case 7:
        $M.yld($0);
        $.goto = 5;
        continue;

      case 8:
        $.$.$0 = $p;
        $.goto = 9;
        $p = $M.awt($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $p = $M.yld($p);
        continue;

      case 10:
        return $M.retAG($p);

      case 11:
        return $M.retAG($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 7:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 7:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [[null, null, null], [], [], [null, null, null], [], [], [], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$2", "a2", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = $M.yld(1);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 6;
        continue;

      case 3:
        if ($p) {
          $.goto = 8;
          $p = $M.yld(2);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$2 = $M.iteratorM(b);
        $.state = 5;

      case 5:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 6;
        } else {
          $.goto = 7;
          continue;
        }

      case 6:
        return $M.retAG();

      case 7:
        $M.yld($0);
        $.goto = 5;
        continue;

      case 8:
        $.$.$0 = $p;
        $.goto = 9;
        $p = $M.awt($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $p = $M.yld($p);
        continue;

      case 10:
        return $M.retAG($p);

      case 11:
        return $M.retAG($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 7:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 7:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [[null, null, null], [], [], [null, null, null], [], [], [], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$3", "a3", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = $M.yld(1);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 6;
        continue;

      case 3:
        if ($p) {
          $.goto = 8;
          $p = $M.yld(2);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$2 = $M.iteratorM(b);
        $.state = 5;

      case 5:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 6;
        } else {
          $.goto = 7;
          continue;
        }

      case 6:
        return $M.retAG();

      case 7:
        $M.yld($0);
        $.goto = 5;
        continue;

      case 8:
        $.$.$0 = $p;
        $.goto = 9;
        $p = $M.awt($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $p = $M.yld($p);
        continue;

      case 10:
        return $M.retAG($p);

      case 11:
        return $M.retAG($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 7:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 7:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [[null, null, null], [], [], [null, null, null], [], [], [], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$4", "a4", "m$0", [], 3, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = $M.yld(1);
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, true));
        $.goto = 6;
        continue;

      case 3:
        if ($p) {
          $.goto = 8;
          $p = $M.yld(2);
          continue;
        } else {
          $.state = 4;
        }

      case 4:
        $.$.$2 = $M.iteratorM(b);
        $.state = 5;

      case 5:
        $.$.$3 = $M.awt($.$.$2.next());
        $0 = $.$.$3.value;

        if ($.$.$3.done) {
          $.state = 6;
        } else {
          $.goto = 7;
          continue;
        }

      case 6:
        return $M.retAG();

      case 7:
        $M.yld($0);
        $.goto = 5;
        continue;

      case 8:
        $.$.$0 = $p;
        $.goto = 9;
        $p = $M.awt($.$.$0);
        continue;

      case 9:
        $.goto = 10;
        $p = $M.yld($p);
        continue;

      case 10:
        return $M.retAG($p);

      case 11:
        return $M.retAG($.value);

      case 12:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 12;
      $.goto = 1;
      break;

    case 7:
      $.goto = 2;
      break;

    default:
      $.goto = 12;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 7:
      $.$.$1 = 11;
      $.goto = 1;
      break;

    default:
      $.goto = 11;
      break;
  }
}, [[null, null, null], [], [], [null, null, null], [], [], [], [], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$5", "a5", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iterator(b);
        $.goto = 3;
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 4;
        continue;

      case 3:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 4;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 3;
          $M.yld($.$.$0);
          continue;
        }

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
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 6;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 5;
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, [[], [], [], [null, null, null], [], [], []]);
$M.fun("m$6", "a6", "m$0", [], 3, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iteratorM(b);
        $.goto = 3;
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, false));
        $.goto = 4;
        continue;

      case 3:
        $.$.$3 = $M.awt($.$.$2.next());

        if ($.$.$3.done) {
          $.$.$1 = 4;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $.$.$3.value;
          $.goto = 3;
          $M.yld($.$.$0);
          continue;
        }

      case 4:
        return $M.retAG();

      case 5:
        return $M.retAG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 6;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 5;
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, [[], [], [], [null, null, null], [], [], []]);
$M.fun("m$7", "a7", "m$0", [], 2, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iterator(b);
        $.goto = 3;
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 4;
        continue;

      case 3:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 4;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 3;
          $M.yld($.$.$0);
          continue;
        }

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
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 6;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 5;
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, [[], [], [], [null, null, null], [], [], []]);
$M.fun("m$8", "a8", "m$0", [], 3, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iteratorM(b);
        $.goto = 3;
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, false));
        $.goto = 4;
        continue;

      case 3:
        $.$.$3 = $M.awt($.$.$2.next());

        if ($.$.$3.done) {
          $.$.$1 = 4;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $.$.$3.value;
          $.goto = 3;
          $M.yld($.$.$0);
          continue;
        }

      case 4:
        return $M.retAG();

      case 5:
        return $M.retAG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 6;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 5;
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, [[], [], [], [null, null, null], [], [], []]);
$M.fun("m$9", "a9", "m$0", [], 3, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iteratorM(b);
        $.goto = 3;
        continue;

      case 1:
        $M.awt($M.iterFinM($.$.$2));
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.awt($M.iterErrM($.$.$2, $.value, false));
        $.goto = 4;
        continue;

      case 3:
        $.$.$3 = $M.awt($.$.$2.next());

        if ($.$.$3.done) {
          $.$.$1 = 4;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $.$.$3.value;
          $.goto = 3;
          $M.yld($.$.$0);
          continue;
        }

      case 4:
        return $M.retAG();

      case 5:
        return $M.retAG($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 6;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 5;
      $.goto = 1;
      break;

    default:
      $.goto = 5;
      break;
  }
}, [[], [], [], [null, null, null], [], [], []]);
$M.fun("m$10", "rt_seq_nc", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $0 = $.value;
        $.goto = 4;
        $M.awt(e_1);
        continue;

      case 2:
        $.goto = 3;
        $M.awt(a_1);
        continue;

      case 3:
        $.goto = 4;
        $M.awt(a_2);
        continue;

      case 4:
        return $M.retA();

      case 5:
        return $M.retA($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, null, [[], [null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$11", "rs_seq_nc", "m$0", [], 1, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.goto = 5;
        $p = ($M.context.call = hi)($.$.$0);
        continue;

      case 1:
        $.goto = 18;
        $M.awt(f_1);
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 3:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 14;
        continue;

      case 4:
        $2 = $.value;
        $.goto = 15;
        $M.awt($.$.$2);
        continue;

      case 5:
        $.goto = 6;
        $M.awt($p);
        continue;

      case 6:
        $.$.$0++;
        $.state = 7;

      case 7:
        $.goto = 8;
        $M.awt(a_1);
        continue;

      case 8:
        $.goto = 9;
        $p = $M.awt(a_2);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = a_3)($p);
        continue;

      case 10:
        $.goto = 11;
        $M.awt($p);
        continue;

      case 11:
        $.$.$5 = $M.iterator(something);
        $.state = 12;

      case 12:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$4 = 14;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 13;
          $p = ($M.context.call = a_4)($.$.$1);
          continue;
        }

      case 13:
        $.goto = 12;
        $M.awt($p);
        continue;

      case 14:
        $.$.$3 = 15;
        $.goto = 1;
        continue;

      case 15:
        $.goto = 16;
        $p = ($M.context.call = m_1)($.$.$0);
        continue;

      case 16:
        $.goto = 17;
        $M.awt($p);
        continue;

      case 17:
        return $M.retA();

      case 18:
        $.goto = $.$.$3;
        continue;

      case 19:
        return $M.retA($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
      $.$.$3 = 20;
      $.goto = 1;
      break;

    case 3:
      $.$.$4 = 4;
      $.goto = 2;
      break;

    case 2:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
      $.goto = 4;
      break;

    case 12:
    case 13:
      $.goto = 3;
      break;

    default:
      $.goto = 20;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 12:
    case 13:
      $.$.$4 = 1;
      $.$.$3 = 19;
      $.goto = 2;
      break;

    case 2:
    case 4:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
      $.$.$3 = 19;
      $.goto = 1;
      break;

    default:
      $.goto = 19;
      break;
  }
}, [["138:8-138:13", "e", $s$2], [null, null, null], [], [], [null, null, null], [null, null, null], [], [null, null, null], [null, null, null], ["142:10-142:24", "e", $s$2], [null, null, null], [], ["143:37-143:43", "e", $s$3], [null, null, null], [], ["149:8-149:14", "e", $s$2], [null, null, null], [], [], [], []]);
$M.fun("m$12", "rt_seq", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $0 = $.value;
        $.goto = 4;
        $M.awt(e_1);
        continue;

      case 2:
        $.goto = 3;
        $M.awt(a_1);
        continue;

      case 3:
        $.goto = 4;
        $M.awt(a_2);
        continue;

      case 4:
        return $M.retA();

      case 5:
        return $M.retA($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, null, [[], [null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$13", "rs_seq", "m$0", [], 1, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.goto = 5;
        $p = ($M.context.call = hi)($.$.$0);
        continue;

      case 1:
        $.goto = 18;
        $M.awt(f_1);
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 3:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 14;
        continue;

      case 4:
        $2 = $.value;
        $.goto = 15;
        $M.awt($.$.$2);
        continue;

      case 5:
        $.goto = 6;
        $M.awt($p);
        continue;

      case 6:
        $.$.$0++;
        $.state = 7;

      case 7:
        $.goto = 8;
        $M.awt(a_1);
        continue;

      case 8:
        $.goto = 9;
        $p = $M.awt(a_2);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = a_3)($p);
        continue;

      case 10:
        $.goto = 11;
        $M.awt($p);
        continue;

      case 11:
        $.$.$5 = $M.iterator(something);
        $.state = 12;

      case 12:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$4 = 14;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 13;
          $p = ($M.context.call = a_4)($.$.$1);
          continue;
        }

      case 13:
        $.goto = 12;
        $M.awt($p);
        continue;

      case 14:
        $.$.$3 = 15;
        $.goto = 1;
        continue;

      case 15:
        $.goto = 16;
        $p = ($M.context.call = m_1)($.$.$0);
        continue;

      case 16:
        $.goto = 17;
        $M.awt($p);
        continue;

      case 17:
        return $M.retA();

      case 18:
        $.goto = $.$.$3;
        continue;

      case 19:
        return $M.retA($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
      $.$.$3 = 20;
      $.goto = 1;
      break;

    case 3:
      $.$.$4 = 4;
      $.goto = 2;
      break;

    case 2:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
      $.goto = 4;
      break;

    case 12:
    case 13:
      $.goto = 3;
      break;

    default:
      $.goto = 20;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 12:
    case 13:
      $.$.$4 = 1;
      $.$.$3 = 19;
      $.goto = 2;
      break;

    case 2:
    case 4:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
      $.$.$3 = 19;
      $.goto = 1;
      break;

    default:
      $.goto = 19;
      break;
  }
}, [["165:8-165:13", "e", $s$4], [null, null, null], [], [], [null, null, null], [null, null, null], [], [null, null, null], [null, null, null], ["169:10-169:24", "e", $s$4], [null, null, null], [], ["170:37-170:43", "e", $s$5], [null, null, null], [], ["176:8-176:14", "e", $s$4], [null, null, null], [], [], [], []]);
$M.fun("m$14", "lt_seq", "m$0", [], 1, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 2;
        continue;

      case 1:
        $0 = $.value;
        $.goto = 4;
        $M.awt(e_1);
        continue;

      case 2:
        $.goto = 3;
        $M.awt(a_1);
        continue;

      case 3:
        $.goto = 4;
        $M.awt(a_2);
        continue;

      case 4:
        return $M.retA();

      case 5:
        return $M.retA($.value);

      case 6:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, null, [[], [null, null, null], [null, null, null], [null, null, null], [], [], []]);
$M.fun("m$15", "ls_seq", "m$0", [], 1, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = 0;
        $.goto = 5;
        $p = ($M.context.call = hi)($.$.$0);
        continue;

      case 1:
        $.goto = 18;
        $M.awt(f_1);
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$4;
        continue;

      case 3:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 14;
        continue;

      case 4:
        $2 = $.value;
        $.goto = 15;
        $M.awt($.$.$2);
        continue;

      case 5:
        $.goto = 6;
        $M.awt($p);
        continue;

      case 6:
        $.$.$0++;
        $.state = 7;

      case 7:
        $.goto = 8;
        $M.awt(a_1);
        continue;

      case 8:
        $.goto = 9;
        $p = $M.awt(a_2);
        continue;

      case 9:
        $.goto = 10;
        $p = ($M.context.call = a_3)($p);
        continue;

      case 10:
        $.goto = 11;
        $M.awt($p);
        continue;

      case 11:
        $.$.$5 = $M.iterator(something);
        $.state = 12;

      case 12:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$4 = 14;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 13;
          $p = ($M.context.call = a_4)($.$.$1);
          continue;
        }

      case 13:
        $.goto = 12;
        $M.awt($p);
        continue;

      case 14:
        $.$.$3 = 15;
        $.goto = 1;
        continue;

      case 15:
        $.goto = 16;
        $p = ($M.context.call = m_1)($.$.$0);
        continue;

      case 16:
        $.goto = 17;
        $M.awt($p);
        continue;

      case 17:
        return $M.retA();

      case 18:
        $.goto = $.$.$3;
        continue;

      case 19:
        return $M.retA($.value);

      case 20:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 4:
      $.$.$3 = 20;
      $.goto = 1;
      break;

    case 3:
      $.$.$4 = 4;
      $.goto = 2;
      break;

    case 2:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
      $.goto = 4;
      break;

    case 12:
    case 13:
      $.goto = 3;
      break;

    default:
      $.goto = 20;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 3:
    case 12:
    case 13:
      $.$.$4 = 1;
      $.$.$3 = 19;
      $.goto = 2;
      break;

    case 2:
    case 4:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 14:
      $.$.$3 = 19;
      $.goto = 1;
      break;

    default:
      $.goto = 19;
      break;
  }
}, [["192:8-192:13", "e", $s$6], [null, null, null], [], [], [null, null, null], [null, null, null], [], [null, null, null], [null, null, null], ["196:10-196:24", "e", $s$6], [null, null, null], [], ["197:37-197:43", "e", $s$7], [null, null, null], [], ["203:8-203:14", "e", $s$6], [null, null, null], [], [], [], []]);
module.exports = $M.exports();