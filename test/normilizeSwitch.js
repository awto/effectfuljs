import * as R from "ramda"
import * as Kit from "../src/kit/core"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as assert from "assert"
import {equal,print,transformExpr,runExpr} from "./kit/core"
import * as Debug from "../src/debug"
import * as Trace from "../src/kit/trace"
import * as Block from "../src/block"
import * as Prop from "../src/propagate"
import * as Branch from "../src/branch"

const run = transformExpr(R.pipe(
  Branch.switchRewrite,
  Prop.recalcEff,
  Block.flatten,
  Debug.mark,
  consume))

describe('normilize `switch`', function() {
  context('with some branches continue', function() {
    context('with function definition', function() {
      it('should clone next branches', function() {
        equal(
          run(`function() {
            var i
            switch(eff(1)) {
            case check(1):
              i++
              effB(1)
            case check(2):
              function c() {
                effC()
              }
              effB(function d() { effD() })
              effB(2)
            default:
              effB(3)
            }
          }`),
          print(`function () /*BS|E*/{
            var i;
            /*VD|S|E*/var a = /*CE|B*/eff(1);
            /*VD|S|E*/var b = /*CE|B*/check(1);
            /*VD|S|E*/var d = /*CE|B*/check(2);
            /*SS|E*/switch (a) {
              /*SC|E*/case b:
              /*BS|E*/{
                i++;
                /*ES|S|E*/ /*CE|B*/effB(1);
                function c() /*BS|E*/{
                  /*ES|S|E*/ /*CE|B*/effC();
                }
                /*ES|S|E*/ /*CE|B*/effB(function d() /*BS|E*/{
                  /*ES|S|E*/ /*CE|B*/effD();
                });
                /*ES|S|E*/ /*CE|B*/effB(2);
                /*ES|S|E*/ /*CE|B*/effB(3);
              }
              /*SC|E*/case d:
              /*BS|E*/{
                function c() {
                  effC();
                }
                /*ES|S|E*/ /*CE|B*/effB(function d() {
                  effD();
                });
                /*ES|S|E*/ /*CE|B*/effB(2);
                /*ES|S|E*/ /*CE|B*/effB(3);
              }
              /*SC|E*/default:
              /*BS|E*/{
                /*ES|S|E*/ /*CE|B*/effB(3);
              }
            }
          }`))
      })
    })
    it('should clone next branches', function() {
      equal(
        run(`function() {
          var i
          switch(eff(1)) {
          case check(1):
            i++
            effB(1)
          case check(2):
            effB(2)
          case check(3):
            effB(3)
            break
          default:
            effB(3)
          }
        }`),
        print(`function () /*BS|E*/{
          var i;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*VD|S|E*/var b = /*CE|B*/check(1);
          /*VD|S|E*/var c = /*CE|B*/check(2);
          /*VD|S|E*/var d = /*CE|B*/check(3);
          /*SS|E*/switch (a) {
            /*SC|E*/case b:
            /*BS|E*/{
              i++;
              /*ES|S|E*/ /*CE|B*/effB(1);
              /*ES|S|E*/ /*CE|B*/effB(2);
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
            /*SC|E*/case c:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(2);
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
            /*SC|E*/case d:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
            /*SC|E*/default:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
          }
        }`))
    })
  })
  context('without default option', function() {
    it('should create default option', function() {
      equal(
        run(`function() {
          var i
          switch(eff(1)) {
          case check(1):
            i++
            effB(1)
            break
          case check(2):
            effB(2)
            break
          }
        }`),
        print(`function () /*BS|E*/{
          var i;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*VD|S|E*/var b = /*CE|B*/check(1);
          /*VD|S|E*/var c = /*CE|B*/check(2);
          /*SS|E*/switch (a) {
            /*SC|E*/case b:
            /*BS|E*/{
              i++;
              /*ES|S|E*/ /*CE|B*/effB(1);
            }
            /*SC|E*/case c:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(2);
            }
            default: {}
          }
        }`))
    })
  })
  context('with all branches exit', function() {
    it('should keep effectful statements inside branch', function() {
      equal(
        run(`function() {
          var i
          switch(eff(1)) {
          case check(1):
            i++
            effB(1)
            break
          case check(2):
            effB(2)
            break
          default:
            effB(3)
          }
        }`),
        print(`function () /*BS|E*/{
          var i;
          /*VD|S|E*/var a = /*CE|B*/eff(1);
          /*VD|S|E*/var b = /*CE|B*/check(1);
          /*VD|S|E*/var c = /*CE|B*/check(2);
          /*SS|E*/switch (a) {
            /*SC|E*/case b:
            /*BS|E*/{
              i++;
              /*ES|S|E*/ /*CE|B*/effB(1);
            }
            /*SC|E*/case c:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(2);
            }
            /*SC|E*/default:
            /*BS|E*/{
              /*ES|S|E*/ /*CE|B*/effB(3);
            }
          }
        }`))
    })
  })
})

