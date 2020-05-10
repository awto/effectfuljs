[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [WriteOptions](_main_.writeoptions.md)

# Interface: WriteOptions

Options to amend `write` behavior

## Hierarchy

* **WriteOptions**

## Index

### Properties

* [alwaysByRef](_main_.writeoptions.md#optional-alwaysbyref)
* [ignore](_main_.writeoptions.md#optional-ignore)
* [knownSyms](_main_.writeoptions.md#optional-knownsyms)
* [refs](_main_.writeoptions.md#optional-refs)
* [sharedRefs](_main_.writeoptions.md#optional-sharedrefs)
* [sharedRefsMap](_main_.writeoptions.md#optional-sharedrefsmap)
* [symsByName](_main_.writeoptions.md#optional-symsbyname)
* [verbose](_main_.writeoptions.md#optional-verbose)
* [warnIgnored](_main_.writeoptions.md#optional-warnignored)

## Properties

### `Optional` alwaysByRef

• **alwaysByRef**? : *undefined | false | true*

Defined in src/main.ts:161

by default the serializer uses references only if the object is referred more than once
this may still lead to stack overflow in `JSON.stringify` esp. if the data has some
structures like linked lists, this option will always generate a reference

___

### `Optional` ignore

• **ignore**? : *boolean | "opaque" | "placeholder"*

Defined in src/main.ts:136

don't throw exception if there is any writting error

___

### `Optional` knownSyms

• **knownSyms**? : *Map‹symbol, [SymbolDescr](_main_.symboldescr.md)›*

Defined in src/main.ts:155

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` refs

• **refs**? : *any[]*

Defined in src/main.ts:164

if this array is initialized it will be filled with the shared object's values

___

### `Optional` sharedRefs

• **sharedRefs**? : *[SharedRefInfo](_main_.sharedrefinfo.md)[]*

Defined in src/main.ts:147

___

### `Optional` sharedRefsMap

• **sharedRefsMap**? : *Map‹any, [SharedRefInfo](_main_.sharedrefinfo.md)›*

Defined in src/main.ts:145

current reference's id assignment state,
this can be copied between writes to keep same refs ids

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](_main_.symboldescr.md)[]›*

Defined in src/main.ts:151

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` verbose

• **verbose**? : *undefined | false | true*

Defined in src/main.ts:162

___

### `Optional` warnIgnored

• **warnIgnored**? : *undefined | false | true*

Defined in src/main.ts:140

execute `console.warn` for each ignored value (if `ignore` isn't falsy)
