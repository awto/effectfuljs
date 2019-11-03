function* gfunc1() {
  yield 1;
  yield 2;
}

function* gfunc2() {
  yield "A";
  debugger;
  yield "B";
}

function* gfunc3() {
  yield* gfunc1();
  yield* gfunc2();
  for (const i of gfunc1()) {
    yield `A:${i}`;
    yield `B:${i}`;
  }
  for (const i of gfunc1()) yield `C:${i}`;
}

for (const i of gfunc3()) {
  console.log("I:", i);
}
