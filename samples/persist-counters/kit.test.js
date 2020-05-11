import * as R from "@effectful/es-persist-serialization";
import * as Kit from "./kit";
import ReactDOM from "react-dom";

async function* testData() {
  yield { type: "FOO", value: "f1" };
  yield { type: "BAR", value: "f1" };
  yield { type: "FOO", value: "f2" };
  yield { type: "BAR", value: "f1" };
  yield { type: "FLUSH" };
  yield { type: "BAR", value: "f1" };
  yield { type: "FLUSH" };
}

const appendValue = (type, str) =>
  async function*(input) {
    for await (const i of input)
      yield i.type === type ? { ...i, value: `${i.value}-${str}` } : i;
  };

test("pipe", async () => {
  expect.assertions(8);
  const dispatch = {};
  async function* copy(input, disp) {
    expect(disp).toBe(dispatch);
    yield* input;
  }
  for await (const i of Kit.pipe(
    copy,
    appendValue("FOO", "-s-foo"),
    appendValue("BAR", "-s-bar")
  )(testData(), dispatch))
    expect(R.write(i)).toMatchSnapshot();
});

test("map", async () => {
  expect.assertions(14);
  const dispatch = {};
  function fun(i, disp) {
    expect(disp).toBe(dispatch);
    if (i.type === "BAR") return { type: "BAZ", value: i };
    return i;
  }
  for await (const i of Kit.map(fun)(testData(), dispatch))
    expect(R.write(i)).toMatchSnapshot();
});

test("collect", async () => {
  expect.assertions(2);
  for await (const i of Kit.collect(["FOO", "BAR"])(testData()))
    if (i.type === "COLLECTION") expect(R.write(i.value)).toMatchSnapshot();
});

test("createProducer", async () => {
  expect.assertions(2);
  const producer = Kit.createProducer();
  const data = {};
  producer.dispatch.call(void 0, data);
  const i = await producer.next();
  expect(i.done).toBeFalsy();
  expect(i.value).toBe(data);
});

test("run", async () => {
  expect.assertions(1);
  await Kit.run(async function*(input, dispatch) {
    const data = {};
    dispatch(data);
    for await (const i of input) {
      expect(i).toBe(data);
      return;
    }
  });
});

test("flushing", async () => {
  expect.assertions(5);
  for await (const i of Kit.flushing([{ type: "FOO" }, { type: "BAR" }]))
    expect(R.write(i)).toMatchSnapshot();
});

jest.mock("react-dom");

test("render", async () => {
  expect.assertions(3);
  const el = { $t: "el" };
  for await (const i of Kit.render(el)([
    { type: "CONTROL", value: "c1" },
    { type: "CONTROL", value: "c2" },
    { type: "FLUSH" },
    { type: "CONTROL", value: "c3" },
    { type: "FLUSH" },
    { type: "CONTROL", value: "c4" }
  ])) {
  }
  expect(ReactDOM.render).toHaveBeenCalledTimes(2);
  expect(ReactDOM.render).toHaveBeenNthCalledWith(1, "c2", el);
  expect(ReactDOM.render).toHaveBeenNthCalledWith(2, "c3", el);
});
