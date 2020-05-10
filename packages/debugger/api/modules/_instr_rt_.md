[@effectful/debugger](../README.md) › ["instr/rt"](_instr_rt_.md)

# Module: "instr/rt"

## Index

### Type aliases

* [Callback](_instr_rt_.md#callback)

### Functions

* [arrayFrom](_instr_rt_.md#arrayfrom)
* [chainM](_instr_rt_.md#chainm)
* [every](_instr_rt_.md#every)
* [filter](_instr_rt_.md#filter)
* [find](_instr_rt_.md#find)
* [findIndex](_instr_rt_.md#findindex)
* [flatMap](_instr_rt_.md#flatmap)
* [forEach](_instr_rt_.md#foreach)
* [iterErr](_instr_rt_.md#itererr)
* [iterErrM](_instr_rt_.md#itererrm)
* [iterFin](_instr_rt_.md#iterfin)
* [map](_instr_rt_.md#map)
* [mapForEach](_instr_rt_.md#mapforeach)
* [reduce](_instr_rt_.md#reduce)
* [reduceRight](_instr_rt_.md#reduceright)
* [reify](_instr_rt_.md#reify)
* [setForEach](_instr_rt_.md#setforeach)
* [some](_instr_rt_.md#some)
* [wrapModule](_instr_rt_.md#wrapmodule)

## Type aliases

###  Callback

Ƭ **Callback**: *function*

Defined in debugger/src/instr/rt.ts:10

Not transpiled high-order functions won't work, because when it calls its callback
it returns an effectful value and not immediately starts its execution

This file contains quick and dirty patches for the runtime's higher order functions

TODO: transpile core-js instead

#### Type declaration:

▸ (`this`: This | undefined, `elem`: T, `index`: number, `arr`: T[]): *R*

**Parameters:**

Name | Type |
------ | ------ |
`this` | This &#124; undefined |
`elem` | T |
`index` | number |
`arr` | T[] |

## Functions

###  arrayFrom

▸ **arrayFrom**<**T**, **U**, **This**>(`iter`: Iterable‹T›, `mapFn?`: [Callback](_instr_rt_.md#callback)‹This, T, U›, `self?`: This): *U[] | T[]*

Defined in debugger/src/instr/rt.ts:31

**Type parameters:**

▪ **T**

▪ **U**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`iter` | Iterable‹T› |
`mapFn?` | [Callback](_instr_rt_.md#callback)‹This, T, U› |
`self?` | This |

**Returns:** *U[] | T[]*

___

###  chainM

▸ **chainM**<**A**, **B**>(`arg`: A, `func`: function): *B*

Defined in debugger/src/instr/rt.ts:169

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

▪ **arg**: *A*

▪ **func**: *function*

▸ (`a`: A): *B*

**Parameters:**

Name | Type |
------ | ------ |
`a` | A |

**Returns:** *B*

___

###  every

▸ **every**<**T**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, boolean›, `self?`: This): *boolean*

Defined in debugger/src/instr/rt.ts:139

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, boolean› |
`self?` | This |

**Returns:** *boolean*

___

###  filter

▸ **filter**<**T**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, boolean›, `self?`: This): *T[]*

Defined in debugger/src/instr/rt.ts:47

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, boolean› |
`self?` | This |

**Returns:** *T[]*

___

###  find

▸ **find**<**T**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, boolean›, `self?`: This): *T | undefined*

Defined in debugger/src/instr/rt.ts:58

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, boolean› |
`self?` | This |

**Returns:** *T | undefined*

___

###  findIndex

▸ **findIndex**<**T**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, boolean›, `self?`: This): *number*

Defined in debugger/src/instr/rt.ts:67

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, boolean› |
`self?` | This |

**Returns:** *number*

___

###  flatMap

▸ **flatMap**<**T**, **U**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, U | ReadonlyArray‹U››, `self?`: This): *U[]*

Defined in debugger/src/instr/rt.ts:77

**Type parameters:**

▪ **T**

▪ **U**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, U &#124; ReadonlyArray‹U›› |
`self?` | This |

**Returns:** *U[]*

___

###  forEach

▸ **forEach**<**T**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, void›, `self?`: This): *void*

Defined in debugger/src/instr/rt.ts:85

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, void› |
`self?` | This |

**Returns:** *void*

___

###  iterErr

▸ **iterErr**(`iter`: any, `reason`: any): *any*

Defined in debugger/src/instr/rt.ts:173

**Parameters:**

Name | Type |
------ | ------ |
`iter` | any |
`reason` | any |

**Returns:** *any*

___

###  iterErrM

▸ **iterErrM**(`iter`: any, `reason`: any): *Promise‹any›*

Defined in debugger/src/instr/rt.ts:179

**Parameters:**

Name | Type |
------ | ------ |
`iter` | any |
`reason` | any |

**Returns:** *Promise‹any›*

___

###  iterFin

▸ **iterFin**(`iter`: any, `value`: any): *any*

Defined in debugger/src/instr/rt.ts:185

**Parameters:**

Name | Type |
------ | ------ |
`iter` | any |
`value` | any |

**Returns:** *any*

___

###  map

▸ **map**<**T**, **U**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, U›, `self?`: This): *U[]*

Defined in debugger/src/instr/rt.ts:17

**Type parameters:**

▪ **T**

▪ **U**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, U› |
`self?` | This |

**Returns:** *U[]*

___

###  mapForEach

▸ **mapForEach**<**K**, **V**, **This**>(`this`: [Map](_engine_.md#const-map)‹K, V›, `callback`: function, `self?`: This): *void*

Defined in debugger/src/instr/rt.ts:157

**Type parameters:**

▪ **K**

▪ **V**

▪ **This**

**Parameters:**

▪ **this**: *[Map](_engine_.md#const-map)‹K, V›*

▪ **callback**: *function*

▸ (`this`: This | undefined, `v`: V, `k`: K, `cont`: [Map](_engine_.md#const-map)‹K, V›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | This &#124; undefined |
`v` | V |
`k` | K |
`cont` | [Map](_engine_.md#const-map)‹K, V› |

▪`Optional`  **self**: *This*

**Returns:** *void*

___

###  reduce

▸ **reduce**<**T**>(`this`: T[], `callback`: function, `initial?`: T): *T*

Defined in debugger/src/instr/rt.ts:94

**Type parameters:**

▪ **T**

**Parameters:**

▪ **this**: *T[]*

▪ **callback**: *function*

▸ (`prev`: T, `cur`: T, `index`: number, `arr`: T[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`prev` | T |
`cur` | T |
`index` | number |
`arr` | T[] |

▪`Optional`  **initial**: *T*

**Returns:** *T*

___

###  reduceRight

▸ **reduceRight**<**T**>(`this`: T[], `callback`: function, `initial?`: T): *T*

Defined in debugger/src/instr/rt.ts:112

**Type parameters:**

▪ **T**

**Parameters:**

▪ **this**: *T[]*

▪ **callback**: *function*

▸ (`prev`: T, `cur`: T, `index`: number, `arr`: T[]): *T*

**Parameters:**

Name | Type |
------ | ------ |
`prev` | T |
`cur` | T |
`index` | number |
`arr` | T[] |

▪`Optional`  **initial**: *T*

**Returns:** *T*

___

###  reify

▸ **reify**<**T**>(`v`: T): *T*

Defined in debugger/src/instr/rt.ts:165

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`v` | T |

**Returns:** *T*

___

###  setForEach

▸ **setForEach**<**T**, **This**>(`this`: [Set](_vscode_handlers_.md#const-set)‹T›, `callback`: function, `self?`: This): *void*

Defined in debugger/src/instr/rt.ts:149

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

▪ **this**: *[Set](_vscode_handlers_.md#const-set)‹T›*

▪ **callback**: *function*

▸ (`this`: This | undefined, `k`: T, `v`: T, `cont`: [Set](_vscode_handlers_.md#const-set)‹T›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`this` | This &#124; undefined |
`k` | T |
`v` | T |
`cont` | [Set](_vscode_handlers_.md#const-set)‹T› |

▪`Optional`  **self**: *This*

**Returns:** *void*

___

###  some

▸ **some**<**T**, **This**>(`this`: T[], `callback`: [Callback](_instr_rt_.md#callback)‹This, T, boolean›, `self?`: This): *boolean*

Defined in debugger/src/instr/rt.ts:129

**Type parameters:**

▪ **T**

▪ **This**

**Parameters:**

Name | Type |
------ | ------ |
`this` | T[] |
`callback` | [Callback](_instr_rt_.md#callback)‹This, T, boolean› |
`self?` | This |

**Returns:** *boolean*

___

###  wrapModule

▸ **wrapModule**(`mod`: any, `cjsModule`: any): *any*

Defined in debugger/src/instr/rt.ts:190

**Parameters:**

Name | Type |
------ | ------ |
`mod` | any |
`cjsModule` | any |

**Returns:** *any*
