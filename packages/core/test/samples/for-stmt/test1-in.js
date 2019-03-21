(function() {
  var i, j, len, ref;
  ref = [1, 2, 3];
  for (j = 0, len = ref.length; j < len; j++) {
    i = ref[j];
    if (eff(i)) continue;
  }
});
(function() {
  eff("bi");
  for (var i = 0; i < 3; i++) {
    eff("bi:", i);
  }
  eff("ai");
});
(function() {
  eff("bi");
  for (let i = 0; i < 3; i++) {
    eff("bi:", i);
  }
  eff("ai");
});
(function() {
  eff("bi");
  lab: for (var i = 0; i < 3; i++) {
    eff("bj:" + i);
    for (var j = 0; j < 40; j += 10) {
      if (j === 10) continue lab;
      if (j === 30) break lab;
      eff(i + j);
    }
    eff("aj:" + i);
  }
  eff("ai");
});

function a() {
  eff("b");
  for (var i = 0; i < 3; i++) {
    if (i === 2) console.log(i);
    eff(i);
  }
  eff("a");
}

function a1() {
  eff("b");
  for (var i = 0, j = 10; i < 3; i++, j += 2) {
    if (i === 2) console.log(i, j);
    eff(i, j);
  }
  effRes(i, j);
}
function b() {
  eff("b");
  for (;;) {
    if (i === 2) console.log(i);
    eff(i);
  }
  eff("a");
}
function c() {
  eff("b");
  for (;;) {
    if (i === 2) console.log(i);
    if (i === 3) return 10;
    eff(i);
  }
  eff("a");
}
function d() {
  var result = 0,
    i;
  for (i = 0; i < 10; i++) {
    result = eff(result, i);
  }
  eff(result);
}
function e() {
  var result = 0,
    i;
  for (i = 0; i < 10; i++) {
    result = eff(i);
  }
  eff();
}
function f() {
  var result = 0,
    i;
  for (i = 0; i < 10; i++) {
    result = eff(i);
  }
  eff(result);
}

function c1() {
  let result = [];
  for (let i = 0; i < 10; ) {
    result[i] = function cc() {
      eff((result += i++));
    };
  }
  eff(result);
}

function c2() {
  let result = [];
  for (let i = 0; i < 10; ) {
    result[i] = eff(function cc() {
      eff((result += i++));
    });
  }
  eff(result);
}
function c3() {
  let result = [];
  for (let i = 0; i < 10; ) {
    result[i] = eff(
      (function cc(j) {
        eff((result += i += j));
      })(i++)
    );
  }
  eff(result);
}
