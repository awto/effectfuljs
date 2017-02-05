import * as R from "ramda"
import * as Kit from "../src/kit"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import {recalcEff} from "../src/propagate"
import * as Trace from "../src/kit/trace"
import * as Block from "../src/block"
import * as Debug from "../src/debug"
import * as State from "../src/state"
import * as Uniq from "../src/uniq"
import * as Loops from "../src/loops"
import * as Ctrl from "../src/control"
import * as Branch from "../src/branch"
import * as Scope from "../src/scope"
import dump from "estransducers/dump"

const runInterp = (opts = {}) => transformExpr(
  R.pipe(
    Scope.topCastToBody,
    State.saveDecls,
    Loops.forOfStmt,
    Loops.doWhileStmt,
    recalcEff,
    State.prepare,
    opts.par ? R.pipe(State.aggregate,Loops.injectParLoop) : v => v,
    Ctrl.removeLabeldStatement,
    Loops.toBlocks,
    Branch.toBlocks,
    recalcEff,
    Loops.normilizeFor,
    Ctrl.injectBlock,
    recalcEff,
    Block.flatten,
    Uniq.collect,
    Loops.injectRepeat,
    recalcEff,
    Array.from,
    Block.splitEffBlock,
    Block.calcVarDeps(false),
    State.calcState,
    State.calcClosOptDeps,
    State.resetFwdDepForNonBind,
    Block.groupDeps,
    Block.factorEffSeq,
    recalcEff,
    State.recalcState,
    State.aggregate,
    State.injectClosureReads,
    State.aggregate,
    State.removeUselessWrites,
    State.injectLetWrites,
    State.injectFrameReads,
    Block.calcVarDeps(true),
    Block.groupBindDeps,
    recalcEff,
    Block.lassoc,
    Block.propagateBindVars,
    State.interpretStateOpts,
    State.renameVarPass,
    recalcEff,
    opts.par ? Loops.interpretParLoop : v => v,
    Ctrl.interpret,
    Loops.interpretRepeat,
    Block.cleanupEffSeq,
    Block.interpretParEffSeq,
    Block.interpretBinEffSeq,
    Block.interpretApp,
    Block.interpretBindFrame,
    Block.interpretCasts,
    State.restoreDecls,
    Branch.clean,
    Uniq.subst,
    consume))

describe('par loops', function() {
  const run = runInterp({par:true})
  it('should inject `forPar` 1', function() {
      equal(
        run(function() {
          eff1();
          for(var i = eff2(); i < 10; i++) {
            var j = eff3(i);
            eff4(j++);
          }
          eff7(i);
        }),
        print(function () {
          var i;
          var j;
          return eff1().mbind(() => eff2()).mbind(a => {
            var b = i = a;
            return M.forPar(i, i => i < 10, i => (i++, i), i => eff3(i).mbind(c => {
              j = c;
              var d = j++;
              return eff4(d);
            }));
          }).mbind(e => {
            i = e;
            return eff7(i);
          });
        }))
  })
  it.skip('should inject `forPar` 2', function() {
      equal(
        run(function() {
          eff1();
          var k;
          for(var i = eff2(), j = eff3(); i < 10 && j > -10; i++,j--) {
            var k = eff3(i);
            eff4(k++);
          }
          eff5(i,j)
        }),
        print(function () {
          var i, j, k;
          return eff1().mbind(() => eff2()).mbind(a => {
            var b = i = a;
            return M.forPar(i, i => i < 10, i => (i++, i), i => eff3(i).mbind(c => {
              j = c;
              var d = j++;
              return eff4(d);
            }));
          })
        }))
  })
  context('with js side effect in its body', function() {
    it('should avoid converting to `forPar` 1', function() {
      equal(
        run(function() {
          var k = 0;
          eff1();
          for(var i = eff2(); i < 10; i++) {
            k++;
            var j = eff3(i), l = eff4(i);
            l++;
            eff5(j++,k,l);
          }
          eff6(i,j,k);
        }),
        print(`function () {
          var k;
          var i;
          var j, l;
          k = 0;
          return M.set({k: k})
            .mseq(eff1())
            .mbind(() => eff2())
            .mbind(a => {
              i = a;
              return M.block(
                label => M.modify(s => ({i: i,k: s.k}))
                  .mseq(M.repeat(
                    () => M.get().mbind(({i,k}) => {
                      if (i < 10) {
                        k++;
                        return M.set({k: k})
                          .mseq(eff3(i))
                          .mbind(b => {
                            j = b;
                            return eff4(i)
                              .mbind(c => {
                                var j1 = j;
                                l = c;
                                l++;
                                var d = j1++;
                                return M.modify(s => ({j: j1,k: s.k}))
                                  .mseq(eff5(d, k, l));
                              });
                          }).mbind(() => {
                            var i1 = i;
                            i1++;
                            return M.modify(s => ({i: i1,j: s.j,k: s.k}));
                            });
                      } else
                        return label();
                    }))));
            }).mbind(() => M.get())
              .mbind(({i,j,k}) => eff6(i, j, k));
        }`))
    })
    it('should avoid converting to `forPar` 2', function() {
      equal(
        run(function() {
          var j;
          eff1();
          for(var i = eff2(); i < 10; i++) {
            eff3(i,j);
            eff4(j++);
          }
          eff7(i);
        }),
        print(`function () {
          var j;
          var i;
          return eff1().mbind(() => eff2()).mbind(a => {
            i = a;
            return M.block(
              label => M.set({i: i})
                .mseq(M.repeat(
                  () =>
                    M.get().mbind(
                      ({i,j}) => {
                        if (i < 10)
                          return eff3(i, j).mbind(() => {
                            var j1 = j;
                            var b = j1++;
                            return M.set({j: j1}).mseq(eff4(b));
                          }).mbind(() => {
                            var i1 = i;
                            i1++;
                            return M.modify(s => ({i: i1,j: s.j}));
                          });
                        else
                          return label();
                      }))));
          }).mbind(() => M.get()).mbind(({i}) => eff7(i));
        }`))
    })
  })
})


