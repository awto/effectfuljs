module.exports = function(Lib) {
  const sample = {
    [Symbol.iterator]() {
      let count = 0
      return {
        [Symbol.iterator]() { return this },
        next(v) {
          return {value:`next:${v}->${count++}`,done:false}
        },
        throw(v) {
          return {value:`throw:${v}->${count++}`,done:false}
        },
        return(v) {
          return {value:`return:${v}->${count++}`,done:true}
        }
      }
    }
  }

  describe("lean iterator", function() {
    it("has isomorphic conversion to ES iterators", function() {
      Array.from(Kit.eqlGens([1,2,3],
                             Lib.esIterator(Lib.iterator([1,2,3]))))
      Array.from(Kit.eqlGens(new Set([10,20,30]),
                             Lib.esIterator(Lib.iterator(new Set([10,20,30])))))
      const sampleIter = Kit.eqlGens(sample,Lib.esIterator(Lib.iterator(sample)))
      sampleIter.next(1)
      sampleIter.next(2)
      sampleIter.throw(3)
      sampleIter.return(4)
    })
  })

  describe("lean async iterator", function() {
    it("has isomorphic conversion to ES iterators", function() {
      function iter() {
        const sampleIter = Kit.eqlAsyncGens(
          Kit.delayIterator(sample),
          Lib.esAsyncIterator(Lib.iteratorM(Kit.delayIterator(sample))))
        const a = sampleIter.next(1)
        const b = sampleIter.return(2)
        const c = sampleIter.next(3)
        const d = sampleIter.throw(4)
        const e = sampleIter.return(5)
        const f = sampleIter.return(6)
        return Promise.all([
          Kit.asyncRunAll(
            Kit.eqlAsyncGens(
              Kit.delayIterator([1,2,3]),
              Lib.esAsyncIterator(
                Lib.iteratorM(
                  Kit.delayIterator([1,2,3]))))),
          Kit.asyncRunAll(Kit.eqlAsyncGens(
            Kit.delayIterator(new Set([10,20,30])),
            Lib.esAsyncIterator(Lib.iteratorM(
              Kit.delayIterator(new Set([10,20,30])))))),
          b.then(() => d).then(() => e),
          a.then(() => c).then(() => f)])
      }
      // chasing races (it has random delays)
      return Promise.all(Array(100).fill().map(iter))
    })
  })
}

