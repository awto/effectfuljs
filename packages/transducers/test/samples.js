import {produce,consume,Tag} from ".."
import {parse} from "babylon"
import generate from "babel-generator"
import * as Kit from "../kit"
import eagerGenerators from "../samples/eagerGenerators"
import joinMemExprs from "../samples/joinMemExprs"
import looseForOf from "../samples/looseForOf"
import instrumentation from "../samples/instrumentation"
import closConv from "../samples/closConvPass"
import * as RT from "../rt"
import * as Trace from "../trace"

const gen = ast => generate(ast,{retainLines:false,concise:true},"").code
const pretty = Kit.pipe(v => v.toString(),parse,gen)

describe("join member expression", function() {
  const run = Kit.pipe(
    v => v.toString(),
    parse,
    produce,
    joinMemExprs,
    consume,
    v => v.top,
    gen)
  it("sample1", function() {
    expect(run(`function a() {
      const a = create(), b = create(), /*@PACK*/d = create(), e = cr()
      d.a = 10
      console.log(a.a,a.c,b.a,e.c,d.c)
      if (check(b)) {
        const b = create()
        let d = create(e)
        console.log(a.a,a.c,b.a,d)
      }
    }`)).to.equal(pretty(`function a() {
      const a = create(), b = create(), /*@PACK*/ d = create(), e = cr();
      let a$a = a && a.a;
      let a$c = a && a.c;
      let d$a = d && d.a;
      let d$c = d && d.c;
      d$a = 10;
      console.log(a$a, a$c, b.a, e.c, d$c);
      if (check(b)) {
        const b = create();
        let b$a = b && b.a;
        let d = create(e);
        console.log(a$a, a$c, b$a, d);
      }
    }`))
  })
})

describe("instrumentation", function() {
  const run = Kit.pipe(
    v => v.toString(),
    parse,
    produce,
    instrumentation,
    consume,
    v => v.top,
    gen)
  it("sample1", function() {
    expect(run(`function a() {
      function* b() {
        console.log("1")
      }
      class C {
        vo(a,b) {
         console.log("Z")
        }
        //@NOPROF
        no(a,b) {
          console.log("Z")
        }
      }
      c(v => v + 1, 
        v => {return v + 1},
        function(v) { return v + 1 })
    }`)).to.equal(pretty(`function a() {
      return e$y$prof("a@?", "1[0]",
                      function () {
                        function b() {
                          return e$y$prof$g("a.b@?", "2[6]",
                                            function* () {
                                              console.log("1");
                                            });
                        }
                        class C {
                          vo(a,b) { return e$y$prof("a.C.vo@?", "6[8]",
                                                 function () {
                                                   console.log("Z");
                                                 });
                               }
                          //@NOPROF
                          no(a,b) { console.log("Z"); }
                        }
                        c(
                          v => {
                            return e$y$prof("a.F0@?", "14[8]",
                                            function () { return v + 1; });
                          },
                          v => { return e$y$prof("a.F1@?", "15[8]",
                                                 function () { return v + 1; }); },
                          function (v) {
                            return e$y$prof("a.F2@?", "16[8]",
                                            function () { return v + 1; }); }
                        );
                      });
    }`))
  })
  context('with `this` or `arguments`', function() {
    it("sample2", function() {
      expect(run(`function a() {
      function* b() {
        console.log("1",this,arguments)
      }
      class C {
        vo() {
         console.log("Z",this)
        }
      }
      c(v => v + this.id + arguments[0], 
        v => {return v + this.id + arguments[0]},
        function x(v) {return v + this.id + arguments[0]})
    }`)).to.equal(pretty(
      `function a() {
        return e$y$prof("a@?", "1[0]",
                        function () {
                          function b() {
                            const e$y$this = this;
                            const e$y$arguments = arguments;
                            return e$y$prof$g("a.b@?", "2[6]",
                                              function* () {
                                                console.log("1", e$y$this, e$y$arguments); });
                          }
                          class C {
                            vo() {
                              const e$y$this = this;
                              return e$y$prof("a.C.vo@?", "6[8]",
                                              function () {
                                                console.log("Z", e$y$this);
                                              });
                            }
                          }
                          c(
                            v => {
                              const e$y$this = this;
                              const e$y$arguments = arguments;
                              return e$y$prof("a.F0@?", "10[8]",
                                              function () {
                                                return v + e$y$this.id + e$y$arguments[0];
                                              });
                            },
                            v => {
                              const e$y$this = this;
                              const e$y$arguments = arguments;
                              return e$y$prof("a.F1@?", "11[8]",
                                              function () {
                                                return v + e$y$this.id + e$y$arguments[0];
                                              });
                            },
                            function x(v) {
                              const e$y$this = this;
                              const e$y$arguments = arguments;
                              return e$y$prof("a.x@?", "12[8]",
                                              function () {
                                                return v + e$y$this.id + e$y$arguments[0];
                                              });
                            });
                        });
      }`))
    })
  })
})

