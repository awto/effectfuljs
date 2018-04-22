const Lib = require("../src/main")
const assert = require("assert")

describe("plain object output", function() {
  context("for `JSON.stringify` serializable objects", function() {
    it("should be a deep clone", function() {
      const obj1 = { a: 1, b: "b", c: true }
      const res = Lib.write(obj1)
      assert.notStrictEqual(res, obj1)
      assert.deepStrictEqual(res,obj1)
      assert.equal(Lib.stringify(obj1),JSON.stringify(obj1))
      const obj2 = { obj1 }
      assert.deepStrictEqual(Lib.write(obj2),obj2)
      assert.equal(Lib.stringify(obj2),JSON.stringify(obj2))
    })
  })
  context("for objects with `#` prefix in props", function() {
    it("should escape the props", function() {
      const obj1 = { "#a": 1 }
      const res1 = Lib.write(obj1)
      assert.notStrictEqual(res1, obj1)
      assert.deepStrictEqual(res1,{"##a":1})
      const obj2 = { obj1 }
      const res2 = Lib.write(obj2)
      assert.notStrictEqual(res2, obj2)
      assert.deepStrictEqual(res2,{obj1:{"##a":1}})
    })
  })
  it("should have correct format for shared values", function() {
    const root = {val:"hi"}
    root.rec1 = {obj1:root,obj2:root,obj3:{obj:root}}
    root.rec2 = root
    assert.deepStrictEqual(Lib.write(root),
                           {"#ref":0,
                            "#shared":{
                              0:{
                                val:"hi",
                                  rec1:{
                                    obj1:{"#ref":0},
                                    obj2:{"#ref":0},
                                    obj3:{obj:{"#ref":0}}
                                  },
                                rec2:{"#ref":0}}}})
  })
})

describe("reading plain object", function() {
  context("for `JSON.stringify` serializable objects", function() {
    it("should produce same result as `JSON.parse`", function() {
      const obj1 = {a:1,b:"b",c:true}
      const str = JSON.stringify(obj1)
      assert.deepStrictEqual(Lib.parse(str), obj1)
      const obj2 = { obj1 }
      assert.deepStrictEqual(Lib.read(obj2),obj2)
    })
  })
  context("for objects with `#` prefix in props", function() {
    it("should un-escape the props", function() {
      const obj1 = { "##a": 1 }
      assert.deepStrictEqual(Lib.read(obj1),{"#a":1})
      const obj2 = { obj1 }
      assert.deepStrictEqual(Lib.read(obj2),{obj1:{"#a":1}})
    })
  })
  it("should correctly assign shared values", function() {
    const obj = Lib.read({"#ref":0,
                          "#shared":{
                            0:{
                              val:"hi",
                              rec1:{
                                obj1:{"#ref":0},
                                obj2:{"#ref":0},
                                obj3:{obj:{"#ref":0}}
                              },
                              rec2:{"#ref":0}}}})
    assert.strictEqual(Object.keys(obj).sort().join(),"rec1,rec2,val")
    assert.strictEqual(obj.val, "hi")
    assert.strictEqual(Object.keys(obj.rec1).sort().join(),"obj1,obj2,obj3")
    assert.strictEqual(Object.keys(obj.rec1.obj3).sort().join(),"obj")
    assert.strictEqual(obj.rec2, obj)
    assert.strictEqual(obj.rec1.obj1, obj)
    assert.strictEqual(obj.rec1.obj2, obj)
    assert.strictEqual(obj.rec1.obj3.obj, obj)
  })
})

describe("object with parent", function() {
  function MyObj() {
    this.a = 1
    this.b = "b"
    this.c = true
  }
  Lib.regConstructor(MyObj)
  it("should output `#type` attribute", function() {
    const obj1 = new MyObj()
    assert.deepEqual(Lib.write(obj1), {"#type":"MyObj",a:1,b:"b",c:true})
    function Object() { this.a = obj1 }
    Lib.regConstructor(Object)
    assert.deepEqual(Lib.write(new Object()),
                     {"#type":"Object_1",a:{"#type":"MyObj",a:1,b:"b",c:true}})
  })
  it("should use `#type` attribute to resolve prototype on read", function() {
    const obj1 = Lib.read({"#type":"MyObj",a:1,b:"b",c:true})
    assert.strictEqual(obj1.constructor, MyObj)
    assert.equal(Object.keys(obj1).sort().join(),"a,b,c")
    assert.strictEqual(obj1.a,1)
    assert.strictEqual(obj1.b,"b")
    assert.strictEqual(obj1.c,true)
  })
  context("for shared values", function() {
    function Obj2() {}
    Lib.regConstructor(Obj2)
    it("should write shared values in `#shared` map", function() {
      const root = new Obj2()
      root.l1 = new Obj2()
      root.l1.back = root.l1
      assert.deepStrictEqual(Lib.write(root),
                             {"#type":"Obj2",
                              l1:{"#ref":0},
                              "#shared":{
                                0:{
                                  "#type":"Obj2",
                                  back:{"#ref":0}}}})
    })
    it("should use `#shared` keys to resolve prototypes on read", function() {
      const obj1 = Lib.read({"#type":"Obj2",
                             l1:{"#ref":0},
                             "#shared":{
                               0:{
                                 "#type":"Obj2",
                                 back:{"#ref":0}}}})
      assert.strictEqual(obj1.constructor, Obj2)
      assert.deepEqual(Object.keys(obj1), ["l1"])
      assert.deepEqual(Object.keys(obj1.l1), ["back"])
      assert.strictEqual(obj1.l1.constructor,Obj2)
      assert.strictEqual(obj1.l1.back, obj1.l1)
    })
  })
})

