M.profile("es")

M.option({combineOps:true,
          scopeContext:true,
          scopePrefix:true,
          contextState:true,
          contextMethodOps:true,
          cleanupFrameVars:false,
          par:true,
          keepLastPure:true,
          defunct:true,
          storeCont:"$state",
          storeHandler:"$run",
          parRegion:true,
          reuseTempVars:true
         })

async function p0(a,b) {
  await g_1(await f_3, await f_4)
}

async function p1(a,b) {
  const x = await f_3
  const y = await f_4
  await g_1(x, y)
}

async function p2() {
  await k_1(await a_1)
  await k_2(await a_2)
}

async function p3() {
  await f_2
  await g_1(await f_3, await f_4)
  await f_5
}

async function p4() {
  await f_2(await a_1)
  await g_1(await f_3, await f_4)
  await f_5
}

async function p5() {
  if (await f0) 
    await e0(await f2)
  else
    await f1
  await f_2
}

async function p6() {
  await f8(await f3, await f9(await f5))
  await g2(await g3, await g4)
  await f_3
}

async function p7() {
  await f_3
  await f8(await f3, await f9(await f5))
  await g2(await g3, await g4)
}

async function p8() {
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

async function p9(a,b) {
  await m_1((await g_1(await f_3, await f_4)), await k_1)
}

async function p9_a(a,b) {
  await m_1(await k_1, (await g_1(await f_3, await f_4)))
}

async function p10() {
  const va = await a_1
  const vb = await a_2
  await k_1(va)
  await k_2(vb)
}

async function p11() {
  const i = await f_1()
  const x = await g_1(i)
  const y = await f_2()
  await k_1(x, y)
}

async function p12() {
  const i = await f_1()
  const x = await g_1(i)
  const y = await f_2()
  return await k_1(x, y)
}

async function p13() {
  const i = await f_1()
  const x = await g_1(i)
  const y = await f_2()
  const z = await k_1(x, y)
  return await fi_1(z)
}

async function p14() {
  let j,k
  const i = await init
  var a1 = await k_1(await a_1(i++), k+=await m2), a2 = await k_2(await a_2)
  j++
  await g(a1,a2)
  await f(a1,j,k)
  await f2(a2,j,k)
}

async function p15(a,b) {
  const x = await f_3(a)
  const y = await f_4(b)
  await g_1(x, y)
}

async function p16(a,b) {
  await g_1(await f_3(a), await f_4(b))
}

async function p17() {
  let j,k
  const w = await wery
  let i = await init(w)
  var a1 = await k_1(await a_1(i++,w), k+=await m2(w), w), a2 = await k_2(w, await a_2(w))
  return await g(a1,a2,w)
}

async function p18() {
  let j,k
  const w = await wery
  const i = await init(w)
  var a1 = await k_1(await a_1(i++,w), k+=await m2(w), w), a2 = await k_2(w, await a_2(w))
  j+= await m_1(w)
  await g(a1,a2,w)
}

async function p19() {
  let j,k
  const w = await wery
  const i = await init(w)
  var a1 = await k_1(await a_1(i++,w), k+=await m2(w), w), a2 = await k_2(w, await a_2(w))
  j+= await m_1(w)
  await g(a1,a2,w)
  await f(a1,j,k,w)
  await f2(a2,j,k,w)
}

async function p20() {
  let j,k
  const i = await init()
  var a1 = await k_1(await a_1(i++), k+=await m2()), a2 = await k_2(await a_2())
  j+= await m_1()
  await g(a1,a2)
  await f(a1,j,k)
  await f2(a2,j,k)
}

async function p21() {
  let j,k
  const i = await init()
  j = await g(i)
  k = await f(i)
  await m(j,k)
}

async function p22() {
  let j,k
  const i = await init()
  j = await g(i)
  jj = await j
  k = await f(i)
  await m(jj,k)
}

async function p23() {
  const i = await f_1()
  const x = await g_1(i)
  const y = await f_2()
  await k_1(x, y)
}

async function p24() {
  const i = await f_1()
  const x = await g_1(i)
  const y = await f_2()
  await k_1(x, y)
}


async function p25() {
  const i = await f_1()
  const x = await g_1(i)
  const y = await f_2()
  const z = await k_1(x, y)
  return await fi_1(z)
}

async function p26() {
  const x = await f_1()
  const y = await f_2()
  const z = await f_3()
  const a = await g_1(x, y)
  const b = await g_2(x, z)
  await k_1(a, b)
}

async function p27() {
  let j,k, jj, z, x
  z = await pre
  x = await mu
  jj = await bu(z,x)
  const i = await init()
  j = await g(i)
  k = await f(i)
  await m(jj,k,j)
}

async function p28() {
  let j,k, jj, z
  jj = await pre
  const i = await init()
  j = await g(i)
  k = await f(i)
  await m(jj,k,j)
}

async function p29() {
  const x = await init_x()
  const y = await init_y()
  await f_1(x, y)
  const y2 = await f_2(y)
  const y3 = await f_3(y)
  await f_4(y2, y3)
}

async function p30() {
  const i = await init()
  const x = await f_1()
  const y = await f_2()
  const y2 = await f_2_2(i, y)
  const z = await f_3()
  const a = await g_1(x, y)
  const b = await g_2(y, z)
  const b1 = await g_2_b1(b)
  const b2 = await g_2_b2(b)
  const c = await g_3(x, z)
  const d = await g_4(z, x)
  const m = await k_1(i, y, a, b, c, d, y2)
  const n = await k_2(i, y, a, b1, b2, c)
  await m_1(m, n)
}

async function p31() {
  let j,k, z, x
  z = await pre
  x = await mu
  await bu(z,x)
  const i = await init()
  j = await g(i)
  k = await f(i)
  await m(k,j)
}

M.option({
  parRegion:false,
  blockDirectives: {
    par: { parRegion:true },
    seq: { parRegion:false }
  }
})

async function p32() {
  await init
  {
    "par";
    await op_a
    await op_b
    {
      "seq";
      await op_sa
      await op_sb
      }
    if (await op_test) {
      await op_c
      await op_d
      if (test_1) {
        await op_f(await op_e)
        await op_g
      }
    }
    await op_k
  }
}


async function p33() {
  "par"
  await s_0
  if (something) {
    await s_1
    await s_1_1
  } else {
    await s_2
  }
  await s_3
} 

{
  "par"
  async function p34() {
    await s_0
    if (something) {
      await s_1(await s_1_1)
    } else {
      await s_2
    }
    await s_3
  } 
  
  async function p35() {
    if (something) {
      await s_1(await s_1_1)
    } else {
      await s_2
    }
    await s_3
  }
}

async function p36() {
  "par"
  await(something ? await s_1(await s_1_1) : await s_2)
  await s_3
} 

async function p37() {
  "par"
  await f_1(something ? await s_1(await s_1_1) : await s_2)
  await s_3
} 

async function p38() {
  "par"
  await f_1(something ? await s_1(await s_1_1) : await s_2) / await s_3
} 

async function p39() {
  "par"
  await s_0
  if (something) {
    await s_1(await s_1_1)
  } else {
    await s_2
  }
}

async function p40() {
  "par"
  if (await s_0) {
    await s_1(await s_1_1)
  } else {
    await s_2
  }
}

async function p41() {
  "par"
  await s_0
  return something ? await s_1(await s_1_1) : await s_2
}

async function p42() {
  "par"
  if (await s_0) {
    await s_1(await s_1_1)
  } else {
    return await s_2
  }
}

async function p43() {
  "par"
  await s_0
  if (something) {
    return await s_1(await s_1_1)
  } else {
    return await s_2
  }
}

async function p44() {
  "par"
  await s_0
  if (something) {
    await s_1(await s_1_1)
  } else {
    return await s_2
  }
}

async function p45() {
  "par"
  await s_0
  if (something) {
    await s_1(await s_1_1)
  } else {
    return s_2
  }
}

async function p46() {
  "par"
  await s_0
  if (something) {
    return s_1(await s_1_1)
  } else {
    await s_2
  }
}

async function p47() {
  "par"
  await init
  for(let i = 0;i<10;i++) {
    const j = i
    await gu_1(j)
    await gu_2(j)
  }
  await fin_1
}

async function p48() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    i+=await gu_1(i)
    i+=await gu_2(i)
  }
  await fin_1(i)
}

