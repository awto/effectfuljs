import { produce, consume } from "..";
import assert from "node:assert";

describe("function declaration", function() {
  it("traverse", function() {
    const tree = {
      type: "FunctionDeclaration",
      id: {
        type: "Identifier",
        name: "decl"
      },
      params: [
        {
          type: "AssignmentPattern",
          left: {
            type: "Identifier",
            name: "a"
          },
          right: {
            type: "NumericLiteral",
            value: 20
          }
        },
        {
          type: "RestElement",
          argument: {
            type: "Identifier",
            name: "rest"
          }
        }
      ],
      body: {
        type: "BlockStatement",
        body: []
      }
    };
    const arr = Array.from(produce(tree));
    assert.strictEqual(arr.length, 19);
    const rtree = consume(arr).top;
    assert.deepStrictEqual(rtree, tree);
  });
});
