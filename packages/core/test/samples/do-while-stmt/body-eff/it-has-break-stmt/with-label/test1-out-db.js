var $M = require("@effectful/debugger/api");

$M.module("file.js", null, module, null, "$");
$M.fun("m$0", "file", null, [], 32, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $c.f($);
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
$M.fun("m$1", null, "m$0", [], 0, function () {
  for (;;) {
    switch ($.state = $.goto) {
      case 0:
        $.goto = 1;
        ($M.context.call = eff)(0);
        continue;

      case 1:
        $.goto = 2;
        ($M.context.call = eff)(1);
        continue;

      case 2:
        $.goto = 3;
        ($M.context.call = eff)(2);
        continue;

      case 3:
        $.goto = 4;
        $p = ($M.context.call = eff)(3);
        continue;

      case 4:
        if ($p) {
          $.goto = 13;
          ($M.context.call = eff)(4);
          continue;
        } else {
          $.state = 5;
        }

      case 5:
        $.goto = 6;
        $p = ($M.context.call = eff)(3);
        continue;

      case 6:
        if ($p) {
          $.goto = 11;
          ($M.context.call = eff)(4);
          continue;
        } else {
          $.state = 7;
        }

      case 7:
        $.goto = 8;
        $p = ($M.context.call = eff)(5);
        continue;

      case 8:
        if ($p) {
          $.goto = 14;
          ($M.context.call = eff)(6);
          continue;
        } else {
          $.state = 9;
        }

      case 9:
        $.goto = 10;
        $p = ($M.context.call = eff)(7);
        continue;

      case 10:
        if ($p) {
          $.goto = 15;
          ($M.context.call = eff)(8);
          continue;
        } else {
          $.state = 11;
        }

      case 11:
        $.goto = 12;
        $p = ($M.context.call = eff)(9);
        continue;

      case 12:
        if ($p) {
          $.goto = 2;
          continue;
        } else {
          $.state = 13;
        }

      case 13:
        $.goto = 14;
        ($M.context.call = eff)(10);
        continue;

      case 14:
        if (true) {
          $.goto = 1;
          continue;
        } else {
          $.state = 15;
        }

      case 15:
        $.goto = 16;
        ($M.context.call = eff)(11);
        continue;

      case 16:
        return $M.ret();

      case 17:
        return $M.ret($.value);

      case 18:
        throw $.value;

      default:
        throw new Error("Invalid state");
    }
  }
}, null, null, [["2:2-2:8", "e", null], ["4:4-4:10", "e", null], ["6:6-6:12", "e", null], ["7:10-7:16", "e", null], ["8:8-8:14", "e", null], ["11:10-11:16", "e", null], ["12:8-12:14", "e", null], ["15:10-15:16", "e", null], ["16:8-16:14", "e", null], ["19:10-19:16", "e", null], ["20:8-20:14", "e", null], ["23:13-23:19", "e", null], [], ["24:4-24:11", "e", null], [], ["26:2-26:9", "e", null], [], [], []]);
module.exports = $M.exports();