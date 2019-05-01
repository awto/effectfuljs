# @effectful/react-do

This is a demo project showing how to make a transpiler for custom effects.


## Usage

Install it with:

```
$ npm install --save-dev @effectful/core
$ npm install --save @effectful/react-do
```

### As a babel-plugin

Use "@effectful/react-do/transform" as a babel plugin.

For example using command line:

```
$ babel --plugins @effectful/react-do/transform index.js
```

Or in `.babelrc`:

```
{
  "plugins": [@effectful/react-do/transform]
}
```

### As a macro

Zero-configuration using
[babel-plugin-macros](https://github.com/kentcdodds/babel-plugin-macros),
or any other tool where it is enabled by default (for example 
[Create Reat App](https://github.com/facebook/create-react-app)).

```javascript

import "@effectful/cc/async-do.macro"

```

## Directives

Calling a function with names starting with "use" is considered
effectful. Functions are transpiled only if their name starts with
"use" or they have "component" or "effectful" block directives - just
a string at the beginning of the function.

There are also "par" and "seq" block-level directives to switch
between applicative and monadic targets. With "par" mode enabled the
compiler analyzes variable dependencies and injects join instead of
`chain` if possible.

The block directives can be replaced by a call of `profile` function
exported by "@effectful/react-do" with a string argument
"par"/"seq". This way we can avoid ESLint complaining about useless
expressions.

## Example

```javascript
import React from "react";
import ReactDOM from "react-dom";
import "@effectful/react-do/macro";
import { useState, usePromise, Suspense } from "@effectful/react-do";

function useCounter(initial = 0) {
  const [value, setter] = useState(initial);
  return [value, () => setter(value + 1)];
}

function Counter() {
  "component";
  "par";
  const [value1, incr1] = useCounter();
  const [value2, incr2] = useCounter();
  return (
    <>
      <h3>Value 1: {value1}</h3>
      <button onClick={incr1}>+</button>
      <h3>Value 2: {value2}</h3>
      <button onClick={incr2}>+</button>
    </>
  );
}

function DelayedCounter() {
  "component";
  usePromise(new Promise(rs => setTimeout(rs, 10000)));
  const [value, incr] = useCounter();
  return (
    <>
      <h3>Value Delayed: {value}</h3>
      <button onClick={incr}>+</button>
    </>
  );
}

function App() {
  "component";
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Suspense fallback={<div>Loading...</div>} maxDuration={5000}>
          <DelayedCounter />
        </Suspense>
      </header>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```

### JSX

Effectful expressions in JSX curly braces are passed as effectful to
their parent component. But only the top expression within {}, its
children are chained. This way we can invoke effects in parent
components.  There is a function `use`, it does nothing and it is
there only to show the compiler where to apply `chain`.

For effectful component children are passed as `effChildren` property
and it is an effectful value resolving to an array of children. They
don't receive `children` property.

Here is how
[ErrorBoundary](https://reactjs.org/docs/error-boundaries.html) can be
implemented:

```javascript
export function ErrorBoundary({effChildren}) {
  "component"
  try {
    return Do.use(effChildren)
  } catch(error) {
    return <b>Error: {error.message}</b>
  }
}
```


## Sources

  * [transform.js](transform.js) - transpiler's configuration
  * [main.js](main.js) - runtime implementation


