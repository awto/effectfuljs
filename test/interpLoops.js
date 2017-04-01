import * as R from "ramda"
import * as Kit from "../src/kit"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr,runExpr} from "./kit/core"
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

const runInterp = (opts = {}) =>
      runExpr(Object.assign({},{ns:"M",profile:"full"},opts))

describe('par loops', function() {
  const run = runInterp({par:true})
  it.skip('should inject `forPar` 1', function() {
      equal(
        run(`function() {
          eff1();
          for(var i = eff2(); i < 10; i++) {
            var j = eff3(i);
            eff4(j++);
          }
          eff7(i);
        }`),
        print(`function () {
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
        }`))
  })
  it.skip('should inject `forPar` 2', function() {
      equal(
        run(`function() {
          eff1();
          var k;
          for(var i = eff2(), j = eff3(); i < 10 && j > -10; i++,j--) {
            var k = eff3(i);
            eff4(k++);
          }
          eff5(i,j)
        }`),
        print(`function () {
          var i, j, k;
          return eff1().mbind(() => eff2()).mbind(a => {
            var b = i = a;
            return M.forPar(i, i => i < 10, i => (i++, i), i => eff3(i).mbind(c => {
              j = c;
              var d = j++;
              return eff4(d);
            }));
          })
        }`))
  })
  context('with js side effect in its body', function() {
    it('should avoid converting to `forPar` 1', function() {
      equal(
        run(`function() {
          var k = 0;
          eff1();
          for(var i = eff2(); i < 10; i++) {
            k++;
            var j = eff3(i), l = eff4(i);
            l++;
            eff5(j++,k,l);
          }
          eff6(i,j,k);
        }`),
        print(`function () {
          var k, i, j, l;
          k = 0;
          return M.set({k}).mseq(eff1()).mbind(
            () => eff2()).mbind(a => {
              let i;
              i = a;
              return M.block(
                label => M.modify(s => ({k: s.k,i})).mseq(M.repeat(
                  () => M.get().mbind(({i,k}) => {
                    if (i < 10) {
                      k++;
                      return M.modify(s => ({k, i: s.i})).mseq(eff3(i)).mbind(
                        a => {
                          let j;
                          j = a;
                          return M(eff4(i)).mbind(a => {
                            let _j = j,
                                l;
                            l = a;
                            l++;
                            const b = _j++;
                            return M.modify(s => ({k: s.k,i: s.i,j: _j})).mseq(eff5(b, k, l));
                          });
                        }).mbind(() => {
                          let _i = i;
                          _i++;
                          return M.modify(s => ({
                            k: s.k,
                            i: _i,
                            j: s.j
                          }));
                        });
                    } else return M.modify(s => ({k, i: s.i, j: s.j})).mseq(label());
                  }))));
            }).mbind(() => M.get()).mbind(({i,j,k}) => eff6(i, j, k));
        }`))
    })
    it('should avoid converting to `forPar` 2', function() {
      equal(
        run(`function() {
          var j;
          eff1();
          for(var i = eff2(); i < 10; i++) {
            eff3(i,j);
            eff4(j++);
          }
          eff7(i);
        }`),
        print(`function () {
          var j, i;
          return M(eff1()).mbind(() => eff2()).mbind(a => {
            let i;
            i = a;
            return M.block(label => M.set({i}).mseq(M.repeat(() => M.get().mbind(
              ({i,j}) => {
                if (i < 10)
                  return M(eff3(i, j)).mbind(() => {
                    let j;
                    const a = j++;
                    return M.modify(s => ({j,i: s.i})).mseq(eff4(a));
                  }).mbind(() => {
                    let _i = i;
                    _i++;
                    return M.modify(s => ({j: s.j, i: _i}));
                  });
                else
                  return label();
              }))));
          }).mbind(() => M.get()).mbind(({
            i
          }) => eff7(i));
        }`))
    })
  })
})


