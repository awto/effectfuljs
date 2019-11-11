async function delay() {
  console.log("BEFORE");
  await new Promise(i => setTimeout(i,400));
  console.log("AFTER");
}

(async function main() {
 await delay();
 await delay();
})()
