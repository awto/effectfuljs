async function afunc1() {
  await new Promise(setImmediate);
  await new Promise(setImmediate);
}
async function* agfunc1() {
  yield 1;
  await afunc1();
  yield 2;
}

async function* agfunc2() {
  await new Promise(setImmediate);
  yield "A";
  debugger;
  yield "B";
}

async function* agfunc3() {
  yield* agfunc1();
  yield* agfunc2();
  for await (const i of agfunc1()) {
    yield `A:${i}`;
    await afunc1();
    yield `B:${i}`;
  }
  for await (const i of agfunc1()) yield `C:${i}`;
}

async function main() {
  debugger;
  for await (const i of agfunc3()) {
    console.log("I:", i);
  }
}

main();
