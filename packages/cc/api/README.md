
#  @effectful/cc

## Index

### Classes

* [Chain](classes/chain.md)
* [Context](classes/context.md)
* [Prompt](classes/prompt.md)
* [Pure](classes/pure.md)
* [PushPrompt](classes/pushprompt.md)
* [PushSubCont](classes/pushsubcont.md)
* [WithSubCont](classes/withsubcont.md)

### Interfaces

* [CC](interfaces/cc.md)
* [SubCont](interfaces/subcont.md)

### Type aliases

* [CCV](#ccv)
* [Frame](#frame)
* [Seq](#seq)
* [Step](#step)

### Variables

* [promptId](#promptid)
* [stepSymbol](#stepsymbol)

### Functions

* [abort](#abort)
* [coerce](#coerce)
* [context](#context)
* [control](#control)
* [control0](#control0)
* [newPrompt](#newprompt)
* [pure](#pure)
* [pushPrompt](#pushprompt)
* [pushSubCont](#pushsubcont)
* [reflect](#reflect)
* [reify](#reify)
* [reset](#reset)
* [run](#run)
* [shift](#shift)
* [shift0](#shift0)
* [splitAt](#splitat)
* [withSubCont](#withsubcont)

---

## Type aliases

<a id="ccv"></a>

###  CCV

**Τ CCV**:  *[CC](interfaces/cc.md)`A`⎮`A`* 

*Defined in main.ts:31*

___

<a id="frame"></a>

###  Frame

**Τ Frame**:  *`object`* 

*Defined in main.ts:60*

#### Type declaration

`Optional`  ctx: [Context](classes/context.md)

`Optional`  prompt: [Prompt](classes/prompt.md)`A`

`Optional`  seg: [Step](#step)`A`, `any`

___

<a id="seq"></a>

###  Seq

**Τ Seq**:  *[Frame](#frame)`any`[]* 

*Defined in main.ts:58*

___

<a id="step"></a>

###  Step

**Τ Step**:  *`function`* 

*Defined in main.ts:33*

#### Type declaration
▸(x: *[Context](classes/context.md)*, a: *`A`*): [CCV](#ccv)`B`

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| x | [Context](classes/context.md)   |  - |
| a | `A`   |  - |

**Returns:** [CCV](#ccv)`B`

___

## Variables

<a id="promptid"></a>

### `<Let>` promptId

**●  promptId**:  *`number`*  = 0

*Defined in main.ts:12*

Monadic framework for delimited continuations
=============================================

import * as CC from "@effectful/cc"

CC.run(function() { // ..... });

___

<a id="stepsymbol"></a>

### `<Const>` stepSymbol

**●  stepSymbol**:  *`unique symbol`*  =  Symbol("Effectful.ccStep")

*Defined in main.ts:24*

___

## Functions

<a id="abort"></a>

###  abort

▸ **abort**A,B(p: *[Prompt](classes/prompt.md)`B`*, e: *[CCV](#ccv)`B`*): [CC](interfaces/cc.md)`A`

*Defined in main.ts:265*

aborts current continution up to the prompt `p`

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`B`   |  - |
| e | [CCV](#ccv)`B`   |  - |

**Returns:** [CC](interfaces/cc.md)`A`

___

<a id="coerce"></a>

###  coerce

▸ **coerce**A(v: *[CCV](#ccv)`A`*): [CC](interfaces/cc.md)`A`

*Defined in main.ts:272*

returns `v` if is instance of `CC` or `pure(v)` otherwise

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| v | [CCV](#ccv)`A`   |  - |

**Returns:** [CC](interfaces/cc.md)`A`

___

<a id="context"></a>

###  context

▸ **context**(): [Context](classes/context.md)

*Defined in main.ts:54*

**Returns:** [Context](classes/context.md)

___

<a id="control"></a>

###  control

▸ **control**A,B(p: *[Prompt](classes/prompt.md)`B`*, f: *`function`*): [CCV](#ccv)`A`

*Defined in main.ts:233*

caputes and aborts the current continuation until prompt `p` and calls `f` passing captured continuation as a function to its argument, deoesn't delimit captured, delimits resultinging continuation

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`B`   |  - |
| f | `function`   |  - |

**Returns:** [CCV](#ccv)`A`

___

<a id="control0"></a>

###  control0

▸ **control0**A,B(p: *[Prompt](classes/prompt.md)`B`*, f: *`function`*): [CCV](#ccv)`A`

*Defined in main.ts:251*

caputes and aborts the current continuation until prompt `p` and calls `f` passing captured continuation as a function to its argument, doesn't delimit captured and resulting continuations

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`B`   |  - |
| f | `function`   |  - |

**Returns:** [CCV](#ccv)`A`

___

<a id="newprompt"></a>

###  newPrompt

▸ **newPrompt**A(name?: *`string`*): [Prompt](classes/prompt.md)`A`

*Defined in main.ts:161*

Creates a new prompt, distinct from all existing prompts

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| name | `string`  | &quot;p&quot; |   - |

**Returns:** [Prompt](classes/prompt.md)`A`

___

<a id="pure"></a>

###  pure

▸ **pure**A(v: *`A`*): [CC](interfaces/cc.md)`A`

*Defined in main.ts:154*

returns effectful value returning `v`

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| v | `A`   |  - |

**Returns:** [CC](interfaces/cc.md)`A`

___

<a id="pushprompt"></a>

###  pushPrompt

▸ **pushPrompt**A(p: *[Prompt](classes/prompt.md)`A`*, cont: *[CCV](#ccv)`A`*): [CC](interfaces/cc.md)`A`

*Defined in main.ts:169*

uses prompt in its first operand to delimit the current continuation during the evaluation of its second operand.

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`A`   |  - |
| cont | [CCV](#ccv)`A`   |  - |

**Returns:** [CC](interfaces/cc.md)`A`

___

<a id="pushsubcont"></a>

###  pushSubCont

▸ **pushSubCont**A,B(subk: *[SubCont](interfaces/subcont.md)`A`, `B`*, cont: *[CCV](#ccv)`A`*): [CC](interfaces/cc.md)`B`

*Defined in main.ts:177*

composes sub-continuation `subk` with current continuation and evaluates its second argument

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| subk | [SubCont](interfaces/subcont.md)`A`, `B`   |  - |
| cont | [CCV](#ccv)`A`   |  - |

**Returns:** [CC](interfaces/cc.md)`B`

___

<a id="reflect"></a>

###  reflect

▸ **reflect**A(v: *[CCV](#ccv)`A`*): [CCV](#ccv)`A`

*Defined in main.ts:193*

for single-level mode, can be used for converting effectful value into pure value

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| v | [CCV](#ccv)`A`   |  - |

**Returns:** [CCV](#ccv)`A`

___

<a id="reify"></a>

###  reify

▸ **reify**A(f: *`function`*): [CC](interfaces/cc.md)[CCV](#ccv)`A`

*Defined in main.ts:184*

for single-level mode, can be used for converting pure value into effectful

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| f | `function`   |  - |

**Returns:** [CC](interfaces/cc.md)[CCV](#ccv)`A`

___

<a id="reset"></a>

###  reset

▸ **reset**A(e: *`function`*): [CC](interfaces/cc.md)`A`

*Defined in main.ts:259*

creates new prompt, and calls `e` passing this new prompt, delimiting resulting continuation with it

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| e | `function`   |  - |

**Returns:** [CC](interfaces/cc.md)`A`

___

<a id="run"></a>

###  run

▸ **run**A(c: *[CCV](#ccv)`A`*): `A`

*Defined in main.ts:200*

evaluate all frames till resulting value

**Type parameters:**

#### A 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| c | [CCV](#ccv)`A`   |  - |

**Returns:** `A`

___

<a id="shift"></a>

###  shift

▸ **shift**A,B(p: *[Prompt](classes/prompt.md)`B`*, f: *`function`*): [CCV](#ccv)`A`

*Defined in main.ts:221*

caputes and aborts the current continuation until prompt `p` and calls `f` passing captured continuation as a function to its argument, delimits captured and resulting continuations

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`B`   |  - |
| f | `function`   |  - |

**Returns:** [CCV](#ccv)`A`

___

<a id="shift0"></a>

###  shift0

▸ **shift0**A,B(p: *[Prompt](classes/prompt.md)`B`*, f: *`function`*): [CCV](#ccv)`A`

*Defined in main.ts:242*

caputes and aborts the current continuation until prompt `p` and calls `f` passing captured continuation as a function to its argument, delimits captured, doesn't delimit resultinging continuation

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`B`   |  - |
| f | `function`   |  - |

**Returns:** [CCV](#ccv)`A`

___

<a id="splitat"></a>

###  splitAt

▸ **splitAt**(seq: *[Seq](#seq)`any`, `any`*, p: *[Prompt](classes/prompt.md)`any`*): [Seq](#seq)`any`, `any`

*Defined in main.ts:66*

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| seq | [Seq](#seq)`any`, `any`   |  - |
| p | [Prompt](classes/prompt.md)`any`   |  - |

**Returns:** [Seq](#seq)`any`, `any`

___

<a id="withsubcont"></a>

###  withSubCont

▸ **withSubCont**A,B(p: *[Prompt](classes/prompt.md)`B`*, f: *`function`*): [CC](interfaces/cc.md)`A`

*Defined in main.ts:149*

Captures a portion of the current continuation back to but not including the activation of pushPrompt with prompt `p`, aborts the current continuation back to and including the activation of `pushPrompt`, and invokes `f`, passing it an abstract value representing the captured subcontinuation. If more than one activation of pushPrompt with prompt p is still active, the most recent enclosing activation, i.e., the one that delimits the smallest subcontinuation, is selected.

**Type parameters:**

#### A 
#### B 
**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| p | [Prompt](classes/prompt.md)`B`   |  - |
| f | `function`   |  - |

**Returns:** [CC](interfaces/cc.md)`A`

___

