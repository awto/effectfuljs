export const metaSym = Symbol("@effectful/serialization/meta")

const metaByName = new Map()
const metaByValue = new WeakMap()

/** react uses `$$typeof` property for its values, it is the mapping  */
const metaByTypeOfProp = new Map()

/** converts to serializable objects and calls `JSON.stringify`  */
export function stringify(value, replacer, spaces) {
  return JSON.stringify(write(value), replacer, spaces)
}

/** `JSON.parse` followed by `read` */
export function parse(json) {
  return read(JSON.parse(json))
}

class WriteContext {
  constructor(opts) {
    this.sharedRefs = new Map()
    this.refs = []
    this.ignore = opts && opts.ignore
  }
  step(value, parent, key) {
    const meta = getValueMeta(value)
    if (!meta) {
      if (this.ignore)
        return void 0
      throw new TypeError(`not writable value ${value}`)
    }
    return meta.write(this, value, parent, key)
  }
}

class ReadContext {
  step(json) {
    return getJsonMeta(json).read(this, json)
  }
}

/** 
 * converts JS value to `JSON.stringify` serializable object 
 * 
 * @param {Object} value - original object
 * @param {{ignore:boolean}} opts - options
 */
export function write(value,opts) {
  if (typeof value !== "object" || Array.isArray(value))
    throw new TypeError("wrong argument type")
  const ctx = new WriteContext(opts)
  const res = []
  res.push(ctx.step(value, res, 0))
  if (ctx.refs.length) {
    const refs = ctx.refs.filter(i => i.ref != null)
    if (refs.length) {
      let id = 0
      const dict = {}
      for(const i of refs) {
        dict[i.ref["#ref"] = id++] = i.data
        i.parent[i.index] = i.ref
      }
      return {...res[0], "#shared": dict}
    }
  }
  return res[0]
}

/** 
 * converts JSON objects back into JS objects
 *
 * @param {Object} json - object to read
 */
export function read(json) {
  if (typeof json !== "object")
    throw new TypeError("root value must be Object")
  const ctx = new ReadContext()
  const vals = ctx.shared = new Map()
  const {"#shared":shared} = json
  const tasks = []
  if (shared) {
    for(const i of Object.keys(shared)) {
      const json = shared[i]
      const meta = getJsonMeta(json)
      const value = meta.create(ctx,json)
      vals.set(+i, value)
      tasks.push({json,value,meta})
    }
  }
  for(const {json,value,meta} of tasks)
    meta.readContent(ctx, json, value)
  return getJsonMeta(json).read(ctx,json)
}

function escape(name) {
  return name[0] === "#" ? "#" + name : name
}

function unescape(name) {
  return name[0] === "#" ? (name[1] !== "#" ? null : name.substr(1)) : name
}

const ObjectMeta = {
  read(ctx, json) {
    const value = this.create(ctx,json)
    this.readContent(ctx, json, value)
    return value
  },
  write(ctx, value) {
    const parts = {}
    for(const i of Object.keys(value))
      parts[escape(i)] = ctx.step(value[i], parts, i)
    if (this.valuePrototype !== void 0)
      parts["#type"] = this.name
    return parts
  },
  create() {
    if (this.valueConstructor)
      return new this.valueConstructor()
    if (this.valuePrototype !== void 0)
      return Object.create(this.valuePrototype)
    return {}
  },
  readContent(ctx, json, value) {
    for(const i in json) {
      let name = unescape(i)
      if (name == null)
        continue
      value[name] = ctx.step(json[i])
    }
  }
}

/** value is stored by reference of if there are more than one */
export const refAwareMeta = (meta) =>
  (meta.noRefs
   ? meta : {
     ...meta,
     read(ctx, json) {
       const ref = json["#ref"]
       if (ref != null)
         return ctx.shared.get(ref)
       return this.readNoRef(ctx, json)
     },
     write(ctx, value, parent, index) {
       let info = ctx.sharedRefs.get(value)
       if (info == null) {
         ctx.sharedRefs.set(value,info = {ref:null,parent,index,meta})
         if (this.always && parent)
           info.ref = {}
         info.data = this.writeNoRef(ctx, value, parent, index)
         ctx.refs.push(info)
         return info.data
       }
       if (info.ref == null)
         info.ref = {}
       return info.ref
     },
     writeNoRef:meta.write,
     readNoRef:meta.read,
     noRefs: meta
   })

export function regMeta(meta) {
  const name = guessMetaName(meta)
  let uniq = name, i = 0
  for(;metaByName.get(uniq) != null; uniq = `${name}_${++i}`) {}
  meta = {...meta,name:uniq}
  metaByName.set(meta.name, meta)
  if (meta.typeofTag)
    metaByTypeOfProp.set(meta.typeofTag, meta)
  return meta
}