async function p49() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    await gu_1(i)
    await gu_2(i)
  }
  await fin_1(i)
}

async function p50() {
  "par"
  await init
  for(let i = 0;i<10;i++) {
    await fu_1(i += await gu_1(i),await gu_2(i))
  }
  await fin_1
}

async function p51() {
  await init
  {
    "par";
    await op_a
    await op_b
    {
      "seq";
      await op_sa
      await op_sb
    }
    if (await op_test) {
      await op_c
      await op_d
      if (test_1) {
        await op_f(await op_e)
        await op_g
      }
    }
    await op_k
  }
}

async function p52() {
  "par";
  let i = await init(await i_1, await i_2)
  await af_1(i,await pf_1_1,await pf_2_2)
  await af_2(i,await pf_2)
  i++
  await af_3(i)
  await af_4(i)
}

async function p53() {
  "par";
  let i = await init(await i_1, await i_2)
  if (i > 10) {
    await af_1(i, await pf_1_1, await pf_2_2)
    await af_2(i, await pf_2)
    i++
    await af_3(i)
    await af_4(i)
  }
  i+=2
  await af_5(i)
  await af_6(i)
}

async function p54() {
  "par";
  let i = await init(await i_1, await i_2)
  await pf_0_1(i)
  await pf_0_2(i)
  if (i > 10) {
    await af_1(i, await pf_1_1, await pf_2_2)
    await af_2(i, await pf_2)
    await af_3(i)
    await af_4(i)
  }
  await pf_2_1(i)
  await pf_2_2(i)
  i+=2
  await af_5(i)
  await af_6(i)
}

