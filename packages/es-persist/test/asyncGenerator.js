import * as R from "../index"
import * as assert from "assert"

const tasks = []

function Wait(value) { this.value = value }
Wait.prototype[R.awaitSymbol] = function(next) {
  tasks.push({src:this,next})
}

function empty() {}

const ctx = new R.Context({enqueue(job){job.run()}})

async function* fn() {
  let i = 1
  function clos2() {
    let j = 10
    function* gen() {
      for(let k = 0; k < 2; k++)
        yield k + j
    }
    gen.prototype[R.contextSymbol] = ctx
    const bf = async function* b() {   
      for(const k of gen()) {
        await new Wait(j+=i + k)
        empty(k)
      }
    }
    bf.prototype[R.contextSymbol] = ctx
    return bf()
  }
  await new Wait("start")
  for await(const j of clos2())
    yield await new Wait(i+=j)
  return await new Wait("result")
}

async function run() {
  for await(const i of fn())
    await new Wait(i)
}

fn.prototype[R.contextSymbol] = run.prototype[R.contextSymbol] = ctx

// what I need to have is a separate layer for this

describe("async generator function", function() {
  it("should have its state visible", function() {
    const s = run()
    const t = [...ctx.threads].find(i => i.cont === s)
    const subThreads = () => [...ctx.threads].filter(i => i.cont !== s)
    assert.equal(ctx.threads.size, 2)
    assert.equal(t.name, "run")
    let threads = subThreads()
    assert.equal(threads.length,1)
    const fn = threads[0]
    assert.equal(fn.name, "fn")
    assert.ok(tasks.length, 1)
    assert.ok(tasks.every(i => i.src.constructor === Wait))
    assert.ok(tasks[0].next, fn)
    assert.equal(tasks.map(i => i.src.value).join(),"start")
    assert.ok(tasks[0].next === fn)
    assert.equal(fn._i, 1)
    assert.equal(fn.queue[0].dest[0], t)
    assert.equal(typeof fn._clos2, "function")
    tasks.length = 0
    fn.resume()
    threads = subThreads()
    assert.equal(threads.length,2)
    assert.equal(tasks.map(i => i.src.value).join(),"21")
    assert.equal(fn, threads[0])
    const b = threads[1]
    assert.ok(tasks[0].next === b)
    assert.equal(b.name, "b")
    const clos2 = b._clos2
    assert.equal(b._k, 10)
    assert.equal(b._fn, fn)
    assert.equal(clos2._j, 21)
    assert.equal(fn._loop, b)
    const gen = b._loop
    assert.equal(gen.constructor.name, "GeneratorFunctionPrototype")
    assert.equal(gen._k, 0)
    assert.equal(gen._clos2, clos2)
    assert.ok(b.queue[0].dest[0] === fn)
    assert.ok(fn.queue[0].dest[0] === t)
    tasks.length = 0
    b.resume()
    threads = subThreads()
    assert.ok(tasks[0].next === b)
    assert.equal(tasks.map(i => i.src.value).join(),"44")
    assert.equal(threads.length,2)
    assert.equal(fn, threads[0])
    assert.equal(b, threads[1])
    assert.equal(b._k, 22)
    assert.ok(b.queue[0].dest[0] === fn)
    assert.ok(fn.queue[0].dest[0] === t)
    assert.equal(gen._k, 1)
    assert.equal(gen._clos2, clos2)
    assert.equal(clos2._j, 44)
    tasks.length = 0
    b.resume()
    threads = subThreads()
    assert.equal(tasks.map(i => i.src.value).join(),"result")
    assert.ok(tasks[0].next === fn)
    assert.equal(threads.length,1)
    assert.equal(fn, threads[0])
    assert.equal(fn._i, 1)
    assert.ok(fn.queue[0].dest[0] === t)
    tasks.length = 0
    fn.resume()
    assert.equal(tasks.length, 0)
    threads = subThreads()
    assert.equal(threads.length,0)
    assert.equal(s.awaiting, void 0)
  })
  it("should conform to ES", function() {
    let finallyCalledSrc = 0
    let finallyCalled1 = 0
    let finallyCalled2 = 0
    let cb
    let p1 = new Promise(i => cb = i)
    let tasks = []
    let cbtask
    let p2 = {
      [R.awaitSymbol](next) {
        tasks.push(next)
        assert.equal(R.context().threads.size, 6)
        assert.equal([...R.context().threads].map(i => i.name).sort().join(),
                 "_a1,_a2,_a3,_a4,_scheduler,_src")
        cbtask()
      }
    }
    async function scheduler() {
      await new Promise(i => cbtask = i)
      tasks.pop().resume("t1")
    }
    scheduler()
    async function* src() {
      try {
        yield (await p1)
        assert.equal(R.context().threads.size, 6)
        yield (await p2)
        assert.equal(R.context().threads.size, 5)
        assert.equal([...R.context().threads].map(i => i.name).sort().join(),
                 "_a1,_a2,_a3,_a4,_src")
        assert.fail("never")
      } finally {
        finallyCalledSrc++
      }
    }
    async function* a1() {
      try {
        for await(const i of src())
          yield `a1:${i}`
        assert.fail("never")
      } finally {
        finallyCalled1 = true
      }
      assert.fail("never")
    }
    async function* a2() {
      try {
        yield* a1()
        assert.fail("never")
      } finally {
        finallyCalled2 = true
      }
    } 
    async function* a3() {
      const v = a2()
      try {
        for(let i;!(i = await v.next()).done;) {
          yield `a3:${i.value}`
        }
        assert.fail("never")
      } finally {
        await v.return()
      }
      return 2
    }
    async function a4() {
      const v = a3()
      const i1 = await v.next()
      assert.ok(!i1.done)
      assert.equal(i1.value,"a3:a1:hi")
      const n = v.next()
      const i2 = await n
      assert.ok(!i2.done)
      assert.equal(i2.value,"a3:a1:t1")
      const i3 = await v.return(4)
      assert.ok(i3.done)
      assert.equal(i3.value,4)
      assert.ok(finallyCalledSrc)
      assert.ok(finallyCalled1)
      assert.ok(finallyCalled2)
      assert.equal(R.context().threads.size,1)
      return 3
    }
    const t4 = a4()
    const res = t4.then(i => {
      assert.equal(i, 3)
      assert.equal(R.context().threads.size,0)
    })
    cb("hi")
    assert.equal(R.context().threads.size, 3)
    assert.equal([...R.context().threads].map(i => i.name).sort().join(),
                 "_a3,_a4,_scheduler")
    return res
  })
  it("should propagate exceptions", function(done) {
    async function* a1() {
      yield 1
      throw new Error(":-(")
    }
    async function* a2() {
      yield* a1()
    }
    async function* a3() {
      for await(const i of a2())
        yield i
    }
    async function a4() {
      const g = a3()[Symbol.asyncIterator]()
      const n = await g.next()
      assert.ok(!n.done)
      assert.equal(n.value,1)
      await g.next()
      assert.fail("never")
    }
    a4().then(i => assert.fail("never"),
              e => { done() })
  })
})

