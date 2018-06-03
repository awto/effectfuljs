const Lib = require("@effectful/serialization")
Lib.regDescriptor(require("../src/main"))

const assert = require("assert")
const React = require("react")

describe("serializable react element", function() {
  it("should be convertible to/from JSON", function() {
    const el = <div class="myClass" style={{paddingLeft:10}}>hi</div>
      const elJson = Lib.write(el)
    assert.deepStrictEqual(
      elJson,
      {"#type":"ReactElement",
       "#data":{
         props:{class:"myClass",style:{paddingLeft:10},children: void 0},
         children:["hi"],
         type:"div"}})
    const rel = Lib.read(elJson)
    assert.notStrictEqual(el, rel)
    assert.deepStrictEqual(el, rel)
  })
})

