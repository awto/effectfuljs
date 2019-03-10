exports.few = few;
function* few() {
  yield 1;
  yield 2;
}

exports.many = many;
function* many() {
  for (var i = 0; i < 10000; i++) yield i;
}

exports.delegate1 = delegate1;
function* delegate1() {
  yield* many();
  yield* many();
}

exports.delegate2 = delegate2;
function* delegate2() {
  yield* few();
  yield* few();
}

exports.delegate3 = delegate3;
function* delegate3() {
  for (var i = 0; i < 100000; i++) {
    yield* few();
  }
}

exports.forOfLoop1 = forOfLoop1;
function* forOfLoop1() {
  for (var i of few()) {
    yield i;
  }
}

exports.forOfLoop2 = forOfLoop2;
function* forOfLoop2() {
  for (var i of many()) {
    yield i;
  }
}

exports.forOfLoop3 = forOfLoop3;
function* forOfLoop3() {
  for (var i of few()) {
    yield i;
    yield i;
  }
}

exports.forOfLoop4 = forOfLoop4;
function* forOfLoop4() {
  for (var i of many()) {
    yield i;
    yield i;
  }
}

exports.forOfLoop5 = forOfLoop5;
function* forOfLoop5() {
  for (var i of many()) {
    yield* few();
  }
}

exports.forOfLoop6 = forOfLoop6;
function* forOfLoop6() {
  for (var i of many()) {
    yield* few();
  }
}

exports.forOfLoop7 = forOfLoop7;
function* forOfLoop7() {
  for (var i of few()) {
    yield* many();
  }
}

exports.forOfLoop8 = forOfLoop8;
function* forOfLoop8() {
  for (var i of few()) {
    yield* few();
  }
}

exports.nestedLoop1 = nestedLoop1;
function* nestedLoop1() {
  for (var i of few()) {
    for (var j of few()) {
      yield i + j;
    }
    yield i;
  }
}

exports.nestedLoop2 = nestedLoop2;
function* nestedLoop2() {
  for (var i of few()) {
    for (var j of many()) {
      yield i + j;
    }
    yield i;
  }
}

exports.nestedLoop3 = nestedLoop3;
function* nestedLoop3() {
  for (var i of many()) {
    for (var j of few()) {
      yield i + j;
    }
    yield j;
  }
}

exports.nonLocalExit1 = nonLocalExit1;
function* nonLocalExit1() {
  for (var i of many()) {
    for (var j of few()) {
      yield i + j;
      if (j === 1) break;
    }
    yield i;
  }
}

exports.nonLocalExit2 = nonLocalExit2;
function* nonLocalExit2() {
  up: for (var i of many()) {
    for (var j of few()) {
      yield i + j;
      if (j === 1) continue up;
    }
    yield i;
  }
}

exports.nonLocalExit3 = nonLocalExit3;
function* nonLocalExit3() {
  for (var i of few()) {
    for (var j of few()) {
      yield i + j;
      if (i === 1) break;
    }
    yield i;
  }
}

exports.nonLocalExit4 = nonLocalExit4;
function* nonLocalExit4() {
  up: for (var i of few()) {
    for (var j of few()) {
      yield i + j;
      if (i === 2 && j === 1) break up;
    }
    yield i;
  }
}

function* step1(next) {
  yield* next;
}

function* step2(next) {
  for (const i of next) {
    yield i + 1;
  }
}

function* step3(next) {
  for (const i of next) {
    yield i * 10;
    yield i * 20;
  }
}

exports.t1 = t1;
function t1() {
  return step1(few());
}

exports.t2 = t2;
function t2() {
  return step1(t1());
}

exports.t3 = t3;
function t3() {
  return step2(t2());
}

exports.t4 = t4;
function t4() {
  return step3(t3());
}

exports.t5 = t5;
function t5() {
  return step1(t4());
}

exports.t6 = t6;
function t6() {
  return step2(t5());
}

exports.t7 = t7;
function t7() {
  return step3(t6());
}

exports.t8 = t8;
function t8() {
  return step1(many());
}

exports.t9 = t9;
function t9() {
  return step1(t8());
}

exports.t10 = t10;
function t10() {
  return step2(t9());
}

exports.t11 = t11;
function t11() {
  return step3(t10());
}

exports.t12 = t12;
function t12() {
  return step1(t11());
}

exports.t13 = t13;
function t13() {
  return step2(t12());
}

exports.t14 = t14;
function t14() {
  return step3(t13());
}

exports.t15 = t15;
function t15() {
  return step2(t14());
}
