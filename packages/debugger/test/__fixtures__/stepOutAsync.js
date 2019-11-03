let i = 0;
async function func0() {
  i++;
  await new Promise(setImmediate);
}

async function func1() {
  await func0();
  debugger;
  await func0();
}

async function func2() {
  await func1();
  await func1();
}

async function func3() {
  await (async function sub() {
    await new Promise(setImmediate);
    func2();
  })();
  await func1();
  await func0();
  console.log("I", i);
}

func3();
