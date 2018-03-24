import * as R from "../index"
import * as assert from "assert"

function clos1() {
  let i = 1
  function clos2() {
    let j = 10
    return async function b() {   
      return await (j+=i)
    }
  }
  return [clos2(),
          async function a() {
            return await i++
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

describe("async function", function() {
  it("should support Promises", function(done) {
    const state = R.context()
    const p = promise()
    assert.equal(state.threads.size,1)
    assert.ok(state.threads.has(p))
    assert.equal(p.awaiting.constructor, Promise)
    p.awaiting.then(i => {
      assert.equal(state.threads.size, 0)
      assert.equal(p.awaiting, void 0)
      assert.equal(p.value, 11)
      done()
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
    const subThreads = () => [...state.threads].filter(i => i !== s)
    assert.equal(state.threads.size, 2)
    let threads = subThreads()
    const clos1 = threads[0]._clos1
    const clos2 = threads[0]._clos2
    assert.equal(threads.length,1)
    assert.equal(clos1._i, 1)
    assert.equal(clos2._j, 11)
    assert.equal(threads[0].awaiting,11)
    assert.equal(threads[0].name,"b")
    assert.equal(s.awaiting,threads[0])
    threads[0].resume()
    threads = subThreads()
    assert.equal(threads.length,1)
    assert.equal(threads[0].name,"a")
    assert.equal(s.awaiting,threads[0])
    assert.equal(threads[0].awaiting,1)
    assert.equal(threads[0]._clos1, clos1)
    assert.equal(threads[0]._clos2, void 0)
    assert.equal(clos1._i, 2)
    assert.equal(clos2._j, 11)
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
    const bthread = threads[1]
    assert.equal(clos1._i, 4)
    assert.equal(clos2._j, 14)
    assert.equal(s.awaiting,threads[2])
    threads[0].resume()
    assert.equal(clos1._i, 4)
    assert.equal(clos2._j, 14)
    threads = subThreads()
    assert.equal(threads.length, 2)
    assert.equal(s.awaiting,threads[1])
    threads[1].resume(100)
    assert.equal(s.awaiting,void 0)
    assert.equal(s.value, 100)
    threads = subThreads()
    assert.equal(threads.length, 1)
    assert.equal(threads[0], bthread)
    threads[0].resume(101)
    assert.equal(clos1._i, 4)
    assert.equal(clos2._j, 14)
    threads = subThreads()
    assert.equal(bthread.value, 101)
    assert.equal(threads.length, 0)
  })
})

