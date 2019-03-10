import * as R from "@effectful/es-persist-serialization";
import "@effectful/serialization-react";
import ReactDOM from "react-dom";

function eventHandler(props, propagate, e) {
  if (!propagate) {
    e.stopPropagation();
    e.preventDefault();
  }
  this.send({
    ...props,
    x: e.clientX,
    y: e.clientY,
    button: e.button,
    rect: e.target && e.target.getBoundingClientRect()
  });
}

R.regOpaqueObject(eventHandler);

function event(props, propagate) {
  return R.bind(eventHandler, this, props, propagate);
}

R.regOpaqueObject(event);

export function createProducer() {
  const producer = R.producer();
  return { producer, event: R.bind(event, producer) };
}

class Share {
  constructor(iterable) {
    this.iterator = iterable[Symbol.asyncIterator]
      ? iterable[Symbol.asyncIterator]()
      : iterable[Symbol.iterator]();
  }
  next() {
    return this.iterator.next();
  }
  [Symbol.asyncIterator]() {
    return this;
  }
}

R.regConstructor(Share);
if (typeof DOMRect !== "undefined") R.regConstructor(DOMRect);

export function share(iterable) {
  return new Share(iterable);
}

export const pipe = (...args) => (input, dispatch) =>
  args.reduce((interm, step) => step(share(interm), dispatch), input);

export function run(...args) {
  const { producer, event } = createProducer();
  const main = pipe(...args);
  R.regOpaqueObject(main);
  return main(producer, event);
}

function id(v) {
  return v;
}
R.regOpaqueObject(id);

export async function* anim({ delay = 400, easing = id }) {
  const start = performance.now();
  const stop = start + delay;
  const step = 1 / delay;
  yield easing(0);
  for (let cur; (cur = await new Promise(requestAnimationFrame)) < stop; )
    yield easing(step * (cur - start));
  yield easing(1);
}

export const render = el =>
  async function render(input) {
    for await (const i of input) {
      if (i.type === "ROOT") ReactDOM.render(i.value, el);
    }
  };
