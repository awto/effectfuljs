let i = 100,
  j = 20;
async function afunc1(j) {
  let k = i++;
  await new Promise(setImmediate);
  await afunc2.call({ j, i }, k);
  async function afunc2(m) {
    i += await (async m =>
      (await new Promise(m => {
        setImmediate(() => {
          debugger;
          m(1000);
        });
      })) +
      this.j +
      m)(k);
    i *= 10 + this.i + m;
  }
  console.log("I", i);
}
afunc1(3000);
