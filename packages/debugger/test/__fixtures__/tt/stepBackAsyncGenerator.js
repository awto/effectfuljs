let i = 100,
  j = 20;
async function* agfunc1(j) {
  let k = i++;
  yield* agfunc2.call({ j, i }, k);
  for await (const m of agfunc2.call({ j, i }, k + 2)) yield m;
  async function* agfunc2(m) {
    yield (async m => (await new Promise(setImmediate), this.j + i + m))(k);
    i *= 10 + this.i + m;
  }
}
async function main() {
  for await (const i of agfunc1(3000)) {
    console.log("I:", i);
  }
  console.log("END:", i);
}
main();
