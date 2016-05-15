assert = require('assert')

#console.dir(require.cache)

{exprEqual, exprSame, compiler} = require('./kit/core')


describe '`for` statement', ->
  context 'when all parts have no effect', ->
    it 'should be unchanged', ->
      exprEqual(
        ->
          for i in [1,2,3]
            console.log(i)
          return
        ->
          for i in [1,2,3]
            console.log(i)
          return)

