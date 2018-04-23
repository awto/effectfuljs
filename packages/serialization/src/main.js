export const metaSym = Symbol("@effectful/serialization/meta")

const metaByName = new Map()
const metaByPrototype = new WeakMap()

/** converts to serializable objects and calls `JSON.stringify`  */
export function stringify(value, replacer, spaces) {
  return JSON.stringify(write(value), replacer, spaces)
}

/** `JSON.parse` followed by `read` */
export function parse(json) {
  return read(JSON.parse(json))
}

/** 
 * converts JS value to `JSON.stringify` serializable object 
 * 
 * @param {Object} value - original object
 * @param {Map<any,number>} opaque - known opaque values with their ids
 * @returns {Object} `JSON.stringify` serializable object
 */
export function write(value, opaque) {
  if (typeof value !== "object" || Array.isArray(value))
    throw new TypeError("wrong argument type")
  const ctx = {curId:0,opaque,sharedRefs:new Map()}
  const queue = ctx.queue = []
  const res = writeStep(ctx, value)
  for(let f;(f = queue.shift());)
    f.dest[f.key] = writeStep(ctx, f.value)
  return res
}

/** 
 * converts JSON objects back into JS objects
 *
 * @param {Object} json - object to read
 * @param {Map<number,any>} opaque - map from ids to values to substitute Opaque types
 */
export function read(json, opaque) {
  if (typeof json !== "object")
    throw new TypeError("root value must be Object")
  const ctx = {opaque}
  const queue = ctx.queue = []
  const vals = ctx.shared = new Map()
  const res = getJsonMeta(json).read(ctx,json)
  for(let f;(f = queue.shift());)
    f.meta.readContent(ctx, f.json, f.value)
  return res
}

/**
 * queries all value's parts not serializable (opaque) sub-values
 *
 * @param {Object} value - root object to traverse
 * @param {Map<any,number>} - returns found Opaque values with their unique ids
 * @returns {Object} - pattern JSON serilazable object to apply in `match`
 */
export function pattern(value, opaque) {
  if (typeof value !== "object")
    throw new TypeError("root value must be Object")
  const ctx = {opaque,
               visited:new Set(),
               count:0,
               actions:[]}
  const dest = {}
  const actions = ctx.actions = []
  const queue = ctx.queue = [{rec:true,key:"value",dest,json:null,value}]
  for(let f;(f = queue.shift());)
    getValueMeta(f.value).pattern(ctx,f.value,f.key,f.dest)
  for(const i of ctx.actions)
    if (i.json)
      (i.dest.json || (i.dest.json = {}))[i.key] = i.json
  return dest.json && dest.json.value
}

/** 
 * applies result of `pattern` to the corresponding object 
 * to queriying corresponding opaque sub-values 
 *
 * @param {Object} value - the corresponding object
 * @param {Object} json - the result of `pattern` 
 * @param {Map<number, any>} - mapping of unique id to opaque value
 */
export function match(value, json, opaque) {
  matchStep({opaque}, value, json)
}

function writeStep(ctx, value, parent, index) {
  return getValueMeta(value).write(ctx, value, parent, index)
}

function readStep(ctx, json) {
  return getJsonMeta(json).read(ctx, json)
}

function matchStep(ctx, value, json) {
  if (json) {
    const opaqueRef = json["#opaque"]
    if (opaqueRef != null) {
      if (value)
        ctx.opaque.set(opaqueRef, value)
      return
    }
  }
  getValueMeta(value).match(ctx, value, json)
}

function objectPattern(ctx, value, key, dest) {
  const json = {dest,key}
  ctx.actions.unshift(json)
  for(const key of Object.keys(value))
    ctx.queue.push({value:value[key],dest:json,key})
}

function objectMatch(ctx, value, json) {
  for(const i in json) {
    const next = value[i]
    if (!next)
      throw new TypeError(`no matching field: ${i}`)
    matchStep(ctx, next, json[i])
  }
}

const objectMeta = (prototype, name) => ({
  name: name || "Object",
  write(ctx, value) {
    const dest = {}
    for(const i of Object.keys(value))
      ctx.queue.push({value:value[i],dest,key:i[0] === "#" ? "#" + i : i})
    if (name)
      dest["#type"] = name
    return dest
  },
  read(ctx, json) {
    const value = Object.create(prototype)
    ctx.queue.push({meta:this,json,value})
    return value
  },
  readContent(ctx, json, value) {
    for(const i of Object.keys(json)) {
      let name = i
      if (i[0] === "#") {
        if (i[1] !== "#")
          continue
        name = i.substr(1)
      }
      value[name] = readStep(ctx, json[i])
    }
  },
  pattern: objectPattern,
  match: objectMatch
})

