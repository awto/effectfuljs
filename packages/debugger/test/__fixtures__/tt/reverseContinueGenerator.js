let i = 100,
  j = 20;
function* gfunc1(j) {
  let k = i++;
  yield* gfunc2.call({ j, i }, k);
  function* gfunc2(m) {
    yield (m => this.j + m)(k);
    i *= 10 + this.i + m;
  }
}
for (const i of gfunc1(3000)) {
  console.log("I:", i);
}
console.log("END:", i);
