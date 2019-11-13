var $0M = require("@effectful/debugger/api");

$0M.module("file.js", null, module, null, "$0");
var $s$1 = [{
  done: "$0",
  addLater: "$1"
}, null, false],
    $s$2 = [{
  result: "$0"
}, $s$1, false],
    $s$3 = [{
  $dm$b: "$0"
}, $s$2, false],
    $s$4 = [{
  err: "$1"
}, $s$3, false],
    $s$5 = [{
  a: "$0",
  b: "$1",
  deferred: "$2"
}, $s$1, false],
    $s$6 = [{
  done: "$0",
  throwErrorLater: "$1"
}, null, false],
    $s$7 = [{
  $dm$root: "$0"
}, $s$6, false],
    $s$8 = [{
  err: "$0"
}, $s$7, false],
    $s$9 = [{
  expectErr: "$1"
}, $s$8, false],
    $s$10 = [{
  deferred: "$0"
}, $s$6, false],
    $s$11 = [{
  done: "$0"
}, null, false],
    $s$12 = [{
  result: "$0"
}, $s$11, false],
    $s$13 = [{
  $dm$b: "$0"
}, $s$12, false],
    $s$14 = [{
  err: "$1"
}, $s$13, false];
$0M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = $0M.evalDir("@effectfuljs/core");
        continue;

      case 1:
        M = $0p;
        $0.goto = 2;
        $0p = $0M.evalDir("Q");
        continue;

      case 2:
        Q = $0p;
        $0.goto = 3;
        $0p = $0M.evalDir("@effectfuljs/promise");
        continue;

      case 3:
        $0.goto = 4;
        $0p = ($0M.context.call = $0p)(Q);
        continue;

      case 4:
        QM = $0p;
        $0.goto = 5;
        ($0M.context.call = describe)("yop", $0c.f($0));
        continue;

      case 5:
        return $0M.ret();

      case 6:
        return $0M.ret($0.value);

      case 7:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:4-2:32", "e", null], ["3:4-3:16", "e", null], ["4:5-4:36", "e", null], ["4:5-4:39", "e", null], ["5:0-74:2", "e", null], [], [], []]);
$0M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        ($0M.context.call = it)("should yield fiber until promise is resolved", $0c.f($0));
        continue;

      case 1:
        $0.goto = 2;
        ($0M.context.call = it)("should throw reasons from rejected promises into fiber", $0c.f($0));
        continue;

      case 2:
        $0.goto = 3;
        ($0M.context.call = it)("should work just fine with passed a value instead of a promise", $0c.f($0));
        continue;

      case 3:
        return $0M.ret();

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["6:2-28:4", "e", null], ["29:2-58:4", "e", null], ["59:2-73:4", "e", null], [], [], []]);
$0M.fun("m$2", null, "m$1", ["done"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$.$1 = $0c.addLater($0);

        if ($0.$.$0.async) {
          $0.goto = 3;
          $0p = ($0M.context.call = $0.$.$0.async).dbg$call($0.$.$0);
          continue;
        } else {
          $0.state = 1;
        }

      case 1:
        $0.goto = 2;
        ($0M.context.call = M.run).dbg$call(M, QM, $0c.f($0));
        continue;

      case 2:
        return $0M.ret();

      case 3:
        $0.$.$0 = $0p;
        $0.goto = 1;
        continue;

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["7:27-7:39", "e", $s$1], ["8:4-19:6", "e", $s$1], [], [], [], []]);
$0M.fun("m$3", null, "m$2", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = $0.$$.$.$1)(1, 2);
        continue;

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = M)($0p);
        continue;

      case 2:
        $0.goto = 3;
        $0p = ($0M.context.call = $0p.mapply).dbg$call($0p, $0c.f($0));
        continue;

      case 3:
        return $0M.ret($0p);

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["10:15-10:29", "e", $s$2], ["10:13-10:30", "e", $s$2], ["10:13-18:8", "e", $s$2], [], [], []]);
$0M.fun("m$4", null, "m$3", ["$dm$b"], 0, function () {
  var $0;

  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$$.$.$0 = $0.$.$0;
        $0.goto = 2;
        continue;

      case 1:
        $1 = $0.value;
        $0.goto = 5;
        ($0M.context.call = $0.$$.$.$0)($0.$.$1);
        continue;

      case 2:
        $0.goto = 3;
        $0p = ($0M.context.call = expect)($0.$$.$.$0);
        continue;

      case 3:
        $0 = $0p.to;
        $0.goto = 4;
        ($0M.context.call = $0.equal).dbg$call($0, 3);
        continue;

      case 4:
        $0.goto = 5;
        ($0M.context.call = $0.$$.$.$0)();
        continue;

      case 5:
        return $0M.ret();

      case 6:
        return $0M.ret($0.value);

      case 7:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($0) {
  switch ($0.state) {
    case 2:
    case 3:
    case 4:
      $0.goto = 1;
      break;

    default:
      $0.goto = 7;
      break;
  }
}, null, [[], ["16:10-16:19", "e", $s$4], ["13:10-13:24", "e", $s$3], ["13:10-13:36", "e", $s$3], ["14:10-14:16", "e", $s$3], [], [], []]);
$0M.fun("m$5", "addLater", "m$2", ["a", "b"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = Q.defer).dbg$call(Q);
        continue;

      case 1:
        $0.$.$2 = $0p;
        $0.goto = 2;
        ($0M.context.call = process.nextTick).dbg$call(process, $0c.f($0));
        continue;

      case 2:
        return $0M.ret($0.$.$2.promise);

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["22:17-22:26", "e", $s$5], ["23:6-25:8", "e", $s$5], [], [], []]);
$0M.fun("m$6", null, "m$5", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        ($0M.context.call = $0.$$.$.$2.resolve).dbg$call($0.$$.$.$2, $0.$$.$.$0 + $0.$$.$.$1);
        continue;

      case 1:
        return $0M.ret();

      case 2:
        return $0M.ret($0.value);

      case 3:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["24:8-24:31", "e", $s$5], [], [], []]);