describe('interpret loops', function() {
  const run = runInterp()
  it('should inject repeat/block calls 1', function() {
    equal(
      run(`function() {
          eff1();
          for(eff2(); eff(3); eff4()) {
            eff5();
            eff6();
          }
          eff7();
        }`),
      print(`function () {
          return M(eff1())
            .mbind(() => eff2())
            .mbind(() => M.block(
              label =>
                M.repeat(() =>
                         M(eff(3)).mbind(a => {
                           if (a)
                             return M(eff5())
                               .mbind(() => eff6())
                               .mbind(() => eff4());
                           else
                             return label();
                         })))).mbind(() => eff7());
        }`))
  })
  it('should inject repeat/block calls 2', function() {
      equal(
        run(`function() {
          var i;
          eff1();
          for(i = eff2(); i !== eff(3); i = eff4(i)) {
            eff5(i);
            eff6(i);
          }
          eff7(i);
        }`),
        print(`function () {
          var i;
          return M(eff1())
            .mbind(() => eff2())
            .mbind(a => {
              let i;
              i = a;
              return M.block(
                label => M.set({i})
                  .mseq(M.repeat(
                    () => M(eff(3))
                      .mbind(
                        a => M.get()
                          .mbind(({i}) => {
                            if (i !== a)
                              return M(eff5(i))
                                .mbind(() => eff6(i))
                                .mbind(() => eff4(i))
                                .mbind(a => {
                                  let i;
                                  i = a;
                                  return M.set({i})});
                            else
                              return label();
                          })))));
            })
            .mbind(() => M.get())
            .mbind(({i}) => eff7(i));
        }`))
  })
  it('should inject repeat/block calls 3', function() {
    equal(
      run(function() {
        var i = 0, j = 0, k = 0
        eff(i,j,k)
        for(;;) {
          eff1(i)
          for(;;) {
            k = 10
            eff2()
            for(;;) {
              eff4(k, j)
            }
            for(;;) {
              i = 20, j = 30, k = 40
              eff5()
            }
          }
        }
      }),
      print(`function () {
        var i, j, k;
        i = 0;
        j = 0;
        k = 0;
        return M.set({i,j}).mseq(eff(i, j, k)).mbind(
          () => M.repeat(
            () => M.get().mbind(
              ({i}) => M(eff1(i)).mbind(() => M.repeat(() => {
                let k;
                k = 10;
                return M(eff2()).mbind(
                  () => M.repeat(
                    () => M.get().mbind(({j}) => eff4(k, j)))).mbind(
                      () => M.repeat(
                        () => {
                          let i, j, k;
                          i = 20, j = 30, k = 40;
                          return M.set({i,j}).mseq(eff5());
                        }));
              })))));
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
        print(`function () {
          var i;
          return M(init()).mbind(a => {
            let i;
            i = a;
            return M.block(label => M.repeat(() => M(check()).mbind(a => {
              if (a === true)
                return M.block($continue => M(b1()).mbind(() => {
                  if (v)
                    return M(e()).mbind(() => $continue());                  
                })).mbind(() => upd());
              else
                return label();
            })));
          });
        }`))
    })
  })
  it('should create continue block 1', function() {
    equal(
      run(`function() {
            for(let i = init();check() === true;upd())
              if (a) eff(1); else continue;
          }`),
      print(`function () {
        var i;
        return M(init()).mbind(b => {
          let i;
          i = b;
          return M.block(label => M.repeat(() => M(check()).mbind(b => {
            if (b === true)
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
      }`))
  })
  context('with embedded loop', function() {
    it('should create continue block 2', function() {
      equal(
        run(`function() {
              loo: for(let i = init();check() === true;upd())
                for(let j = initJ();checkJ() === true;updJ())
                  if (i === j) continue; else continue loo;
            }`),
        print(`function () {
          var i, j;
          return M(init()).mbind(a => {
            let i;
            i = a;
            return M.block(loo => M.repeat(() => M(check()).mbind(a => {
              if (a === true)
                return M.block(loo$continue => M(initJ()).mbind(a => {
                  let j;
                  j = a;
                  return M.block(label => M.repeat(() => M(checkJ()).mbind(a => {
                    if (a === true)
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
        }`))
    })
  })
})

describe('interpret blocks', function() {
  const run = runInterp()
  it('should inject scope/block calls 1', function() {
      equal(
      run(`function() {
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
      }`),
      print(`function () {
        return M.scope(ret =>
                       M(eff1())
                       .mbind(() => eff2())
                       .mbind(() => M.block(
                         lab1 => M(eff3())
                           .mbind(() => eff(4))
                           .mbind(a => {
                             if (a)
                               return lab1();
                             else
                               return ret();
                           })))
                       .mbind(() => eff(5)));
      }`))
  })
  it('should inject scope/block calls 2', function() {
      equal(
      run(`function() {
        eff1();
        if(a)
          return 5;
        eff6();
      }`),
      print(`function () {
        return M.scope(ret => M(eff1()).mbind(() => {
          if (a)
            return ret(5);
        }).mbind(() => eff6()));
      }`))
  })
  it('should inject scope/block calls 3', function() {
      equal(
      run(`function() {
        eff1();
        if(a)
          return eff5(5);
        eff6();
      }`),
      print(`function () {
        return M.scope(ret => M(eff1()).mbind(() => {
          if (a)
            return M(eff5(5)).mbind(a => ret(a));
        }).mbind(() => eff6()));
      }`))
  })
  it('should inject scope/block calls 4', function() {
      equal(
        run(`function() {
          var i = 0;
          eff5(i++);
          if (ee)
            eff7(i++)
          eff8(i);
        }`),
        print(`function () {
          var i;
          i = 0;
          const a = i++;
          return M.set({i})
            .mseq(eff5(a))
            .mbind(() => {
              let _i = i; 
              if (ee) {
                const a = _i++;
                return M.set({i: _i}).mseq(eff7(a));
              } else return M.set({
                 i: _i
              })

            })
            .mbind(() => M.get())
            .mbind(({i}) => eff8(i));
        }`))

  })
  it('should inject scope/block calls 5', function() {
      equal(
        run(`function() {
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
      }`),
      print(`function () {
        var i;
        return M.scope(ret => {
          const a = i = 0;
          return M(eff2(a)).mbind(a => {
            let _i = i;
            const b = _i++;
            return M(eff1(a, b)).mbind(() => {
              let i = _i;
              return M.block(lab1 => {
                const a = i++;
                return M(eff3(a)).mbind(() => {
                  let _i = i;
                  const a = _i++;
                  return M(eff4(a)).mbind(() => {
                    let i = _i;
                    return M.block(lab2 => {
                      const a = i++;
                      return M(eff5(a)).mbind(() => {
                        let _i = i;
                        const a = _i++;
                        return M(eff6(a)).mbind(a => {
                          let i = _i;
                          if (a) {
                            const a = i++;
                            return M.set({i}).mseq(eff7(a)).mbind(() => lab1());
                          } else return M.set({i}).mseq(eff7(i)).mbind(a => {
                            let _i = i;
                            if (a) {
                              _i++;
                              return M.set({i: _i}).mseq(lab2());
                            } else
                              return M.set({i: _i}).mseq(ret(10));
                          });
                        });
                      }).mbind(() => M.get()).mbind(
                        ({i}) => {
                          const a = i++;
                          return M.set({i}).mseq(eff7(a));
                        });
                    });
                  });
                }).mbind(() => M.get()).mbind(
                  ({i}) => {
                    const a = i++;
                    return M.set({i}).mseq(eff8(a));
                  });
              });
            });
          }).mbind(() => M.get().mbind(({i}) => {
            const a = i++;
            return M(eff9(a)).mbind(() => {
              let _i = i;
              const a = _i++;
              return eff10(a);
            });
          }));
        });
      }`))
  })
})
