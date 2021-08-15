import { parse } from "@babel/parser";
import generate from "@babel/generator";
import { pipe } from "../v2/combinators";
import { Tag } from "../v2/types";
import {
  resetFieldInfo,
  dft,
  produce,
  consume,
  append,
  node
} from "../v2/core";
import * as Scope from "../v2/scope";

const gen = ast =>
  generate(ast, { retainLines: false, concise: true, quotes: "'" }).code;

const pretty = pipe(v => v.toString(), parse, gen);

function allToVar(root) {
  for (const i of dft(root))
    if (i.type === Tag.VariableDeclaration) i.node.kind = "var";
  return root;
}

const convertImpl = pass =>
  pipe(
    i => i.toString(),
    parse,
    produce,
    resetFieldInfo,
    Scope.prepare,
    pass,
    Scope.resolve,
    consume,
    gen
  );

describe("generating new names", function() {
  const convert = (s, genLikesNum) => {
    let genId = 0;
    return convertImpl(function(root) {
      // don't mix `forIterable` and Docs in real passes!
      // this in fact traverses injected tree
      for (const i of dft(root)) {
        if (i.pos === Tag.declarations) {
          for (const sym of genLikesNum.map(i => Scope.newSym(i))) {
            const decl = node(Tag.push, Tag.VariableDeclarator);
            const id = append(decl, node(Tag.id, Tag.Identifier));
            id.nextIdDecl = root.idDecls;
            root.idDecls = id;
            i.parentFunc.funcDecls.add(sym);
            sym.decl = id;
            append(i, decl);
            id.sym = sym;
          }
        }
      }
      return root;
    })(s);
  };
  it("all new variable should have valid name 1", function() {
    expect(
      convert(
        `function a() {
        var a = 10, b = 10;
      }`,
        ["a", "b", "c", "d", "a"]
      )
    ).to.equal(
      pretty(`function a() { var _a = 10, b = 10, a1, _b, c, d, a2; }`)
    );
  });
  it("all new variable should have valid name 2", function() {
    expect(
      convert(
        `function a() {
        var a = 10, b = 10;
      }`,
        ["a", "b", "c", "d", "a", "a"]
      )
    ).to.equal(
      pretty(`function a() { var _a = 10, b = 10, a1, _b, c, d, a2, a3; }`)
    );
  });
  it("all new variable should have valid name 3", function() {
    expect(
      convert(
        `function a() {
        var a = 10, b = 10;
      }`,
        ["a", "b", "a", ""]
      )
    ).to.equal(pretty(`function a() { var _a = 10, b = 10, a1, _b, a2, c; }`));
  });
  it("all new variable should have valid name 4", function() {
    expect(
      convert(
        `function a() {
        var a = 10, b = 10;
        function c() {
          var d = 10, e = 10;
        }
        c()
      }`,
        ["a", "b", "a", ""]
      )
    ).to.equal(
      pretty(`function a() {
        var _a = 10,
          b = 10,
          a1,
          _b,
          a2,
          c;
        function c() {
          var d = 10,
            e = 10,
            a,
            b,
            _a,
            f;
        }
        c();
      }`)
    );
  });
  it("all new variable should have valid name 5", function() {
    expect(
      convert(
        `function a() {
        var a = 10, b = 10,c,d,e,f,g,h,k,m,n,x,y,z;
      }`,
        ["a", "b", "a", ""]
      )
    ).to.equal(
      pretty(
        `function a() { var _a = 10, b = 10, c, d, e, f, g, h, k, m, n, x, y, z, a1, _b, a2, b1; }`
      )
    );
  });
  it("all new variable should have valid name 6", function() {
    expect(
      convert(
        `function f() {
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
      }`,
        ["a", "b", "a", ""]
      )
    ).to.equal(
      pretty(`function f() {
        let a = 10,
          b = 10,
          a1,
          _b,
          a2,
          g;
        {
          let c = a,
            a3,
            b1,
            a4,
            h;
        }
        {
          let _c = b,
            d = 20,
            a5,
            b2,
            a6,
            k;
        }
        {
          let _a = 10,
            c1 = 20,
            e = 30,
            a7,
            b3,
            a8,
            m;
        }
      }`)
    );
  });
});

