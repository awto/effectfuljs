import * as R from "ramda"
import * as Kit from "../src/kit"
import {consumeScope,
        debDumbBindStmt,
        removeEmptyBinds} from "../src/transform"
import {Tag,produce,consume} from "estransducers"
import dump from "estransducers/dump"
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
import * as Scope from "../src/scope"
import * as Branch from "../src/branch"
import * as Coerce from "../src/coerce"
import * as Policy from "../src/policy"

const runImpl = (pass) => transformExpr(R.pipe(
  Scope.topCastToBody,
  State.prepare,
  State.aggregate,
  Branch.toBlocks,
  recalcEff,
  Block.flatten,
  Block.splitEffBlock,
  State.calcState,
  State.removeUselessWrites,
  Debug.mark,
  Kit.adjustFieldType,
  consumeScope
))

const runInterp = (opts = {}) =>
      (t) => transformExpr(R.pipe(
        Scope.topCastToBody,
        Branch.toBlocks,
        recalcEff,
        Coerce.lift,
        State.saveDecls,
        State.prepare,
        Block.flatten,
        Uniq.collect,
        Array.from,
        Block.splitEffBlock,
        Block.calcVarDeps(false),
        State.calcState,
        opts.clos ? State.calcClosOptDeps : v => v,
        State.resetFwdDepForNonBind,
        Block.groupDeps,
        recalcEff,
        Block.calcVarDeps(true),
        Block.groupBindDeps,
        recalcEff,
        Block.factorEffSeq,
        recalcEff,
        State.recalcState,
        opts.clos ? State.injectClosureReads : v => v,
        State.removeUselessWrites,
        Block.propagateBindVars,
        State.injectLetWrites,
        Block.setPatVarToArgs,
        State.injectFrameReads,
        recalcEff,
        Block.lassoc,
        Block.cleanPureFrames,
        Block.propagateBindVars,
        Block.setPatVarToArgs,
        State.interpretStateOpts,
        State.renameVarPass,
        recalcEff,
        Block.cleanupEffSeq,
        Block.interpretParEffSeq,
        Block.interpretBinEffSeq,
        Coerce.inject,
        Coerce.liftFuncs,
        Block.interpretPure,
        Block.interpretApp,
        Block.interpretBindFrame,
        Coerce.interpret,
        Block.interpretCasts,
        State.restoreDecls,
        Branch.clean,
        Uniq.subst,
        consumeScope
      ),t,{ns:"M",coerce:opts.coerce})

