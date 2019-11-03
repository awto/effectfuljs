let i = 0;
const j = 1;
async function afunc1(m) {
  await new Promise(setImmediate);
  i += this.i + j + m;
}
async function afunc2(j) {
  await (i += j);
  debugger;
  afunc1.apply({ i: j }, [30]);
  await new Promise(rs => {
    setImmediate(rs);
  });
}
async function main() {
  debugger;
  await afunc1.call({ i }, 10);
  await afunc2(15);
  await afunc1.call({ i: j }, 20);
  console.log("I", i);
}
main();