describe("subject", function() {
  it("should follow generators protocol", function() {
    return async function subj1() {
      const s = R.subject()
      s.send(1)
      assert.deepEqual(await s.next(), {done:false,value:1})
      s.send(2)
      s.send(3)
      assert.deepEqual(await s.next(), {done:false,value:2})
      assert.deepEqual(await s.next(), {done:false,value:3})
      setTimeout(() => s.send(4),10)
      assert.deepEqual(await s.next(), {done:false,value:4})
      s.stop(5)
      assert.deepEqual(await s.next(), {done:true,value:5})
    }()
  })
})


describe("fork", function() {
  it("should be possible to resume", async function() {
    const ctx = R.context()
    const state = {}
    let resume
    let forkCalled = 0
    const f = async function* fork() {
      let i = 0
      await Promise.resolve()
      const r = await R.fork()
      if (r && r.resume) {
        resume = r
        Object.assign(state,f)
        return `main:${++i}`
      } else {
        return `fork:${++i}-${r}`
      }
    }()
    assert.deepStrictEqual(await f.next(), {value:"main:1",done:true})
    const saveResume = resume.dest.slice()
    Object.assign(f,state)
    const n1 = f.next()
    resume.resume(1)
    assert.deepStrictEqual(await n1, {value:"fork:1-1",done:true})
    Object.assign(f,state)
    resume.state = 0
    resume.dest = saveResume
    const n2 = f.next()
    resume.resume(2)
    assert.deepStrictEqual(await n2, {value:"fork:1-2",done:true})
  })
})


