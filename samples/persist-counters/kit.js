/**
 * @file A few common bits and pieces
 */
import * as R from "@effectful/es-persist-serialization";
import "@effectful/serialization-react";
import ReactDOM from "react-dom/client";

/**
 * @typedef Message
 * @property {string} type
 * @property {?value} any - message's body
 * @property {?number} index - for some message a relative position of its value
 * @property {?number} key - for some messages defines thread id
 */
/**
 * @callback Dispatch
 * @param {Message} message
 */
/**
 * @typedef {AsyncIterable.<Message>} Producer - source of messages
 * @property {Dispatch} dispatch - a function to send the messages
 */
/**
 * @callback Transducer
 * @param {AsyncIterable.<Message>} input - input stream
 * @param {Dispatch} dispatch   - back link
 * @returns {AsyncIterable.<Message>}     - output stream
 */

/**
 * Collects all message's `value` field with `type` from `keys` into
 * an object with field names/values are the `type`/`value` fields of
 * input actions
 *
 * @param {string[]|object} keys - types to collect
 */
export function collect(keys) {
  return async function* collect(input) {
    const keySet = new Set(Object.values(keys));
    const value = {};
    for await (const i of input) {
      if (keySet.has(i.type)) value[i.type] = i.value;
      if (i.type === "FLUSH") yield { type: "COLLECTION", value };
      yield i;
    }
  };
}

/**
 * Applies `fun` to each incoming message and outputs its invocation result.
 *
 * @param {function} fun
 * @returns {Transducer}
 */
export function map(fun) {
  return async function* map(input, dispatch) {
    for await (const i of input) yield fun(i, dispatch);
  };
}

/**
 * Composes a few transducers into a single one using a plain function's composition.
 *
 * @param {...Transducer} args
 * @returns {Transducer}
 */
export function pipe(...args) {
  return function(input, dispatch) {
    for (const f of args) input = f(input, dispatch);
    return input;
  };
}

function resend(action) {
  return this.send(action);
}

R.regOpaqueObject(resend);

/**
 * Creates a producer, an `AsyncIterable` with `dispatch` field to send messages
 *
 * @returns {Producer}
 */
export function createProducer() {
  const producer = R.producer();
  producer.dispatch = R.bind(resend, producer);
  return producer;
}

/**
 * The main loop for the transducers passed as input.
 * It just reads all values from `main` output until it's done
 *
 * @param {Transducer} main
 */
export async function run(main) {
  R.regOpaqueObject(main);
  try {
    const producer = createProducer();
    for await (const i of main(producer, producer.dispatch)) {
    }
  } catch (e) {
    console.error(e);
  }
}

function _signal(dispatch, type, value) {
  return dispatch({ type, ...value });
}

R.regOpaqueObject(_signal);

/**
 * Helper function for binding message dispatching into components event handlers
 *
 * @param {Dispatch} dispatch
 * @param {string} type
 * @param {any} value
 */
export function signal(dispatch, type, value) {
  return R.bind(_signal, null, dispatch, type, value);
}

/**
 * Sends `{type:"FLUSH"}` message in the beginning and after each new input message
 *
 * @type {Transducer}
 */
export async function* flushing(input) {
  yield { type: "FLUSH" };
  for await (const i of input) {
    yield i;
    yield { type: "FLUSH" };
  }
}

/**
 * A final stage, it invokes `ReactDOM.render` with last "CONTROL"
 * value element on each "FLUSH" messages
 *
 * @type {Transducer}
 */
export const render = el =>
  async function* render(input) {
    let control;
    const root = ReactDOM.createRoot(el);
    R.regOpaqueObject(el, "rootElement", { props: false, propsSnapshot: false });
    R.regOpaqueObject(root, "reactRoot", { props: false, propsSnapshot: false });
    for await (const i of input) {
      if (i.type === "CONTROL") control = i.value;
      else if (i.type === "FLUSH" && control) {
        root.render(control);
        control = null;
      }
      yield i;
    }
  };
