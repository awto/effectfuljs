M.profile("generators")

function* a() {
  yield 1;
  yield 2;
  yield* some();
  return (yield* some);
}
