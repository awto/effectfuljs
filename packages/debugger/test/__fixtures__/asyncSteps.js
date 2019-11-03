async function there() {
  await doubleDelay();
  console.log("A1");
  await doubleDelay();
  console.log("A2");
}

async function doubleDelay() {
  await new Promise(i => setTimeout(i, 234));
  await new Promise(i => setTimeout(i, 123));
}
