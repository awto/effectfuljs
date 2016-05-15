assert = require('assert')

#console.dir(require.cache)

{exprEqual, compiler} = require('./kit/core')

describe '`throw` statements compiler', ->
  it 'should leave unchanged if it has pure argument', ->
    exprEqual(
      ->
        throw new Error("error")
      ->
        throw new Error("error"))
    exprEqual(
      ->
        eff(1)
        throw new Error("error")
      ->
        M(eff(1)).mbind(-> M.raise(new Error("error"))))
  it 'should convert `throw` with effectful argument into monadish value', ->
    exprEqual(
      ->
        throw eff(1)
      ->
        M(eff(1)).mbind(M.raise))
  #TODO: after control pass
  it 'should ignore actions after monadish throw', ->
    exprEqual(
      ->
        throw eff(1)
        eff(2)
      """
      function () {
        return M(eff(1)).mbind(M.raise)
        .mbind(function () {
          return eff(2);
        });
      }
      """)

describe '`try` statements', ->
  context 'when all blocks are pure', ->
    it 'should be left unchanged', ->
      exprEqual(
        ->
          try
            console.log("1")
        ->
          try
            console.log("1"))
      exprEqual(
        ->
          try
            console.log("1")
          catch e
            console.log("2")
        ->
          try
            console.log("1")
          catch e
            console.log("2"))
      exprEqual(
        ->
          try
            console.log("1")
          catch e
            console.log("2")
          finally
            console.log("3")
        ->
          try
            console.log("1")
          catch e
            console.log("2")
          finally
            console.log("3"))
  context "when inner block has effects", ->
    context "when inner block has some pure prefix", ->
      it 'should wrap whole `try` block', ->
        exprEqual(
          """function () {
                    var e, error;
                    try {
                        console.log('1');
                        eff(1);
                    } catch (error) {
                        e = error;
                        console.log('2');
                    }
                }"""
          """function () {
              var e, error;
              return M.coerce(function () {
                console.log('1');
                return eff(1);
              }).mhandle(function (error) {
                e = error;
                console.log('2');
              });
          }""")
    context "when `catch` block has no effects", ->
      it 'should be monadish block and `mhandle`', ->
        #TODO: in some cases it mhandle block should return pure?
        exprEqual(
          """
          function() {
            try {
              eff(1);
            } catch(e) {
              console.log(e);
            }
          }
          """
          """
          function() {
            return M.coerce(function(){ return eff(1); })
              .mhandle(function(e) { console.log(e); });
          }""")
    context "when `finally` block has no effects", ->
      it 'should be monadish block with `mhandle` and `mfinally`', ->
        exprEqual(
          """
          function() {
            try {
              eff(1);
            } catch(e) {
              console.log(e);
            } finally {
              console.log("fin");
            }
          }
          """
          """
          function() {
            return M.coerce(function() { return eff(1); })
              .mhandle(function(e) { console.log(e); })
              .mfinally(function() { console.log("fin"); });
          }""")
    context 'when catch has effects', ->
      it 'should be converted into `mhandle` with effects', ->
        exprEqual(
          """
          function() {
            try {
              eff(1);
            } catch(e) {
              console.log(e,1);
              eff(2);
              console.log(e,2);
            }
          }
          """
          """
          function() {
            return M.coerce(function() { return eff(1); })
              .mhandle(function(e) {
                 console.log(e,1);
                 return M(eff(2))
                  .mapply(function() {
                    console.log(e,2);
                    });
                 });
          }""")
    context 'when finally has effects', ->
      it 'should be converted into `mfinally`', ->
        exprEqual(
          """
          function() {
            try {
              eff(1);
            } finally {
              console.log(1);
              eff(2);
              console.log(2);
            }
          }
          """
          """
          function() {
            return M.coerce(function() { return eff(1); })
              .mfinally(function() {
                console.log(1);
                return M(eff(2)).mapply(function() {
                  console.log(2);
                  });
               });
          }""")
    context 'when there is finally block without effects', ->
      it 'should be converted into monadish block and `mfinally`', ->
        exprEqual(
          """
          function() {
            try {
              eff(1);
            } finally {
              console.log("fin");
            }
          }
          """
          """
          function() {
            return M.coerce(function() { return eff(1); })
              .mfinally(function() { console.log("fin"); });
          }""")
