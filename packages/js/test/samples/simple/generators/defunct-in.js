M.profile("disabled")
M.profile("generators")
M.option({defunct:true,state:false})
  
function* a() {
  yield 1
  yield 2
}


function* b() {
  yield 1
  try {
    yield 2
  } catch(e) {
    yield e
  }
}

function* c() {
  yield 1
  try {
    yield 2
  } catch(e) {
    yield e
  } finally {
    yield "F"
  }
}

function* d() {
  for(const i of s) {
    yield* [i]
    yield i
  }
}

async function af1() {
  if (await a)
    await b
  return await c
}

M.option({defunct:true,state:false,tailCalls:false})

function* b2() {
  yield 1
  try {
    yield 2
  } catch(e) {
    yield e
  }
}
    
async function af2() {
  if (await a)
    await b
  return await c
}

