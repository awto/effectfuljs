function* func0() {
  yield 1;
  debugger;
  yield 2;
}

function* func1() {
  yield* func0();
  for (const i of func0()) {
    yield i;
  }
}

function* func2() {
  yield* func1();
  for (const i of func1()) yield i;
}

for (const i of func2()) console.log("I", i);
