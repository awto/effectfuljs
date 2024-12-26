## :toolbox: Functions

- [newPrompt](#gear-newprompt)
- [pushPrompt](#gear-pushprompt)
- [pushSubCont](#gear-pushsubcont)
- [withSubCont](#gear-withsubcont)
- [shift](#gear-shift)
- [control](#gear-control)
- [shift0](#gear-shift0)
- [control0](#gear-control0)
- [reset](#gear-reset)
- [abort](#gear-abort)
- [pipe](#gear-pipe)
- [chain](#gear-chain)

### :gear: newPrompt

Creates a new prompt, distinct from all existing prompts

| Function | Type |
| ---------- | ---------- |
| `newPrompt` | `<A>(name?: string) => Prompt<A>` |

### :gear: pushPrompt

uses prompt in its first operand to delimit the current continuation during
the evaluation of its second operand.

| Function | Type |
| ---------- | ---------- |
| `pushPrompt` | `<A>(_prompt: Prompt<A>, body: () => A) => A` |

### :gear: pushSubCont

composes sub-continuation `subk` with current continuation and evaluates
its second argument `body`

| Function | Type |
| ---------- | ---------- |
| `pushSubCont` | `<A, B>(subk: SubCont<A, B>, body: () => A) => B` |

### :gear: withSubCont

Captures a portion of the current continuation back to
but not including the activation of pushPrompt with prompt `prompt`, aborts the
current continuation back to and including the activation of `pushPrompt`, and
invokes `body`, passing it an abstract value representing the captured subcontinuation.
If more than one activation of pushPrompt with prompt `prompt` is still active,
the most recent enclosing activation, i.e., the one that delimits the smallest
subcontinuation, is selected.

| Function | Type |
| ---------- | ---------- |
| `withSubCont` | `<A, B>(prompt: Prompt<B>, body: (seg: SubCont<A, B>) => B) => A` |

### :gear: shift

caputes and aborts the current continuation until prompt `p` and calls `f`
passing captured continuation as a function to its argument,
delimits captured and resulting continuations

| Function | Type |
| ---------- | ---------- |
| `shift` | `<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B) => A` |

### :gear: control

caputes and aborts the current continuation until prompt `p` and calls `f`
passing captured continuation as a function to its argument,
deoesn't delimit captured, delimits resultinging continuation

| Function | Type |
| ---------- | ---------- |
| `control` | `<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B) => A` |

### :gear: shift0

caputes and aborts the current continuation until prompt `prompt` and calls `body`
passing captured continuation as a function to its argument,
delimits captured, doesn't delimit resultinging continuation

| Function | Type |
| ---------- | ---------- |
| `shift0` | `<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B) => A` |

### :gear: control0

caputes and aborts the current continuation until prompt `prompt` and calls `body`
passing captured continuation as a function to its argument,
doesn't delimit captured and resulting continuations

| Function | Type |
| ---------- | ---------- |
| `control0` | `<A, B>(prompt: Prompt<B>, body: (k: (v: () => A) => B) => B) => A` |

### :gear: reset

Creates a new prompt and calls the `body` function, passing this new prompt as an argument.
The resulting continuation is delimited by the new prompt.

| Function | Type |
| ---------- | ---------- |
| `reset` | `<A>(body: (prompt: Prompt<A>) => A) => A` |

### :gear: abort

Aborts the current continuation up to the specified prompt `prompt`.

| Function | Type |
| ---------- | ---------- |
| `abort` | `<B, A = any>(prompt: Prompt<B>, result: B) => A` |

Parameters:

* `prompt`: - The prompt up to which the continuation is aborted.
* `result`: - The value to return after aborting the continuation.


### :gear: pipe

Composes a series of functions into a single function.

| Function | Type |
| ---------- | ---------- |
| `pipe` | `(...funs: ((a: any) => any)[]) => (arg: any) => any` |

Parameters:

* `funs`: - A list of functions to compose.


### :gear: chain

Applies a series of functions to a value in sequence.

| Function | Type |
| ---------- | ---------- |
| `chain` | `(val: any, ...funs: ((a: any) => any)[]) => any` |

Parameters:

* `val`: - The initial value.
* `funs`: - A list of functions to apply to the value.



## :factory: Prompt

## :factory: SubCont