describe("eager generators", function() {
  const run = Kit.pipe(
    v => v.toString(),
    parse,
    produce,
    eagerGenerators,
    consume,
    v => v.top,
    gen)
  it("sample1", function() {
    expect(run(`
      function* a() {
        function* b() {
          yield* arguments
          yield 10
        }
        yield* b()
      }
      //@LAZY
      function* a() {
        function* b() {
          yield* arguments
          yield 10
        }
        yield* b()
      }
    `)).to.equal(pretty(
      `function a() {
        return e$y$make(e$y$buf => {
          function b() {
            var e$y$arguments = arguments;
            return e$y$make(e$y$buf => {
              e$y$star(e$y$buf, e$y$arguments);
              e$y(e$y$buf, 10);
            });
          }
          e$y$star(e$y$buf, b()); });
      }
      //@LAZY
      function* a() {
        function* b() {
          yield* arguments;
          yield 10;
        }
        yield* b();
      }`))
  })
})
  
describe("extra loose for-ofs", function() {
  const run = Kit.pipe(
    v => v.toString(),
    parse,
    produce,
    looseForOf,
    consume,
    v => v.top,
    gen)
  it("sample1", function() {
    expect(run(`function a() {
      for(const i of a) {
        zzz
      }
    }`)).to.equal(pretty(`function a() {
      {
        const _e = a;
        const _arr = e$y$arr(_e);
        if (_arr != null) {
          const _len = _arr.length;
          for (let _i = 0; _i < _len; ++_i) {
            const i = _arr[_i];
            zzz;
          }
        } else {
          const _iter = _e[Symbol.iterator]();
          for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
            const i = _i.value;
            zzz;
          }
        }
      }
    }`))
  })
  it("sample2", function() {
    expect(run(`function a() {
      for(const i of a)
        zzz
    }`)).to.equal(pretty(`function a() {
      {
        const _e = a;
        const _arr = e$y$arr(_e);
        if (_arr != null) {
          const _len = _arr.length;
          for (let _i = 0; _i < _len; ++_i) {
            const i = _arr[_i];
            zzz;
          }
        } else {
          const _iter = _e[Symbol.iterator]();
          for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
            const i = _i.value;
            zzz;
          }
        }
      }
    }`))
  })
  it("sample3", function() {
    expect(run(`function a() {
      var i
      for(i of a)
        zzz
    }`)).to.equal(pretty(`function a() {
      var i
      {
        const _e = a;
        const _arr = e$y$arr(_e);
        if (_arr != null) {
          const _len = _arr.length;
          for (let _i = 0; _i < _len; ++_i) {
            i = _arr[_i];
            zzz;
          }
        } else {
          const _iter = _e[Symbol.iterator]();
          for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
            i = _i.value;
            zzz;
          }
        }
      }
    }`))
  })
  it("sample4", function() {
    expect(run(`function a() {
      var i
      for(i of a)
        for(const j of b) {
          zzz
        }
    }`)).to.equal(pretty(`function a() {
      var i;
      {
        const _e = a;
        const _arr = e$y$arr(_e);
        if (_arr != null) {
          const _len = _arr.length;
          for (let _i = 0; _i < _len; ++_i) {
            i = _arr[_i];
            {
              const _e = b;
              const _arr = e$y$arr(_e);
              if (_arr != null) {
                const _len = _arr.length;
                for (let _i = 0; _i < _len; ++_i) {
                  const j = _arr[_i];
                  zzz;
                }
              } else {
                const _iter = _e[Symbol.iterator]();
                for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
                  const j = _i.value;
                  zzz;
                }
              }
            }
          }
        } else {
          const _iter = _e[Symbol.iterator]();
          for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
            i = _i.value;
            {
              const _e = b;
              const _arr = e$y$arr(_e);
              if (_arr != null) {
                const _len = _arr.length;
                for (let _i = 0; _i < _len; ++_i) {
                  const j = _arr[_i];
                  zzz;
                }
              } else {
                const _iter = _e[Symbol.iterator]();
                for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
                  const j = _i.value;
                  zzz;
                }
              }
            }
          }
        }
      }
    }`))
  })
  it("sample5", function() {
    expect(run(`function a() {
      var i
      loo: for(i of a)
        zzz
    }`)).to.equal(pretty(`function a() {
      var i
      {
        const _e = a;
        const _arr = e$y$arr(_e);
        if (_arr != null) {
          const _len = _arr.length;
          loo: for (let _i = 0; _i < _len; ++_i) {
            i = _arr[_i];
            zzz;
          }
        } else {
          const _iter = _e[Symbol.iterator]();
          loo: for (let _i = _iter.next(); !_i.done; _i = _iter.next()) {
            i = _i.value;
            zzz;
          }
        }
      }
    }`))
  })
  
})

