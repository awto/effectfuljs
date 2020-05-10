[@effectful/cc](../README.md) › ["main"](_main_.md)

# Module: "main"

## Index

### Classes

* [Chain](../classes/_main_.chain.md)
* [Context](../classes/_main_.context.md)
* [Prompt](../classes/_main_.prompt.md)
* [Pure](../classes/_main_.pure.md)
* [PushPrompt](../classes/_main_.pushprompt.md)
* [PushSubCont](../classes/_main_.pushsubcont.md)
* [WithSubCont](../classes/_main_.withsubcont.md)

### Interfaces

* [CC](../interfaces/_main_.cc.md)

### Type aliases

* [CCV](_main_.md#ccv)
* [Frame](_main_.md#frame)
* [Seq](_main_.md#seq)
* [Step](_main_.md#step)
* [SubCont](_main_.md#subcont)

### Variables

* [promptId](_main_.md#let-promptid)
* [stepSymbol](_main_.md#const-stepsymbol)

### Functions

* [CC](_main_.md#cc)
* [abort](_main_.md#abort)
* [coerce](_main_.md#coerce)
* [context](_main_.md#context)
* [control](_main_.md#control)
* [control0](_main_.md#control0)
* [newPrompt](_main_.md#newprompt)
* [pure](_main_.md#pure)
* [pushPrompt](_main_.md#pushprompt)
* [pushSubCont](_main_.md#pushsubcont)
* [reflect](_main_.md#reflect)
* [reify](_main_.md#reify)
* [reset](_main_.md#reset)
* [run](_main_.md#run)
* [shift](_main_.md#shift)
* [shift0](_main_.md#shift0)
* [splitAt](_main_.md#splitat)
* [withSubCont](_main_.md#withsubcont)

## Type aliases

###  CCV

Ƭ **CCV**: *[CC](../interfaces/_main_.cc.md)‹A› | A*

Defined in main.ts:31

___

###  Frame

Ƭ **Frame**: *object*

Defined in main.ts:60

#### Type declaration:

* **ctx**? : *[Context](../classes/_main_.context.md)*

* **prompt**? : *[Prompt](../classes/_main_.prompt.md)‹A›*

* **seg**? : *[Step](_main_.md#step)‹A, any›*

___

###  Seq

Ƭ **Seq**: *[Frame](_main_.md#frame)‹any›[]*

Defined in main.ts:58

___

###  Step

Ƭ **Step**: *function*

Defined in main.ts:33

#### Type declaration:

▸ (`x`: [Context](../classes/_main_.context.md), `a`: A): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`x` | [Context](../classes/_main_.context.md) |
`a` | A |

___

###  SubCont

Ƭ **SubCont**: *[Frame](_main_.md#frame)‹any›[]*

Defined in main.ts:104

## Variables

### `Let` promptId

• **promptId**: *number* = 0

Defined in main.ts:12

# Monadic framework for delimited continuations

import * as CC from "@effectful/cc"

CC.run(function() {
// .....
});

___

### `Const` stepSymbol

• **stepSymbol**: *unique symbol* = Symbol("Effectful.ccStep")

Defined in main.ts:24

## Functions

###  CC

▸ **CC**<**A**>(`f`: function): *A*

Defined in main.ts:290

**Type parameters:**

▪ **A**

**Parameters:**

▪ **f**: *function*

▸ (): *A*

**Returns:** *A*

___

###  abort

▸ **abort**<**A**, **B**>(`p`: [Prompt](../classes/_main_.prompt.md)‹B›, `e`: [CCV](_main_.md#ccv)‹B›): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:278

aborts current continution up to the prompt `p`

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Prompt](../classes/_main_.prompt.md)‹B› |
`e` | [CCV](_main_.md#ccv)‹B› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*

___

###  coerce

▸ **coerce**<**A**>(`v`: [CCV](_main_.md#ccv)‹A›): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:285

returns `v` if is instance of `CC` or `pure(v)` otherwise

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`v` | [CCV](_main_.md#ccv)‹A› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*

___

###  context

▸ **context**(): *[Context](../classes/_main_.context.md)‹›*

Defined in main.ts:54

**Returns:** *[Context](../classes/_main_.context.md)‹›*

___

###  control

▸ **control**<**A**, **B**>(`p`: [Prompt](../classes/_main_.prompt.md)‹B›, `f`: function): *[CCV](_main_.md#ccv)‹A›*

Defined in main.ts:237

caputes and aborts the current continuation until prompt `p` and calls `f`
passing captured continuation as a function to its argument,
deoesn't delimit captured, delimits resultinging continuation

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

▪ **p**: *[Prompt](../classes/_main_.prompt.md)‹B›*

▪ **f**: *function*

▸ (`k`: function): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

▪ **k**: *function*

▸ (`v`: A): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |

**Returns:** *[CCV](_main_.md#ccv)‹A›*

___

###  control0

▸ **control0**<**A**, **B**>(`p`: [Prompt](../classes/_main_.prompt.md)‹B›, `f`: function): *[CCV](_main_.md#ccv)‹A›*

Defined in main.ts:261

caputes and aborts the current continuation until prompt `p` and calls `f`
passing captured continuation as a function to its argument,
doesn't delimit captured and resulting continuations

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

▪ **p**: *[Prompt](../classes/_main_.prompt.md)‹B›*

▪ **f**: *function*

▸ (`k`: function): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

▪ **k**: *function*

▸ (`v`: A): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |

**Returns:** *[CCV](_main_.md#ccv)‹A›*

___

###  newPrompt

▸ **newPrompt**<**A**>(`name`: string): *[Prompt](../classes/_main_.prompt.md)‹A›*

Defined in main.ts:165

Creates a new prompt, distinct from all existing prompts

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`name` | string | "p" |

**Returns:** *[Prompt](../classes/_main_.prompt.md)‹A›*

___

###  pure

▸ **pure**<**A**>(`v`: A): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:158

returns effectful value returning `v`

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*

___

###  pushPrompt

▸ **pushPrompt**<**A**>(`p`: [Prompt](../classes/_main_.prompt.md)‹A›, `cont`: [CCV](_main_.md#ccv)‹A›): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:173

uses prompt in its first operand to delimit the current continuation during
the evaluation of its second operand.

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Prompt](../classes/_main_.prompt.md)‹A› |
`cont` | [CCV](_main_.md#ccv)‹A› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*

___

###  pushSubCont

▸ **pushSubCont**<**A**, **B**>(`subk`: [SubCont](_main_.md#subcont)‹A, B›, `cont`: [CCV](_main_.md#ccv)‹A›): *[CC](../interfaces/_main_.cc.md)‹B›*

Defined in main.ts:181

composes sub-continuation `subk` with current continuation and evaluates
its second argument

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

Name | Type |
------ | ------ |
`subk` | [SubCont](_main_.md#subcont)‹A, B› |
`cont` | [CCV](_main_.md#ccv)‹A› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹B›*

___

###  reflect

▸ **reflect**<**A**>(`v`: [CCV](_main_.md#ccv)‹A›): *[CCV](_main_.md#ccv)‹A›*

Defined in main.ts:197

for single-level mode, can be used for converting effectful value
into pure value

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`v` | [CCV](_main_.md#ccv)‹A› |

**Returns:** *[CCV](_main_.md#ccv)‹A›*

___

###  reify

▸ **reify**<**A**>(`f`: function): *[CC](../interfaces/_main_.cc.md)‹[CCV](_main_.md#ccv)‹A››*

Defined in main.ts:188

for single-level mode, can be used for converting pure value into effectful

**Type parameters:**

▪ **A**

**Parameters:**

▪ **f**: *function*

▸ (): *[CCV](_main_.md#ccv)‹A›*

**Returns:** *[CC](../interfaces/_main_.cc.md)‹[CCV](_main_.md#ccv)‹A››*

___

###  reset

▸ **reset**<**A**>(`e`: function): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:272

creates new prompt, and calls `e` passing this new prompt,
delimiting resulting continuation with it

**Type parameters:**

▪ **A**

**Parameters:**

▪ **e**: *function*

▸ (`p`: [Prompt](../classes/_main_.prompt.md)‹A›): *[CCV](_main_.md#ccv)‹A›*

**Parameters:**

Name | Type |
------ | ------ |
`p` | [Prompt](../classes/_main_.prompt.md)‹A› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*

___

###  run

▸ **run**<**A**>(`c`: [CCV](_main_.md#ccv)‹A›): *A*

Defined in main.ts:204

evaluate all frames till resulting value

**Type parameters:**

▪ **A**

**Parameters:**

Name | Type |
------ | ------ |
`c` | [CCV](_main_.md#ccv)‹A› |

**Returns:** *A*

___

###  shift

▸ **shift**<**A**, **B**>(`p`: [Prompt](../classes/_main_.prompt.md)‹B›, `f`: function): *[CCV](_main_.md#ccv)‹A›*

Defined in main.ts:223

caputes and aborts the current continuation until prompt `p` and calls `f`
passing captured continuation as a function to its argument,
delimits captured and resulting continuations

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

▪ **p**: *[Prompt](../classes/_main_.prompt.md)‹B›*

▪ **f**: *function*

▸ (`k`: function): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

▪ **k**: *function*

▸ (`v`: A): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |

**Returns:** *[CCV](_main_.md#ccv)‹A›*

___

###  shift0

▸ **shift0**<**A**, **B**>(`p`: [Prompt](../classes/_main_.prompt.md)‹B›, `f`: function): *[CCV](_main_.md#ccv)‹A›*

Defined in main.ts:249

caputes and aborts the current continuation until prompt `p` and calls `f`
passing captured continuation as a function to its argument,
delimits captured, doesn't delimit resultinging continuation

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

▪ **p**: *[Prompt](../classes/_main_.prompt.md)‹B›*

▪ **f**: *function*

▸ (`k`: function): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

▪ **k**: *function*

▸ (`v`: A): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`v` | A |

**Returns:** *[CCV](_main_.md#ccv)‹A›*

___

###  splitAt

▸ **splitAt**(`seq`: [Seq](_main_.md#seq)‹any, any›, `p`: [Prompt](../classes/_main_.prompt.md)‹any›): *[Seq](_main_.md#seq)‹any, any›*

Defined in main.ts:66

**Parameters:**

Name | Type |
------ | ------ |
`seq` | [Seq](_main_.md#seq)‹any, any› |
`p` | [Prompt](../classes/_main_.prompt.md)‹any› |

**Returns:** *[Seq](_main_.md#seq)‹any, any›*

___

###  withSubCont

▸ **withSubCont**<**A**, **B**>(`p`: [Prompt](../classes/_main_.prompt.md)‹B›, `f`: function): *[CC](../interfaces/_main_.cc.md)‹A›*

Defined in main.ts:150

Captures a portion of the current continuation back to
but not including the activation of pushPrompt with prompt `p`, aborts the
current continuation back to and including the activation of `pushPrompt`, and
invokes `f`, passing it an abstract value representing the captured subcontinuation.
If more than one activation of pushPrompt with prompt p is still active,
the most recent enclosing activation, i.e., the one that delimits the smallest
subcontinuation, is selected.

**Type parameters:**

▪ **A**

▪ **B**

**Parameters:**

▪ **p**: *[Prompt](../classes/_main_.prompt.md)‹B›*

▪ **f**: *function*

▸ (`sc`: [SubCont](_main_.md#subcont)‹A, B›): *[CCV](_main_.md#ccv)‹B›*

**Parameters:**

Name | Type |
------ | ------ |
`sc` | [SubCont](_main_.md#subcont)‹A, B› |

**Returns:** *[CC](../interfaces/_main_.cc.md)‹A›*
