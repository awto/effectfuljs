import * as R from "@effectful/es-persist-serialization"
import "@effectful/serialization-react"

function eventHandler(props, propagate, e) {
  if (!propagate) {
    e.stopPropagation()
    e.preventDefault()
  }
  this.send({...props,
             x:e.clientX,
             y:e.clientY,
             button:e.button,
             rect:e.target && e.target.getBoundingClientRect()})
}

R.regOpaqueObject(eventHandler)

function event(props, propagate) {
  return R.bind(eventHandler, this, props, propagate)
}

R.regOpaqueObject(event)

export function createProducer() {
  const producer = R.producer()
  return {producer,event:R.bind(event,producer)}
}

export function share(iterable) {
  const iterator = iterable[Symbol.asyncIterator]
        ? iterable[Symbol.asyncIterator]()
        : iterable[Symbol.iterator]()
  return {
    next() { return iterator.next() },
    [Symbol.asyncIterator]() { return this }
  }
}

export const pipe = (...args) => (input, dispatch) =>
  args.reduce((interm, step) => step(share(interm), dispatch), input)

export function run(...args) {
  const {producer,event} = createProducer()
  const main = pipe(...args)
  R.regOpaqueObject(main)
  return main(producer,event)
}

export async function* anim({delay = 400, easing = v => v}) {
  const start = performance.now()
  const stop = start + delay
  const step = 1 / delay
  yield easing(0)
  for(let cur;
    (cur = await new Promise(requestAnimationFrame)) < stop;)
    yield easing(step * (cur - start))
  yield easing(1)
}