describe('interpret loops', function() {
  const run = runInterp()
  it('should inject repeat/block calls 1', function() {
      equal(
        run(function() {
          eff1();
          for(eff2(); eff(3); eff4()) {
            eff5();
            eff6();
          }
          eff7();
        }),
        print(function () {
          return eff1()
            .mbind(() => eff2())
            .mbind(() => M.block(
              label =>
                M.repeat(() =>
                         eff(3).mbind(a => {
                           if (a)
                             return eff5()
                               .mbind(() => eff6())
                               .mbind(() => eff4());
                           else
                             return label();
                         })))).mbind(() => eff7());
        }))
  })
  it('should inject repeat/block calls 2', function() {
      equal(
        run(function() {
          var i;
          eff1();
          for(i = eff2(); i !== eff(3); i = eff4(i)) {
            eff5(i);
            eff6(i);
          }
          eff7(i);
        }),
        print(`function () {
          var i;
          return eff1()
            .mbind(() => eff2())
            .mbind(a => {
              i = a;
              return M.block(
                label => M.set({i: i})
                  .mseq(M.repeat(
                    () => eff(3)
                      .mbind(
                        b => M.get()
                          .mbind(({i}) => {
                            if (i !== b)
                              return eff5(i)
                                .mbind(() => eff6(i))
                                .mbind(() => eff4(i))
                                .mbind(c => {
                                  i = c;
                                  return M.set({i:i}) });
                            else
                              return label();
                          })))));
            })
            .mbind(() => M.get())
            .mbind(({i}) => eff7(i));
        }`))
  })
  context('with `continue`', function() {
    it('should add update part', function() {
      equal(
        run(`function() {
          for(var i = init();check() === true;upd()) {
            b1()
            if(v) {
              e();
              continue
            }
          }
        }`),
        print(function () {
          var i;
          return init().mbind(a => {
            i = a;
            return M.block(label => M.repeat(() => check().mbind(b => {
              if (b === true)
                return M.block($continue => b1().mbind(() => {
                  if (v)
                    return e().mbind(() => $continue());                  
                })).mbind(() => upd());
              else
                return label();
            })));
          });
        }))
    })
  })
  it('should create continue block 1', function() {
    equal(
      run(function() {
            for(let i = init();check() === true;upd())
              if (a) eff(1); else continue;
          }),
      print(function () {
        var i;
        return init().mbind(b => {
          i = b;
          return M.block(label => M.repeat(() => check().mbind(c => {
            if (c === true)
              return M.block($continue => {
                if (a)
                  return eff(1);
                else
                  return $continue();
              }).mbind(() => upd());
            else
              return label();
          })));
        });
      }))
  })
  context('with embedded loop', function() {
    it('should create continue block 2', function() {
      equal(
        run(function() {
              loo: for(let i = init();check() === true;upd())
                for(let j = initJ();checkJ() === true;updJ())
                  if (i === j) continue; else continue loo;
            }),
        print(function () {
          var i;
          var j;
          return init().mbind(a => {
            i = a;
            return M.block(loo => M.repeat(() => check().mbind(b => {
              if (b === true)
                return M.block(loo$continue => initJ().mbind(c => {
                  j = c;
                  return M.block(label => M.repeat(() => checkJ().mbind(d => {
                    if (d === true)
                      return M.block($continue => {
                        if (i === j)
                          return $continue();
                        else
                          return loo$continue();
                      }).mbind(() => updJ());
                    else
                      return label();
                  })));
                })).mbind(() => upd());
              else
                return loo();
            })));
          });
        }))
    })
  })
})

