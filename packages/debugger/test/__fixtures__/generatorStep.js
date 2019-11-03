function* gen1() {
  yield "A";
  yield "B";
}

function* gen2() {
  let cnt = 0;
  yield* gen1();
  for (const i of gen1()) yield `${i}.${cnt++}`;
}

function iter() {
  for (const i of gc) {
    console.log("G", i);
  }
}
iter();
