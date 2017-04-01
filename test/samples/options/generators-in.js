// *- DEFAULT
import * as G from "@effectfuljs/core";

G.profile("generators");
G.profile("defaultMinimal");

function *v() {
  for(var i of [1,2,3])
    yield i
  console.log(yield* z);
}

function *c() {
    yield* z;
}

function *d() {
  yield z;
  yield* x;
  return y;
}

function *e() {
  yield z;
  if (yield* x)
    return y;
  yield* a;
}

function *f() {
  yield eff(1);
  yield eff(2);
  console.log((yield* eff(3)) + (yield eff(3)));
  yield* eff(eff(4));
  return 10;
}

G.profile("generatorsDo");

function *v1() {
  console.log(yield z);
}

function *c1() {
    yield z;
}

function *d1() {
    yield z;
    yield x;
}
function *e1() {
    yield eff(1);
    yield eff(2);
    console.log((yield eff(3)) + eff(3));
    yield eff(yield eff(4));
}