describe("arrays serialization", function() {
  context("without shared references",function() {
    it("should be similar to `JSON.stringify`/`JSON.parse`", function() {
      const obj = {arr:[1,"a",[true,[false,null]],undefined]}
      const res = Lib.write(obj)
      assert.notStrictEqual(res, obj)
      assert.deepStrictEqual(res, obj)
      const back = Lib.read(res)
      assert.notStrictEqual(res, back)
      assert.deepStrictEqual(obj, back)
    })
    it("doesn't support Array as root", function() {
      assert.throws(() => Lib.write([1,2]), TypeError)
    })
  })
  it("should handle shared references", function() {
    const obj = {arr:[1,"a",[true,[false,null]],undefined]}
    obj.arr.push(obj.arr)
    const res = Lib.write(obj)
    assert.notStrictEqual(res, obj)
    assert.deepStrictEqual(res,
                           {arr:{"#ref":0},
                            "#shared":{
                              0: [1,"a",[true,[false,null]],undefined,{"#ref":0}]
                            }})
    const back = Lib.read(res)
    assert.notStrictEqual(res, back)
    assert.deepStrictEqual(obj, back)
  })
})

describe("`Set` serialization", function() {
  context("without shared references",function() {
    it("should output `JSON.stringify` serializable object", function() {
      const arr = [1,"a",[true,[false,null]],undefined]
      const obj = {set:new Set(arr)}
      const res = Lib.write(obj)
      assert.deepStrictEqual(res,
                             {set:{
                               "#type":"Set",
                               "#data":arr}})
      const back = Lib.read(res)
      assert.deepStrictEqual(obj, back)
    })
  })
  it("should handle shared references", function() {
    const obj = new Set([1,"a",[true,[false,null]],undefined])
    obj.add(obj)
    const res = Lib.write(obj)
    assert.notStrictEqual(res, obj)
    assert.deepStrictEqual(res,
                           {"#ref":0,
                            "#shared":{
                              0:{
                                "#type":"Set",
                                "#data":[1,"a",[true,[false,null]],undefined,{"#ref":0}]}}})
    const back = Lib.read(res)
    assert.notStrictEqual(res, back)
    assert.deepStrictEqual(obj, back)
  })
})

describe("`Map` serialization", function() {
  context("without shared references",function() {
    it("should output `JSON.stringify` serializable object", function() {
      const arr = [[1,"a"],[true,[false,null]],[undefined]]
      const obj = {map:new Map(arr)}
      const res = Lib.write(obj)
      assert.deepStrictEqual(res,
                             {map:{
                               "#type":"Map",
                               "#data":[
                                 [1,"a"],
                                 [true,[false,null]],
                                 [undefined,undefined]]}})
      const back = Lib.read(res)
      assert.deepStrictEqual(obj, back)
    })
  })
  it("should handle shared references", function() {
    const obj = new Map([[1,"a"],[true,[false,null]],[undefined]])
    obj.set(obj,obj)
    const res = Lib.write(obj)
    assert.notStrictEqual(res, obj)
    assert.deepStrictEqual(res,
                           {"#ref":0,
                            "#shared":{
                              0:{
                                "#type":"Map",
                                "#data":[[1,"a"],
                                         [true,[false,null]],
                                         [undefined,undefined],
                                         [{"#ref":0},{"#ref":0}]]}}})
    const back = Lib.read(res)
    assert.notStrictEqual(res, back)
    assert.deepStrictEqual(obj, back)
  })
})

describe("opaque values pattern", function() {
  it("should replace opaque values with unique ids", function() {
    const e = Symbol("e")
    const obj = {a:1,b(a) { return this.a + a },
                 c:[Symbol("c"),Symbol.for("d")]}
    obj.rec = new Set([obj,new Map([[e,obj],[obj,e]])])
    const opaque = new Map()
    const pat = Lib.pattern(obj,opaque)
    assert.deepStrictEqual([...opaque],[[obj.b,0],[obj.c[0],1],[e,2]])
    assert.deepStrictEqual(pat,{b:{"#opaque":0},
                                c:{0:{"#opaque":1}},
                                rec:{1:{0:{0:{"#opaque":2}},1:{1:{"#opaque":2}}}}})
    
    const json = Lib.write(obj, opaque)
    assert.deepStrictEqual(
      json,
      {"#ref":0,
       "#shared":{
         "0":{
           "a":1,
           "b":{"#opaque":0},
           "c":[{"#opaque":1}, {"#type":"Symbol","name":"d"}],
           "rec":{"#type":"Set",
                  "#data":[{"#ref":0},
                           {"#type":"Map",
                            "#data":[
                              [{"#opaque":2},{"#ref":0}],
                              [{"#ref":0},{"#opaque":2}]]}]}}}})
    const back = Lib.read(json, new Map([...opaque].map(([a,b]) => [b,a])))
    assert.notStrictEqual(obj,back)
    assert.deepStrictEqual(obj,back)
    const remoteOpaque = new Map()
    const objRemote = {a:1,
                       b(a){ return this.a - a},
                       c:[Symbol("c"),Symbol.for("d")]}
    const re = Symbol("e")
    objRemote.rec = new Set([objRemote,
                             new Map([[re,objRemote],[objRemote,re]])])
    Lib.match(objRemote,pat,remoteOpaque)
    assert.deepStrictEqual([...remoteOpaque],[[0,objRemote.b],
                                              [1,objRemote.c[0]],
                                              [2,re]])
    const objRemoteNext = Lib.read(json, remoteOpaque)
    assert.notStrictEqual(objRemoteNext,objRemote)
    assert.deepStrictEqual(objRemoteNext,objRemote)
  })
})


