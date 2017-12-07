import {produce,consume,Tag} from ".."
import {parse} from "babylon"
import generate from "babel-generator"
import * as Kit from "../kit"
import * as Scope from "../scope"
import * as Trace from "../trace"

const gen = ast => generate(ast,{retainLines:false,concise:true,quotes:"'"}).code
const pretty = Kit.pipe(v => v.toString(),parse,gen)

function varDeclsEs5(si) {
  const s = Kit.auto(si)
  function* walk(decls) {
    for(const i of s.sub()) {
      if (i.enter) {
        switch(i.type) {
        case Tag.FunctionDeclaration:
        case Tag.FunctionExpression:
          yield* scope(Tag.body,i)
          continue
        case Tag.VariableDeclaration:
          i.value.node.kind = "var"
          decls.push(s.peel(Kit.setPos(i,Tag.push)))
          let noinit = true
          if (i.pos === Tag.push) {
            for(const j of s.sub()) {
              if (j.enter && j.pos === Tag.init) {
                const lab = s.label()
                let pos = i.pos
                yield s.enter(Tag.push,Tag.ExpressionStatement)
                yield s.enter(Tag.expression,Tag.AssignmentExpression,{node:{operator:"="}})
                yield s.tok(Tag.left,Tag.Identifier,
                            Object.assign({},decls[decls.length-1].value)) 
                yield s.peel(Kit.setPos(j,Tag.right))
                yield* s.sub()
                yield* lab()
                decls.push(s.tok(Tag.init,Tag.Null))
              } else {
                decls.push(j)
              }
            }
          } else {
            for(const j of s.sub()) {
              if (j.enter && j.pos === Tag.id) {
                yield s.peel(Kit.setPos(j,i.pos))
                yield* s.sub()
                yield* s.leave()
              } else
                decls.push(j)
            }
          }
          decls.push(...s.leave())
          continue
        }
      }
      yield i
    }
  }
  function* scope(pos,i) {
    const decls = []
    const lab = s.label()
    yield s.peel(i)
    yield* s.peelTo(pos)
    yield* s.peelTo(Tag.body)
    const body = [...walk(decls)]
    yield* decls
    yield* body
    yield* lab()
  }
  return scope(Tag.program)
}

function* allToVar(s) {
  for(const i of s) {
    if (i.enter && i.type === Tag.VariableDeclaration)
      i.value.node.kind = "var"
    yield i
  }
}

const convertImpl = (pass) => Kit.pipe(
  i => i.toString(),
  parse,
  produce,
  Scope.prepare,
  pass,
  Scope.prepare,
  Scope.resolve,
  consume,
  i => i.top,
  gen)

