import { produce, consume, Tag } from "..";
import { parse } from "@babel/parser";
import * as Kit from "../kit";
import * as Match from "../match";
import * as Trace from "../trace";
import assert from "node:assert";

const runImpl = pats =>
  Kit.pipe(
    parse,
    produce,
    Match.run(pats)
  );

describe("match", function() {
  const run = runImpl([">$A=$B+1", "=$D=$B--"]);
  it("should find sub-node", function() {
    const p = Kit.auto(
      Trace.verify(
        run(`function f() {
          let a = 1,
            b = a + 1;
          a = b--;
          (b = a), (b = b--);
        }`)
      )
    );
    let i = Kit.skip(p.till(i => i.enter && i.type === Match.Root));
    assert.strictEqual(i.value.index, 0);
    assert.strictEqual(p.cur().pos, Tag.push);
    assert.strictEqual(p.cur().type, Tag.VariableDeclarator);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    assert.strictEqual(i.value.name, "A");
    assert.strictEqual(p.cur().pos, Tag.id);
    assert.strictEqual(p.cur().type, Tag.Identifier);
    assert.strictEqual(p.cur().value.node.name, "b");
    Kit.skip(p.till(i => i.leave && i.type === Match.Placeholder));
    assert.strictEqual(p.cur().pos, Tag.init);
    assert.strictEqual(p.cur().type, Tag.BinaryExpression);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    assert.strictEqual(i.value.name, "B");
    assert.strictEqual(p.cur().pos, Tag.left);
    assert.strictEqual(p.cur().type, Tag.Identifier);
    assert.strictEqual(p.cur().value.node.name, "a");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Root));
    assert.strictEqual(i.value.index, 1);
    assert.strictEqual(p.cur().pos, Tag.expression);
    assert.strictEqual(p.cur().type, Tag.AssignmentExpression);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    assert.strictEqual(i.value.name, "D");
    assert.strictEqual(p.cur().pos, Tag.left);
    assert.strictEqual(p.cur().type, Tag.Identifier);
    assert.strictEqual(p.cur().value.node.name, "a");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    assert.strictEqual(i.value.name, "B");
    assert.strictEqual(p.cur().pos, Tag.argument);
    assert.strictEqual(p.cur().type, Tag.Identifier);
    assert.strictEqual(p.cur().value.node.name, "b");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Root));
    assert.strictEqual(i.value.index, 1);
    assert.strictEqual(p.cur().pos, Tag.push);
    assert.strictEqual(p.cur().type, Tag.AssignmentExpression);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    assert.strictEqual(i.value.name, "D");
    assert.strictEqual(p.cur().pos, Tag.left);
    assert.strictEqual(p.cur().type, Tag.Identifier);
    assert.strictEqual(p.cur().value.node.name, "b");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    assert.strictEqual(i.value.name, "B");
    assert.strictEqual(p.cur().pos, Tag.argument);
    assert.strictEqual(p.cur().type, Tag.Identifier);
    assert.strictEqual(p.cur().value.node.name, "b");
    i = Kit.skip(
      p.till(
        i => i.enter && (i.type === Match.Placeholder || i.type === Match.Root)
      )
    );
    assert.strictEqual(i, null);
  });
});
