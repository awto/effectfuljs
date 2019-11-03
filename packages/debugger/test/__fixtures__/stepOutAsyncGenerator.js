async function* func0() {
  yield 1;
  await new Promise(setImmediate);
  debugger;
  yield 2;
}

async function* func1() {
  yield* func0();
  for await (const i of func0()) {
    await new Promise(setImmediate);
    yield i;
  }
}

async function* func2() {
  yield* func1();
  for await (const i of func1()) yield i;
}

async function main() {
  for await (const i of func2()) console.log("I", i);
}