describe("generating new names", function() {
  const convert = (s,genLikesNum) => {
    let genId = 0
    return convertImpl(function*(si) {
      const s = Kit.auto(si)
      let debx = 0
      for(const i of s) {
        if (i.pos === Tag.declarations && i.leave) {
          let prev = null, prevSym = null
          const names = genLikesNum.map(i => Scope.newSym(i))
          for(const sym of names) {
            yield s.enter(Tag.push,Tag.VariableDeclarator)
            yield s.tok(Tag.id,Tag.Identifier,{sym})
            if (prevSym != null)
              yield s.tok(Tag.init,Tag.Identifier,{sym:prevSym})
            yield* s.leave()
            prevSym = sym
          }
        }
        yield i
      }
    })(s)
  }
  it("all new variable should have valid name 1", function() {
    expect(
      convert(`function a() {
        var a = 10, b = 10;
      }`,["a","b","c","d","a"]))
      .to.equal(pretty(`function a() {
      var a = 10, b = 10, _a, _b = _a, c = _b, d = c, a1 = d;
    }`))
  })
  it("all new variable should have valid name 2", function() {
    expect(
      convert(`function a() {
        var a = 10, b = 10;
      }`,["a","b","c","d","a","a"]))
      .to.equal(pretty(`function a() {
        var a = 10, b = 10, _a, _b = _a, c = _b, d = c, a1 = d, a2 = a1;
      }`))
  })
  it("all new variable should have valid name 3", function() {
    expect(
      convert(`function a() {
        var a = 10, b = 10;
      }`,["a","b","a",""]))
      .to.equal(pretty(`function a() {
        var a = 10, b = 10, _a, _b = _a, a1 = _b, c = a1;
      }`))
  })
  it("all new variable should have valid name 4", function() {
    expect(
      convert(`function a() {
        var a = 10, b = 10;
        function c() {
          var d = 10, e = 10;
        }
        c()
      }`,["a","b","a",""]))
      .to.equal(pretty(`function a() {
        var a = 10, b = 10, _a, _b = _a, a1 = _b, d = a1;
        function c() {
          var d = 10, e = 10, a, b = a, _a = b, c = _a;
        }
        c()
      }`))
  })
  it("all new variable should have valid name 5", function() {
    expect(
      convert(`function a() {
        var a = 10, b = 10,c,d,e,f,g,h,k,m,n,x,y,z;
      }`,["a","b","a",""]))
      .to.equal(pretty(`function a() {
        var a = 10, b = 10, c, d, e, f, g, h,
            k, m, n, x, y, z, _a,
            _b = _a, a1 = _b, b1 = a1; }`))
  })
  it("all new variable should have valid name 6", function() {
    expect(
      convert(`function f() {
        let a = 10, b = 10;
        {
          let c = a;
        }
        {
          let c = b, d = 20;
        }
        {
          let a = 10, c = 20, e = 30;
        }
      }`,["a","b","a",""]))
      .to.equal(pretty(`function f() {
        let a = 10, b = 10, _a, _b = _a, a1 = _b, c = a1;
        {
          let c = a, _a, b = _a, a1 = b, d = a1;
        }
        {
          let c = b, d = 20, a, _b = a, _a = _b, e = _a;
        }
        {
          let a = 10, c = 20, e = 30, _a, b = _a, a1 = b, d = a1;
        }
      }`))
  })
})

describe("scope diagnostics", function() {
  const convert = convertImpl(v => v)
  context("if there are duplicated names", function() {
    it("should signal a problem 1", function() {
      let err 
      try {
        convert(`function a({a,b}) {
           let {a,c} = b
         }`)
      } catch(e) {
        err = e
      }
      // TODO: expect.to (get rid of qunit-bdd)
      expect(err && err.message).to.equal("Identifier a has already been declared")
      expect(convert(`function a({a,b}) { var {a,c} = b }`))
        .to.equal(`function a({ a, b }) { var { a: _a, c } = b; }`)
    })
    it("should signal a problem 2", function() {
      let err 
      try {
        convert(`function a() {
           const {a,c} = b 
           let a = c
         }`)
      } catch(e) {
        err = e
      }
      expect(err && err.message)
        .to.equal("Identifier a has already been declared")
    })
  })
})