describe("closure conversion", function() {
  Kit.setOpts({noRT:true})
  const run = Kit.pipe(
    v => v.toString(),
    parse,
    produce,
    closConv,
    consume,
    v => v.top,
    gen)
  it("sample1", function() {
    expect(run(`
      function apply() {
        return new ff(10);
      }
      function ff() {
        var i = 0, j = 0;
        function gg(k) {
          var obj = {
            kk: function kk() {
              return i + j + arguments[1];
            }
          }
          for(var j of arr) {
            i += j + k;
          }
          obj.kk(10);
          return obj;
        }
        gg(j).kk(1);
        new gg(0);
      }`)).to.equal(pretty(`
        var apply;
        var g = {};
        function _apply(fn) {
          this.fn = fn;
        }
        closure(_apply, function apply(self) {
          return this.fn.ff.constr(10);
        });
        apply = new _apply(g);
        function kk(ff, _gg) {
          this.ff = ff;
          this.gg = _gg;
        }
        closure(kk, function kk(self) {
          var args = Array.from(arguments).slice(1),
              kk;
          return this.ff.i + this.gg.j + args[1];
        });
        function _gg(ff) {
          this.ff = ff;
        }
        closure(_gg, function gg(self, k) {
          var obj;
          obj = {
            kk: new kk(this.ff, this)
          };
          for (this.j of arr) {
            this.ff.i += this.j + k;
          }
          obj.kk.call(obj, 10);
          return obj;
        });
        function ff() {}
        closure(ff, function ff(self) {
          var j, gg, temp;
          gg = new _gg(this);
          this.i = 0, j = 0;
          (temp = gg.call(void 0, j)).kk.call(temp, 1);
          gg.constr(0);
        });
        g.ff = new ff();
      `));
    
  })
  it("sample2", function() {
    expect(run(`
      var i = 0;
      function a(j) {
        i+=j;
        function b(k) {
          i+=k+j;
          return i
        }
        return b
      }
      console.time("R")
      let res = 0
      for(let i = 0; i < 100000; i++) {
        var k = a(i)
        for(let j = 0; j < 10000; j++) {
          k(j);
        }
        res = k(10)
      }
      console.timeEnd("R")
      console.log("E", res)
      
      console.log([{num:2},{num:1},{num:3}].sort(function(a, b) { return a.num - b.num; }))`
              )).to.equal(pretty(`
        var a, res, i, k, j, temp;

        var g = {};
        
        function _b(fn, _a) {
          this.fn = fn;
          this.a = _a;
        }
        
        closure(_b, function b(self, k) {
          this.fn.i += k + this.a.j;
          return this.fn.i;
        });
        
        function _a(fn) {
          this.fn = fn;
        }
        
        closure(_a, function a(self, j) {
          var b;
          this.j = j;
          b = new _b(this.fn, this);
          
          this.fn.i += this.j;
          
          return b;
        });
        a = new _a(g);
        
        function fn() {}
        
        closure(fn, function (self, a, b) {
          return a.num - b.num;
        });
        g.i = 0;
        
        console.time.call(console, "R");
        res = 0;
        
        for (i = 0; i < 100000; i++) {
          k = a.call(void 0, i);
          
          for (j = 0; j < 10000; j++) {
            k.call(void 0, j);
          }
          res = k.call(void 0, 10);
        }
        console.timeEnd.call(console, "R");
        console.log.call(console, "E", res);
        
        console.log.call(console, (temp = [{ num: 2 }, { num: 1 }, { num: 3 }]).sort.call(temp, new fn()));
        `))
  })
})
       
