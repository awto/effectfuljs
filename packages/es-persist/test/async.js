import * as R from "../index"
import * as assert from "assert"

const tasks = []

function Wait(value) { this.value = value }
Wait.prototype[R.awaitSymbol] = function(next) {
  tasks.push({src:this,next})
}

function clos1() {
  let i = 1
  function clos2() {
    let j = 10
    return async function b() {   
      return await new Wait(j+=i)
    }
  }
  return [clos2(),
          async function a() {
            return await new Wait(i++)
          }]
}

async function b1() {
  const [b,a] = clos1()
  await b()
  await a()
  a(), b()
  return await a()
}

async function promise() {
  await new Promise(i => setTimeout(i,10))
  return 11
}

async function rejectedPromise() {
  await new Promise(i => setTimeout(i,10))
  throw new Error(":-(")
}


describe("async function", function() {
  it("should support Promises", function(done) {
    const state = R.context()
    const p = promise()
    assert.equal(state.running.size,1)
    p.then(i => {
      assert.equal(state.running.size, 0)
      assert.equal(i, 11)
    }).then(i => {
      assert.equal(state.running.size, 0)
      const e = rejectedPromise()
      assert.equal(state.running.size, 1)
      e.then(i => assert.fail("never"),
             e => {
               assert.equal(state.running.size, 0)
               assert.equal(e.message, ":-(")
               done()
             })
    })
  })
  it("should be thenable", function(done) {
    promise().then(i => {
      assert.equal(i, 11)
      done()
    })
  })
  it("should have its state visible", function() {
    const state = R.context()
    const s = b1()
    const subThreads = () => [...state.running].filter(i => i.cont !== s)
    assert.equal(state.running.size, 2)
    let threads = subThreads()
    assert.equal(threads.length,1)
    const clos1 = threads[0]._clos1
    const clos2 = threads[0]._clos2
    assert.equal(clos1._i, 1)
    assert.equal(clos2._j, 11)
    assert.equal(threads[0].name,"b")
    assert.ok(tasks.every(i => i.src.constructor === Wait))
    assert.equal(tasks.map(i => i.src.value).join(),"11")
    assert.ok(tasks[0].next === threads[0])
    tasks.pop()
    threads[0].resume()
    threads = subThreads()
    assert.equal(threads.length,1)
    assert.equal(threads[0].name,"a")
    assert.equal(threads[0]._clos1, clos1)
    assert.equal(threads[0]._clos2, void 0)
    assert.equal(clos1._i, 2)
    assert.equal(clos2._j, 11)
    assert.ok(tasks.every(i => i.src.constructor === Wait))
    assert.equal(tasks.map(i => i.src.value).join(),"1")
    assert.ok(tasks[0].next === threads[0])
    tasks.pop()
    threads[0].resume()
    threads = subThreads()
    assert.equal(threads.length, 3)
    assert.equal(threads[0].name,"a")
    assert.equal(threads[1].name,"b")
    assert.equal(threads[2].name,"a")
    assert.equal(threads[0]._clos1, clos1)
    assert.equal(threads[0]._clos2, void 0)
    assert.equal(threads[1]._clos1, clos1)
    assert.equal(threads[1]._clos2, clos2)
    assert.equal(threads[2]._clos1, clos1)
    assert.equal(threads[2]._clos2, void 0)
    assert.ok(tasks.every(i => i.src.constructor === Wait))
    assert.equal(tasks.map(i => i.src.value).join(),"2,14,3")
    assert.equal(tasks.map(i => i.next.name).join(),"a,b,a")
    assert.ok(tasks[0].next === threads[0])
    assert.ok(tasks[1].next === threads[1])
    assert.ok(tasks[2].next === threads[2])
    tasks.length = 0
    const bthread = threads[1]
    assert.equal(clos1._i, 4)
    assert.equal(clos2._j, 14)
    threads[0].resume()
    assert.equal(clos1._i, 4)
    assert.equal(clos2._j, 14)
    threads = subThreads()
    assert.equal(threads.length, 2)
    threads[1].resume(100)
    assert.equal(tasks.length, 0)
    assert.equal(s.value, 100)
    threads = subThreads()
    assert.equal(threads.length, 1)
    assert.equal(threads[0], bthread)
    threads[0].resume(101)
    assert.equal(tasks.length, 0)
    assert.equal(clos1._i, 4)
    assert.equal(clos2._j, 14)
    threads = subThreads()
    assert.equal(bthread.cont.value, 101)
    assert.equal(threads.length, 0)
  })
})


describe("`any` combinator", function() {
  it("should settle to a first settled argument", function() {
    let called = false
    return R.any([new Promise(r => setTimeout(() => r(1),100)),
                  new Promise(r => setTimeout(() => r(2),1000)),
                  new Promise(r => setTimeout(() => r(3),500)),
                  new Promise(() => {})
                 ]).then(v => {
                   assert.ok(!called)
                   called = true
                   assert.equal(v, 1)
                 }, () => assert.fail("never"))
      .then(() => {
        let called = false
        return R.any([new Promise((r,e) => setTimeout(() => e(1),100)),
                      new Promise(r => setTimeout(() => r(2),1000)),
                      new Promise(r => setTimeout(() => r(3),500)),
                      new Promise(() => {})
                     ]).then(() => assert.fail("never"),
                             v => {
                               assert.ok(!called)
                               called = true
                               assert.equal(v, 1)
                             })
      })
  })                        
})

describe("`all` combinator", function() {
  it("should be resolved to array if the arguments are resolved", function() {
    let called = false
    return R.all([
      Promise.resolve(0),
      new Promise(r => setTimeout(() => r(1),100)),
      new Promise(r => setTimeout(() => r(2),300)),
      new Promise(r => setTimeout(() => r(3),500))
    ]).then(v => {
      assert.ok(!called)
      called = true
      assert.deepEqual(v, [0,1,2,3])
    }, () => assert.fail("never"))
  })
  it("should be rejected if any argument is rejected", function() {
    let called = false
    return R.all([new Promise(r => setTimeout(() => r(1),100)),
                  new Promise((r,e) => setTimeout(() => e(2),300)),
                  new Promise(r => setTimeout(() => {
                    assert.ok(called)
                    r(3)
                  },500))
                 ]).then(
                   () => assert.fail("never"),
                   v => {
                     assert.ok(!called)
                     called = true
                     assert.equal(v, 2)
                   })
  })
})

describe("`chain` function sample", function() {
  it("should work like `Promise.prototype.then`", function(done) {
    function chain(arg, cont) {
      var res = R.lock()
      cont.cont = res
      arg[R.awaitSymbol](cont)
      return res
    }
    chain(
      chain(
        new Promise((r) => setTimeout(() => r(1),0)),
        {
          resume(v) {
            assert.equal(v, 1)
            const c1 = this.cont;
            chain(
              chain(
                new Promise((r,e) => setTimeout(() => e(2),0)),
                {
                  resume(v) {
                    assert.fail("never")
                  },
                  reject(e) {
                    assert.equal(e, 2)
                    this.cont.reject(3)
                  }
                }),
              {
                resume(v) {
                  assert.fail("never")
                },
                reject(e) {
                  assert.equal(e, 3)
                  c1.resume(4)
                }
              })
          },
          reject(e) {
            assert.fail("never")
          }
        }),
      {
        resume(v) {
          assert.equal(v, 4)
          done()
        },
        reject(e) {
          assert.fail("never")
        }
      })
  })
})
