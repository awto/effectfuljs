function* a() {
  yield 1;
  eff(2);
}

function* b() {
  eff(1);
  yield 2;
  eff(3);
}

function b1() {
  eff(1);
  M.yield(2);
  eff(3);
}

function* c() {
  var i;
  i = 0;
  eff(1);
  i++;
  eff(i)
  yield i;
  i++;
  eff(i);
}

function d() {
  M.yield(1);
  M.yield(2);
  M.yield(3);
}

function e() {
  M["yield"](1);
  M["yield"](2);
  M["yield"](3);
}





