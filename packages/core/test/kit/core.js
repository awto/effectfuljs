import * as assert from "assert";
import generate from "@babel/generator";
import { parse } from "@babel/parser";
import { Tag, consume } from "../../kit";
import * as Kit from "../../kit";
import * as Transform from "../../transform";
import * as Scope from "../../scope";
import * as Control from "../../control";
import * as Branch from "../../branch";
import * as Prop from "../../propagate";
import * as Block from "../../block";
import * as Loops from "../../loops";
import * as Rt from "../../rt";
import * as Policy from "../../policy";
import defaultOpts from "../../config";

export function pretty(f) {
  return prettyBlock(`(${f.toString()});`);
}

export const print = pretty;

const defaultParseOpts = {
  sourceType: "module",
  plugins: [
    "asyncGenerators",
    "doExpressions",
    "functionBind",
    "functionSent",
    "jsx"
  ]
};

export function prettyBlock(f, opts = {}) {
  const ast = parse(f.toString(), opts.parser || defaultParseOpts);
  const orig = Kit.pipe(
    Kit.produce,
    Kit.strip
  )(ast);
  consume(orig);
  return generate(ast, { quotes: "single", retainFunctionParens: true }, "")
    .code;
}

export const runExpr = Kit.curry(function(opts, f) {
  return run(opts, `(${f.toString()});`);
});

function* prepareJsx(s) {
  for (const i of s) {
    if (i.enter && i.type === Tag.JSXElement) {
      const { name } = i.value.node.openingElement;
      if (name.type === "JSXIdentifier" && name.name.startsWith("Eff")) {
        i.value.wrapBindName = "el";
      }
    }
    yield i;
  }
}

export const run = Kit.curryN(
  2,
  Kit.optsScopeLift(function run(opts, f) {
    Kit.setOpts(
      Object.assign(
        {},
        defaultOpts,
        { importRT: "@effectful/core", contextMethodOpsSpec: {}, ns: "M" },
        opts
      )
    );
    const ast = parse(f.toString(), opts.parser || defaultParseOpts);
    const orig = Kit.pipe(
      Kit.produce,
      prepareJsx,
      Array.from
    )(ast);
    Transform.run(orig);
    return prettyBlock(
      generate(
        ast,
        { quotes: "single", retainFunctionParens: true, concise: true },
        ""
      ).code,
      opts
    );
  })
);

export const isQUnit = typeof QUnit !== "undefined";

const testDefaultOpts = {
  coerce: true,
  state: true,
  closure: true,
  profile: "full"
};

export function exprEqual(l, r, opts = testDefaultOpts) {
  return blockEqual(`(${l});`, `(${r});`, opts);
}

export function blockEqual(l, r, opts = testDefaultOpts) {
  return equal(run(opts, l), prettyBlock(r, opts), "same semantics");
}

export const equal = isQUnit
  ? function equal(l, r, d) {
      return expect(l).to.equal(r, d);
    }
  : function equal(l, r, d) {
      return assert.equal(l, r);
    };

export function exprSame(l, r) {
  return it("should not change semantics", function() {
    return exprEqual(l, r);
  });
}

export function blockSame(l, r) {
  return it("should not change semantics", function() {
    return exprEqual(l, r);
  });
}

export const transformBlock = Kit.curryN(
  2,
  Kit.optsScopeLift(function(fun, src, opts = testDefaultOpts) {
    Kit.setOpts(
      Object.assign(
        {},
        defaultOpts,
        { preset: "@effectful/core", ns: "M" },
        opts
      )
    );
    const ast = parse(src.toString(), defaultParseOpts);
    const s = Kit.pipe(
      Kit.produce,
      Array.from,
      scopes
    )(ast);
    for (const i of s) fun(i);
    return prettyBlock(
      generate(
        ast,
        { quotes: "single", retainFunctionParens: true, concise: true },
        ""
      ).code
    );
  })
);

export const transformExpr = Kit.curryN(2, (fun, src, opts = testDefaultOpts) =>
  transformBlock(fun, `(${src});`, opts)
);

const scopes = Kit.pipe(
  Rt.collectImports,
  Policy.propagateOpts,
  Transform.preproc,
  Scope.splitScopes,
  Kit.map(
    Kit.pipe(
      Branch.toBlocks,
      Prop.recalcEff,
      Kit.toArray
    )
  ),
  Control.injectBlock,
  Kit.map(Kit.pipe(Kit.toArray)),
  Array.from
);

export function restore(si) {
  const s = Kit.auto(si);
  function* walk() {
    for (const i of s.sub()) {
      if (i.enter) {
        switch (i.type) {
          case Loops.repeat:
            yield s.peel(Kit.setType(i, Tag.ForStatement));
            yield* Kit.reposOne(walk(), Tag.body);
            yield* s.leave();
            continue;
          case Block.chain:
            const lab = s.label();
            if (i.pos !== Tag.push) {
              yield s.enter(Kit.setType(i, Tag.BlockStatement, { bind: true }));
              yield s.enter(Tag.body, Tag.Array);
            }
            yield* walk();
            yield* lab();
            s.close(i);
            continue;
        }
      }
      yield i;
    }
  }
  return walk();
}
