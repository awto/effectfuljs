const Lib = require("@effectful/serialization");
require("../src/main");

const assert = require("assert");
const React = require("react");

describe("serializable react element", function() {
  it("should be convertible to/from JSON", function() {
    const el = (
      <div className="myClass" style={{ paddingLeft: 10 }}>
        hi
      </div>  
    );
    const elJson = Lib.write({ el });
    assert.deepStrictEqual(elJson, {
      f: [
        [
          "el",
          {
            $: "ReactElement",
            props: {
              f: [
                ["className", "myClass"],
                ["style", { f: [["paddingLeft", 10]] }],
                ["children", { $: "undefined" }]
              ]
            },
            children: ["hi"],
            type: "div"
          }
        ]
      ]
    });
    const rel = Lib.read(elJson);
    assert.notStrictEqual(el, rel.el);
    assert.deepStrictEqual(el, rel.el);
  });
});
