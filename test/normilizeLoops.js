import * as Kit from "../src/kit"
import {prepareScopes,consumeScope} from "../src/transform"
import {Tag,produce,consume} from "estransducers"
import generate from "babel-generator"
import {parse} from "babylon"
import * as Loops from "../src/loops"
import * as assert from "assert"
import {equal,print,transformExpr} from "./kit/core"
import {recalcEff} from "../src/propagate"
import * as Debug from "../src/debug"
import * as Branch from "../src/branch"
import * as Ctrl from "../src/control"
import * as Block from "../src/block"

const runImpl = (pass) => transformExpr(Kit.pipe(
  Ctrl.removeLabeldStatement,
  Loops.toBlocks,
  Branch.toBlocks,
  pass,
  recalcEff,
  Block.interpretLibSyms,
  Branch.clean,
  Debug.mark,
  consumeScope))

describe('prepare loops pass', function() {
  const run = runImpl(v => v)
  context('with single statement in body', function() {
    it('should convert bodies to blocks', function() {
      equal(
        run(`function() {
          for(var i of s)
            eff(1);
        }`),
        print(`function () /*BS|E*/{
          /*FOS|E*/for (var i of s) /*BS|E*/{
            /*ES|e*/ /*CE|B*/ eff(1);
          }
        }`))
    })
  })
  context('with no statements in body', function() {
    context('with effect in update', function() {
      it('should add empty bock body', function() {
        equal(
          run(`function() {
            for(var i = 0; i < 10; i = eff());
          }`),
          print(`function () /*BS|E*/{
            /*FS|E*/for (var i = 0;i < 10;
                         /*AE|E*/i = /*CE|B*/eff()) {
            }
          }`))
      })
    })
    context('with effect in init', function() {
      it('should keep the body as is', function() {
        equal(
          run(`function() {
            for(var i = eff(); i < 10; upd);
          }`),
          print(`function () /*BS|E*/{
            /*FS|e*/for ( /*VD|E*/var /*VD|E*/i = /*CE|B*/eff();
              i < 10; upd) {}
          }`))
      })
    })
  })
  context('with block statement in body', function() {
    it('should keep the body unchanged', function() {
      equal(
        run(`function() {
          for(var i of s) {
            eff(1);
          }
        }`),
        print(`function () /*BS|E*/{
          /*FOS|E*/for (var i of s) /*BS|E*/{
            /*ES|e*/ /*CE|B*/eff(1);
          }
        }`))
    })
  })
})

describe('normilize `for-of`', function() {
  const run = runImpl(Loops.forOfStmt)
  context('with effect in its body', function() {
    context('with single statement in body', function() {
      it('should be `for` with the effect in body 1', function() {
        equal(
          run(`function() {
            for(const i of s)
              eff(1);
          }`),
          print(`function () /*BS|E*/{
            /*FS|E*/for (var loop = M.iterator(s); !(loop = /*CE|P*/loop.step()).done;) /*BS|E*/{
              const i = loop.value;
              /*ES|e*/ /*CE|B*/eff(1);
            }
          }`))
      })
    })
    it('should be `for` with the effect in body 2', function() {
      equal(
        run(`function() {
          for(const i of s) {
            eff(1);
          }
        }`),
        print(`function () /*BS|E*/{
          /*FS|E*/for (var loop = M.iterator(s); !(loop = /*CE|P*/loop.step()).done;) /*BS|E*/{
            const i = loop.value;
            /*ES|e*/ /*CE|B*/eff(1);
          }
        }`))
    })
  })
  context('with embedded `for-of`', function() {
    it('should be `for` with the effect in body 3', function() {
      equal(
        run(`function() {
          for(const i of s)
            for(const j of t)
              eff(i,j);
        }`),
        print(`function () /*BS|E*/{
          /*FS|E*/for (var loop = M.iterator(s); !(loop = /*CE|P*/loop.step()).done;) /*BS|E*/{
            const i = loop.value;  
            /*FS|E*/for (var _loop = M.iterator(t); !(_loop = /*CE|P*/_loop.step()).done;) /*BS|E*/{
              const j = _loop.value;
              /*ES|e*/ /*CE|B*/eff(i, j);
            }
          }
        }`))
    })
  })
  context('with effect on the right but not in its body', function() {
    it('should extract the effect into former step and keep for-of',
       function() {
         equal(
           run(`function() {
             for(const i of eff(1)) {
               2+2;
             }
           }`),
           print(`function () /*BS|E*/{
             /*FOS|e*/for (const i of /*CE|B*/ eff(1)) {
               2 + 2;
             }
           }`))
       })
  })
})

describe('normilize `for-in`', function() {
  const run = runImpl(Loops.forOfStmt)
  it('simple block', function() {
    equal(
      run(`function() {
        for(const i in s) {
          eff(1);
        }
      }`),
      print(`function () /*BS|E*/{
        /*FS|E*/for (var loop = M.forInIterator(s); !(loop = /*CE|P*/loop.step()).done;) /*BS|E*/{
          const i = loop.value;
          /*ES|e*/ /*CE|B*/eff(1);
        }
      }`))
  })
})