describe("scope diagnostics", function() {
  const convert = convertImpl(v => v);
  context("if there are duplicated names", function() {
    it("should signal a problem 1", function() {
      let err;
      try {
        convert(`function a({a,b}) {
           let {a,c} = b
         }`);
      } catch (e) {
        err = e;
      }
      const exp = "Identifier 'a' has already been declared"
      expect(err && err.message.substr(0,exp.length)).to.equal(exp);
      expect(convert(`function a({a,b}) { var {a,c} = b }`)).to.equal(
        `function a({ a: _a, b }) { var { a: _a, c } = b; }`
      );
    });
    it("should signal a problem 2", function() {
      let err;
      try {
        convert(`function a() {
           const {a,c} = b 
           let a = c
         }`);
      } catch (e) {
        err = e;
      }
      expect(err && err.message).to.equal(
        "Identifier 'a' has already been declared. (3:15)"
      );
    });
  });
});

describe("converting const/let to var", function() {
  context("if just kind is updated", function() {
    const convert = convertImpl(allToVar);
    it("should keep names unique 1", function() {
      expect(
        convert(`function a() {
        var a = 10;
        {
          let a = 20;
          a++
          {
            let a = 30, a2 = 40, a3 = 50;
            a++;
          }
        }
      }`)
      ).to.equal(
        pretty(`function a() {
          var _a = 10;
          {
            var a1 = 20;
            a1++;
            {
              var a2 = 30,
                _a2 = 40,
                a3 = 50;
              a2++;
            }
          }
        }`)
      );
    });
    it("should keep names unique 2", function() {
      expect(
        convert(`function a() {
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
      }`)
      ).to.equal(
        pretty(`function a() {
          function a() {
            _a();
            var _a = 10;
          }
          {
            var _a = 20;
            _a++;
            {
              var a1 = 30,
                a2 = 40,
                a3 = 50;
              a1++;
            }
          }
          a();
        }`)
      );
    });
    it("should keep names unique 3", function() {
      expect(
        convert(`function a() {
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
      }`)
      ).to.equal(
        pretty(`function a() {
          function a() {
            a1();
            {
              var _a = 10;
              _a++;
            }
            var a1 = 20;
            a1++;
          }
          {
            var _a = 20;
            _a++;
            {
              var a1 = 30,
                __a = 40,
                _a1 = 50,
                a2 = 60;
              a1++;
            }
          }
          a();
        }`)
      );
    });
    it("should keep names unique 4", function() {
      expect(
        convert(`function a() {
          a()
          var a = 10; 
          a()
          {
            let a = 10;
          }
      }`)
      ).to.equal(
        pretty(`function a() {
          _a();
          var _a = 10;
          _a();
          {
            var a1 = 10;
          }
        }`)
      );
    });
    it("should keep names unique 5", function() {
      expect(
        convert(`function a() {
        const a = [1,2,3];
        for(const b of a) {
          let a = b+1
          console.log(a)
        }
      }`)
      ).to.equal(
        pretty(`function a() {
          var _a = [1, 2, 3];
          for (var b of _a) {
            var a1 = b + 1;
            console.log(a1);
          }
        }`)
      );
    });
    it("should keep names unique 6", function() {
      expect(
        convert(`function a() {
        const a = {} 
        {
          const {a:_a,b} = a;
          console.log(a,b)
          for(const {a,c:b} of {_a}) {
            console.log(_a,a,b)
          }
        }
      }`)
      ).to.equal(
        pretty(`function a() {
          var _a = {};
          {
            var { a: __a, b } = _a;
            console.log(_a, b);
            for (var { a: a1, c: _b } of { _a: __a }) {
              console.log(__a, a1, _b);
            }
          }
        }`)
      );
    });
    it("should keep names unique 7", function() {
      expect(
        convert(`function a() {
        const a = {} 
        {
          const [a,c,...d] = a;
          console.log(a,c,...d)
          for(const [_a,b,...e] of [a,c,...d]) {
            console.log(a,_a,c,b,...d,...e)
          }
        }
      }`)
      ).to.equal(
        pretty(`function a() {
          var _a = {};
          {
            var [a1, c, ...d] = a1;
            console.log(a1, c, ...d);
            for (var [__a, b, ...e] of [a1, c, ...d]) {
              console.log(a1, __a, c, b, ...d, ...e);
            }
          }
        }`)
      );
    });
  });
});