async function p55() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    await gu_1(i)
    await gu_2(i)
  }
  await fin_1(i)
}

async function p55() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    await gu_1(i)
    await gu_2(i)
  }
  await fin_1(i)
}

async function p56() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    await gu_1(i)
    await gu_2_2(i, await gu_2_1(i))
  }
  await fin_1(i)
}

async function p57() {
  "par"
  await init
  let i = 0, j = 0
  for(;i<10;i++) {
    j += await gu_1(i)
    await gu_2_2(i, j, await gu_2_1(i))
  }
  await fin_1(i)
}

async function p58() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    await gu_1(i)
    await gu_2(i)
  }
}

async function p59() {
  "par"
  await init
  let i = 0
  for(;i<10;i++) {
    await gu_1(i)
    await gu_2(i)
  }
  await fin_1(i,await fin_2(i))
}

async function p60() {
  "par"
  await init
  let i = 0, j = 0
  for(;i<10;i++) {
    for(;k<10;k++) {
      j += await gu_1(i,k)
      await gu_2_2(i, j, k, await gu_2_1(i, k))
    }
  }
}

async function p61() {
  "par"
  await init
  let i = 0, j = 0
  for(;i<10;i++) {
    for(;k<10;k++) {
      j += await gu_1(i,k)
      await gu_2_2(i, j, k, await gu_2_1(i, k))
    }
  }
  for(;j<10;j++) {
    await gu_3_0
    await gu_3_2(j, await gu_3_1(j))
  }
}

async function p62() {
  "par"
  await init
  let i = 0, j = 0
  for(;i<10;i++) {
    await gu_3_0
  }
  for(;i<10;i++) {
    await gu_3_0
    await gu_3_2(i, await gu_3_1(i))
  }
}

async function p63() {
  "par"
  await init
  let i = 0, j = 0
  for(;i<10;i++) {
    await gu_3_0
  }
  for(let ii = 0;ii<10;ii++) {
    await gu_3_0()
    await gu_3_2(ii, await gu_3_1(ii))
  }
}

async function p64() {
  "par"
  await init
  let i = 0, j = 0
  for(;i<10;i++) {
    await gu_3_0
  }
  for(let ii = 0;ii<10;ii++) {
    await gu_3_0(i)
    await gu_3_2(ii, await gu_3_1(ii))
  }
}

async function p65() {
  "par"
  await init
  try {
    await p_1
    await p_2
  } catch(e) {
    await p_3(e)
    await p_4(e)
  }
  await fin
}

async function p66() {
  "par"
  await init
  try {
    await p_1
    await p_2
  } catch(e) {
    await p_3(e)
    await p_4(e)
  }
}

async function p67() {
  "par"
  await init
  try {
    await p_1
    await p_2
  } catch(e) {
  }
  await fin
}

async function p68() {
  "par"
  try {
    await init
    try {
      await p_1
      await p_2
    } catch(e) {
      await e_1(e)
    }
    await fin
  } catch(e) {
    await e_2
  }
}