describe("converting const/let to var", function() {
  context("if just kind is updated", function() {
    const convert = convertImpl(allToVar)
    it("should keep names uniq 1", function() {
      expect(convert(`function a() {
        var a = 10;
        {
          let a = 20;
          a++
          {
            let a = 30, a2 = 40, a3 = 50;
            a++;
          }
        }
      }`)).to.equal(pretty(`function a() {
        var a = 10;
        {
          var _a = 20;
          _a++;
          {
            var a1 = 30, a2 = 40, a3 = 50;
            a1++;
          }
        }
      }`))
    })
    it("should keep names uniq 2", function() {
      expect(convert(`function a() {
        function a() {
          a()
          var a = 10
        }
        {
          let a = 20;
          a++
          {
            let a = 30, a2 = 40, a3 = 50;
            a++;
          }
        }
        a()
      }`)).to.equal(pretty(`function a() {
        function a() {
          a()
          var a = 10;
        }
        {
          var _a = 20;
          _a++;
          {
            var a1 = 30, a2 = 40, a3 = 50;
            a1++;
          }
        }
        a()
      }`))
    })
    it("should keep names uniq 3", function() {
      expect(convert(`function a() {
        function a() {
          a()
          {
            let a = 10
            a++
          }
          let a = 20
          a++
        }
        {
          let a = 20;
          a++
          {
            let a = 30, _a = 40, a1 = 50, a2 = 60;
            a++;
          }
        }
        a()
      }`)).to.equal(pretty(`function a() {
        function a() { _a(); { var a = 10; a++; } var _a = 20; _a++; }
        { var a3 = 20; a3++;
          { var a4 = 30, _a = 40, a1 = 50, a2 = 60; a4++; }
        } a();
      }`))
    })
    it("should keep names uniq 4", function() {
      expect(convert(`function a() {
          a()
          var a = 10; 
          {
            let a = 10;
          }
      }`)).to.equal(pretty(`function a() {
        a();
        var a = 10;
        { var _a = 10; } }`))
    })
    it("should keep names uniq 5", function() {
      expect(convert(`function a() {
        const a = [1,2,3];
        for(const b of a) {
          let a = b+1
          console.log(a)
        }
      }`)).to.equal(pretty(`function a() {
        var a = [1,2,3];
        for (var b of a) {
          var _a = b+1;
          console.log(_a);
        }
      }`))
    })
    it("should keep names uniq 6", function() {
      expect(convert(`function a() {
        const a = {} 
        {
          const {a:_a,b} = a;
          console.log(a,b)
          for(const {a,c:b} of {_a}) {
            console.log(_a,a,b)
          }
        }
      }`)).to.equal(pretty(
        `function a() {
          var a = {};
          {
            var { a: _a, b } = a;
            console.log(a, b);
            for (var {a: a1,c:_b} of {_a})
            {
              console.log(_a, a1, _b);
            }
          }
        }`))
    })
    it("should keep names uniq 7", function() {
      expect(convert(`function a() {
        const a = {} 
        {
          const [a,c,...d] = a;
          console.log(a,c,...d)
          for(const [_a,b,...e] of [a,c,...d]) {
            console.log(a,_a,c,b,...d,...e)
          }
        }
      }`)).to.equal(pretty(`function a() {
        var a = {};
        {
          var [a1, c, ...d] = a1;
          console.log(a1, c, ...d);
          for (var [_a, b, ...e] of [a1, c, ...d]) {
            console.log(a1, _a, c, b, ...d, ...e);
          }
        }
      }`))
    })
  })
  context("if every declaration is moved to its scope start", function() {
    const convert = convertImpl(varDeclsEs5)
    it("should keep names uniq 1", function() {
      expect(convert(`function a() {
      var a = 10;
      {
        let a = 20;
        a++
        {
          let a = 30, a2 = 40, a3 = 50;
          a++;
        }
      }
      }`)).to.equal(pretty(`function a() {
        var a;
        var _a;
        var a1, a2, a3;
        a = 10;
        {
          _a = 20;
          _a++;
          {
            a1 = 30;
            a2 = 40;
            a3 = 50;
            a1++;
          }
        }
      }`))
    })
    it("should keep names uniq 2", function() {
      expect(convert(`function a() {
        const a = {a:1,b:2};
        for(const b in a) {
          let a = b
          console.log(a,b)
        }
      }`)).to.equal(pretty(`function a() {
        var a;
        var b;
        var _a;
        a = { a: 1, b: 2 };
        for (b in a) {
          _a = b;
          console.log(_a,b);
        }
      }`))
    })
    it("should keep names uniq 3", function() {
      expect(convert(`function a() {
        const a = 1; 
        { 
          const b = function b() {
            return a || b();
          }
          const a = 2;
          b()
        }
      }`)).to.equal(pretty(`function a() {
        var a;
        var b;
        var _a;
        a = 1; {
          b = function b() { return _a || b(); };
          _a = 2; b();
        }
      }`))
    })
  })
})
