import * as R from "@effectful/es-persist-serialization"
import * as Kit from "./kit"
import ReactDOM from "react-dom"

async function* testData() {
  yield {type:"FOO", value:"f1"}
  yield {type:"BAR", value:"f1"}
  yield {type:"FOO", value:"f2"}
  yield {type:"BAR", value:"f1"}
  yield {type:"FLUSH"}
  yield {type:"BAR", value:"f1"}
  yield {type:"FLUSH"}
}

const appendValue = (type,str) => async function*(input) {
  for await(const i of input)
    yield i.type === type ? {...i, value: `${i.value}-${str}`} : i
}

test("pipe", async () => {
  expect.assertions(8)
  const dispatch = {}
  async function* check(input, disp) {
    expect(disp).toBe(dispatch)
    for await(const i of input) {
      yield i
      break
    }
    // can be shared
    yield* input
  }
  for await(const i of Kit.pipe(check,
                                appendValue("FOO","-s-foo"),
                                appendValue("BAR","-s-bar"))
            (testData(), dispatch)) {
    expect(R.write(i)).toMatchSnapshot()
  }
})

test("createProducer", async () => {
  expect.assertions(11)
  const {producer,event} = Kit.createProducer()
  const data = {}
  const f = {}, r = {}, x = {}, y = {}
  const e1 = {
    stopPropagation:jest.fn(),
    preventDefault:jest.fn(),
    clientX: x,
    clientY: y,
    target: {
      getBoundingClientRect: () => r
    }
  }
  event({f})(e1)
  const i = await producer.next()
  expect(i.done).toBeFalsy()
  expect(i.value.f).toBe(f)
  expect(i.value.x).toBe(x)
  expect(i.value.y).toBe(y)
  expect(i.value.rect).toBe(r)
  expect(e1.stopPropagation).toBeCalled()
  expect(e1.preventDefault).toBeCalled()
  const e2 = {
    stopPropagation:jest.fn(),
    preventDefault:jest.fn()
  }
  event({f},true)(e2)
  const j = await producer.next()
  expect(i.done).toBeFalsy()
  expect(i.value.f).toBe(f)
  expect(e2.stopPropagation).not.toBeCalled()
  expect(e2.preventDefault).not.toBeCalled()
})


test("anim", async () => {
  let time = 0
  global.performance = {now:() => time}
  global.requestAnimationFrame = cb => cb(time += 200)
  expect.assertions(1)
  performance.time = 0
  const res = []
  for await(const i of Kit.anim({easing:v => `E_${v}`, delay:1000}))
    res.push(i)
  expect(res).toEqual(["E_0","E_0.2","E_0.4","E_0.6","E_0.8","E_1"])
})

test("render", async () => {
  expect.assertions(4)
  const el = {$t:"el"}
  for await(const i of Kit.render(el)([
    {type:"ROOT",value:"c1"},
    {type:"ROOT",value:"c2"}
  ])) {}
  expect(el[R.descriptorSymbol]).toBeDefined()
  expect(ReactDOM.render).toHaveBeenCalledTimes(2)
  expect(ReactDOM.render).toHaveBeenNthCalledWith(1,"c2",el)
  expect(ReactDOM.render).toHaveBeenNthCalledWith(2,"c3",el)
})
