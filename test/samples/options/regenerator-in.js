M.profile("regenerator")

function* a() {
}

function* b() {
  return 1;
}

function* c() {
  throw new Error("1");
}
function* d() {
  yield [1];
}

function* e() {
  yield [1];
  yield [2];
}


function* f() {
  yield* eff(1);
}


function* g() {
  yield* eff(1);
  yield* eff(2);
}

