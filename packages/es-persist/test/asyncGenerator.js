import * as R from "../index"
import * as assert from "assert"

export function subject() {
  let callback
  const queue = []
  const iter = thread()
  return {
    send(event) {
      if (callback)
        callback()
      queue.push(event)
    },
    return(v) {
      if (callback)
        callback()
      return iter.return()
    },
    next(value) { return iter.next() },
    [Symbol.asyncIterator]() { return this }
  }

  async function* thread() {
    for(;;) {
      while(queue.length)
        yield queue.shift()
      await new Promise(i => callback = i)
      callback = null
    }
  }
}

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
  it("should be cancelable", function(done) {
    const src = subject()
    let finallyCalled1 = false
    let finallyCalled2 = false
    /*
    async function* a1() {
      try {
        for await(const i of src)
          yield i
      } finally {
        finallyCalled1 = true
      }
    }
    async function* a2() {
      try {
        yield* a1()
      } finally {
        finallyCalled1 = true
      }
    }
    async function* a3() {
      const v = a2()
      try {
        for(let i;!(i = await v.next()).done;) {
          yield i.value
        }
      } finally {
        await v.return()
      }
      return 2
    }
    */
    async function a4() {
      debugger
      const v = src // a2()
      const i1 = await v.next()
      assert.ok(!i1.done)
      assert.equal(i1.value,1)
      const i2 = await v.return()
      assert.ok(i2.done)
      assert.equal(i2.value,2)
      assert.ok(finallyCalled1)
      assert.ok(finallyCalled2)
      assert.equal(R.context().threads.size,1)
      return 3
    }
    a4().then(i => {
      debugger
      done()
    })
  })
})
