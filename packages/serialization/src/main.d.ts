/**
# Serialization library for @effectful toolchain
*/

/**
 * ## Top level API
 *
 * Conversion between JSON values and JS values. JSON values set is a subset 
 * of JS values which can be converted to string using `JSON.stringify`
 * function and read back with `JSON.parse`.
 */

/**
 * Converts JS Plain Object into JSON Object. 
 *
 * It supports only plain objects as root value. To serialize anything else
 * just wrap it, e.g. `write({arr:[1]})`
 */
declare function write(value:Object):JSONObject;

/**
 * Converts JSON Object returned by `read` back to JS Object
 */
declare function read(json:JSONObject):Object;

/** `JSON.stringify` serializable value */
type JSONValue = boolean | number | string | JSONObject | JSONArray

/** `JSON.stringify` serializable Object */

interface JSONObject { [name:string]: JSONValue }
/** `JSON.stringify` serializable Array */
interface JSONArray extends Array<JSONValue> {}

/**
 * ## Shorcuts
 */

/** 
 * `write` followed by `JSON.stringify`, 
 * with same parameters as for `JSON.stringify` 
 */
declare function stringify(object:any,
                           replacer?: (key: string, value: any) => any,
                           space?: string | number): string;

/** `JSON.parse` followed by `read` */
declare function parse(json:string):Object;

/**
 * ## Serialization of Functions
 */

/** 
 * Same as `Function.prototype.bind`, but if the input function is serializable 
 * (e.g. registered as opaque value) the resulting function will 
 * be serializable as well
 *
 * @param func - original function
 * @param self - bound `this` value
 * @param args - bound arguments
 */ 
declare function bind(func: Function, self: Object, ...args: any[]): Function;

/**
 * ## Extension
 */

/** Describes how to read/write values of a type */
interface Descriptor {
  /** Unique type name */
  name: string,
  /** dispatching descriptor by value of `$$typeof` property */
  typeofTag?: Symbol,
  /**  
   * Sets `value` into `parent` on `index` position
   * @param ctx    - recursive writes for sub-values
   * @param parent - container for the value output
   * @param index  - either name of a field if parent is an object 
   *                 or number index if it is an array
   */
  write(ctx: WriteContext, value: any,
        parent: JSONObject|JSONArray, index: number|string);
  /**
   * Reads value from `json` value
   * @param ctx  - recursive reads handling for sub-values
   * @param json - input JSON
   * @returns     - resulting JS value
   */
  read(ctx: ReadContext, json: JSONValue): any;
}

/** name of a property to specify `Descriptor` for JS value */
declare const descriptorSymbol: Symbol

/** 
 * An object passed to Descript's `write` method to support recursive
 * invocation for nested values  
 */
interface WriteContext {
  step(value:any, parent:JSONObject|JSONArray, key:string|number): void 
}

/** 
 * An object passed to Descript's `read` method to support recursive invocation 
 * for nested-values  
 */
interface ReadContext {
  step(json:JSONValue): any
}

/** 
 * Adds descriptor to internal global registry for creating value 
 * instances by type names on reading. 
 *
 * The name will be changed to a unique value if some other descriptor with 
 * the same name is already registered.
 */
declare function regDescriptor(descriptor: Descriptor):Descriptor;

/** Adds references checks */
declare function refAwareDescriptor(descriptor:Descriptor):Descriptor;

/** Same as `regDescriptor` but ensures `descriptor` is references aware */
declare function regObjectDescriptor(descriptor: Descriptor):Descriptor;

/**
 * The function registers `value` as opaque. The library outputs names instead
 * of stored data for them. The values should be registered with the same name 
 * on writing and reading sides. Adds `[descriptorSymbol]` property to the 
 * value.
 */
declare function regOpaqueObject(value: any, name: string):Descriptor;

/**
 * Same as `regOpaqueObject` but doesn't add `[descriptorSymbol]` property and 
 * stores value->descriptor mapping in an internal global registry instead.
 */
declare function regOpaquePrim(value: any, name: string):Descriptor;

/** 
 * Registers `prototype` of `constructor` as opaque value and use it 
 * as the value's type in output
 * @param constructor - plain JS constructor function or class
 * @param name        - name for the type in output, it will be derived 
 *                      from `constructor` if not provided 
 */
declare function regConstructor(constructor:Function, name?:string):Descriptor;