/** value is stored by reference of if there are more than one */
export const refAwareMeta = (meta) => ({
  name:meta.name,
  write(ctx, value) {
    let json = ctx.sharedRefs.get(value)
    if (json == null) {
      ctx.sharedRefs.set(value,json = meta.write(ctx, value))
      return json
    }
    if (json["#id"] == null)
      json["#id"] = ctx.curId++
    return {"#ref":json["#id"]}
  },
  read(ctx, json) {
    const id = json["#id"]
    if (id != null) {
      let value
      ctx.shared.set(id, value = meta.read(ctx,json))
      return value
    }
    const ref = json["#ref"]
    if (ref != null)
      return ctx.shared.get(ref)
    return meta.read(ctx, json)
  },
  pattern(ctx, value, key, dest) {
    if (!ctx.visited.has(value)) {
      ctx.visited.add(value)
      meta.pattern(ctx, value, key, dest)
    }
  },
  create:meta.create,
  readContent:meta.readContent,
  match: meta.match,
  noRefs: meta
})

export function regMeta(meta, name) {
  metaByName.set(meta.name || "Object", meta)
  if (name)
    meta.type = name
  return meta
}

export function regConstructor(constructor,
                               name = constructor.name || "Object") {
  const prototype = constructor.prototype
  let uniq = name
  for(let i = 0; metaByName.get(uniq) != null; uniq = `${name}_${++i}`) {}
  return prototype[metaSym] ||
    (prototype[metaSym] = regMeta(refAwareMeta(
      objectMeta(prototype, uniq)),uniq))
}

const PojsoMeta = regMeta(refAwareMeta(objectMeta(Object.prototype)))

const PrimMeta = {
  write(ctx, value) { return value },
  read(ctx, json) { return json },
  pattern() {},
  match() {}
}

const SymbolMeta = {
  write(ctx, value) { return {"#type":"Symbol",name:Symbol.keyFor(value)} },
  read(ctx, value) { return Symbol.for(value.name) },
  pattern() {},
  match() {}
}

const RefMeta = {
  read(ctx, json) { return ctx.shared.get(json["#ref"]) }
}

const OpaqueMeta = {
  write(ctx, value) {
    const id = ctx.opaque.get(value)
    if (id != null)
      return {"#opaque":id}
  },
  read(ctx, json) {
    return ctx.opaque.get(json["#opaque"])
  },
  pattern(ctx, value, key, dest) {
    let id = ctx.opaque.get(value)
    if (id == null)
      ctx.opaque.set(value, id = ctx.count++);
    (dest.json || (dest.json = {}))[key] = {"#opaque": id}
  },
  match(ctx, value, json) {
    if (value) {
      const ref = json["#opaque"]
      if (ref)
        ctx.opaque.set(ref, value)
    }
  }
}

metaByName.set("Symbol", SymbolMeta)

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
    if (proto == null || proto === Object.prototype)
      return PojsoMeta
    return OpaqueMeta
  case "function":
    return OpaqueMeta
  case "symbol":
    if (Symbol.keyFor(value))
      return SymbolMeta
  }
  return OpaqueMeta
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
  if ("#opaque" in json)
    return OpaqueMeta
  if ("#type" in json)
    return lookupMeta(json["#type"])
  return PojsoMeta
}

function iterablePattern(ctx, value, key, dest) {
  return objectPattern(ctx, Array.from(value), key, dest)
}

function iterableMatch(ctx, value, json) {
  objectMatch(ctx, Array.from(value), json)
}

const ArrayMeta = refAwareMeta({
  name: "Array",
  constr:Array,
  write(ctx, value) {
    const dest = []
    let key = 0
    for(const i of value)
      ctx.queue.push({value:i,dest,key:key++})
    return {"#type":this.name,"#data":dest}
  },
  read(ctx, json) {
    const value = new this.constr()
    ctx.queue.push({meta:this,json,value})
    return value
  },
  readContent(ctx, json, value) {
    for(const i of json["#data"])
      value.push(readStep(ctx,i))
  },
  pattern:objectPattern,
  match:objectMatch
})

metaByName.set("Array", ArrayMeta)
Array.prototype[metaSym] = ArrayMeta

const SetMeta = refAwareMeta({
  name: "Set",
  constr: Set,
  write:ArrayMeta.noRefs.write,
  read:ArrayMeta.noRefs.read,
  readContent(ctx, json, value) {
    for(const i of json["#data"])
      value.add(readStep(ctx,i))
  },
  pattern:iterablePattern,
  match:iterableMatch
})

Set.prototype[metaSym] = SetMeta
metaByName.set("Set",SetMeta)

const MapMeta = refAwareMeta({
  name: "Map",
  write(ctx, value) {
    const json = []
    for(const [k,v] of value) {
      const item = []
      ctx.queue.push({value:k,dest:item,key:0},{value:v,dest:item,key:1})
      json.push(item)
    }
    return {"#type":"Map","#data":json}
  },
  read(ctx, json) {
    const value = new Map()
    ctx.queue.push({meta:this,json,value})
    return value
  },
  readContent(ctx, json, value) {
    for(const [k,v] of json["#data"])
      value.set(readStep(ctx,k),readStep(ctx,v))
  },
  pattern:iterablePattern,
  match:iterableMatch
})

Map.prototype[metaSym] = MapMeta
metaByName.set("Map",MapMeta)