describe('normilize `do-while`', function() {
  const run = runImpl(Loops.doWhileStmt)
  it('simple block', function() {
    equal(
      run(`function() {
        do {
          eff(1);
        } while(check(1))
      }`),
      print(`function () /*BS|E*/{
        /*FS|E*/for (;;) /*BS|E*/{
          /*ES|e*/ /*CE|B*/eff(1);
          
          /*IS|E*/if ( /*UE|E*/! /*CE|B*/check(1)) /*BS|E*/{
            /*BS|B*/break;
          }
        }
      }`))
  })
  it('simple statement', function() {
    equal(
      run(`function() {
        do
          eff(1);
        while(check(1))
      }`),
      print(`function () /*BS|E*/{
        /*FS|E*/for (;;) /*BS|E*/{
          /*ES|e*/ /*CE|B*/eff(1);
          
          /*IS|E*/if ( /*UE|E*/! /*CE|B*/check(1)) /*BS|E*/{
            /*BS|B*/break;
          }
        }
      }`))
  })
  it('embedded', function() {
    equal(
      run(`function() {
        do
          do
            do {
              eff(1)
              do {
                eff(2)
              } while (check(1))
            } while(check(2))
          while(check(3))
        while(check(4))
      }`),
      print(`function () /*BS|E*/{
        /*FS|E*/for (;;) /*BS|E*/{
          /*FS|E*/for (;;) /*BS|E*/{
            /*FS|E*/for (;;) /*BS|E*/{
              /*ES|e*/ /*CE|B*/eff(1);

              /*FS|E*/for (;;) /*BS|E*/{
                /*ES|e*/ /*CE|B*/eff(2);
                
                /*IS|E*/if ( /*UE|E*/! /*CE|B*/check(1)) /*BS|E*/{
                  /*BS|B*/break;
                }
              }
              
              /*IS|E*/if ( /*UE|E*/! /*CE|B*/check(2)) /*BS|E*/{
                /*BS|B*/break;
              }
            }
            
            /*IS|E*/if ( /*UE|E*/! /*CE|B*/check(3)) /*BS|E*/{
              /*BS|B*/break;
            }
          }
          
          /*IS|E*/if ( /*UE|E*/! /*CE|B*/check(4)) /*BS|E*/{
            /*BS|B*/break;
          }
        }
      }`))
  })
})

