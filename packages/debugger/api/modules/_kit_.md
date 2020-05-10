[@effectful/debugger](../README.md) › ["kit"](_kit_.md)

# Module: "kit"

## Index

### Functions

* [filter](_kit_.md#filter)
* [map](_kit_.md#map)

## Functions

###  filter

▸ **filter**<**T**>(`arr`: T[], `pred`: function): *T[]*

Defined in debugger/src/kit.ts:10

**Type parameters:**

▪ **T**

**Parameters:**

▪ **arr**: *T[]*

▪ **pred**: *function*

▸ (`v`: T): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`v` | T |

**Returns:** *T[]*

___

###  map

▸ **map**<**T**, **U**>(`arr`: T[], `f`: function): *U[]*

Defined in debugger/src/kit.ts:3

pure versions of RT functions

**Type parameters:**

▪ **T**

▪ **U**

**Parameters:**

▪ **arr**: *T[]*

▪ **f**: *function*

▸ (`v`: T): *U*

**Parameters:**

Name | Type |
------ | ------ |
`v` | T |

**Returns:** *U[]*
