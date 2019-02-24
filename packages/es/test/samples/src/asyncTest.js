const assert = require("assert")

const ES = require("@effectful/es-rt")

function nop() {}
const copy = {}

let send, sendErr, evaluate
{
  const stop = {}
  let output  = []
  let res
  let t = 0
  const doneJobs = []
  const scheduleJobs = []
  const cancelJobs = []
  let cont
  let done
  readLoop()
  evaluate = async function(promise) {
    const r = await promise
    done = true
    send(stop)
    const res = output
    output = []
    t = 0
    return res
  }
  function wrapCancel(data,p) {
    p[ES.cancelSymbol] = () => (data.canceled = true, cancelJobs.push(data.arg))
    return p
  }
  send = function send(arg, timeout = 0, result = nop) {
    const j = pack(arg,timeout,result)
    return j && wrapCancel(j,new Promise(c => j.cont = c))
  }
  sendErr = function(arg, timeout = 0) {
    const j = pack(arg,timeout)
    return wrapCancel(j,new Promise(
      (_, cont) => j.cont = loc => cont(new Error(`${arg}/${loc||"?"}`))))
  }
  function pack(arg, timeout, result) {
    if (cont)
      cont()
    if (result === copy)
      result = arg
    if (arg === stop)
      return null
    const j = {arg,timeout,result,at:timeout + t}
    scheduleJobs.push(j)
    const order = doneJobs.findIndex(k => k.at > j.at)
    if (order < 0)
      doneJobs.push(j)
    else
      doneJobs.splice(order,0,j)
    return j
  }
  async function readLoop() {
    for(;;) {
      await new Promise(c => setTimeout(c,0))
      let tup = []
      if (cancelJobs.length)
        output.push(`! ${cancelJobs.join()}@${t}`)
      cancelJobs.length = 0
      if (scheduleJobs.length)
        output.push(`> ${scheduleJobs.map(i => i.arg).join()}@${t}`)
      scheduleJobs.length = 0
      if (doneJobs.length) {
        t = doneJobs[0].at
        while(doneJobs.length) {
          const f = doneJobs[0]
          if (f.at === t) {
            doneJobs.shift()
            output.push(`<${f.canceled ? "!" : ""} ${f.arg}@${t}`)
            f.cont(f.result === nop ? t : f.result)
          } else
            break
        }
      }
      cont = null
    }
  }
}

describe("async `try/catch`", function() {
  it("should conform to ES", async function() {
    assert.deepEqual(
      await evaluate(async function ex1() {
        try {
          await send("a_1")
          throw new Error("A")
        } catch(e) {
          await send(`E:${e.message}`)
        }
        await send("a-after")
      }()),["> a_1@0", "< a_1@0", "> E:A@0", "< E:A@0",
            "> a-after@0", "< a-after@0"])
    assert.deepEqual(
      await evaluate(async function ex2() {
        try {
          throw new Error("A")
          await send("a_1")
        } catch(e) {
          await send(`E:${e.message}`)
        }
        await send("a-after")
      }()),["> E:A@0", "< E:A@0", "> a-after@0", "< a-after@0"])
    assert.deepEqual(
      await evaluate(async function ex3() {
        try {
          await sendErr("A")
          await send("a_1")
        } catch(e) {
          await send(`E:${e.message}`)
        }
        await send("a-after")
      }()),["> A@0", "< A@0", "> E:A/?@0", "< E:A/?@0",
            "> a-after@0", "< a-after@0"])
    assert.deepEqual(
      await evaluate(async function ex4() {
        try {
          await send("a_1")
          await sendErr("A")
        } catch(e) {
          await send(`E:${e.message}`)
        }
        await send("a-after")
      }()),["> a_1@0", "< a_1@0", "> A@0", "< A@0", "> E:A/?@0", "< E:A/?@0",
            "> a-after@0", "< a-after@0"])
    assert.deepEqual(
      await evaluate(async function ex5() {
        try {
          await send("a_1")
          await sendErr("A")
          await send("a_2")
        } catch(e) {
          await send(`E:${e.message}`)
        }
        await send("a-after")
      }()),["> a_1@0", "< a_1@0", "> A@0", "< A@0", "> E:A/?@0", "< E:A/?@0",
            "> a-after@0", "< a-after@0"])
    assert.deepEqual(
      await evaluate(async function ex6() {
        try {
          try {
            throw 1
            await send(`never`)
          } finally {
            await send("f-1")
          }
        } catch(e) {
          await send(`e-${e}`)
        } finally {
          await send("f-2")
        }
      }()),["> f-1@0", "< f-1@0", "> e-1@0", "< e-1@0", "> f-2@0", "< f-2@0"])
    assert.deepEqual(
      await evaluate(async function ex6() {
        try {
          try {
            await send(`init`)
            throw 1
            await send(`never`)
          } finally {
            await send("f-1")
          }
        } catch(e) {
          await send(`e-${e}`)
        } finally {
          await send("f-2")
        }
      }()),["> init@0", "< init@0", "> f-1@0", "< f-1@0", "> e-1@0", "< e-1@0",
            "> f-2@0", "< f-2@0"])
    assert.deepEqual(
      await evaluate(async function ex6() {
        try {
          try {
            await send(`init`)
            throw 1
            await send(`never`)
          } finally {
            await send("f-1")
          }
        } catch(e) {
          await send(`e-${e}`)
        } finally {
          await send("f-2")
        }
      }()),["> init@0", "< init@0", "> f-1@0", "< f-1@0", "> e-1@0", "< e-1@0",
            "> f-2@0", "< f-2@0"])
  })
})

