function* testGenerator1() {
  for (let i = 0; i < 3; i++) yield i;
  return "G1";
}

function* testGenerator2() {
  yield yield* testGenerator1();
  for (const i of testGenerator1()) yield `A:${i}`;
}

function* testGenerator3() {
  yield "->";
  yield* testGenerator2();
  yield "<-";
  return "testG3";
}

function* testGenerator4() {
  yield* testGenerator3();
}

function* testGenerator5() {
  yield* testGenerator4();
  yield* testGenerator4();
}

module.exports = function testGenerators() {
  for (const i of testGenerator5()) console.log("G6", i);
};