describe('interpret blocks', function() {
  const run = runInterp()
  it('should inject scope/block calls 1', function() {
      equal(
      run(function() {
        eff1();
        eff2();
        lab1: {
          eff3();
          if (eff(4))
            break lab1;
          else
            return;
        }
        eff(5);
      }),
      print(function () {
        return M.scope(ret =>
                       eff1()
                       .mbind(() => eff2())
                       .mbind(() => M.block(
                         lab1 => eff3()
                           .mbind(() => eff(4))
                           .mbind(a => {
                             if (a)
                               return lab1();
                             else
                               return ret();
                           })))
                       .mbind(() => eff(5)));
      }))
  })
  it('should inject scope/block calls 2', function() {
      equal(
      run(function() {
        eff1();
        if(a)
          return 5;
        eff6();
      }),
      print(function () {
        return M.scope(ret => eff1().mbind(() => {
          if (a)
            return ret(5);
        }).mbind(() => eff6()));
      }))
  })
  it('should inject scope/block calls 3', function() {
      equal(
      run(function() {
        eff1();
        if(a)
          return eff5(5);
        eff6();
      }),
      print(function () {
        return M.scope(ret => eff1().mbind(() => {
          if (a)
            return eff5(5).mbind(b => ret(b));
        }).mbind(() => eff6()));
      }))
  })
  it('should inject scope/block calls 4', function() {
      equal(
        run(function() {
          var i = 0;
          eff5(i++);
          if (ee)
            eff7(i++)
          eff8(i);
        }),
        print(`function () {
          var i;
          i = 0;
          var a = i++;
          return M.set({i: i})
            .mseq(eff5(a))
            .mbind(() => {
              var i1 = i; 
              if (ee) {
                var b = i1++;
                return M.set({
                  i: i1
                }).mseq(eff7(b));
              }
            })
            .mbind(() => M.get())
            .mbind(({i}) => eff8(i));
        }`))

  })
  it('should inject scope/block calls 5', function() {
      equal(
        run(function() {
          var i;
          eff1(eff2(i=0),i++);
          lab1: {
            eff3(i++);
            eff4(i++);
            lab2: {
              eff5(i++);
              if (eff6(i++)) {
                eff7(i++)
                break lab1;
              } else if (eff7(i)) {
                i++
                break lab2;
              } else {
                return 10;
              }
              eff7(i++);
            }
            eff8(i++);
          }
          eff9(i++);
          eff10(i++);
      }),
      print(`function () {
        var i;
        return M.scope(ret => {
          var a = i = 0;
          return eff2(a).mbind(b => {
            var i1 = i;
            var c = i1++;
            return eff1(b, c).mbind(() => {
              var i2 = i1;
              return M.block(lab1 => {
                var d = i2++;
                return eff3(d).mbind(() => {
                  var i3 = i2;
                  var e = i3++;
                  return eff4(e).mbind(() => {
                    var i4 = i3;
                    return M.block(lab2 => {
                      var f = i4++;
                      return eff5(f).mbind(() => {
                        var i5 = i4;
                        var g = i5++;
                        return M.set({i: i5}).mseq(eff6(g)).mbind(h => {
                          var i6 = i5;
                          if (h) {
                            var k = i6++;
                            return M.set({i: i6}).mseq(eff7(k)).mbind(() => lab1());
                          } else
                            return eff7(i6).mbind(m => {
                              var i7 = i6;
                              if (m) {
                                i7++;
                                return M.set({i: i7}).mseq(lab2());
                              } else
                                return ret(10);
                            });
                        });
                      }).mbind(() => M.get()).mbind(({i}) => {
                        var n = i++;
                        return M.set({i: i}).mseq(eff7(n));
                      });
                    });
                  });
                }).mbind(() => M.get()).mbind(({i}) => {
                  var x = i++;
                  return M.set({i: i}).mseq(eff8(x));
                });
              });
            });
          }).mbind(() => M.get().mbind(({i}) => {
            var y = i++;
            return eff9(y).mbind(() => {
              var i8 = i;
              var z = i8++;
              return eff10(z);
            });
          }));
        });
      }`))
  })
})
