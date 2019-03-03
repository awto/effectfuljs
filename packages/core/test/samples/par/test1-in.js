M.profile("es")

M.option({combineOps:true,
          scopeContext:true,
          scopePrefix:true,
          contextState:false,
          topLevel:false,
          contextMethodOps:true,
          cleanupFrameVars:false,
          par:true,
          keepLastPure:true,
          defunct:true,
          storeCont:"$state",
          storeHandler:"$run",
          reuseTempVars:true
         })

{
  "par"

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
}

async function p32() {
  await init
  {
    "par"
    await op_a
    await op_b
    {
      "seq"
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

async function r17() {
  "par"
  try {
    await send("a_1")
    await send("a_2")
  } finally {
    await send("f_1")
  }
}

async function r18(k) {
  "par"
  let i = 0, j = 0
  await t_1(k)
  await t_2(k)
  for(;somethingElse;) {
    await o_1(j)
    await o_2(j)
    j = 2
    await o_3(await o_4(j),j)
    for(;something;) {
      await a_1(i)
      await a_2(i)
      i = 1
      await a_3(i)
      await a_4(i)
      {
        "seq"
        await s_1(i)
        {
          "par"
          i = 1
          await p_2(await p_1(i),i,j,k)
          i = 2, k = 2
          await p_3(await p_4(i,j,k),i,j,k)
          await p_5(i)
        }
      }
      await a_5(i)
      i = 4
      await a_7(await a_6(i),i)
    }
    j = 3
    await o_5(j,i)
    await o_6(j,k)
  }
  k = 3
  await t_3(k)
}

async function r19() {
  "par"
  let i = 0, j = 0
  try {
    await e_1(i)
    i = await e_2(i)
    await e_3(i)
    i = await e_4(i)
    await e_5(i)
    await e_6(i)
    j = 10
    await a_7(j)
    await a_8(j)
  } finally {
    await f_1(i)
  }
}

async function r20(i) {
  "par"
  try {
    await f_1(await e_1(i),i)
    await f_2(await e_2(i),i)
  } finally {}
  i = 10
  try {
    try {
      await f_2(await e_2(i),i)
      i -= await f_3(await e_3(i),i)
    } finally {
      console.log(i)
    }
  } finally {}
}

async function r21(i) {
  try {
    {
      "par"
      for(;;) {
        await e_1(i)
        try {
          await e_2(i)
        } finally {
          await f_i
        }
        i = await i_1(await i_2(i))
        await e_3(i)
        await e_4(i)
        i = 20
        await e_5(i)
        await e_6(i)
      }
    }
    await s_1
  } finally {
    await f_1
  }
}

async function r22() {
  "par"
  let i = 0
  await e_1(i)
  await e_2(i)
  if (something)
    i = 10
  await e_3(i)
  await e_4(i)
  if (somethingElse)
    i = 20
  await e_5(i)
  await e_6(i)  
}

async function r23(i) {
  try {
    {
      "par"
      for(;;) {
        // TODO: make e_1 parallel
        // it ignore first rec-frame because it usually contains the if,
        // though, maybe it shouldn't
        await e_1(i)
        try {
          await e_2(i)
        } finally {
          await f_i
        }
        i = await i_1(await i_2(i))
        await e_3(i)
        await e_4(i)
        i = 20
        await e_5(i)
        await e_6(i)
      }
    }
    await s_1
  } finally {
    await f_1
  }
}

async function r24(i) {
  "par"
  for(;;) {
    await e_1(i)
    try {
      await e_2(i)
    } finally {
      await f_i
    }
    i = await i_1(await i_2(i))
    await e_3(i)
    await e_4(i)
    i = 20
    await e_5(i)
    await e_6(i)
  }
}

async function r25() {
  "par"
  for(let i = 0;something;) {
    i += await e_2(await e_1(i), i)
    await i_1(i)
    i = 2
    await e_4(await e_3(i),i)
  }
}

async function r26(){
  let i,j,k
  {
    "par"
    {
      "seq"
      if (await a_1())
        i = "a"
    }
    for(;something;) {
      {
        "seq"
        if (await a_2())
          j = "b"
      }
      for(;somethingElse;) {
        {
          "seq"
          if (await a_3())
            k = "c"
        }
        {
          "seq"
          if (await a_4())
            k = "d"
        }
      }
      {
        "seq"
        if (await a_5())
          j = "e"
      }
    }
    {
      "seq"
      if (await a_6())
        i = "f"
    }
  }
  await f_1(i,j,k)
}

async function r27(){
  let i
  {
    "par"
    {
      "seq"
      if (await a_1())
        i = "a"
    }
    for(;something;) {
      {
        "seq"
        if (await a_2())
          i = "b"
      }
      for(;somethingElse;) {
        {
          "seq"
          if (await a_3())
            i = "c"
        }
        {
          "seq"
          if (await a_4())
            i = "d"
        }
      }
      {
        "seq"
        if (await a_5())
          i = "e"
      }
    }
    {
      "seq"
      if (await a_6())
        i = "f"
    }
  }
  await f_1(i)
}

async function r28() {
  "par"
  let i = "I"
  {
    "seq"
    if (something)
      i = "a"
    {
      "par"
      await a_1_2(await a_1_1(i),i)
    }
  }
  {
    "seq"
    if (somethingElse)
      i = "b"
    await a_2_1
  }
  {
    "par"
    {
      "seq"
      await f_1(i)
      if (someF)
        i = "B"
      {
        "par"
        await g_1(i)
        await g_2(i)
      }
    }
    {
      "seq"
      i = "G"
      await g_1(i)
    }
  }
  {
    "seq"
    i = "c"
    {
      "par"
      await a_3_1(await a_3_2(i),i)
    }
  }
}

async function r29() {
  "par"
  let {i} = "I", j = "J"
  {
    "seq"
    if (something)
      i = "a"
    {
      "par"
      await a_1_2(await a_1_1(i),i)
    }
  }
  {
    "seq"
    if (somethingElse)
      console.log([i] = "b")
    await a_2_1
  }
  {
    "seq"
    await f_1(i)
    if (someF) {
      console.log(i++)
      i++
    }
    await f_2(i)
  }
  {
    "seq"
    i = "c"
    {
      "par"
      await a_3_1(await a_3_2(i,j),i,j)
    }
  }
}

async function r30(){
  let i = 0, j = 0, k = 0
  {
    "par"
    {
      "seq"
      if (await a_1())
        i = 1
    }
    {
      "seq"
      if (await a_6())
        i = 6
    }
  }
  await f_1(i,j,j)
}

async function r31(){
  let i
  {
    "par"
    for(;something;) {
      {
        "seq"
        if (await a_3())
          i = "a"
      }
      {
        "seq"
        if (await a_4())
          i = "b"
      }
    }
  }
  await f_1(i)
}

async function r32(){
  let i = 0
  {
    "par"
    {
      "seq"
      if (await a_1())
        i = 1
    }
    {
      "seq"
      {
        "par"
        {
          "seq"
          if (await a_2())
            i = 2
        }
        {
          "seq"
          if (await a_3())
            i = 3
        }
      }
      await f_0(i)
    }
    await a_4(i)
    {
      "seq"
      if (await a_5())
        i = 4
    }
  }
  await f_1(i)
}

async function r33() {
  "par"
  let {i} = "I"
  for(;something(i);) {
    let j = "J"
    {
      "seq"
      if (await something)
        i = "a"
      {
        "par"
        await a_1_2(await a_1_1(i),i)
      }
    }
    {
      "seq"
      if (await somethingElse)
        console.log([i] = "b")
      await a_2_1
    }
    {
      "seq"
      await f_1(i)
      if (someF) {
        console.log(i++)
        i++
      }
      await f_2(i)
    }
    {
      "seq"
      i = "c"
      {
        "par"
        await a_3_1(await a_3_2(i,j),i,j)
      }
    }
  }
}

async function r34() {
  "par"
  let i
  for(;something;) {
    {
      "seq"
      i = 0
      {
        "par"
        i+=await eff_1(i)
        await eff_2(i)
        await eff_3(i)
        i = await eff_4()
        await eff_5(i)
        await eff_6(i)
      }
    }
    {
      "seq"
      i = 1
      {
        "par"
        i-=await efg_1(i)
        await efg_2(i)
        await efg_3(i)
        i = i + await eff_4(i)
        await efg_5(i)
        await efg_6(i)
      }
    }
  }
}

async function r35() {
  "par"
  let i
  i+=await eff_1(i)
  await eff_2(i)
  await eff_3(i)
  i = await eff_4()
  await eff_5(i)
  await eff_6(i)
}

async function r36(i) {
  "par"
  i+=await eff_1(i)
  await eff_2(i)
  await eff_3(i)
}

async function r37() {
  "par"
  let {i} = "I"
  for(;something(i);) {
    i = await f_1(await f_2(i))
    await f_4(await f_3(i))
    await f_6(await f_5(i))
    i += await f_8(await f_7(i))
  }
}

async function r38() {
  "par"
  let {i} = "I"
  await g_1(await g_2(i))
  i = await f_1(await f_2(i))
  await f_4(await f_3(i))
  await f_6(await f_5(i))
  i += await f_8(await f_7(i))
}

async function r39() {
  "par"
  let i
  await g_1(await g_2(i))
  i = await f_1(await f_2(i))
  await f_4(await f_3(i))
  await f_6(await f_5(i))
  i += await f_8(await f_7(i))
}

async function r40() {
  "par"
  let i
  await init
  for(i = 0;i<10;i++) {
    let j = i
    await gu_0(i,j)
    j = await gu_1(i,j)
    i += await gu_2(i,j)
    await gu_3(i,j)
    await gu_4(i,j)
  }
  await fin_1
}

async function r41() {
  "par"
  let i
  for(let k = 0;k<10;k++) {
    for(let m = 0;m<10;m++) {
      await init
      for(i = 0;i<10;i++) {
        const j = i
        await gu_1(j,k,m)
        await gu_2(j,k)
      }
      await fin_1
    }
  }
}

async function r42() {
  "par"
  let i
  for(let k = 0;k<10;k++) {
    for(let m = 0;m<10;m++) {
      await init
      for(i = 0;i<10;i++) {
        const j = i
        await gu_1(j,k,m)
        k = await gu_2(j,k)
        await gu_3(k)
      }
      await fin_1
    }
  }
}

async function r43() {
  {
    "par"
    let j = 10
    await a_1(j)
    j = 20
    await a_2(j)
    j = 30
    await a_3(j)
  }
  let k
  {
    "par"
    for(const i of something_1) {
      for(const j of something_2) {
        for(k of something_3) {
          await a_1(i,j,k)
          j = 20
          await a_2(i,j,k)
          j = 30
          await a_3(i,j,k)
        }
      }
    }
  }
  {
    "par"
    for(const i of something_1) {
      for(const j of something_2) {
        for(const k of something_3) {
          for(const l of something_4) {
            let m = 0
            await a_1(i,j,k,l,m)
            m = 200
            await a_2(i,j,k,l,m)
            m = 300
            await a_3(i,j,k,l,m)
          }
          await a_4
        }
        await a_5
      }
    }
    await a_6
  }
  {
    "par"
    let j
    for(const i of something_1) {
      for(j of something_2) {
        await a_1(i,j)
        j = 20
        await a_2(i,j)
        j = 30
        await a_3(i,j)
      }
    }
  }
  {
    "par"
    for(const i of something_1) {
      await a_1(i)
    }
  }
  {
    "par"
    for(;something_1;) {
      "seq"
      await a_1
      await a_2
    }
  }
  {
    M.option({parRegion:true})
    for(;something_1;) {
      for(;something_2;) {
        if (a) {
          await a_1
          continue
        }
        await a_2
      }
    }
  }
  {
    "par"
    for(;something_1;) {
      "seq"
      {
        "par"
        for(const j of something_2) {
          await a_1
        }
      }
      await a_2
    }
  }
  await a_last(k)
}

async function r44() {
  {
    "par"
    for(const i of something_1) {
      await a_1
    }
  }
  {
    "par"
    for(const i of something_1) {
      for(const j of somethingElse_1) {
        await b_1
      }
    }
  }
  {
    "par"
    for(;something_2;) {
      if (await a_2)
        break
    }
  }
  {
    "par"
    for(;something_3;) {
      await a_3
      if (await a_4)
        break
      await a_5
    }
  }
  {
    "par"
    up_1: for(;something_4;) {
      await a_6
      for(;something_5;) {
        if (await a_7)
          break up_1
      }
    }
  }
  {
    "par"
    for(;await something_4;) {
      for(;await something_5;) {
        await a_5
      }
    }
  }
  {
    "par"
    for(;something_4;) {
      for(;something_5;) {
        await a_5
      }
    }
  }
}

async function r45() {
  "par"
  for(;something_1;) {
    await a_1
  }
  for(;await somethingElse_1;) {
    await b_1
  }
  for(;something_2;) {
    for(;something_3;) {
      await a_2
      await a_3
    }
  }
  for(;await something_4;) {
    for(;await something_5;) {
      await a_4
      await a_5
    }
  }
  for(;await something_6;) {
    await a_6
    for(;await something_7;) {
      await a_7
      await a_8
    }
  }
  for(;await something_8;) {
    for(;await something_9;) {
      await a_9
      await a_10
    }
    await a_11
  }
  for(;await something_10;) {
    await a_11
    for(;await something_11;) {
      await a_12
      await a_13
    }
    await a_14
  }
  for(;something_12;) {
    for(;something_13;) {
      for(;something_14;) {
        await a_15
        await a_16
      }
    }
  }
}

async function r46() {
  "par"
  let k
  for(;something_1;) {
    up: for(let i = 0;await check_1(i);i++) {
      for(let j = 0;await check_2(j);) {
        if (something1) {
          await send(`k-a-${j}`)
          if (something2) {
            await send(`k-b-${j}`)
            continue
          }
          continue
        }
        if (something3) {
          if (somethin4) {
            await send(`k-c-${j}`)
            continue
          }
          await send(`k-d-${j}`)
          continue
        }
        k = await send(`k-e-${j}`)
      }
      k = await send(`up-${i,j}`)
    }
  }
  await send(`${k}-fin`)
  lo: for(;;) {
    for(;;) {
      if (something)
        continue lo
      else if (sometingElse)
        break lo
      await send(`lo`)
    }
  }
}

async function r47() {
  "par"
  for(const i1 of [10,20]) {
    for(const i2 of [1,2]) {
      for(const i3 of ["A","B"]) {
        let j = 0
        if (await send(`sa:${i1}/${i2}/${i3}/${j}`,(30-i1)/i2,t))
          j = 10
        if (await send(`sb:${i1}/${i2}/${i3}`,(30-i1)/i2+2,t))
          j = 20
        await send(`ta:${i1}/${i2}/${i3}/${j}`,15)
        j++
        await send(`tb:${i1}/${i2}/${i3}/${j}`,10)
      }
    }
  }
}

async function r48() {
  "par"
  let i = 0
  await send(`a:${await send("b:" + i,10)}:${i}`,10)
  i++
  await send(`c:${await send("d:" + i,5)}:${i}`,5)
}

async function r49() {
  "par"
  let i = 0
  await send(`a:${await send("b:"+i,15)}/${i}`,15)
  i++
  await send(`c:${await send("d:"+i,10)}/${i}`,10)
  i++
  await send(`e:${await send("f:"+i,5)}/${i}`,5)
}

async function r50() {
  let i = 0
  {
    "par"
    {
      "seq"
      if (await something_1)
        i = 1
    }
    {
      "seq"
      if (await something_2)
        i = 2
    }
    {
      "seq"
      await a_1(i)
      await a_2(i)
    }
    {
      "seq"
      if (await something_3)
        i = 3
    }
  }
}

let incr1, incr2

async function r51() {
  "par"
  let value1, value2;
  [value1, incr1] = await e_1;
  [value2, incr2] = await e_2
  return [value1,value2]
}
