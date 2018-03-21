import * as R from "../index"
import * as assert from "assert"

async function* fn() {
  let i = 1
  function clos2() {
    let j = 10
    function* gen() {
      for(let k = 0; k < 2; k++)
        yield k + j
    }
    return async function* b() {   
      for(const k of gen())
        await (j+=i + k)
    }()
  }
  await "start"
  for await(const j of clos2())
    yield await (i+=j)
  return await "result"
}

async function run() {
  for await(const i of fn())
    await i
}

// what I need to have is a separate layer for this

describe("async generator function", function() {
  it("should have its state visible", function() {
    const state = R.context()
    const s = run()
    const subThreads = () => [...state.threads].filter(i => i !== s)
    assert.equal(state.threads.size, 2)
    assert.equal(s.name, "run")
    let threads = subThreads()
    assert.equal(threads.length,1)
    const fn = threads[0]
    assert.equal(fn.name, "fn")
    assert.equal(fn.awaiting,"start")
    assert.equal(fn._i, 1)
    assert.equal(fn, s.awaiting)
    assert.equal(typeof fn._clos2, "function")
    fn.resume()
    threads = subThreads()
    assert.equal(threads.length,2)
    assert.equal(fn, threads[0])
    const b = threads[1]
    assert.equal(b.name, "b")
    const clos2 = b._clos2
    assert.equal(b._k, 10)
    assert.equal(b._fn, fn)
    assert.equal(clos2._j, 21)
    assert.equal(fn._loop, b)
    const gen = b._loop
    assert.equal(gen.constructor.name, "Generator")
    assert.equal(gen._k, 0)
    assert.equal(gen._clos2, clos2)
    assert.equal(b.awaiting, 21)
    assert.equal(fn.awaiting, b)
    assert.equal(s.awaiting, fn)
    b.resume()
    threads = subThreads()
    assert.equal(threads.length,2)
    assert.equal(fn, threads[0])
    assert.equal(b, threads[1])
    assert.equal(b._k, 22)
    assert.equal(b.awaiting, 44)
    assert.equal(fn.awaiting, b)
    assert.equal(gen._k, 1)
    assert.equal(gen._clos2, clos2)
    assert.equal(clos2._j, 44)
    assert.equal(s.awaiting, fn)
    b.resume()
    threads = subThreads()
    assert.equal(threads.length,1)
    assert.equal(fn, threads[0])
    assert.equal(fn._i, 1)
    assert.equal(fn.awaiting, "result")
    assert.equal(s.awaiting, fn)
    fn.resume()
    threads = subThreads()
    assert.equal(threads.length,0)
    assert.equal(s.awaiting, void 0)
  })
})