describe("implicitly parallel async function", function() {
  context("block of independent computations", function() {
    it("should run simultaneously", async function() {
      assert.deepEqual(
        await evaluate(async function a1() {
          "par"
          await send("a_1")
          await send("a_2")
        }()),["> a_1,a_2@0", "< a_1@0", "< a_2@0"])
    })
    context("inside `try/finally`", function() {
      it("should execute `finally` block after `try` body", async function() {
        assert.deepEqual(
          await evaluate(async function a2() {
            "par"
            try {
              await send("a_1")
              await send("a_2")
            } finally {
              await send("f_1")
            }
          }()),["> a_1,a_2@0", "< a_1@0", "< a_2@0", "> f_1@0", "< f_1@0"])
      })
    })
    context("insite `try/catch`",function() {
      it("should cancel running threads on throw", async function() {
        async function a() {
          "par"
          try {
            {
              "seq"
              await send("a",10)
              await send("b",10)
              await send("c",10)
            }
            await sendErr("error",15)
            {
              "seq"
              await send("d",12)
              await send("e",10)
              await send("f",10)
            }
            await send("g",20)
          } catch(e) {
            await send(`E:${e.message}`)
          }
        }
        console.log(await evaluate(a()))
        assert.deepEqual(
          await evaluate(a()),
          ["> a,error,d,g@0", "< a@10", "> b@10", "< d@12", "> e@12",
           "< error@15", "! b,e@15", "> E:error/?@15", "< E:error/?@15"])
      })
    })
  })
  context("with nested \"seq\" blocks", function() {
    it("should run them sequentially", async function() {
      async function a() {
        "par"
        {
          "seq"
          await send("A",20)
          await send("B",20)
        }
        {
          "seq"
          await send("C",5)
          await send("D",5)
        }
      }
      assert.deepEqual(
        await evaluate(a()),
        ["> A,C@0", "< C@5", "> D@5", "< D@10", "< A@20", "> B@20", "< B@40"])
    })
  })
  context("computations use a common variable updated in between", function() {
    it("should run them simultaneously with corresponding var's values",
       async function() {
         assert.deepEqual(
           await evaluate(async function a3() {
             "par"
             let i = 0
             await send("a_1:" + i,10)
             i++
             await send("a_2:" + i,100)
           }()),["> a_1:0,a_2:1@0", "< a_1:0@10", "< a_2:1@100"])
         assert.deepEqual(
           await evaluate(async function a4() {
             "par"
             let i = 0
             await send("a_1_1:" + i,100)
             await send("a_1_2:" + i,1)
             i++
             await send("a_2_1:" + i,1)
             await send("a_2_2:" + i,1)
           }()),["> a_1_1:0,a_1_2:0,a_2_1:1,a_2_2:1@0",
                 "< a_1_2:0@1", "< a_2_1:1@1", "< a_2_2:1@1", "< a_1_1:0@100"])
         assert.deepEqual(
           await evaluate(async function a5() {
             "par"
             let i = 0
             await send(`b_1-${i}-${await send("a_1:" + i,1)}`,10)
             i++
             await send(`b_2-${i}-${await send("a_2:" + i,5)}`,1)
           }()),["> a_1:0,a_2:1@0", "< a_1:0@1", "> b_1-1-1@1",
                 "< a_2:1@5", "> b_2-1-5@5", "< b_2-1-5@6", "< b_1-1-1@11"])
       })
  })
  context("with loops", function() {
    context("with single frame body", function() {
      it("should run each iteration in parallel", async function() {
        assert.deepEqual(
          await evaluate(async function a6() {
            "par"
            for(const i of [1,2,3,4,5]) {
              await send(`a_${i}`)
            }
          }()),["> a_1,a_2,a_3,a_4,a_5@0", "< a_1@0", "< a_2@0",
                "< a_3@0", "< a_4@0", "< a_5@0"])
      })
    })
    context("with a few independent computations body", function() {
      it("should run the body an each iteration in parallel", async function() {
        assert.deepEqual(
          await evaluate(async function a7() {
            "par"
            for(const i of [1,2,3,4,5]) {
              await send(`a_${i}`)
              await send(`b_${i}`)
            }
          }()),["> a_1,b_1,a_2,b_2,a_3,b_3,a_4,b_4,a_5,b_5@0", "< a_1@0",
                "< b_1@0", "< a_2@0", "< b_2@0", "< a_3@0", "< b_3@0",
                "< a_4@0", "< b_4@0", "< a_5@0", "< b_5@0"])
          })
      context("with a few dependent computations body", function() {
        it("should run each iteration in parallel but the body sequentially",
           async function() {
             assert.deepEqual(
               await evaluate(async function a8() {
                 "par"
                 for(const i of [1,2,3,4,5]) {
                   await send(`b_${await send(`a_${i}`)}_${i}`)
                 }
               }()),["> a_1,a_2,a_3,a_4,a_5@0", "< a_1@0", "< a_2@0", "< a_3@0",
                     "< a_4@0", "< a_5@0", "> b_0_1,b_0_2,b_0_3,b_0_4,b_0_5@0",
            "< b_0_1@0", "< b_0_2@0", "< b_0_3@0", "< b_0_4@0",
                     "< b_0_5@0"])
           })
      })
      context("some computations with dependencies on the former iteration",
        function() {
          it("should run dependent computation sequentially but independent ones in parallel",
             async function() {
               assert.deepEqual(
                 await evaluate(async function a9() {
                   "par"
                   let i = 0
                   for(const j of [1,2,3]) {
                     i += await send(`a_${j}`,1)
                     await send(`b_${i}_${j}`,10)
                   }
                 }()),["> a_1@0",
                          "< a_1@1", "> b_1_1,a_2@1", "< a_2@2", "> b_3_2,a_3@2", "< a_3@3",
                       "> b_6_3@3", "< b_1_1@11", "< b_3_2@12", "< b_6_3@13"])
             })
        })
    })
  })
  context("when next parallel changes variables values",
    function() {
      it("should use correct values for variables", async function* a() {
        assert.deepEqual(
          await evaluate(async function a10() {
            "par"
            let k
            for(let j = 0;j < 3;j++) {
              k = "a"
              await send(`${k}_${j}`,10*(5-j))
              k = "b"
              await send(`${k}_${j}`,10*j+2)
            }
          }()),["> a_0,b_0,a_1,b_1,a_2,b_2@0", "< b_0@2", "< b_1@12", "< b_2@22",
                "< a_2@30", "< a_1@40", "< a_0@50"])
        assert.deepEqual(
          await evaluate(async function a11() {
            "par"
            let k
            for(let j = 0;j < 3;j++) {
              k = `a-${j}`
              await send(`${k}*-${j}-${await send(`${k}_${j}`,20*(2-j)+10)}`, 20*j)
              k = `b-${j}`
              await send(`${k}*-${j}-${await send(`${k}_${j}`,20*j+5)}`, 20*(2-j))
            }
            await send(`fin-${await send(`${k}-fin`)}-${k}`)
          }()),["> a-0_0,b-0_0,a-1_1,b-1_1,a-2_2,b-2_2@0", "< b-0_0@5",
                "> b-0*-0-5@5", "< a-2_2@10", "> a-2*-2-10@10", "< b-1_1@25",
                "> b-1*-1-25@25", "< a-1_1@30", "> a-1*-1-30@30", "< b-2_2@45",
                "< b-0*-0-5@45", "< b-1*-1-25@45", "> b-2*-2-45@45",
                "< b-2*-2-45@45", "< a-0_0@50", "< a-2*-2-10@50", "< a-1*-1-30@50",
                "> a-0*-0-50@50", "< a-0*-0-50@50", "> b-2-fin@50", "< b-2-fin@50",
                "> fin-50-b-2@50", "< fin-50-b-2@50"])
        assert.deepEqual(
          await evaluate(async function a12() {
            "par"
            let k
            for(let j = 0;j < 3;j++) {
              k = await send(`k-a-${j}`,0,copy)
          }
            await send(`${k}-fin`)
          }()),["> k-a-0,k-a-1,k-a-2@0", "< k-a-0@0", "< k-a-1@0", "< k-a-2@0",
                "> k-a-2-fin@0", "< k-a-2-fin@0"])
        assert.deepEqual(
          await evaluate(async function a13() {
            "par"
            let k
            for(let j = 0;j < 3;j++) {
              k = await send(`k-a-${j}`,0,copy)
              await send(`${k}_${j}`,20*(2-j)+10)
              k = await send(`k-b-${j}`,0,copy)
              await send(`${k}_${j}`,20*j+5)
          }
            await send(`fin-${await send(`${k}-fin`)}-${k}`)
          }()),["> k-a-0,k-b-0,k-a-1,k-b-1,k-a-2,k-b-2@0", "< k-a-0@0",
                "< k-b-0@0", "< k-a-1@0", "< k-b-1@0", "< k-a-2@0", "< k-b-2@0",
                "> k-a-0_0,k-b-0_0,k-a-1_1,k-b-1_1,k-a-2_2,k-b-2_2@0",
                "< k-b-0_0@5", "< k-a-2_2@10", "< k-b-1_1@25", "< k-a-1_1@30",
                "< k-b-2_2@45", "< k-a-0_0@50", "> k-b-2-fin@50", "< k-b-2-fin@50",
                "> fin-50-k-b-2@50", "< fin-50-k-b-2@50"])
        assert.deepEqual(
          await evaluate(async function a14() {
            "par"
            let k
            for(const i of [1,2,3]) {
              for(const j of ["a","b","c"])
                k = await send(`k-${j}-${i}`,10*(4-i),copy)
            }
            await send(`${k}-fin`)
          }()),["> k-a-1,k-b-1,k-c-1,k-a-2,k-b-2,k-c-2,k-a-3,k-b-3,k-c-3@0",
                "< k-a-3@10", "< k-b-3@10", "< k-c-3@10", "< k-a-2@20",
                "< k-b-2@20", "< k-c-2@20", "< k-a-1@30", "< k-b-1@30",
                "< k-c-1@30", "> k-c-3-fin@30", "< k-c-3-fin@30"])
        assert.deepEqual(
          await evaluate(async function a14() {
            "par"
            try {
              await send("a_2",await send("a_1",100),100)
              await send("a_3",await sendErr("e_1",20))
              await send("a_5",await send("a_4",100),10)
            } catch(e) {
              await send(`E:${e.message}`)
            }
            await send("a_6",200)
          }()),["> a_1,e_1,a_4,a_6@0", "< e_1@20", "! a_1,a_4@20", "> E:e_1/?@20",
                "< E:e_1/?@20", "<! a_1@100", "<! a_4@100", "< a_6@200"])
      })
    })
  context("with variable values withing same fork", function() {
    it("should have variable values like in sequential execution",
       async function() {
         async function a(v1,v2,t1,t2,t3,t4) {
           "par"
           let j = 0
           if (await send(`sa`,t1,v1))
             j = 10
           if (await send(`sb`,t2,v2))
             j = 20
           await send(`ta:${j}`,t3)
           j++
           await send(`tb:${j}`,t4)
         }
         assert.deepEqual(
           await evaluate(a(true,false,10,5,10,5)),
           ["> sa,sb@0", "< sb@5", "< sa@10", "> ta:10,tb:11@10",
            "< tb:11@15", "< ta:10@20"])
         assert.deepEqual(
           await evaluate(a(false,false,10,5,10,5)),
           ["> sa,sb@0", "< sb@5", "< sa@10", "> ta:0,tb:1@10",
            "< tb:1@15", "< ta:0@20"])
         assert.deepEqual(
           await evaluate(a(true,true,10,5,10,5)),
           ["> sa,sb@0", "< sb@5", "< sa@10", "> ta:20,tb:21@10",
            "< tb:21@15", "< ta:20@20"])
         assert.deepEqual(
           await evaluate(a(true,true,5,10,5,10)),
           ["> sa,sb@0", "< sa@5", "< sb@10", "> ta:20,tb:21@10",
            "< ta:20@15", "< tb:21@20"])
         async function b() {
           "par"
           let i = 0
           await send(`a:${await send("b:" + i,10)}:${i}`,10)
           i++
           await send(`c:${await send("d:" + i,5)}:${i}`,5)
         }
         assert.deepEqual(
           await evaluate(b()),
           ["> b:0,d:1@0", "< d:1@5", "> c:5:1@5", "< b:0@10", "< c:5:1@10",
            "> a:10:0@10", "< a:10:0@20"]
         )
         async function c() {
           "par"
           let i = 0
           await send(`a:${await send("b:"+i,15)}/${i}`,15)
           i++
           await send(`c:${await send("d:"+i,10)}/${i}`,10)
           i++
           await send(`e:${await send("f:"+i,5)}/${i}`,5)
         }
         assert.deepEqual(
           await evaluate(c()),
           ["> b:0,d:1,f:2@0", "< f:2@5", "> e:5/2@5",
            "< d:1@10", "< e:5/2@10", "> c:10/1@10",
            "< b:0@15", "> a:15/0@15", "< c:10/1@20", "< a:15/0@30"])
       })
    context("with loops", function() {
      it("should have variable values like in sequential execution",
         async function() {
           async function a(v1,v2,t1,t2,t3,t4,t5,t6,t7,t8) {
             "par"
             for(const i of [1,2]) {
               let j = 0
               {
                 if (await send(`sa:${i}`,i === 1 ? t1 : t5,i & v1))
                   j = 10
                 if (await send(`sb:${i}`,i === 1 ? t2 : t6,i & v2))
                   j = 20
                 await send(`a_1:${i}/${j}`,i === 1 ? t3 : t7,t3)
                 j++
                 await send(`a_2:${i}/${j}`,i === 1 ? t4 : t8,t4)
               }
             }
           }
           assert.deepEqual(
             await evaluate(a(0,0,100,100,100,100,10,10,10,10)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:2@10", "< sb:2@10",
              "> a_1:2/0,a_2:2/1@10", "< a_1:2/0@20", "< a_2:2/1@20",
              "< sa:1@100", "< sb:1@100", "> a_1:1/0,a_2:1/1@100",
              "< a_1:1/0@200", "< a_2:1/1@200"])
           assert.deepEqual(
             await evaluate(a(0,1,100,100,100,100,10,10,10,10)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:2@10", "< sb:2@10",
              "> a_1:2/0,a_2:2/1@10", "< a_1:2/0@20", "< a_2:2/1@20",
              "< sa:1@100", "< sb:1@100", "> a_1:1/20,a_2:1/21@100",
              "< a_1:1/20@200", "< a_2:1/21@200"])
           console.log(
             await evaluate(a(1,0,100,100,100,100,10,10,10,10)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:2@10", "< sb:2@10",
              "> a_1:2/0,a_2:2/1@10", "< a_1:2/0@20", "< a_2:2/1@20",
              "< sa:1@100", "< sb:1@100", "> a_1:1/10,a_2:1/11@100",
              "< a_1:1/10@200", "< a_2:1/11@200"])
           assert.deepEqual(
             await evaluate(a(1,2,100,100,100,100,10,10,10,10)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:2@10", "< sb:2@10",
              "> a_1:2/20,a_2:2/21@10", "< a_1:2/20@20", "< a_2:2/21@20",
              "< sa:1@100", "< sb:1@100", "> a_1:1/10,a_2:1/11@100",
              "< a_1:1/10@200", "< a_2:1/11@200"])
           assert.deepEqual(
             await evaluate(a(2,1,100,100,100,100,10,10,10,10)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:2@10", "< sb:2@10",
              "> a_1:2/10,a_2:2/11@10", "< a_1:2/10@20", "< a_2:2/11@20",
              "< sa:1@100", "< sb:1@100", "> a_1:1/20,a_2:1/21@100",
              "< a_1:1/20@200", "< a_2:1/21@200"])
           assert.deepEqual(
             await evaluate(a(2,0,100,100,100,100,10,10,10,10)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:2@10", "< sb:2@10",
              "> a_1:2/10,a_2:2/11@10", "< a_1:2/10@20", "< a_2:2/11@20",
              "< sa:1@100", "< sb:1@100", "> a_1:1/0,a_2:1/1@100",
              "< a_1:1/0@200", "< a_2:1/1@200"])
           assert.deepEqual(
             await evaluate(a(2,1,10,100,10,100,10,100,10,100)),
             ["> sa:1,sb:1,sa:2,sb:2@0", "< sa:1@10", "< sa:2@10", "< sb:1@100",
              "< sb:2@100", "> a_1:1/20,a_2:1/21,a_1:2/10,a_2:2/11@100",
              "< a_1:1/20@110", "< a_1:2/10@110", "< a_2:1/21@200", "< a_2:2/11@200"
             ])
         })
    })
    context("with nested loops", function() {
      it("should have variable values like in sequential execution",
         async function() {
           async function a(t) {
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
           assert.deepEqual(
             await evaluate(a(true)),
             ["> sa:10/1/A/0,sb:10/1/A,sa:10/1/B/0,sb:10/1/B,"
              +"sa:10/2/A/0,sb:10/2/A,sa:10/2/B/0,sb:10/2/B,"
              +"sa:20/1/A/0,sb:20/1/A,sa:20/1/B/0,sb:20/1/B,"
              +"sa:20/2/A/0,sb:20/2/A,sa:20/2/B/0,sb:20/2/B@0",
              "< sa:20/2/A/0@5", "< sa:20/2/B/0@5", "< sb:20/2/A@7",
              "< sb:20/2/B@7",
              "> ta:20/2/A/20,tb:20/2/A/21,ta:20/2/B/20,tb:20/2/B/21@7",
              "< sa:10/2/A/0@10", "< sa:10/2/B/0@10", "< sa:20/1/A/0@10",
              "< sa:20/1/B/0@10", "< sb:10/2/A@12", "< sb:10/2/B@12",
              "< sb:20/1/A@12", "< sb:20/1/B@12",
              "> ta:10/2/A/20,tb:10/2/A/21,ta:10/2/B/20,tb:10/2/B/21,"
              +"ta:20/1/A/20,tb:20/1/A/21,ta:20/1/B/20,tb:20/1/B/21@12",
              "< tb:20/2/A/21@17", "< tb:20/2/B/21@17", "< sa:10/1/A/0@20",
              "< sa:10/1/B/0@20", "< sb:10/1/A@22", "< sb:10/1/B@22",
              "< ta:20/2/A/20@22", "< ta:20/2/B/20@22", "< tb:10/2/A/21@22",
              "< tb:10/2/B/21@22", "< tb:20/1/A/21@22", "< tb:20/1/B/21@22",
              "> ta:10/1/A/20,tb:10/1/A/21,ta:10/1/B/20,tb:10/1/B/21@22",
              "< ta:10/2/A/20@27", "< ta:10/2/B/20@27", "< ta:20/1/A/20@27",
              "< ta:20/1/B/20@27", "< tb:10/1/A/21@32", "< tb:10/1/B/21@32",
              "< ta:10/1/A/20@37", "< ta:10/1/B/20@37"
             ])
         })
    })
  })
})
         