describe('normilize `for`', function() {
  const run = runImpl(Loops.normilizeFor)
  context('with non-block in body', function() {
    it('should keep effect in the body', function() {
      equal(
        run(`function() {
          for(;;)
            eff(1);         
        }`),
        print(`function () /*BS|E*/{
          /*FS|E*/for (;;) /*BS|E*/{
            /*ES|e*/ /*CE|B*/eff(1);
          }
        }`))
    })
  })
  context('with effects in init/update/test', function() {
    it('should keep effect in update/test', function() {
      equal(
        run(`function() {
          for(let i = init();check() === true;upd()) {
            b;
          }
        }`),
        print(`function () /*BS|E*/{
          /*VD|E*/let /*VD|E*/i = /*CE|B*/init();
          
          /*FS|E*/for (;;) /*BS|E*/{
            /*IS|E*/if ( /*BE|E*/ /*CE|B*/check() === true) /*BS|E*/{
              b;
              /*ES|e*/ /*CE|B*/upd();
            } else /*BS|E*/{
              /*BS|B*/break;
            }
          }
        }`))
    })
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
        print(`function () /*BS|E*/{
          /*VD|E*/var /*VD|E*/i = /*CE|B*/init();
          
          /*FS|E*/for (;;) /*BS|E*/{
            /*IS|E*/if ( /*BE|E*/ /*CE|B*/check() === true) /*BS|E*/{
              $continue: /*BS|E*/{
                /*ES|e*/ /*CE|B*/b1();
                
                /*IS|E*/if (v) /*BS|E*/{
                  /*ES|e*/ /*CE|B*/e();
                  /*BS|B*/break $continue;
                }
              }
              
              /*ES|e*/ /*CE|B*/upd();
            } else /*BS|E*/{
              /*BS|B*/break;
            }
          }
        }`))
    })
  })
  context('without blocks', function() {
    it('should create block statements 1', function() {
      equal(
        run(`function() {
          for(var i = init();check() === true;upd())
            iter();
          
        }`),
        print(`function () /*BS|E*/{
          /*VD|E*/var /*VD|E*/i = /*CE|B*/init();
          
          /*FS|E*/for (;;) /*BS|E*/{
            /*IS|E*/if ( /*BE|E*/ /*CE|B*/check() === true) /*BS|E*/{
              /*ES|e*/ /*CE|B*/iter();
              /*ES|e*/ /*CE|B*/upd();
            } else /*BS|E*/{
              /*BS|B*/break;
            }
          }
        }`))
    })
    context('with embedded loop', function() {
      it('should create block statements 2', function() {
        equal(
          run(`function() {
            for(var i = init();check() === true;upd())
              for(var j = initJ();checkJ() === true;updJ())
                body();
          }`),
          print(`function () /*BS|E*/{
            /*VD|E*/var /*VD|E*/i = /*CE|B*/init();
            
            /*FS|E*/for (;;) /*BS|E*/{
              /*IS|E*/if ( /*BE|E*/ /*CE|B*/check() === true) /*BS|E*/{
                /*VD|E*/var /*VD|E*/j = /*CE|B*/initJ();
                
                /*FS|E*/for (;;) /*BS|E*/{
                  /*IS|E*/if ( /*BE|E*/ /*CE|B*/checkJ() === true) /*BS|E*/{
                    /*ES|e*/ /*CE|B*/body();
                    /*ES|e*/ /*CE|B*/updJ();
                  } else /*BS|E*/{
                    /*BS|B*/break;
                  }
                }
                
                /*ES|e*/ /*CE|B*/upd();
              } else /*BS|E*/{
                /*BS|B*/break;
              }
            }
          }`))
      })
    })
    context('with `continue`', function() {
      it('should create block statements 3', function() {
        equal(
          run(`function() {
            for(let i = init();check() === true;upd())
              if (a) eff(1); else continue;
          }`),
          print(`function () /*BS|E*/{
            /*VD|E*/let /*VD|E*/i = /*CE|B*/init();
            
            /*FS|E*/for (;;) /*BS|E*/{
              /*IS|E*/if ( /*BE|E*/ /*CE|B*/check() === true) /*BS|E*/{
                $continue: /*BS|E*/{
                  /*IS|E*/if (a) /*BS|E*/{
                    /*ES|e*/ /*CE|B*/eff(1);
                  } else /*BS|E*/{
                    /*BS|B*/break $continue;
                  }
                }
                
                /*ES|e*/ /*CE|B*/upd();
              } else /*BS|E*/{
                /*BS|B*/break;
              }
            }
          }`))
      })
      context('with embedded loop', function() {
        it('should create block statements 4', function() {
          equal(
            run(`function() {
              loo: for(let i = init();check() === true;upd())
                for(let j = initJ();checkJ() === true;updJ())
                  if (i === j) continue; else continue loo;
            }`),
            print(`function () /*BS|E*/{
              /*VD|E*/let /*VD|E*/i = /*CE|B*/init();
              
              loo: /*FS|E*/for (;;) /*BS|E*/{
                /*IS|E*/if ( /*BE|E*/ /*CE|B*/check() === true) /*BS|E*/{
                  loo$continue: /*BS|E*/{
                    /*VD|E*/let /*VD|E*/j = /*CE|B*/initJ();
                    
                    /*FS|E*/for (;;) /*BS|E*/{
                      /*IS|E*/if ( /*BE|E*/ /*CE|B*/checkJ() === true) /*BS|E*/{
                        $continue: /*BS|E*/{
                          /*IS|E*/if (i === j) /*BS|E*/{
                            /*BS|B*/break $continue;
                          } else /*BS|E*/{
                            /*BS|B*/break loo$continue;
                          }
                        }
                        
                        /*ES|e*/ /*CE|B*/updJ();
                      } else /*BS|E*/{
                        /*BS|B*/break;
                      }
                    }
                  }
                  
                  /*ES|e*/ /*CE|B*/upd();
                } else /*BS|E*/{
                  /*BS|B*/break;
                }
              }
            }`))
        })
      })
    })
  })
})


describe('normilize `for`', function() {
  const run = transformExpr(Kit.pipe(Loops.looseForOf,
                                   Kit.scope.resolve,
                                   consumeScope))
  it('should convert `for-of` to loose iterators `for`', function() {
    equal(
      run(`function() {
          for(const i of a)
            eff(i);
          for(const i of a) {
            eff(i);         
          }
          for(i of a);
          for(i.a of a)
            eff(1);         
          for(i of a) {
            eff(1);         
          }
        }`),
      print(`function () {
        for (var loop = iterator(a); !(loop = loop.step()).done;) {
          const i = loop.value;
          eff(i);
        }

        for (var _loop = iterator(a); !(_loop = _loop.step()).done;) {
          const i = _loop.value;
          eff(i);
        }
        
        for (var loop1 = iterator(a); !(loop1 = loop1.step()).done;) {}
        
        for (var loop2 = iterator(a); !(loop2 = loop2.step()).done;) {
          i.a = loop2.value;
          eff(1);
        }
        
        for (var loop3 = iterator(a); !(loop3 = loop3.step()).done;) {
          i = loop3.value;
          eff(1);
        }
      }`))
  })
})