describe('mark state operations', function() {
  const run = runImpl(v => v)
  it('should inject reads/writes accordingly', function() {
    equal(
      run(function() {
        var i = 0
        eff(i);
        i++;
        eff();
        eff(i);
        i = i + 1;
        eff(i);
        eff()
        ccc = i;
        i = 10;
        eff();
        ccc = i;
        i = 10;
        eff(i);
        i = 10;
        eff();
        i = 10;
        eff(i);
      }),
      print(function () /*BS|..|E*/{
        /*BS|#|L[i]|E*/{
          var /*VD|i:W*/i = 0;
          /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
        }
        /*BS|#|R[i]L[i]U[i]|E*/{
          /*UE|i:WR*/i++;
          /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff();
        }
        /*BS|#|R[i]U[i]|E*/{
          /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
        }
        /*BS|#|L[i]U[i]|E*/{
          /*AE|i:W*/i = /*I|i:R*/i + 1;
          /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
        }
        /*BS|#|U[i]|E*/{
          /*ES|S|U[i]|E*/ /*CE|B*/eff();
        }
        /*BS|#|R[i]L[i]U[i]|E*/{
          ccc = /*I|i:R*/i;
          /*AE|i:W*/i = 10;
          /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff();
        }
        /*BS|#|R[i]L[i]U[i]|E*/{
          ccc = /*I|i:R*/i;
          /*AE|i:W*/i = 10;
          /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
        }
        /*BS|#|L[i]U[i]|E*/{
          /*AE|i:W*/i = 10;
          /*ES|S|U[i]|E*/ /*CE|B*/eff();
        }
        /*BS|#|L[i]U[i]|E*/{
          /*AE|i:W*/i = 10;
          /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
        }
      }))
  })
  context('with `if` statement',function() {
    context('with pure blocks', function() {
      it('injects write', function() {
        equal(
          run(function() {
            var i = 0, j = 1, k = 2
            eff(i)
            i++
            j++
            if (j) {
              i = 10
              eff(i++)
              eff(j)
            } else {
              i = 11
              i+=1
              k+=1
            }
            eff(i,k)
          }),
          print(function () /*BS|..|E*/{
            /*BS|#|L[i,j,k]|E*/{
              var /*VD|i:W*/i = 0,
                  /*VD|j:W*/j = 1,
                  /*VD|k:W*/k = 2;
              /*ES|S|W[i,j,k]U[i,j,k]|E*/ /*CE|B*/eff( /*I|i:R*/i);
            }
            /*BS|#|R[i,j,k]L[i,j,k]U[i,j,k]|E*/{
              /*UE|i:WR*/i++;
              /*UE|j:WR*/j++;
              /*IS|E*/if ( /*I|j:R*/j) /*BS|..|E*/{
                /*BS|#|U[i,j,k]|E*/{
                  /*AE|i:W*/i = 10;
                  /*VD|S*/var a = /*UE|i:WR*/i++;
                  /*ES|S|W[i,j]C[k]U[i,j,k]|E*/ /*CE|B*/eff(a);
                }
                /*BS|#|R[j]U[i,j,k]|E*/{
                  /*ES|S|U[i,j,k]|E*/ /*CE|B*/eff( /*I|j:R*/j);
                }
              } else /*BS|..*/{
                /*BS|#|s[i,k]U[i,j,k]*/{
                  /*AE|i:W*/i = 11;
                  /*AE|i:WR*/i += 1;
                  /*AE|k:WR*/k += 1;
                }
              }
            }
            /*BS|#|R[i,k]U[i,j,k]|E*/{
              /*ES|S|U[i,j,k]|E*/ /*CE|B*/eff( /*I|i:R*/i, /*I|k:R*/k);
            }
          }))
      })
    })
    context('in the last statement', function() {
      it('should not write anything in any branch', function() {
        equal(
          run(function() {
            var i = 0
            eff(i)
            i++
            if (i) {
              eff(i)
            } else {
              eff()
              i+=1
              eff(i)
            }
          }),
          print(function () /*BS|..|E*/{
            /*BS|#|L[i]|E*/{
              var /*VD|i:W*/i = 0;
              /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
            }
            /*BS|#|R[i]L[i]U[i]|E*/{
              /*UE|i:WR*/i++;
              /*IS|E*/if ( /*I|i:R*/i) /*BS|..|E*/{
                /*BS|#|U[i]|E*/{
                  /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
                }
              } else /*BS|..|E*/{
                /*BS|#|U[i]|E*/{
                  /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff();
                }
                /*BS|#|R[i]L[i]U[i]|E*/{
                  /*AE|i:WR*/i += 1;
                  /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
                }
              }
            }
          }))
      })
    })
    it('should have write on each branch', function() {
      equal(
        run(function() {
          var i = 0
          eff(i)
          i++
          if (i) {
            eff(i)
          } else {
            eff()
            i+=1
            eff(i)
          }
          eff(i)
        }),
        print(function () /*BS|..|E*/{
          /*BS|#|L[i]|E*/{
            var /*VD|i:W*/i = 0;
            /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
          }
          /*BS|#|R[i]L[i]U[i]|E*/{
            /*UE|i:WR*/i++;
            /*IS|E*/if ( /*I|i:R*/i) /*BS|..|E*/{
              /*BS|#|U[i]|E*/{
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
              }
            } else /*BS|..|E*/{
              /*BS|#|U[i]|E*/{
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff();
              }
              /*BS|#|R[i]L[i]U[i]|E*/{
                /*AE|i:WR*/i += 1;
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
              }
            }
          }
          /*BS|#|R[i]U[i]|E*/{
            /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
          }
        }))
    })
  })
  context('with `for` statement', function() {
    context('in the last statement', function() {
      it('should still have writes in the end of the body', function() {
        equal(
          run(function() {
            var i = 0;
            for(;;) {
              i++
              eff(i)
            }
          }),
          print(function () /*BS|..|E*/{
            /*BS|#|L[i]|E*/{
              var /*VD|i:W*/i = 0;
              /*FS|E*/for (;;) /*BS|..|E*/{
                /*BS|#|U[i]|E*/{
                  /*UE|i:WR*/i++;
                  /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
                }
              }
            }
          }))
      })
    })
    it('should read initial value in body', function() {
      equal(
        run(function() {
          var i = 0;
          for(;;) {
            i++
            eff(i)
          }
          eff(i)
        }),
        print(function () /*BS|..|E*/{
          /*BS|#|L[i]|E*/{
            var /*VD|i:W*/i = 0;
            /*FS|E*/for (;;) /*BS|..|E*/{
              /*BS|#|U[i]|E*/{
                /*UE|i:WR*/i++;
                /*ES|S|W[i]U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
              }
            }
          }
          /*BS|#|R[i]U[i]|E*/{
            /*ES|S|U[i]|E*/ /*CE|B*/eff( /*I|i:R*/i);
          }
        }))
    })
    
  })
})

describe('interpret state operations', function() {
  const run = runInterp()
  it('should inject state reads/writes', function() {
    equal(
      run(function() {
          var j = 0
          eff(j)
          eff(j++);
          eff2(j);
          eff3(j++);
      }),
      print(`function () {
        var j;
        j = 0;
        return M.set({
          j: j
        }).mseq(eff(j)).mbind(() => M.get()).mbind(({
          j
        }) => {
          var a = j++;
          return M.set({
            j: j
          }).mseq(eff(a));
        }).mbind(() => M.get()).mbind(({
          j
        }) => eff2(j)).mbind(() => M.get()).mbind(({
          j
        }) => {
          var b = j++;
          return eff3(b);
        });
      }`))
  })
  context('with closures', function() {
    const run = runInterp({clos:true})
    it('should keep state variable in closures 1', function() {
        equal(
          run(function() {
            var j = 0
            eff(j)
            eff(j++);
            eff2(j);
            eff3(j++);
          }),
          print(function() {
            var j;
            j = 0;
            return eff(j).mbind(() => {
              var j1 = j;
              var a = j1++;
              return eff(a).mbind(() => eff2(j1)).mbind(() => {
                var j2 = j1;
                var b = j2++;
                return eff3(b);
              });
            });
          }))
    })
    it('should keep state variable in closures 2', function() {
      equal(
        run(function() {
          var i;
          eff1(i++);
        }),
        print(`function() {
          var i;
          return M.get().mbind(({i}) => {
            var a = i++;
            return eff1(a);
          });
        }`))
    })
    context('with `if` statement', function() {
      it('should treat state independently in branches 1', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
            } else {
              eff3(i);
            }
          }),
          print(function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return eff1(i).mbind(() => {
                if (t)
                  return eff2(i);
                else
                  return eff3(i);
              });
            });
          }))
      })
      
      it('should treat state independently in branches 2', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              eff3(i);
            }
          }),
          print(function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return eff1(i).mbind(() => {
                if (t)
                  return eff2(i).mbind(() => {
                    var i1 = i;
                    i1++;
                    return eff4(i1);
                  });
                else
                  return eff3(i);
              });
            });
          }))
      })
      it('should treat state independently in branches 3', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              eff3(i);
            }
            eff5(i);
          }),
          print(`function () {
              var i;
              return eff0().mbind(() => {
                i = 0;
                i++;
                return M.set({i: i})
                  .mseq(eff1(i)).mbind(() => {
                    if (t)
                      return eff2(i).mbind(() => {
                        var i1 = i;
                        i1++;
                        return M.set({i: i1}).mseq(eff4(i1));
                      });
                    else
                      return eff3(i);
                  });
              }).mbind(() => M.get()).mbind(({i}) => eff5(i));
            }`))
      })
      it('should treat state independently in branches 4', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              eff5(i);
              i++
              eff6(i)
            }
            eff7(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return eff1(i).mbind(() => {
                if (t)
                  return eff2(i).mbind(() => {
                    var i1 = i;
                    i1++;
                    return M.set({i: i1}).mseq(eff4(i1));
                  });
                else
                  return eff5(i).mbind(() => {
                    var i2 = i;
                    i2++;
                    return M.set({i: i2}).mseq(eff6(i2));
                  });
              });
            }).mbind(() => M.get()).mbind(({i}) => eff7(i));
          }`))
      })
      it('should treat state independently in branches 5', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              eff3(i);
            }
            eff5(i);
            i++
            eff6(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return M.set({i: i}).mseq(eff1(i)).mbind(() => {
                if (t)
                  return eff2(i).mbind(() => {
                    var i1 = i;
                    i1++;
                    return M.set({i: i1}).mseq(eff4(i1));
                  });
                else
                  return eff3(i);
              });
            }).mbind(() => M.get().mbind(({i}) => 
              eff5(i).mbind(() => {
                var i2 = i;
                i2++;
                return eff6(i2);
              })));
          }`))
      })
      it('should treat state independently in branches 6', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              eff3();
            }
            eff5(i);
            i++
            eff6(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return M.set({i: i}).mseq(eff1(i)).mbind(() => {
                if (t)
                  return eff2(i).mbind(() => {
                    var i1 = i;
                    i1++;
                    return M.set({i: i1}).mseq(eff4(i1));
                  });
                else
                  return eff3();
              });
            }).mbind(() => M.get().mbind(({i}) => eff5(i).mbind(() => {
              var i2 = i;
              i2++;
              return eff6(i2);
            })));
          }`))
      })
      it('should treat state independently in branches 7', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              t;
            }
            eff5(i);
            i++
            eff6(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return M.set({i: i})
                .mseq(eff1(i))
                .mbind(() => {
                  if (t)
                    return eff2(i).mbind(() => {
                      var i1 = i;
                      i1++;
                      return M.set({i: i1}).mseq(eff4(i1));
                    });
                  else {
                    t;
                  }
                });
            }).mbind(() =>
                     M.get()
                     .mbind(({i}) =>
                            eff5(i).mbind(() => {
                              var i2 = i;
                              i2++;
                              return eff6(i2);
                            })));
          }`))
      })
      it('should treat state independently in branches 8', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              t + i;
            }
            eff5(i);
            i++
            eff6(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return M.set({i: i}).mseq(eff1(i)).mbind(() => {
                if (t)
                  return eff2(i).mbind(() => {
                    var i1 = i;
                    i1++;
                    return M.set({i: i1}).mseq(eff4(i1));
                  });
                else {
                  t + i;
                }
              });
            }).mbind(() => M.get().mbind(({i}) => eff5(i).mbind(() => {
              var i2 = i;
              i2++;
              return eff6(i2);
            })));
          }`))
      })
      it('should treat state independently in branches 9', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            i++
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              t;
            }
            eff5(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return eff1(i).mbind(() => {
                var i1 = i;
                i1++;
                if (t)
                  return eff2(i1).mbind(() => {
                    var i2 = i1;
                    i2++;
                    return M.set({i: i2}).mseq(eff4(i2));
                  });
                else {
                  t;
                  return M.set({i: i1});
                }
              });
            }).mbind(() => M.get()).mbind(({i}) => eff5(i));
          }`))
      })
      it('should treat state independently in branches 10', function() {
        equal(
          run(function() {
            eff0();
            var i = 0;
            i++;
            eff1(i);
            i++
            if (t) {
              eff2(i);
              i++
              eff4(i)
            } else {
              i++;
            }
            eff5(i);
          }),
          print(`function () {
            var i;
            return eff0().mbind(() => {
              i = 0;
              i++;
              return eff1(i).mbind(() => {
                var i1 = i;
                i1++;
                if (t)
                  return eff2(i1).mbind(() => {
                    var i2 = i1;
                    i2++;
                    return M.set({
                      i: i2
                    }).mseq(eff4(i2));
                  });
                else {
                  i1++;
                  return M.set({
                    i: i1
                  });
                }
              });
            }).mbind(() => M.get()).mbind(({
              i
            }) => eff5(i));
          }`))
      })
      context("with coerce", function() {
        const run = runInterp({clos:true,coerce:true})
        it('should treat state independently in branches 11', function() {
          equal(
            run(function() {
              eff0();
              var i = 0;
              i++;
              eff1(i);
              i++
              if (t) {
                eff2(i);
                i++
                eff4(i)
              } else {
                i++;
              }
              eff5(i);
            }),
            print(`function () {
              var i;
              return M(eff0()).mbind(() => {
                i = 0;
                i++;
                return M(eff1(i)).mbind(() => {
                  var i1 = i;
                  i1++;
                  if (t)
                    return M(eff2(i1)).mbind(() => {
                      var i2 = i1;
                      i2++;
                      return M.set({i: i2}).mseq(eff4(i2));
                    });
                  else {
                    i1++;
                    return M.set({i: i1});
                  }
                });
              }).mbind(() => M.get()).mbind(({i}) => eff5(i));
            }`))
        })
      })
      context("disabled", function() {
        const run = runInterp({clos:true,coerce:false})
        it('should treat state independently in branches 12', function() {
          equal(
            run(function() {
              eff0();
              var i = 0;
              i++;
              eff1(i);
              i++
              if (t) {
                eff2(i);
                i++
                eff4(i)
              } else {
                i++;
              }
              eff5(i);
            }),
            print(`function () {
              var i;
              return eff0().mbind(() => {
                i = 0;
                i++;
                return eff1(i).mbind(() => {
                  var i1 = i;
                  i1++;
                  if (t)
                    return eff2(i1).mbind(() => {
                      var i2 = i1;
                      i2++;
                      return M.set({i: i2}).mseq(eff4(i2));
                    });
                  else {
                    i1++;
                    return M.set({i: i1});
                  }
                });
              }).mbind(() => M.get()).mbind(({i}) => eff5(i));
            }`))
        })
      })
      it('should treat state independently in branches 13', function() {
        equal(
          run(function() {
            var i = 0;
            if (t) {
              eff1(i)
            } else {
              i++;
            }
            eff2(i)
            eff3(i)
          }),
          print(`function () {
            var i;
            return (() => {
              i = 0;
              if (t)
                return M.set({i: i}).mseq(eff1(i));
              else {
                i++;
                return M.set({
                  i: i
                });
              }
            })().mbind(() => M.get()
                       .mbind(({i}) => eff2(i).mbind(() => eff3(i))));
          }`))
        it('should treat state independently in branches 14', function() {
          equal(
            run(function() {
              var i = 0
              eff(i)
              if(i++) { eff1(i); } else { eff2(i); }
              eff(i);
            }),
            print(function() {
              var i;
              i = 0;
              return M(eff(i)).mbind(() => {
                var i1 = i;
                var a = i1++;
                if (a) {
                  return M.set({
                    i: i1
                  }).mbind(() => eff1(i1));
                } else {
                  return M.set({
                    i: i1
                  }).mbind(() => eff2(i1));
                }
              }).mbind(() => M.get()).mbind(({
                i
              }) => eff(i));
            }))
        })
      })
      context('in the first effectful block', function() {
        it('should should use original variable', function() {
          equal(
            run(function() {
              var i = 0;
              i++;
              eff1(i);
              if (t) {
                eff2(i);
              } else {
                eff3(i);
              }
          }),
          print(function () {
            var i;
            i = 0;
            i++;
            return eff1(i).mbind(() => {
              if (t)
                return eff2(i);
              else
                return eff3(i);
            });
          }))
        })
      })
    })
    context('with sub blocks', function() {
      it('should insert reads/writes 1', function() {
        equal(
          run(function() {
            var i = 0
            {
              i++;
              eff1(i);
            }
            eff(i);
            {
              i++;
            }
            {
              eff2(i);
            }
          }),
          print(`function () {
            var i;
            return (() => {
              i = 0;
              {
                {
                  i++;
                }
                return M.set({i: i}).mseq(eff1(i));
              }
            })().mbind(() => M.get().mbind(({i}) => eff(i).mbind(() => {
              var i1 = i;
              {
                i1++;
              }
              return eff2(i1);
            })));
          }`))
      })
    })
    it('should utilize js scope if possible 1', function() {
      equal(
        run(function() {
          var i = 0
          eff1(i);
          i++;
          eff2(i);
        }),
        print(function () {
          var i;
          i = 0;
          return eff1(i).mbind(() => {
            var i1 = i;
            i1++;
            return eff2(i1);
          });
        }))
    })
    //TODO: mseq(M.get())
    it('should utilize js scope if possible 2', function() {
      equal(
        run(function() {
          var i = 0
          eff0(i++);
          eff1(i);
          i+=1;
          eff2(2);
          eff3(i+=2);
        }),
        print(function () {
          var i;
          i = 0;
          var a = i++;
          return eff0(a).mbind(() => eff1(i)).mbind(() => {
            var i1 = i;
            i1 += 1;
            return eff2(2).mbind(() => {
              var i2 = i1;
              var b = i2 += 2;
              return eff3(b);
            });
          });
        }))
    })
    it('should utilize js scope if possible 3', function() {
      equal(
        run(function() {
          var i = 0
          i++;
          eff1(i);
          eff2(i);
        }),
        //TODO: i1 seems redundant 
        print(function () {
          var i;
          i = 0;
          i++;
          return eff1(i).mbind(() => eff2(i));
        }))
    })    
    it('should utilize js scope if possible 4', function() {
      equal(
        run(function() {
          var i = 0
          eff0(i);
          i++;
          eff1(i);
          eff1(i);
          i++;
          eff1(i);
        }),
        print(`function () {
          var i;
          i = 0;
          return eff0(i).mbind(() => {
            var i1 = i;
            i1++;
            return eff1(i1)
              .mbind(() => eff1(i1))
              .mbind(() => {
                var i2 = i1;
                i2++;
                return eff1(i2);
              });
          });
        }`))
    })
    it('should utilize js scope if possible 5', function() {
      equal(
        run(function() {
          var i = 0, j = 0
          eff0(i++,j++);
          eff1(i);
          i+=1;
          eff2(2,j);
          eff3(i+=2,j);
          eff4(j);
        }),
        print(function () {
          var i, j;
          i = 0;
          j = 0;
          var a = i++;
          var b = j++;
          return eff0(a, b).mbind(() => eff1(i)).mbind(() => {
            var i1 = i;
            i1 += 1;
            return eff2(2, j).mbind(() => {
              var i2 = i1;
              var c = i2 += 2;
              return eff3(c, j);
            });
          }).mbind(() => eff4(j));
        }))
    })
    it('should utilize js scope if possible 6', function() {
      equal(
        run(function() {
          var i = 0, j = 0
          eff0(i,j);
          eff1(i++,j++);
          eff2(i);
          i+=1;
          eff3(2,j);
          eff4(i+=2,j);
          eff5(j);
        }),
        print(function () {
          var i, j;
          i = 0;
          j = 0;
          return eff0(i, j).mbind(() => {
            var i1 = i;
            var j1 = j;
            var a = i1++;
            var b = j1++;
            return eff1(a, b).mbind(() => eff2(i1)).mbind(() => {
              var i2 = i1;
              i2 += 1;
              return eff3(2, j1).mbind(() => {
                var i3 = i2;
                var c = i3 += 2;
                return eff4(c, j1);
              });
            }).mbind(() => eff5(j1));
          });
        }))
    })
    it('should utilize js scope if possible 7', function() {
      equal(
        run(function() {
          var i = 0, j = 0
          eff0(eff1(eff2(i++,eff3(eff4(i,j),j++),eff5(i)),i++),i);
        }),
        print(function () {
          var i, j;
          i = 0;
          j = 0;
          var a = i++;
          return eff4(i, j)
            .mbind(b => {
              var j1 = j;
              var c = j1++;
              return eff3(b, c);
            })
            .mbind(d => eff5(i).mbind(e => eff2(a, d, e)))
            .mbind(f => {
              var i1 = i;
              var g = i1++;
              return eff1(f, g).mbind(h => eff0(h, i1));
            });
        }))
    })
    it('should inject scope/block calls 8', function() {
      equal(
        run(function() {
          var i;
          eff1(i++);
          eff2(i++);
        }),
        print(`function () {
          var i;
          return M.get().mbind(({i}) => {
            var a = i++;
            return eff1(a).mbind(() => {
              var i1 = i;
              var b = i1++;
              return eff2(b);
            });
          });
        }`))
    })
    it('should inject scope/block calls 9', function() {
      equal(
        run(function() {
          var i;
          if (ee) {
            eff1(i++);
            eff2(i++);
          } else {
            eff1(i++);
            eff2(i++);
          }
        }),
        print(`function () {
          var i;
          return M.get().mbind(({i}) => {
            if (ee) {
              var a = i++;
              return eff1(a).mbind(() => {
                var i1 = i;
                var b = i1++;
                return eff2(b);
              });
            } else {
              var c = i++;
              return eff1(c).mbind(() => {
                var i2 = i;
                var d = i2++;
                return eff2(d);
              });
            }
          });
        }`))
    })
    it('should inject scope/block calls 10', function() {
      equal(
        run(function() {
          var i;
          i = eff1(i++);
          eff2(i)
          i = eff3(i++);
          eff4(i)
        }),
        print(`function () {
          var i;
          return M.get().mbind(({i}) => {
            var a = i++;
            return eff1(a).mbind(b => {
              i = b;
              return eff2(i).mbind(() => {
                var i1 = i;
                var c = i1++;
                return eff3(c);
              });
            }).mbind(d => {
              i = d;
              return eff4(i);
            });
          });
        }`))
    })
  })
  it('should insert reads/writes accordingly 2', function() {
    equal(
      run(function() {
        var i = 0
        eff1(i);
        i++;
        eff2(i);
      }),
      print(`function () {
        var i;
        i = 0;
        return M.set({i: i}).mseq(eff1(i)).mbind(() => M.get())
          .mbind(({i}) => {
            i++;
            return eff2(i);
          });
      }`))
  })
  //TODO: mseq(M.get())
  it('should insert reads/writes accordingly 3', function() {
    equal(
      run(function() {
        var i = 0
        eff0(i++);
        eff1(i);
        i+=1;
        eff2(2);
        eff3(i+=2);
      }),
      print(`function () {
        var i;
        i = 0;
        var a = i++;
        return M.set({i: i})
          .mseq(eff0(a))
          .mbind(() => M.get())
          .mbind(({i}) => eff1(i))
          .mbind(() => M.get())
          .mbind(({i}) => {
            i += 1;
            return M.set({
              i: i
            }).mseq(eff2(2));
          })
          .mbind(() => M.get())
          .mbind(({i}) => {
            var b = i += 2;
            return eff3(b);
          });
      }`))
  })
  it('should insert reads/writes accordingly 3', function() {
    equal(
      run(function() {
        var i = 0, j = 0
        eff0(i++,j++);
        eff1(i);
        i+=1;
        eff2(2,j);
        eff3(i+=2,j);
        eff4(j);
      }),
      print(`function () {
        var i, j;
        i = 0;
        j = 0;
        var a = i++;
        var b = j++;
        return M.set({
          i: i,
          j: j
        }).mseq(eff0(a, b)).mbind(() => M.get()).mbind(({
          i
        }) => eff1(i)).mbind(() => M.get()).mbind(({
          i,
          j
        }) => {
          i += 1;
          return M.modify(s => ({
            i: i,
            j: s.j
          })).mseq(eff2(2, j));
        }).mbind(() => M.get()).mbind(({
          i,
          j
        }) => {
          var c = i += 2;
          return eff3(c, j);
        }).mbind(() => M.get()).mbind(({
          j
        }) => eff4(j));
      }`))
  })
  it('should insert reads/writes accordingly 4', function() {
    equal(
      run(function() {
        var i = 0, j = 0
        eff0(eff1(eff2(i++,eff3(eff4(i,j),j++),eff5(i)),i++),i);
      }),
      print(`function () {
        var i, j;
        i = 0;
        j = 0;
        var a = i++;
        return M.set({i: i, j: j}).mseq(eff4(i, j))
          .mbind(b => M.get().mbind(({j}) => {
            var c = j++;
            return eff3(b, c);
          })).mbind(d => M.get().mbind(
            ({i}) => eff5(i).mbind(e => eff2(a, d, e)))).mbind(
              f => M.get().mbind(({i}) => {
                var g = i++;
                return M.set({i: i}).mseq(eff1(f, g));
              })).mbind(h => M.get().mbind(({i}) => eff0(h, i)));
      }`))
  })
  it('should insert reads/writes accordingly 5', function() {
    equal(
      run(function() {
        var i;
        i = eff1(i++);
        eff2(i)
        i = eff3(i++);
        eff4(i)
      }),
      print(`function () {
        var i;
        return M.get().mbind(({i}) => {
          var a = i++;
          return eff1(a).mbind(b => {
            i = b;
            return M.set({i: i}).mseq(eff2(i));
          }).mbind(() => M.get()).mbind(({i}) => {
            var c = i++;
            return eff3(c);
          }).mbind(d => {
            i = d;
            return eff4(i);
          });
        });
      }`))
  })
  context('with closures', function() {
    it('should not read/write closure vars 1', function() {
      equal(
        run(function() {
          var i = 0, j = 0
          function b(i) {
            eff1(i,j)
            i++, j++
            eff2(i,j)
          }
          eff3(i,j)
          i++, j--
          b(i)
          i--, j++
          eff4(i,j)
        }),
        print(`function () {
          var i, j;
          function b(i) {
            return M.set({i: i})
              .mseq(eff1(i, j))
              .mbind(() => M.get())
              .mbind(({i}) => {
                i++, j++;
                return eff2(i, j);
              });
          }
          i = 0;
          j = 0;
          return M.set({i: i}).mseq(eff3(i, j))
            .mbind(() => M.get()).mbind(({i}) => {
              i++, j--;
              return M.set({i: i}).mseq(b(i));
            }).mbind(() => M.get()).mbind(({i}) => {
              i--, j++;
              return eff4(i, j);
            });
        }`))
    })
    it('should not read/write closure vars 2', function() {
      equal(
        run(function() {
          var i = 0, j = 0
          eff1(i,j)
          i++, j++
          (function b(i,k) {
            var z = 0
            eff2(i,j,k,z)
            i++, j++, k++, z++
            eff3(i,j,k,z)
            eff4(i,j,k,z)
          })(i,j)
          i++, j++
          eff5(i,j)
          eff6(i,j)
        }),
        print(`function () {
          var i, j;
          i = 0;
          j = 0;
          return M.set({i: i}).mseq(eff1(i, j)).mbind(() => M.get())
            .mbind(({i}) => {
            i++, j++;
            return M.set({i: i}).mseq(function b(i, k) {
              var z;
              z = 0;
              return M.set({i: i,k: k,z: z}).mseq(eff2(i, j, k, z))
                .mbind(() => M.get()).mbind(({i,k,z}) => {
                  i++, j++, k++, z++;
                  return M.set({i: i,k: k,z: z}).mseq(eff3(i, j, k, z));
                }).mbind(() => M.get()).mbind(({i,k,z}) => eff4(i, j, k, z));
            }(i, j));
          }).mbind(() => M.get()).mbind(({i}) => {
            i++, j++;
            return M.set({
              i: i
            }).mseq(eff5(i, j));
          }).mbind(() => M.get()).mbind(({i}) => eff6(i, j));
        }`))
    })
  })
})