$0M.fun("m$7", null, "m$1", ["done"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$.$1 = $0c.throwErrorLater($0);

        if ($0.$.$0.async) {
          $0.goto = 3;
          $0p = ($0M.context.call = $0.$.$0.async).dbg$call($0.$.$0);
          continue;
        } else {
          $0.state = 1;
        }

      case 1:
        $0.goto = 2;
        ($0M.context.call = M.run).dbg$call(M, QM, $0c.f($0));
        continue;

      case 2:
        return $0M.ret();

      case 3:
        $0.$.$0 = $0p;
        $0.goto = 1;
        continue;

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["30:27-30:39", "e", $s$6], ["31:4-49:6", "e", $s$6], [], [], [], []]);
$0M.fun("m$8", null, "m$7", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = M.scope).dbg$call(M, $0c.f($0));
        continue;

      case 1:
        return $0M.ret($0p);

      case 2:
        return $0M.ret($0.value);

      case 3:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["32:13-48:8", "e", $s$6], [], [], []]);
$0M.fun("m$9", null, "m$8", ["$dm$root"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = $0.$$.$.$1)();
        continue;

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = M)($0p);
        continue;

      case 2:
        $0.goto = 3;
        $0p = ($0M.context.call = $0p.mhandle).dbg$call($0p, $0c.f($0));
        continue;

      case 3:
        $0.goto = 4;
        $0p = ($0M.context.call = $0p.mapply).dbg$call($0p, $0c.f($0));
        continue;

      case 4:
        return $0M.ret($0p);

      case 5:
        return $0M.ret($0.value);

      case 6:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["33:17-33:34", "e", $s$7], ["33:15-33:35", "e", $s$7], ["33:15-42:12", "e", $s$7], ["33:15-47:12", "e", $s$7], [], [], []]);
