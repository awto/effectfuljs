import { produce, consume, Tag } from "..";
import { parse } from "@babel/parser";
import generate from "@babel/generator";
import * as Kit from "../kit";
import * as Match from "../match";
import * as Trace from "../trace";

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
    expect(i.value.index).to.equal(0);
    expect(p.cur().pos).to.equal(Tag.push);
    expect(p.cur().type).to.equal(Tag.VariableDeclarator);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    expect(i.value.name).to.equal("A");
    expect(p.cur().pos).to.equal(Tag.id);
    expect(p.cur().type).to.equal(Tag.Identifier);
    expect(p.cur().value.node.name).to.equal("b");
    Kit.skip(p.till(i => i.leave && i.type === Match.Placeholder));
    expect(p.cur().pos).to.equal(Tag.init);
    expect(p.cur().type).to.equal(Tag.BinaryExpression);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    expect(i.value.name).to.equal("B");
    expect(p.cur().pos).to.equal(Tag.left);
    expect(p.cur().type).to.equal(Tag.Identifier);
    expect(p.cur().value.node.name).to.equal("a");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Root));
    expect(i.value.index).to.equal(1);
    expect(p.cur().pos).to.equal(Tag.expression);
    expect(p.cur().type).to.equal(Tag.AssignmentExpression);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    expect(i.value.name).to.equal("D");
    expect(p.cur().pos).to.equal(Tag.left);
    expect(p.cur().type).to.equal(Tag.Identifier);
    expect(p.cur().value.node.name).to.equal("a");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    expect(i.value.name).to.equal("B");
    expect(p.cur().pos).to.equal(Tag.argument);
    expect(p.cur().type).to.equal(Tag.Identifier);
    expect(p.cur().value.node.name).to.equal("b");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Root));
    expect(i.value.index).to.equal(1);
    expect(p.cur().pos).to.equal(Tag.push);
    expect(p.cur().type).to.equal(Tag.AssignmentExpression);
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    expect(i.value.name).to.equal("D");
    expect(p.cur().pos).to.equal(Tag.left);
    expect(p.cur().type).to.equal(Tag.Identifier);
    expect(p.cur().value.node.name).to.equal("b");
    i = Kit.skip(p.till(i => i.enter && i.type === Match.Placeholder));
    expect(i.value.name).to.equal("B");
    expect(p.cur().pos).to.equal(Tag.argument);
    expect(p.cur().type).to.equal(Tag.Identifier);
    expect(p.cur().value.node.name).to.equal("b");
    i = Kit.skip(
      p.till(
        i => i.enter && (i.type === Match.Placeholder || i.type === Match.Root)
      )
    );
    expect(i).to.equal(null);
  });
});
