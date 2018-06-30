M.profile("es")

M.option({combineOps:true,
          scopeContext:true,
          scopePrefix:true,
          contextState:true,
          contextMethodOps:true,
          parVars:"none",
          par: true})

async function p0(a,b) {
  await g_1(await f_3, await f_4)
}

async function p1() {
  await k_1(await a_1)
  await k_2(await a_2)
}

async function p2() {
  await f_2
  await g_1(await f_3, await f_4)
  await f_5
}

async function p3() {
  await f_2(await a_1)
  await g_1(await f_3, await f_4)
  await f_5
}

async function p4() {
  if (await f0) 
    await e0(await f2)
  else
    await f1
  await f_2
}

async function p5() {
  await f8(await f3, await f9(await f5))
  await g2(await g3, await g4)
  await f_3
}

async function p6() {
  await f_3
  await f8(await f3, await f9(await f5))
  await g2(await g3, await g4)
}

async function p7() {
  await k_0
  if (await f0) 
    await e0(await f2)
  else
    await f1
  await f_2
  await f_3
  await f8(await f3, await f9(await f5))
  await g2(await g3, await g4)
}

async function p8(a,b) {
  await m_1((await g_1(await f_3, await f_4)), await k_1)
}
