var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
var $s$1 = [{
  a: "$0",
  b: "$1",
  c: "$2",
  d: "$3",
  p: "$4"
}, null, false],
    $s$2 = [{
  i: "$0"
}, $s$1, false],
    $s$3 = [{
  i: "$0"
}, $s$1, false],
    $s$4 = [{
  i: "$0",
  j: "$1"
}, $s$1, false],
    $s$5 = [{
  i: "$0"
}, $s$1, false],
    $s$6 = [{
  i: "$0"
}, $s$1, false];
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$0 = $c.a($);
        $.$.$4 = $c.p($);
        $.$.$3 = $c.d($);
        $.$.$2 = $c.c($);
        $.$.$1 = $c.b($);
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
$M.fun("m$1", "a", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iterator(some);
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
          ($M.context.call = eff)(1);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[], [], [], ["3:4-3:10", "e", $s$2], ["5:2-5:8", "e", $s$2], [], [], []]);
$M.fun("m$2", "b", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 3;
        $p = ($M.context.call = eff)("d");
        continue;

      case 1:
        $M.iterFin($.$.$2);
        $.goto = $.$.$1;
        continue;

      case 2:
        $M.iterErr($.$.$2, $.value, false);
        $.goto = 5;
        continue;

      case 3:
        $.$.$2 = $M.iterator($p);
        $.state = 4;

      case 4:
        $0 = $.$.$2.next();

        if ($0.done) {
          $.$.$1 = 5;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.goto = 4;
          ($M.context.call = eff)($.$.$0);
          continue;
        }

      case 5:
        $.goto = 6;
        ($M.context.call = eff)($.$.$0);
        continue;

      case 6:
        return $M.ret();

      case 7:
        return $M.ret($.value);

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
      $.$.$1 = 7;
      $.goto = 1;
      break;

    default:
      $.goto = 7;
      break;
  }
}, [["8:16-8:24", "e", $s$3], [], [], [], ["9:4-9:10", "e", $s$3], ["11:2-11:8", "e", $s$3], [], [], []]);
$M.fun("m$3", "c", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$4 = $M.iterator(some);
        $.goto = 5;
        continue;

      case 1:
        $M.iterFin($.$.$4);
        $.goto = $.$.$2;
        continue;

      case 2:
        $M.iterFin($.$.$5);
        $.goto = $.$.$3;
        continue;

      case 3:
        $M.iterErr($.$.$4, $.value, false);
        $.goto = 8;
        continue;

      case 4:
        $M.iterErr($.$.$5, $.value, false);
        $.goto = 7;
        continue;

      case 5:
        $0 = $.$.$4.next();

        if ($0.done) {
          $.$.$2 = 8;
          $.goto = 1;
          continue;
        } else {
          $.$.$0 = $0.value;
          $.$.$5 = $M.iterator(other);
          $.state = 6;
        }

      case 6:
        $0 = $.$.$5.next();

        if ($0.done) {
          $.$.$3 = 7;
          $.goto = 2;
          continue;
        } else {
          $.$.$1 = $0.value;
          $.goto = 6;
          ($M.context.call = eff)($.$.$0, $.$.$1);
          continue;
        }

      case 7:
        $.goto = 5;
        continue;

      case 8:
        $.goto = 9;
        ($M.context.call = eff)($.$.$0, $.$.$1);
        continue;

      case 9:
        return $M.ret();

      case 10:
        return $M.ret($.value);

      case 11:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 3:
      $.$.$2 = 11;
      $.goto = 1;
      break;

    case 6:
      $.goto = 4;
      break;

    case 4:
      $.$.$3 = 3;
      $.goto = 2;
      break;

    case 2:
    case 5:
    case 7:
      $.goto = 3;
      break;

    default:
      $.goto = 11;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 4:
    case 6:
      $.$.$3 = 1;
      $.$.$2 = 10;
      $.goto = 2;
      break;

    case 2:
    case 3:
    case 5:
    case 7:
      $.$.$2 = 10;
      $.goto = 1;
      break;

    default:
      $.goto = 10;
      break;
  }
}, [[], [], [], [], [], [], ["17:6-17:15", "e", $s$4], [], ["20:2-20:11", "e", $s$4], [], [], []]);
$M.fun("m$4", "d", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iterator(some);
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
          ($M.context.call = eff)(1);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = eff)(2);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[], [], [], ["25:4-25:10", "e", $s$5], ["27:2-27:8", "e", $s$5], [], [], []]);
$M.fun("m$5", "p", "m$0", [], 0, function () {
  var $0;

  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.$.$2 = $M.iterator(some);
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
          ($M.context.call = console.log).dbg$call(console, 1);
          continue;
        }

      case 4:
        $.goto = 5;
        ($M.context.call = console.log).dbg$call(console, 2);
        continue;

      case 5:
        return $M.ret();

      case 6:
        return $M.ret($.value);

      case 7:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, function ($) {
  switch ($.state) {
    case 2:
      $.$.$1 = 7;
      $.goto = 1;
      break;

    case 3:
      $.goto = 2;
      break;

    default:
      $.goto = 7;
      break;
  }
}, function ($) {
  switch ($.state) {
    case 2:
    case 3:
      $.$.$1 = 6;
      $.goto = 1;
      break;

    default:
      $.goto = 6;
      break;
  }
}, [[], [], [], ["32:4-32:18", "e", $s$6], ["34:2-34:16", "e", $s$6], [], [], []]);
module.exports = $M.exports();