async function p69() {
  "par"
  try {
    await init
    try {
      await p_1
      await p_2
    } catch(e) {
      await e_1(e)
    }
  } catch(e) {
    await e_2
  }
}

async function p70() {
  await pre_init
  {
    "par"
    try {
      await p_1
      await p_2
    } catch(e) {
      await e_1(e)
    }
  }
  await fin
}

async function p71() {
  "par"
  let i, j, k, m, n, f
  await o_1
  {
    "seq"
    n = 1
    loo1: {
      if (check2) {
        m = 2 + n
        break loo1
      } else {
        m = 3 + n
      }
      k = 4 + m
    }
    f = 4 + k
    console.log(k)
    await i_0
    lo: {
      i = 1
      await i_1(i)
      if (check_1) {
        break lo
      } else
        await i_2(i)
      j = 10
      await i_3(i)
    }
    await i_4(i, j)
  }
  await o_2(i)
}

async function p72() {
  "par";
  await t_c_b_1
  await t_5_b_3
  for(;cond_1;) {
    try {
      if (break_or_cont) {
        if (or_cont)
          continue
        break
      } 
      await t_c_c_1
      await t_5_c_3
    } finally {
      await f_1
      await f_2
    }
     
  }
  await t_c_f_1
  await t_5_f_3
}

async function p73() {
  "par";
  await t_5_b_3
  try {
    await t_c_c_1
    await t_5_c_3
  } finally {
    await f_1
    await f_2
  }
  await t_c_f_1
}

async function p74() {
  "par";
  await t_5_b_3
  try {
    await t_c_c_1
    await t_5_c_3
  } finally {
  }
  await t_c_f_1
}

async function p75() {
  "par";
  for(;cond_1;) {
    if (break_or_cont) {
      await t_c_c_2
      if (cond_2_)
        continue
      await t_c_c_3
    }
    await t_c_c_1
    await t_5_c_3
  }
}

async function p76() {
  "par";
  lo: for(;cond_1;) {
    if (t_c_1) {
      if (t_8_1) {
        for(;cond_2;) {
          await t_5_b_8
          await t_5_b_9
        }
      } else {
        if (break_or_cont)
          break
        else
          continue
      }
    } else {
      await t_c_c_1
    }
    await t_5_c_3
  }  
}

async function p77() {
  "par";
  await t_1
  for(;cond_2;) {
    await t_5_b_8
    await t_5_b_9
  }
  for(;cond_1;) {
    if (re_cond) {
      await t_c_c_2
      await t_c_c_3
    }
    await t_c_c_1
    await t_5_c_3
  }
  await t_2
  if (check_1) {
    for(;;) {
      await i_1
    }
  } else {
    if (check_3) {
      for(;;) {
        await j_1
        await j_2
      }
    }
  }
  await m_0
  if (cond_m_1) {
    if (cond_m_2) {
    } else {
      await m_1
      await m_2
    }
    await m_3
  }
  await t_T_1
  if (conct_T_t1) {
    try {
      await tf_T_1
      await tf_T_2
    } finally {
      await tf_T_f_1
      await tf_T_f_2
    }
  }
  await t_T_2
  await m_4
  if (t_p_1) {
    if (t_5_4) {
      lo: for(;cond_1;) {
        if (t_c_1) {
          if (t_8_1) {
            for(;cond_2;) {
              await t_5_b_8
              await t_5_b_9
            }
          } else {
            if (break_or_cont)
              break
            else
              continue
          }
        } else {
          await t_c_c_1
        }
        await t_5_c_3
      }
    } else {
      await t_5_b_9
    }
    await t_k_1
  } else {
    await t_k_2
  }
  await t_k_4
  br: for(;;){
    try {
      try {
        await p_0
        if (await p_1) {
          if (p2)
            break br
          await p_1_1
        }
        {
          "seq"
          if (await s_1)
            return
          if (await s_2)
            return 10
          await s_3
        }
        await p_2
      } finally {
        await p_3
        await p_4
      }
      await p_5
      if (t_5_1) {
        await t_5_b_1
        await t_5_b_2
        if (t_5_2) {
          if (t_5_3) {
            await t_5_b_3
            await t_5_b_4
          } else {
            await t_5_b_5
            await t_5_b_6
            if (t_p_1) {
              if (t_5_4) {
                lo2: {
                  if (t_c_1) {
                    if (t_8_1) {
                      await t_5_b_7
                      await t_5_b_8
                    } else {
                      break lo2
                    }
                  } else {
                    await t_c_c_1
                    await t_c_c_2
                  }
                  await t_5_c_3
                }
              } else {
                await t_5_b_9
                await t_5_b_X
              }
              await t_k_1
            } else {
              await t_k_2
              await t_k_3
            }
            await t_k_4
            await t_k_5
          }
          await t_f_1
          await t_f_2
        } else {
          if (t_5_3) {
            await t_5_b_3
            await t_5_b_4
          } else {
            if (t_5_4) {
              break br
            }
            if (t_5_4_1)
              continue
            if (t_5_5) {
              for(;;) {
                await l_1_1
              }
            }
            await t_5_b_5
            await t_5_b_6
          }
        }
        await t_5_b_7
        await t_5_b_8
        
      }
      await p_6
    } finally {
      await p_7
      await p_8
    }
    await f_1
  }
}

