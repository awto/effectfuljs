[@effectful/serialization](../README.md) › ["main"](../modules/_main_.md) › [ReadOptions](_main_.readoptions.md)

# Interface: ReadOptions

Options to amend `write` behavior

## Hierarchy

* **ReadOptions**

## Index

### Properties

* [ignore](_main_.readoptions.md#optional-ignore)
* [knownSyms](_main_.readoptions.md#optional-knownsyms)
* [refs](_main_.readoptions.md#optional-refs)
* [symsByName](_main_.readoptions.md#optional-symsbyname)
* [warnIgnored](_main_.readoptions.md#optional-warnignored)

## Properties

### `Optional` ignore

• **ignore**? : *boolean | "placeholder"*

Defined in src/main.ts:170

don't throw exception if there is any reading error

___

### `Optional` knownSyms

• **knownSyms**? : *Map‹symbol, [SymbolDescr](_main_.symboldescr.md)›*

Defined in src/main.ts:179

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` refs

• **refs**? : *any[]*

Defined in src/main.ts:181

references to shared object values

___

### `Optional` symsByName

• **symsByName**? : *Map‹string, [SymbolDescr](_main_.symboldescr.md)[]›*

Defined in src/main.ts:175

holds information about seen local Symbols, it can be copied between runs

___

### `Optional` warnIgnored

• **warnIgnored**? : *undefined | false | true*

Defined in src/main.ts:171
