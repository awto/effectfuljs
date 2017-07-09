// *- DEFAULT
import * as G from "@effectful/es";

function *v(j) {
  for(var i of [1,2,3])
    yield i + j
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

function *v1(z) {
  console.log(yield z);
}

function *c1(z) {
    yield z;
}

function *d1(z,x) {
    yield z;
    yield x;
}

function *e1() {
    yield eff(1);
    yield eff(2);
    console.log((yield eff(3)) + eff(3));
    yield eff(yield eff(4));
}

async function* aw1(i) {
  await eff(i);
  i++;
  await eff(i);
}

async function* ag1(i) {
  for await (const j of something) {
    p("H",i,j)
  }
}

async function* ag2(i) {
  for await (const j of something) {
    i = await somethingElse;
  }
}
async function* ag3(i) {
  yield i;
  yield await eff(i);
  for await (const j of something()) {
    yield i + j;
    i = yield await eff(i - await(eff(j)));
    i = yield* eff(2,j);
  }
  return i;
}

async function* ag4() {
  await eff1(yield eff2())
}

async function* ag5(i) {
  await await i;
}

async function ag6(i) {
  await await await i;
}

async function* ag7(i) {
  yield eff1(i);
  yield await eff1(eff(2,i),await(eff3()),
                   yield eff4(),
                   await(await eff5()),
                   yield(await eff6()),
                   yield(yield eff7()),
                   await(yield eff8())
                  );
}
