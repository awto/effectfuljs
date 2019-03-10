const assert = require("assert");

describe("chain of iterators", function() {
  it("should conform to ES", function() {
    let finallyCalledSrc = 0;
    let finallyCalled1 = 0;
    let finallyCalled2 = 0;
    let cb;
    let p1 = new Promise(i => (cb = i));
    let tasks = [];
    let cbtask;
    let p2 = {
      then(next) {
        tasks.push(next);
        cbtask();
      }
    };
    async function scheduler() {
      await new Promise(i => (cbtask = i));
      tasks.pop()("t1");
    }
    scheduler();
    async function* src() {
      try {
        yield await p1;
        yield await p2;
        assert.fail("never");
      } finally {
        finallyCalledSrc++;
      }
    }
    async function* a1() {
      try {
        for await (const i of src()) yield `a1:${i}`;
        assert.fail("never");
      } finally {
        finallyCalled1 = true;
      }
      assert.fail("never");
    }
    async function* a2() {
      try {
        yield* a1();
        assert.fail("never");
      } finally {
        finallyCalled2 = true;
      }
    }
    async function* a3() {
      const v = a2();
      try {
        for (let i; !(i = await v.next()).done; ) {
          yield `a3:${i.value}`;
        }
        assert.fail("never");
      } finally {
        await v.return();
      }
      return 2;
    }
    async function a4() {
      const v = a3();
      const i1 = await v.next();
      assert.ok(!i1.done);
      assert.equal(i1.value, "a3:a1:hi");
      const n = v.next();
      const i2 = await n;
      assert.ok(!i2.done);
      assert.equal(i2.value, "a3:a1:t1");
      const i3 = await v.return(4);
      assert.ok(i3.done);
      assert.equal(i3.value, 4);
      assert.ok(finallyCalledSrc);
      assert.ok(finallyCalled1);
      assert.ok(finallyCalled2);
      return 3;
    }
    const t4 = a4();
    const res = t4.then(i => {
      assert.equal(i, 3);
    });
    cb("hi");
    return res;
  });
});