async function p78() {
  await pre_init
  {
    "par"
    await p_1
    await p_2
  }
  await fin
}

async function p79() {
  "par"
  {
    "seq"
    await pre_init1
    await pre_init2
  }
  await p_1
  await p_2
  {
    "seq"
    await fin1
    await fin2
  }
}

async function p80() {
  {
    "par"
    await pre_init1
    await pre_init2
  }
  await p_1
  await p_2
  {
    "par"
    await fin1
    await fin2
  }
}

async function p81() {
  await pre_init
  {
    "par"
    await p_1
    {
      "seq"
      await s_1
      await s_2
    }
    await p_2
  }
  await fin
}

async function p82() {
  "par"
  await pre_init
  {
    "seq"
    await p_1
    {
      "par"
      await s_1
      await s_2
    }
    await p_2
  }
  await fin
}

async function p83() {
  "par"
  if (await test) {
    await hi
    await there
  }
  await me
}

async function p84() {
  "par"
  for(let i = 0;i<10;i++) {
    await lu(i)
  }
}

async function p85() {
  "par"
  for(const i of di) {
    await gu(i)
  }
}

async function p86() {
  "par"
  for(const i of iter1) {
    await bd_2(i)
  }
  for(const i of iter2) {
    await bd_1(i)
  }
}

async function p87() {
  "par"
  for(const i of iter1) {
    for(const j of iter2(i)) {
      await bd_1(i,j)
    }
  }
}

async function p88() {
  "par"
  await a_1
  {
    "seq"
    await a_2
    {
      "par"
      await a_3
      {
        "seq"
        await a_4
        {
          "par"
          await a_5
          return await a_6
        }
      }
    }
  }
}

async function p89() {
  "par"
  for(const i of iter1_1) {
    for(const j of iter1_2(i)) {
      await bd_1(i,j)
    }
  }
  for(const i of iter2_1) {
    await bd_2(i)
  }
}

async function p90() {
  "par"
  for(const i of iter1_1) {
    for(const j of iter1_2(i)) {
      await bd_1_1(i,j)
      await bd_1_2(i,j)
    }
  }
  for(const i of iter2_1) {
    await bd_2(i)
  }
}

async function p91() {
  "par"
  for(const i of iter1_1) {
    for(const j of iter1_2(i)) {
      await bd_1_1(i,j,await bd_1_2(i,j))
    }
  }
  for(const i of iter2_1) {
    await bd_2_1(i)
    await bd_2_2(i)
  }
}

async function p92() {
  "par"
  for(const i of iter1_1) {
    for(const j of iter1_2(i)) {
      await bd_1_1(i,j)
      await bd_1_2(i,j)
    }
    for(const i of iter2_1) {
      await bd_2_1(i)
      await bd_2_2(i)
    }
  }
}

async function p93() {
  "par"
  let cnt = 0
  for(const i of iter1_1) {
    cnt += await bd_1_1(i)
    await bd_1_2(i, cnt)
  }
  for(const i of iter2_1) {
    cnt += await bd_2_1(i)
    await bd_2_2(i)
  }
}

async function p94() {
  "par"
  let cnt1 = 0
  for(const i of iter1_1) {
    cnt1 += await bd_1_1(i)
    await bd_1_2(i, cnt1)
  }
  let cnt2
  for(const i of iter2_1) {
    cnt2 += await bd_2_1(i)
    await bd_2_2(i)
  }
}

