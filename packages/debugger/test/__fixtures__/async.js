async function testAsyncBlock(n = 0) {
  console.log(`S1:${n}`);
  await new Promise(a => setTimeout(a, 0));
  console.log(`S2:${n}`);
  await new Promise(a => setTimeout(a, 0));
  console.log(`S3:${n}`);
  return 1000 + n;
}

async function testThrow(throw1) {
  if (throw1) throw new Error("1");
  console.log("After 1");
  await true;
  throw new Error("2");
}

module.exports = async function testBlockPar() {
  console.log("ENTER testBlockPar");
  const t = testAsyncBlock(1);
  console.log("T1", t);
  console.log("T2", await testAsyncBlock(2));
  console.log("T3", await testAsyncBlock(3));
  console.log("T1A", await t);
  let except;
  try {
    except = testThrow(true);
    console.log("OK1");
  } catch (e) {
    console.log("NEVER", e);
  }
  try {
    await except;
    console.log("NEVER");
  } catch (e) {
    console.log("OK2", e);
  }
  console.log("EXIT testBlockPar");
  return 1000;
};
