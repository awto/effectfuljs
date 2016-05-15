{exprEqual, compiler} = require('./kit/core')

describe 'expressions translator', ->
  it 'should leave pure expressions as is', ->
    exprEqual (-> 2 + 2), (-> 2 + 2)
  it 'should treat function call as effectful', ->
    exprEqual (-> eff(2); return), (-> eff(2))
  it 'should transform expressions with effectful part to mapply', ->
    exprEqual (-> console.log(2 + eff(2)); return),
      (-> M(eff(2)).mapply((b) -> console.log(2 + b); return))
    exprEqual (-> console.log(eff(1) + eff(2)); return),
      (-> M.arr([eff(1),eff(2)]).mapply(M.spread(
        ((b1,b) -> console.log(b1 + b);return))))
  it 'should transform nested effectful expressions to bind', ->
    exprEqual (-> eff(effb(2)); return), (-> M(effb(2)).mbind(eff))
  it 'should use mapply for pure function calls if possible', ->
    exprEqual(
      -> console.log(eff(1), 2); return,
      -> M(eff(1)).mapply((b) -> console.log(b, 2);return))
    exprEqual(
      -> console.log(eff(1), 2) + eff(2) * 2; return,
      -> M.arr([eff(1),eff(2)]).mapply(M.spread(
            (b1,b) -> console.log(b1, 2) + b * 2; return)))
    exprEqual(
      -> console.log(eff(1), eff(2), 2); return,
      -> M.arr([eff(1),eff(2)]).mapply(M.spread(
          (b1, b) -> console.log(b1, b, 2); return)))
    exprEqual(
      -> console.log(eff(1) + eff(2), 2); return,
      -> M.arr([eff(1),eff(2)]).mapply(M.spread((b1, b) -> console.log(b1 + b, 2); return)))
  it 'should convert effectful callee into a bind', ->
    exprEqual(
      -> eff(1)(eff(2)); return
      -> M.arr([eff(1),eff(2)]).mbind(M.spread((b1,b) -> b1(b))))
    exprEqual(
      -> eff(1)(eff(2)(eff(3))); return
      -> M.arr([eff(1),M.arr([eff(2),eff(3)]).mbind(M.spread((b1, b) -> b1(b)))]).mbind(M.spread (b3,b2) -> b3(b2)))
    exprEqual(
      -> eff(1)(eff(2),eff(3),4); return
      -> M.arr([eff(1),eff(2),eff(3)]).mbind(M.spread((b2, b1, b) -> b2(b1, b, 4))))
  it 'should combine bind in mapplys accordingly', ->
    exprEqual(
      -> 5 + eff(effb(2)) + effc(3); return
      -> M.arr([M(effb(2)).mbind(eff),effc(3)]).mapply(M.spread(
        (b2, b) -> 5 + b2 + b; return)))
    exprEqual(
      -> eff(1)(eff(2) + 2); return
      -> M.arr([eff(1),eff(2)]).mbind(M.spread((b1, b) -> b1(b + 2))))
    exprEqual(
      -> 5 + effc(3) + eff(effb(2) + 4); return
      -> M.arr([effc(3),M(effb(2)).mbind((b) -> eff(b + 4))]).mapply(M.spread(
            (b2, b1) -> 5 + b2 + b1; return)))
  it 'should keep pure statements block in a single function', ->
    exprEqual(
      ->
        console.log(eff("1"),3)
        console.log("2")
        console.log("3")
      ->
          M(eff("1")).mapply (b) ->
              console.log(b,3)
              console.log("2")
              console.log('3'))
    exprEqual(
      ->
        console.log(eff("1"),eff(2),3)
        console.log("4")
      ->
          M.arr([eff("1"),eff(2)]).mapply(M.spread((b1,b)->
            console.log(b1,b,3)
            console.log("4"))))
  it 'should bind current scope `this`', ->
    exprEqual(
      ->
        eff(1)
        @eff(2)
        eff3(@)
        return
      """
      function () {
        var _this = this;
        return M(eff(1)).mbind(function () {
          return _this.eff(2);
        }).mbind(function () {
          return eff3(_this);
        });
      }""")


