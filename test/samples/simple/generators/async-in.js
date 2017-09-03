M.profile("es")

M.option({combineOps:true,
          scopeContext:true,
          scopePrefix:true,
          contextState:true,
          contextMethodOps:true,
          markArgNum: false,
          markBindValue: false,
          markRec: false,
          markCatchCont: false,
          always: true})

async function a() {
}

async function b() {
  await delay(1);
}

async function c() {
  await (await delay(1));
}

async function d() {
  await await await delay(1);
}


async function* e() {
  yield 1
}

async function* f() {
  yield await delay(1)
  yield await delay(2)
  yield await delay(3)
}

async function* g() {
  for await(const i of f()) {
    yield await delay(i)
    yield i
  }
}
