async function delay() {
  console.log("BEFORE");
  await new Promise(i => setImmediate(i));
  console.log("AFTER");
}

(async function main() {
 await delay();
 await delay();
})()