$0M.fun("m$10", null, "m$9", ["err"], 0, function () {
  var $0;

  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 2;
        continue;

      case 1:
        $1 = $0.value;
        $0.goto = 5;
        ($0M.context.call = $0.$$.$.$0)($0.$.$1);
        continue;

      case 2:
        $0.goto = 3;
        $0p = ($0M.context.call = expect)($0.$.$0.message);
        continue;

      case 3:
        $0 = $0p.to;
        $0.goto = 4;
        ($0M.context.call = $0.equal).dbg$call($0, "promise rejected");
        continue;

      case 4:
        $0.goto = 5;
        ($0M.context.call = $0.$$.$.$0)();
        continue;

      case 5:
        $0.goto = 6;
        $0p = ($0M.context.call = $0.$$.$.$0.brk).dbg$call($0.$$.$.$0);
        continue;

      case 6:
        return $0M.ret($0p);

      case 7:
        return $0M.ret($0.value);

      case 8:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($0) {
  switch ($0.state) {
    case 2:
    case 3:
    case 4:
      $0.goto = 1;
      break;

    default:
      $0.goto = 8;
      break;
  }
}, null, [[], ["39:14-39:29", "e", $s$9], ["36:14-36:33", "e", $s$8], ["36:14-36:62", "e", $s$8], ["37:14-37:20", "e", $s$8], ["41:19-41:33", "e", $s$8], [], [], []]);
$0M.fun("m$11", null, "m$9", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = new ($0M.context.call = Error)("yop should have thrown reason from rejected promise");
        continue;

      case 1:
        $0.goto = 2;
        ($0M.context.call = $0.$$.$.$0)($0p);
        continue;

      case 2:
        return $0M.ret();

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["45:14-45:78", "e", $s$7], ["44:12-46:13", "e", $s$7], [], [], []]);
$0M.fun("m$12", "throwErrorLater", "m$7", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = Q.defer).dbg$call(Q);
        continue;

      case 1:
        $0.$.$0 = $0p;
        $0.goto = 2;
        ($0M.context.call = process.nextTick).dbg$call(process, $0c.f($0));
        continue;

      case 2:
        return $0M.ret($0.$.$0.promise);

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["52:17-52:26", "e", $s$10], ["53:6-55:8", "e", $s$10], [], [], []]);
$0M.fun("m$13", null, "m$12", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = new ($0M.context.call = Error)("promise rejected");
        continue;

      case 1:
        $0.goto = 2;
        ($0M.context.call = $0.$$.$.$0.reject).dbg$call($0.$$.$.$0, $0p);
        continue;

      case 2:
        return $0M.ret();

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["54:24-54:53", "e", $s$10], ["54:8-54:54", "e", $s$10], [], [], []]);
$0M.fun("m$14", null, "m$1", ["done"], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        if ($0.$.$0.async) {
          $0.goto = 3;
          $0p = ($0M.context.call = $0.$.$0.async).dbg$call($0.$.$0);
          continue;
        } else {
          $0.state = 1;
        }

      case 1:
        $0.goto = 2;
        ($0M.context.call = M.run).dbg$call(M, QM, $0c.f($0));
        continue;

      case 2:
        return $0M.ret();

      case 3:
        $0.$.$0 = $0p;
        $0.goto = 1;
        continue;

      case 4:
        return $0M.ret($0.value);

      case 5:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["60:27-60:39", "e", $s$11], ["61:4-72:6", "e", $s$11], [], [], [], []]);
$0M.fun("m$15", null, "m$14", [], 0, function () {
  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.goto = 1;
        $0p = ($0M.context.call = M)(1 + 2);
        continue;

      case 1:
        $0.goto = 2;
        $0p = ($0M.context.call = $0p.mapply).dbg$call($0p, $0c.f($0));
        continue;

      case 2:
        return $0M.ret($0p);

      case 3:
        return $0M.ret($0.value);

      case 4:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["63:13-63:21", "e", $s$12], ["63:13-71:8", "e", $s$12], [], [], []]);
$0M.fun("m$16", null, "m$15", ["$dm$b"], 0, function () {
  var $0;

  for (;;) {
    switch ($0.state = $0.goto) {
      case 0:
        $0.$$.$.$0 = $0.$.$0;
        $0.goto = 2;
        continue;

      case 1:
        $1 = $0.value;
        $0.goto = 5;
        ($0M.context.call = $0.$$.$$.$.$0)($0.$.$1);
        continue;

      case 2:
        $0.goto = 3;
        $0p = ($0M.context.call = expect)($0.$$.$.$0);
        continue;

      case 3:
        $0 = $0p.to;
        $0.goto = 4;
        ($0M.context.call = $0.equal).dbg$call($0, 3);
        continue;

      case 4:
        $0.goto = 5;
        ($0M.context.call = $0.$$.$$.$.$0)();
        continue;

      case 5:
        return $0M.ret();

      case 6:
        return $0M.ret($0.value);

      case 7:
        throw $0.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($0) {
  switch ($0.state) {
    case 2:
    case 3:
    case 4:
      $0.goto = 1;
      break;

    default:
      $0.goto = 7;
      break;
  }
}, null, [[], ["69:10-69:19", "e", $s$14], ["66:10-66:24", "e", $s$13], ["66:10-66:36", "e", $s$13], ["67:10-67:16", "e", $s$13], [], [], []]);
module.exports = $0M.exports();