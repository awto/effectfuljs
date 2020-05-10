[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [JSONArray](_main_.jsonarray.md)

# Interface: JSONArray

`JSON.stringify` serializable Array

## Hierarchy

* [Array](_main_.jsonarray.md#array)‹[JSONValue](../modules/_main_.md#jsonvalue)›

  ↳ **JSONArray**

## Indexable

* \[ **n**: *number*\]: [JSONValue](../modules/_main_.md#jsonvalue)

`JSON.stringify` serializable Array

## Index

### Properties

* [Array](_main_.jsonarray.md#array)
* [length](_main_.jsonarray.md#length)

### Methods

* [[Symbol.iterator]](_main_.jsonarray.md#[symbol.iterator])
* [[Symbol.unscopables]](_main_.jsonarray.md#[symbol.unscopables])
* [concat](_main_.jsonarray.md#concat)
* [copyWithin](_main_.jsonarray.md#copywithin)
* [entries](_main_.jsonarray.md#entries)
* [every](_main_.jsonarray.md#every)
* [fill](_main_.jsonarray.md#fill)
* [filter](_main_.jsonarray.md#filter)
* [find](_main_.jsonarray.md#find)
* [findIndex](_main_.jsonarray.md#findindex)
* [flat](_main_.jsonarray.md#flat)
* [flatMap](_main_.jsonarray.md#flatmap)
* [forEach](_main_.jsonarray.md#foreach)
* [includes](_main_.jsonarray.md#includes)
* [indexOf](_main_.jsonarray.md#indexof)
* [join](_main_.jsonarray.md#join)
* [keys](_main_.jsonarray.md#keys)
* [lastIndexOf](_main_.jsonarray.md#lastindexof)
* [map](_main_.jsonarray.md#map)
* [pop](_main_.jsonarray.md#pop)
* [push](_main_.jsonarray.md#push)
* [reduce](_main_.jsonarray.md#reduce)
* [reduceRight](_main_.jsonarray.md#reduceright)
* [reverse](_main_.jsonarray.md#reverse)
* [shift](_main_.jsonarray.md#shift)
* [slice](_main_.jsonarray.md#slice)
* [some](_main_.jsonarray.md#some)
* [sort](_main_.jsonarray.md#sort)
* [splice](_main_.jsonarray.md#splice)
* [toLocaleString](_main_.jsonarray.md#tolocalestring)
* [toString](_main_.jsonarray.md#tostring)
* [unshift](_main_.jsonarray.md#unshift)
* [values](_main_.jsonarray.md#values)

## Properties

###  Array

• **Array**: *ArrayConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1385

___

###  length

• **length**: *number*

*Inherited from [JSONArray](_main_.jsonarray.md).[length](_main_.jsonarray.md#length)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1215

Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.

## Methods

###  [Symbol.iterator]

▸ **[Symbol.iterator]**(): *IterableIterator‹[JSONValue](../modules/_main_.md#jsonvalue)›*

*Inherited from [JSONArray](_main_.jsonarray.md).[[Symbol.iterator]](_main_.jsonarray.md#[symbol.iterator])*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:60

Iterator

**Returns:** *IterableIterator‹[JSONValue](../modules/_main_.md#jsonvalue)›*

___

###  [Symbol.unscopables]

▸ **[Symbol.unscopables]**(): *object*

*Inherited from [JSONArray](_main_.jsonarray.md).[[Symbol.unscopables]](_main_.jsonarray.md#[symbol.unscopables])*

Defined in node_modules/typescript/lib/lib.es2015.symbol.wellknown.d.ts:94

Returns an object whose properties have the value 'true'
when they will be absent when used in a 'with' statement.

**Returns:** *object*

* **copyWithin**: *boolean*

* **entries**: *boolean*

* **fill**: *boolean*

* **find**: *boolean*

* **findIndex**: *boolean*

* **keys**: *boolean*

* **values**: *boolean*

___

###  concat

▸ **concat**(...`items`: ConcatArray‹[JSONValue](../modules/_main_.md#jsonvalue)›[]): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[concat](_main_.jsonarray.md#concat)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1237

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | ConcatArray‹[JSONValue](../modules/_main_.md#jsonvalue)›[] | Additional items to add to the end of array1.  |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

▸ **concat**(...`items`: T | ConcatArray‹T›[]): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[concat](_main_.jsonarray.md#concat)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1242

Combines two or more arrays.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | T &#124; ConcatArray‹T›[] | Additional items to add to the end of array1.  |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

___

###  copyWithin

▸ **copyWithin**(`target`: number, `start`: number, `end?`: undefined | number): *this*

*Inherited from [JSONArray](_main_.jsonarray.md).[copyWithin](_main_.jsonarray.md#copywithin)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:64

Returns the this object after copying a section of the array identified by start and end
to the same array starting at position target

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | number | If target is negative, it is treated as length+target where length is the length of the array. |
`start` | number | If start is negative, it is treated as length+start. If end is negative, it is treated as length+end. |
`end?` | undefined &#124; number | If not specified, length of the this object is used as its default value.  |

**Returns:** *this*

___

###  entries

▸ **entries**(): *IterableIterator‹[number, [JSONValue](../modules/_main_.md#jsonvalue)]›*

*Inherited from [JSONArray](_main_.jsonarray.md).[entries](_main_.jsonarray.md#entries)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:65

Returns an iterable of key, value pairs for every entry in the array

**Returns:** *IterableIterator‹[number, [JSONValue](../modules/_main_.md#jsonvalue)]›*

___

###  every

▸ **every**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [JSONArray](_main_.jsonarray.md).[every](_main_.jsonarray.md#every)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1310

Determines whether all the members of an array satisfy the specified test.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The every method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value false, or until the end of the array.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  fill

▸ **fill**(`value`: [JSONValue](../modules/_main_.md#jsonvalue), `start?`: undefined | number, `end?`: undefined | number): *this*

*Inherited from [JSONArray](_main_.jsonarray.md).[fill](_main_.jsonarray.md#fill)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:53

Returns the this object after filling the section identified by start and end with value

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) | value to fill array section with |
`start?` | undefined &#124; number | index to start filling the array at. If start is negative, it is treated as length+start where length is the length of the array. |
`end?` | undefined &#124; number | index to stop filling the array at. If end is negative, it is treated as length+end.  |

**Returns:** *this*

___

###  filter

▸ **filter**<**S**>(`callbackfn`: function, `thisArg?`: any): *S[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[filter](_main_.jsonarray.md#filter)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1337

Returns the elements of an array that meet the condition specified in a callback function.

**Type parameters:**

▪ **S**: *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *S[]*

▸ **filter**(`callbackfn`: function, `thisArg?`: any): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[filter](_main_.jsonarray.md#filter)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1343

Returns the elements of an array that meet the condition specified in a callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The filter method calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

___

###  find

▸ **find**<**S**>(`predicate`: function, `thisArg?`: any): *S | undefined*

*Inherited from [JSONArray](_main_.jsonarray.md).[find](_main_.jsonarray.md#find)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:31

Returns the value of the first element in the array where predicate is true, and undefined
otherwise.

**Type parameters:**

▪ **S**: *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found, find
immediately returns that element value. Otherwise, find returns undefined.

▸ (`this`: void, `value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `obj`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *value is S*

**Parameters:**

Name | Type |
------ | ------ |
`this` | void |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`obj` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *S | undefined*

▸ **find**(`predicate`: function, `thisArg?`: any): *[JSONValue](../modules/_main_.md#jsonvalue) | undefined*

*Inherited from [JSONArray](_main_.jsonarray.md).[find](_main_.jsonarray.md#find)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:32

**Parameters:**

▪ **predicate**: *function*

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `obj`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`obj` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue) | undefined*

___

###  findIndex

▸ **findIndex**(`predicate`: function, `thisArg?`: any): *number*

*Inherited from [JSONArray](_main_.jsonarray.md).[findIndex](_main_.jsonarray.md#findindex)*

Defined in node_modules/typescript/lib/lib.es2015.core.d.ts:43

Returns the index of the first element in the array where predicate is true, and -1
otherwise.

**Parameters:**

▪ **predicate**: *function*

find calls predicate once for each element of the array, in ascending
order, until it finds one where predicate returns true. If such an element is found,
findIndex immediately returns that element index. Otherwise, findIndex returns -1.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `obj`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`obj` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

If provided, it will be used as the this value for each invocation of
predicate. If it is not provided, undefined is used instead.

**Returns:** *number*

___

###  flat

▸ **flat**<**U**>(`this`: U[][][][][][][][], `depth`: 7): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:158

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][][][][] | - |
`depth` | 7 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][][][][], `depth`: 6): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:166

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][][][] | - |
`depth` | 6 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][][][], `depth`: 5): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:174

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][][] | - |
`depth` | 5 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][][], `depth`: 4): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:182

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][][] | - |
`depth` | 4 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][][], `depth`: 3): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:190

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][][] | - |
`depth` | 3 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][][], `depth`: 2): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:198

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][][] | - |
`depth` | 2 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[][], `depth?`: undefined | 1): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:206

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[][] | - |
`depth?` | undefined &#124; 1 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`this`: U[], `depth`: 0): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:214

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`this` | U[] | - |
`depth` | 0 | The maximum recursion depth  |

**Returns:** *U[]*

▸ **flat**<**U**>(`depth?`: undefined | number): *any[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flat](_main_.jsonarray.md#flat)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:222

Returns a new array with all sub-array elements concatenated into it recursively up to the
specified depth. If no depth is provided, flat method defaults to the depth of 1.

**Type parameters:**

▪ **U**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`depth?` | undefined &#124; number | The maximum recursion depth  |

**Returns:** *any[]*

___

###  flatMap

▸ **flatMap**<**U**, **This**>(`callback`: function, `thisArg?`: This): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[flatMap](_main_.jsonarray.md#flatmap)*

Defined in node_modules/typescript/lib/lib.es2019.array.d.ts:147

Calls a defined callback function on each element of an array. Then, flattens the result into
a new array.
This is identical to a map followed by flat with depth 1.

**Type parameters:**

▪ **U**

▪ **This**

**Parameters:**

▪ **callback**: *function*

A function that accepts up to three arguments. The flatMap method calls the
callback function one time for each element in the array.

▸ (`this`: This, `value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *U | ReadonlyArray‹U›*

**Parameters:**

Name | Type |
------ | ------ |
`this` | This |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *This*

An object to which the this keyword can refer in the callback function. If
thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  forEach

▸ **forEach**(`callbackfn`: function, `thisArg?`: any): *void*

*Inherited from [JSONArray](_main_.jsonarray.md).[forEach](_main_.jsonarray.md#foreach)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1325

Performs the specified action for each element in an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *void*

___

###  includes

▸ **includes**(`searchElement`: [JSONValue](../modules/_main_.md#jsonvalue), `fromIndex?`: undefined | number): *boolean*

*Inherited from [JSONArray](_main_.jsonarray.md).[includes](_main_.jsonarray.md#includes)*

Defined in node_modules/typescript/lib/lib.es2016.array.include.d.ts:27

Determines whether an array includes a certain element, returning true or false as appropriate.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [JSONValue](../modules/_main_.md#jsonvalue) | The element to search for. |
`fromIndex?` | undefined &#124; number | The position in this array at which to begin searching for searchElement.  |

**Returns:** *boolean*

___

###  indexOf

▸ **indexOf**(`searchElement`: [JSONValue](../modules/_main_.md#jsonvalue), `fromIndex?`: undefined | number): *number*

*Inherited from [JSONArray](_main_.jsonarray.md).[indexOf](_main_.jsonarray.md#indexof)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1295

Returns the index of the first occurrence of a value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [JSONValue](../modules/_main_.md#jsonvalue) | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.  |

**Returns:** *number*

___

###  join

▸ **join**(`separator?`: undefined | string): *string*

*Inherited from [JSONArray](_main_.jsonarray.md).[join](_main_.jsonarray.md#join)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1247

Adds all the elements of an array separated by the specified separator string.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`separator?` | undefined &#124; string | A string used to separate one element of an array from the next in the resulting String. If omitted, the array elements are separated with a comma.  |

**Returns:** *string*

___

###  keys

▸ **keys**(): *IterableIterator‹number›*

*Inherited from [JSONArray](_main_.jsonarray.md).[keys](_main_.jsonarray.md#keys)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:70

Returns an iterable of keys in the array

**Returns:** *IterableIterator‹number›*

___

###  lastIndexOf

▸ **lastIndexOf**(`searchElement`: [JSONValue](../modules/_main_.md#jsonvalue), `fromIndex?`: undefined | number): *number*

*Inherited from [JSONArray](_main_.jsonarray.md).[lastIndexOf](_main_.jsonarray.md#lastindexof)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1301

Returns the index of the last occurrence of a specified value in an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`searchElement` | [JSONValue](../modules/_main_.md#jsonvalue) | The value to locate in the array. |
`fromIndex?` | undefined &#124; number | The array index at which to begin the search. If fromIndex is omitted, the search starts at the last index in the array.  |

**Returns:** *number*

___

###  map

▸ **map**<**U**>(`callbackfn`: function, `thisArg?`: any): *U[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[map](_main_.jsonarray.md#map)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1331

Calls a defined callback function on each element of an array, and returns an array that contains the results.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The map method calls the callbackfn function one time for each element in the array.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.

**Returns:** *U[]*

___

###  pop

▸ **pop**(): *[JSONValue](../modules/_main_.md#jsonvalue) | undefined*

*Inherited from [JSONArray](_main_.jsonarray.md).[pop](_main_.jsonarray.md#pop)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1227

Removes the last element from an array and returns it.

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue) | undefined*

___

###  push

▸ **push**(...`items`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *number*

*Inherited from [JSONArray](_main_.jsonarray.md).[push](_main_.jsonarray.md#push)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1232

Appends new elements to an array, and returns the new length of the array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | [JSONValue](../modules/_main_.md#jsonvalue)[] | New elements of the Array.  |

**Returns:** *number*

___

###  reduce

▸ **reduce**(`callbackfn`: function): *[JSONValue](../modules/_main_.md#jsonvalue)*

*Inherited from [JSONArray](_main_.jsonarray.md).[reduce](_main_.jsonarray.md#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1349

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentIndex`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)*

▸ **reduce**(`callbackfn`: function, `initialValue`: [JSONValue](../modules/_main_.md#jsonvalue)): *[JSONValue](../modules/_main_.md#jsonvalue)*

*Inherited from [JSONArray](_main_.jsonarray.md).[reduce](_main_.jsonarray.md#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1350

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentIndex`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪ **initialValue**: *[JSONValue](../modules/_main_.md#jsonvalue)*

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)*

▸ **reduce**<**U**>(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [JSONArray](_main_.jsonarray.md).[reduce](_main_.jsonarray.md#reduce)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1356

Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduce method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentIndex`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reduceRight

▸ **reduceRight**(`callbackfn`: function): *[JSONValue](../modules/_main_.md#jsonvalue)*

*Inherited from [JSONArray](_main_.jsonarray.md).[reduceRight](_main_.jsonarray.md#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1362

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentIndex`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)*

▸ **reduceRight**(`callbackfn`: function, `initialValue`: [JSONValue](../modules/_main_.md#jsonvalue)): *[JSONValue](../modules/_main_.md#jsonvalue)*

*Inherited from [JSONArray](_main_.jsonarray.md).[reduceRight](_main_.jsonarray.md#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1363

**Parameters:**

▪ **callbackfn**: *function*

▸ (`previousValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentIndex`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *[JSONValue](../modules/_main_.md#jsonvalue)*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪ **initialValue**: *[JSONValue](../modules/_main_.md#jsonvalue)*

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)*

▸ **reduceRight**<**U**>(`callbackfn`: function, `initialValue`: U): *U*

*Inherited from [JSONArray](_main_.jsonarray.md).[reduceRight](_main_.jsonarray.md#reduceright)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1369

Calls the specified callback function for all the elements in an array, in descending order. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.

**Type parameters:**

▪ **U**

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to four arguments. The reduceRight method calls the callbackfn function one time for each element in the array.

▸ (`previousValue`: U, `currentValue`: [JSONValue](../modules/_main_.md#jsonvalue), `currentIndex`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *U*

**Parameters:**

Name | Type |
------ | ------ |
`previousValue` | U |
`currentValue` | [JSONValue](../modules/_main_.md#jsonvalue) |
`currentIndex` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪ **initialValue**: *U*

If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.

**Returns:** *U*

___

###  reverse

▸ **reverse**(): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[reverse](_main_.jsonarray.md#reverse)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1251

Reverses the elements in an Array.

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

___

###  shift

▸ **shift**(): *[JSONValue](../modules/_main_.md#jsonvalue) | undefined*

*Inherited from [JSONArray](_main_.jsonarray.md).[shift](_main_.jsonarray.md#shift)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1255

Removes the first element from an array and returns it.

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue) | undefined*

___

###  slice

▸ **slice**(`start?`: undefined | number, `end?`: undefined | number): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[slice](_main_.jsonarray.md#slice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1261

Returns a section of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start?` | undefined &#124; number | The beginning of the specified portion of the array. |
`end?` | undefined &#124; number | The end of the specified portion of the array. This is exclusive of the element at the index 'end'.  |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

___

###  some

▸ **some**(`callbackfn`: function, `thisArg?`: any): *boolean*

*Inherited from [JSONArray](_main_.jsonarray.md).[some](_main_.jsonarray.md#some)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1319

Determines whether the specified callback function returns true for any element of an array.

**Parameters:**

▪ **callbackfn**: *function*

A function that accepts up to three arguments. The some method calls
the callbackfn function for each element in the array until the callbackfn returns a value
which is coercible to the Boolean value true, or until the end of the array.

▸ (`value`: [JSONValue](../modules/_main_.md#jsonvalue), `index`: number, `array`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *unknown*

**Parameters:**

Name | Type |
------ | ------ |
`value` | [JSONValue](../modules/_main_.md#jsonvalue) |
`index` | number |
`array` | [JSONValue](../modules/_main_.md#jsonvalue)[] |

▪`Optional`  **thisArg**: *any*

An object to which the this keyword can refer in the callbackfn function.
If thisArg is omitted, undefined is used as the this value.

**Returns:** *boolean*

___

###  sort

▸ **sort**(`compareFn?`: undefined | function): *this*

*Inherited from [JSONArray](_main_.jsonarray.md).[sort](_main_.jsonarray.md#sort)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1271

Sorts an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`compareFn?` | undefined &#124; function | Function used to determine the order of the elements. It is expected to return a negative value if first argument is less than second argument, zero if they're equal and a positive value otherwise. If omitted, the elements are sorted in ascending, ASCII character order. ```ts [11,2,22,1].sort((a, b) => a - b) ```  |

**Returns:** *this*

___

###  splice

▸ **splice**(`start`: number, `deleteCount?`: undefined | number): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[splice](_main_.jsonarray.md#splice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1277

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount?` | undefined &#124; number | The number of elements to remove.  |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

▸ **splice**(`start`: number, `deleteCount`: number, ...`items`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *[JSONValue](../modules/_main_.md#jsonvalue)[]*

*Inherited from [JSONArray](_main_.jsonarray.md).[splice](_main_.jsonarray.md#splice)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1284

Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`start` | number | The zero-based location in the array from which to start removing elements. |
`deleteCount` | number | The number of elements to remove. |
`...items` | [JSONValue](../modules/_main_.md#jsonvalue)[] | Elements to insert into the array in place of the deleted elements.  |

**Returns:** *[JSONValue](../modules/_main_.md#jsonvalue)[]*

___

###  toLocaleString

▸ **toLocaleString**(): *string*

*Inherited from [JSONArray](_main_.jsonarray.md).[toLocaleString](_main_.jsonarray.md#tolocalestring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1223

Returns a string representation of an array. The elements are converted to string using their toLocalString methods.

**Returns:** *string*

___

###  toString

▸ **toString**(): *string*

*Inherited from [JSONArray](_main_.jsonarray.md).[toString](_main_.jsonarray.md#tostring)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1219

Returns a string representation of an array.

**Returns:** *string*

___

###  unshift

▸ **unshift**(...`items`: [JSONValue](../modules/_main_.md#jsonvalue)[]): *number*

*Inherited from [JSONArray](_main_.jsonarray.md).[unshift](_main_.jsonarray.md#unshift)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1289

Inserts new elements at the start of an array.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...items` | [JSONValue](../modules/_main_.md#jsonvalue)[] | Elements to insert at the start of the Array.  |

**Returns:** *number*

___

###  values

▸ **values**(): *IterableIterator‹[JSONValue](../modules/_main_.md#jsonvalue)›*

*Inherited from [JSONArray](_main_.jsonarray.md).[values](_main_.jsonarray.md#values)*

Defined in node_modules/typescript/lib/lib.es2015.iterable.d.ts:75

Returns an iterable of values in the array

**Returns:** *IterableIterator‹[JSONValue](../modules/_main_.md#jsonvalue)›*