describe('coerce', function() {
  context('with coerce', function() {
    const run = runInterp({clos:true,coerce:true})
    it('should insert coerce call 1', function() {
      equal(
        run(function() {
          eff(1)
          eff(2)
        }),
        print(function () {
          return M(eff(1)).mbind(() => eff(2));}))
    })
    context('with `if` statement', function() {
      it('should keep pure branch 1', function() {
        equal(
          run(function() {
            eff(1)
            if (eff(2)) {
              eff3()
              eff4()
            } else {
              b
            }
          }),
          print(function () {
            return M(eff(1)).mbind(() => eff(2)).mbind(a => {
              if (a)
                return M(eff3()).mbind(() => eff4());
              else {
                b;
              }
            });
          }))
      })
      it('should not add branch if it doesn`t exist', function() {
        equal(
          run(function() {
            eff(1)
            if (eff(2)) {
              eff3()
              eff4()
            }
          }),
          print(function () {
            return M(eff(1)).mbind(() => eff(2)).mbind(a => {
              if (a)
                return M(eff3()).mbind(() => eff4());
            });
          }))
      })
    })
  })
  context('without coerce', function() {
    const run = runInterp({clos:true,coerce:false})
    it('should not insert even for pure function 1', function() {
      equal(
        run(function() {
          1+1;
        }),
        print(function () {
          1 + 1;
          return M.pure();
        }))
    })
    it('should not insert even for pure function 2', function() {
      equal(
        run(function() {
          if (true)
            1+1;
        }),
        print(function () {
          if (true) 1 + 1;
          return M.pure();
        }))
    })
    it('should not insert even for pure function 3', function() {
      equal(
        run(function() {
          if (true)
            return 2;
          return 3
        }),
        print(function () {
          if (true) return M.pure(2);
          return M.pure(3);
        }))
    })
    it('should not insert coerce call 1', function() {
      equal(
        run(function() {
          eff(1)
          eff(2)
        }),
        print(function () {
          return eff(1).mbind(() => eff(2));}))
    })
    context('with `if` statement', function() {
      it('should turn the pure branch into effectful', function() {
        equal(
          run(function() {
            eff(1)
            if (eff(2)) {
              eff3()
              eff4()
            } else {
              b
            }
          }),
          print(function () {
            return eff(1).mbind(() => eff(2)).mbind(a => {
              if (a)
                return eff3().mbind(() => eff4());
              else {
                b;
                return M.pure();
              }
            });
          }))
      })
      it('should insert effectful branch', function() {
        equal(
          run(function() {
            eff(1)
            if (eff(2)) {
              eff3()
              eff4()
            }
          }),
          print(function () {
            return eff(1).mbind(() => eff(2)).mbind(a => {
              if (a)
                return eff3().mbind(() => eff4());
              else
                return M.pure();
            });
          }))
      })
    })
  })
  context("switching coerce", function() {
    const run = runInterp({clos:true,coerce:true})
    it('should insert coerce depending on current option value', function() {
      equal(
        run(function() {
          {
            eff1()
            if (a1) {
              eff2()
            }
          }
          M.option({coerce:false})
          {
            eff3()
            if (a2) {
              eff4()
            }
          }
          {
            M.option({coerce:true})
            eff5()
            if (a3) {
              eff6()
            }
          }
          {
            eff7()
            if (a4) {
              eff8()
            }
          }
        }),
        print(function () {
          return M(eff1()).mbind(() => {
            if (a1)
              return eff2();
          }).mbind(() => eff3().mbind(() => {
            if (a2)
              return eff4();
            else
              return M.pure();
          })).mbind(() => M(eff5()).mbind(() => {
            if (a3)
              return eff6();
          })).mbind(() => eff7().mbind(() => {
            if (a4)
              return eff8();
            else
              return M.pure();
          }));
        }))
    })
  })
})

//TODO: coerce for Exceptions
//TODO: switch (add default branch)