function guessObjectName(value) {
  return value.name
    || value.constructor && value.constructor.name
    || "Object"
}

function guessMetaName(meta) {
  if (meta.name)
    return meta.name
  if (meta.valuePrototype && meta.valuePrototype.name)
    return meta.valuePrototype.name
  if (meta.valueConstructor && meta.valueConstructor.name)
    return meta.valueConstructor.name
  if (meta.valuePrototype
      && meta.valuePrototype.constructor
      && meta.valuePrototype.constructor.name)
    return meta.valuePrototype.constructor.name
  return "Object"
}

export function regObjectMeta(meta) {
  return regMeta(refAwareMeta(meta))
}

export function regOpaqueObject(value, name = guessObjectName(value)) {
  return value[metaSym] = regObjectMeta({...OpaqueMeta,name,value})
}

export function regConstructor(constr, meta = ObjectMeta) {
  const prototype = constr.prototype
  return prototype[metaSym]
    = regMeta(refAwareMeta({...meta,
                            valuePrototype:prototype,
                            name:constr.name}))
}

export function regPrimValue(value, name) {
  const meta = regMeta({...OpaqueMeta,name,value})
  metaByValue.set(value,meta)
  return meta
}

const PojsoMeta = regObjectMeta(ObjectMeta)

const PrimMeta = {
  write(ctx, value) { return value },
  read(ctx, json) { return json }
}

const RefMeta = {
  read(ctx, json) {
    return ctx.shared.get(json["#ref"])
  }
}

const OpaqueMeta = {
  read(ctx, json) {
    return this.create(ctx, json)
  },
  readContent() {},
  create(ctx, json) {
    const res = metaByName.get(json["#oid"])
    if (!res)
      throw new Error(`not found object ${json["#oid"]}`)
    return this.value
  },
  write(ctx, value) {
    return {"#oid":this.name}
  }
}


const SymbolMeta = regMeta({
  write(ctx, value) {
    return {"#type":"Symbol",name:Symbol.keyFor(value)}
  },
  read(ctx, value) {
    return Symbol.for(value.name)
  },
  name:"Symbol"
})


function getValueMeta(value) {
  switch(typeof value) {
  case "number":
  case "undefined":
  case "boolean":
  case "string":
    return PrimMeta
  case "object":
    if (!value)
      return PrimMeta
    const meta = value[metaSym]
    if (meta)
      return meta
    const proto = Object.getPrototypeOf(value)
    if (proto == null || proto === Object.prototype) {
      if (value.$$typeof)
        return metaByTypeOfProp.get(value.$$typeof)
      return PojsoMeta
    }
    return null
  case "function":
    return value[metaSym] || null
  case "symbol":
    if (Symbol.keyFor(value))
      return SymbolMeta
  }
  return null
}

function lookupMeta(typeName) {
  const meta = metaByName.get(typeName)
  if (!meta)
    throw new TypeError(`not registered type:${typeName}`)
  return meta
}

function getJsonMeta(json) {
  if (!json || typeof json !== "object")
    return PrimMeta
  if (Array.isArray(json))
    return ArrayMeta
  if ("#ref" in json)
    return RefMeta
  if ("#oid" in json)
    return lookupMeta(json["#oid"])
  if ("#type" in json)
    return lookupMeta(json["#type"])
  return PojsoMeta
}

const ArrayMeta = regConstructor(Array,{
  ...ObjectMeta,
  write(ctx, value) {
    const res = []
    for(const i of value)
      res.push(ctx.step(i, res, res.length))
    return res
  },
  valueConstructor:Array,
  name:"Array",
  readContent(ctx, json, value) {
    for(const i of json)
      value.push(ctx.step(i))
  }
})

const IterableMeta = {
  ...ObjectMeta,
  write(ctx, value) {
    const json = []
    for(const i of value)
      json.push(ctx.step(i, json, json.length))
    return {"#type":this.name,"#data":json}
  },
  readContent(ctx, json, value) {
    for(const i of json["#data"])
      value.add(ctx.step(i))
  }
}

regConstructor(Set,{
  ...IterableMeta,
  valueConstructor:Set,
  name:"Set"
})

regConstructor(Map,{
  ...IterableMeta,
  valueConstructor:Map,
  name:"Map",
  readContent(ctx, json, value) {
    for(const [k,v] of json["#data"])
      value.set(ctx.step(k),ctx.step(v))
  }
})