async function p95() {
  {
    "par"
    await s_0
    if (something) {
      await s_1(await s_1_1)
    } else {
      await s_2
    }
  }
  await s_3
}

async function p96() {
  "par"
  for(const i of iter1_1) {
    for(const i of iter2_1) {
      await s_1(i)
    }
  }
}

async function p97() {
  "par"
  let cnt = 0
  for(const i of iter1_1) {
    for(const j of iter2_1(i)) {
      cnt += await s_1(i,j)
      await s_2(i,j)
    }
  }
}

async function p98() {
  "par"
  for(const i of iter1_1) {
    let cnt = 0
    for(const j of iter2_1(i)) {
      cnt += await s_1(i,j)
      await s_2(i,j)
    }
  }
}

async function p99() {
  "par"
  for(const i of iter1_1) {
    for(const j of iter2_1(i)) {
      await bd_1(i,j)
    }
  }
  for(const i of iter1_2) {
      await bd_2(i)
  }
}

async function r01() {
  "par"
  for(const i of iter1_1) {
    for(const j of iter2_1(i)) {
      await bd_1(i,j)
    }
  }
  for(const i of iter1_2) {
    for(const j of iter2_2(i)) {
      await bd_2(i,j)
    }
  }
}

async function r02() {
  {
    "par"
    {
      "seq"
      {
        "par"
        {
          "seq"
          await a_1
          await a_2
        }
        await a_3
      }
      await a_4
    }
    await a_5
  }
  await a_6
}

async function r03() {
  "par"
  {
    "seq"
    {
      "par"
      {
        "seq"
        {
          "par"
          await a_1
          await a_2
        }
        await a_3
      }
      await a_4
    }
    await a_5
  }
  await a_6
}

async function r04() {
  "par"
  try {
    await b_1
    await b_2
  } finally {
    await f_1
    await f_2
  }
}


async function r05() {
  "par"
  try {
    await b_1
    return await b_2
  } finally {
    await f_1
    await f_2
  }
}

async function r06() {
  "par"
  try {
    try {
      await b_1
      return await b_2
    } finally {
      await f_1
    }
  } finally {
    await f_2
  }
}

async function r07() {
  lo: {
    "par"
    try {
      await b_1
      if (something)
        break lo
      await b_2
    } finally {
      await f_1
    }
  }
  await s_1
}

async function r08() {
  lo: {
    try {
      "par"
      try {
        try {
          await b_1
          if (something)
            return await b_2
          else if (somethingElse)
            break lo
        } finally {
          await f_1
        }
        await b_3
      } finally {
      await f_2
      }
    } finally {
      await f_3
    }
  }
  await s_1
}

async function r09() {
  {
    "par"
    await p_1
    try {
      await p_2
      if (something_2)
        await p_t_2
      else
        await p_e_2
    } finally {
      await f_1
    }
  }
  await s_1
}

async function r10() {
  "par"
  try {
    await b_1
    await b_2
  } finally {
    await f_1
    await f_2
  }
}

async function r11() {
  "par"
  try {
    await b_1
    await b_2
  } finally {
    await f_1
    return await f_2
  }
}

async function r12() {
  lo: {
    try {
      "par"
      try {
        try {
          await b_1
          if (something)
            break lo
        } finally {
          await f_1
        }
        await b_3
      } finally {
        await f_2
      }
    } finally {
      await f_3
    }
  }
  await s_1
}

async function r13() {
  "par"
  try {
    try {
      await b_1
      if (something)
        return await b_2
    } finally {
      await f_1
    }
    await b_3
  } finally {
    await f_2
  }
}

async function r14() {
  {
    "par"
    try {
      await b_1
      if (something)
        return await b_2
    } finally {
      await f_1
    }
  }
  await s_1
}


async function r15() {
  {
    "par"
    try {
      await p_1
      if (something_1)
        await p_t_1
      else
        await p_e_1
    } finally {
      await f_1
    }
    try {
      await p_2
      if (something_2)
        await p_t_2
      else
        await p_e_2
    } finally {
      await f_2
    }
  }
  await s_1
}

async function r16() {
  {
    "par"
    try {
      lo: {
        try {
          await b_1
          if (something)
            break lo
        } finally {
          await f_1
        }
      }
    } finally {
      await f_2
    }
  }
  await s_1
}