describe('interpret `switch`', function() {
  context('with coerce', function() {
    const run = runExpr({ns:"M",profile:"full"})
    context('with all branches exit', function() {
      it('should translate branches accordingly 1', function() {
        equal(
          run(`function() {
            switch(eff(1)) {
            case check(1):
              effB(1)
              break
            case check(2):
              effB(2)
              break
            default:
              effB(3)
            }
          }`),
          print(`function () {
            return M(eff(1)).mbind(a => M(check(1)).mbind(b => M(check(2)).mbind(c => {
              switch (a) {
              case b: return effB(1);
              case c: return effB(2);
              default: return effB(3);
              }
            })));
          }`))
      })
      context('with labels', function() {
        it('should translate branches accordingly 2', function() {
          equal(
            run(`function() {
              lab: switch(eff(1)) {
                case 1:
                   effB(1)
                   break
                case 2:
                   effB(2)
                   break lab
                default:
                   effB(3)
              }
            }`),print(`function () {
              return M(eff(1)).mbind(a => {
                switch (a) {
                case 1: return effB(1);
                case 2: return effB(2);
                default: return effB(3);
                }
              });
            }`))
        })
      }),
      context('with joined branches', function() {
        it('should translate branches accordingly 3', function() {
          equal(
            run(`function() {
              switch(eff(1)) {
                case 1:
                   effB(1)
                case 2:
                   effB(2)
                   break
                default:
                   effB(3)
              }
            }`),print(`function () {
              return M(eff(1)).mbind(a => {
                switch (a) {
                case 1: return M(effB(1)).mbind(() => effB(2));
                case 2: return effB(2);
                default: return effB(3);
                }
              });
            }`))
        })
      }),
      context('with non-EOB exits', function() {
        it('should translate branches accordingly 4', function() {
          equal(
            run(`function() {
              switch(eff(1)) {
              case 1:
                if (effB(1))
                  break
              case 2:
                if (effB(2)) {
                  break
                }
                effB(3)
                break
              default:
                eff(4)
              }
            }`),print(`function () {
              return M.block(label => M(eff(1)).mbind(a => {
                switch (a) {
                case 1:
                  return M(effB(1)).mbind(a => {
                    if (a)
                      return label();
                  }).mbind(() => effB(2)).mbind(a => {
                    if (a)
                      return label();
                  }).mbind(() => effB(3));
                case 2:
                  return M(effB(2)).mbind(a => {
                    if (a)
                      return label();
                  }).mbind(() => effB(3));
                default: return eff(4);
                }
              }));
            }`))
        })
      }),
      context('without default branch', function() {
        it('should translate branches accordingly 5', function() {
          equal(
            run(`function() {
              switch(eff(1)) {
              case 1:
                effB(1)
                break
              case 2:
                effB(2)
                break
              }
            }`),
            print(`function () {
              return M(eff(1)).mbind(a => {
                switch (a) {
                case 1: return effB(1);
                case 2: return effB(2);
                default: return M.pure();
                }
              });
            }`))
        })
      })
    })
    context('with mixed effect/pure branches', function() {
      it('should translate branches accordingly 6', function() {
        equal(
          run(`function() {
            switch(eff()) {
            case check(1):
              effB(1)
            case check(2):
              console.log(2);
            case check(3):
              effB(2)
              break
            case check(4):
              console.log(5);
              break
            case 5:
              console.log(6);
            case 6:
              console.log(7);
              break
            case check(8):
              effB(3)
              break
            }
          }`),
          print(`function () {
            return M(eff()).mbind(a => M(check(1)).mbind(b => M(check(2)).mbind(
              c => M(check(3)).mbind(d => M(check(4)).mbind(e => M(check(8)).mbind(
                f => {
                  switch (a) {
                  case b:
                    return M(effB(1)).mbind(() => {
                      console.log(2);
                      return effB(2);
                    });
                  case c:
                    {
                      console.log(2);
                      return effB(2);
                    }
                  case d:
                    return effB(2);
                  case e:
                    {
                      console.log(5);
                      return M.pure();
                    }                    
                  case 5:
                    {
                      console.log(6);
                      console.log(7);
                      return M.pure();
                    }
                  case 6:
                    {
                      console.log(7);
                      return M.pure();
                    }
                  case f:
                    return effB(3);
                  default:
                    return M.pure();
                  }
                }))))));
          }`))
      })
    })
    context('with state', function() {
      it('should translate branches accordingly 7', function() {
        equal(
          run(`function() {
            var i = 0
            eff();
            switch(eff(i+=1)) {
              case check(i+=2):
                effB(i+=3)
                break
              case check(i+=4):
                effB(i+=5)
                break
              case check(i+=6):
                console.log("hi",i)
              }
              eff(i)
            }`),
            print(`function () {
              var i;
              i = 0;
              return M(eff()).mbind(() => {
                let _i = i;
                const a = _i += 1;
                return M(eff(a)).mbind(a => {
                  let i = _i;
                  const b = i += 2;
                  return M(check(b)).mbind(b => {
                    let _i = i;
                    const c = _i += 4;
                    return M(check(c)).mbind(c => {
                      let i = _i;
                      const d = i += 6;
                      return M.set({i}).mseq(check(d)).mbind(d => {
                        let _i = i;
                        switch (a) {
                        case b:
                          {
                            const a = _i += 3;
                            return M.set({i: _i}).mseq(effB(a));
                          }
                        case c:
                          {
                            const a = _i += 5;
                            return M.set({i: _i}).mseq(effB(a));
                          }
                        case d:
                          {
                            console.log('hi', _i);
                            return M.set({i: _i});
                          }
                        default:
                          return M.set({i: _i});
                        }
                      });
                    });
                  });
                });
              }).mbind(() => M.get()).mbind(({i}) => eff(i));
            }`))
      })
      it('should translate branches accordingly 8', function() {
        equal(
          run(`function() {
            var i = 0
            eff();
            switch(eff(i+=1)) {
              case 1:
                effB(i+=3)
                break
              case 2:
                effB(i+=5)
                break
              case 3:
                console.log("hi",i)
              }
              eff(i)
            }`),
            print(`function () {
              var i;
              i = 0;
              return M(eff()).mbind(() => {
                let _i = i;
                const a = _i += 1;
                return M.set({i: _i}).mseq(eff(a)).mbind(
                  a => {
                    let i = _i;
                    switch (a) {
                    case 1:
                      {
                        const a = i += 3;
                        return M.set({i}).mseq(effB(a));
                      }
                    case 2:
                      {
                        const a = i += 5;
                        return M.set({i}).mseq(effB(a));
                      }
                    case 3:
                      {
                        console.log('hi', i);
                        return M.set({i});
                      }
                    default:
                      return M.set({i});
                    }
                  });
              }).mbind(() => M.get()).mbind(({i}) => eff(i));
            }`))
      })
      it('should translate branches accordingly 9', function() {
        equal(
          run(`function() {
            var i = 0
            eff();
            i+=1
            switch(i+=2) {
            case 1:
              effB(i+=3)
              break
            case 2:
              effB(i)
              break
            case 3:
              console.log("hi",i)
            }
            eff(i)
          }`),
          print(`function () {
            var i;
            i = 0;
            return M(eff()).mbind(() => {
              let _i = i;
              _i += 1;
              const a = _i += 2;
              switch (a) {
              case 1:
                {
                  const a = _i += 3;
                  return M.set({i: _i}).mseq(effB(a));
                }
              case 2:
                return M.set({i: _i}).mseq(effB(_i));
              case 3:
                {
                  console.log('hi', _i);
                  return M.set({i: _i});
                }
              default:
                return M.set({i: _i});
              }
            }).mbind(() => M.get()).mbind(({i}) => eff(i));
          }`))
      })
    })
  })
  context('without coerce', function() {
    const run = runExpr({ns:"M",profile:"full",coerce:false})
    context('with all branches exit', function() {
      it('should translate branches accordingly 10', function() {
        equal(
          run(`function() {
            switch(eff(1)) {
            case check(1):
              effB(1)
              break
            case check(2):
              effB(2)
              break
            default:
              effB(3)
            }
          }`),
          print(function () {
            return eff(1).mbind(a => check(1).mbind(b => check(2)
                                                    .mbind(c => {
                                                      switch (a) {
                                                      case b:
                                                        return effB(1);
                                                      case c:
                                                        return effB(2);
                                                      default:
                                                        return effB(3);
                                                      }
                                                    })));
          }))
      })
      context('without default branch', function() {
        it('should translate branches accordingly 11', function() {
          equal(
            run(`function() {
              switch(eff(1)) {
              case 1:
                effB(1)
                break
              case 2:
                effB(2)
                break
              }
            }`),
            print(`function () {
              return eff(1).mbind(a => {
                switch (a) {
                case 1:
                  return effB(1);
                case 2:
                  return effB(2);
                default:
                  return M.pure();
                }
              });
            }`))
        })
      })
    })
    context('with state', function() {
      it('should translate branches accordingly 12', function() {
        equal(
          run(`function() {
            var i = 0
            eff();
            i+=1
            switch(i+=2) {
            case 1:
              effB(i+=3)
              break
            case 2:
              effB(i)
              break
            case 3:
              console.log("hi",i)
            }
            eff(i)
          }`),
          print(`function () {
            var i;
            i = 0;
            return eff().mbind(() => {
              let _i = i;
              _i += 1;
              const a = _i += 2;
              switch (a) {
              case 1:
                {
                  const a = _i += 3;
                  return M.set({i: _i}).mseq(effB(a));
                }
              case 2:
                return M.set({i: _i}).mseq(effB(_i));
              case 3:
                {
                  console.log('hi', _i);
                  return M.set({i: _i});
                }
              default:
                return M.set({i: _i});
              }
            }).mbind(() => M.get()).mbind(({i}) => eff(i));
          }`))
      })
    })
  })
})
