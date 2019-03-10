import * as R from "@effectful/es-persist-serialization";
import React from "react";
import * as Counter from "./counter";
import renderer from "react-test-renderer";

async function snapshots(input) {
  for await (const i of input) expect(R.write(i)).toMatchSnapshot();
}

const controlMenuSample = [
  { type: "MENU", value: <span>Menu</span> },
  { type: "VALUE", value: 10 },
  { type: "CONTROL", value: <span>Control</span> },
  { type: "FLUSH" },
  { type: "VALUE", value: 11 },
  { type: "FLUSH" }
];

test("counterState", async () => {
  expect.assertions(6);
  const s = R.producer();
  const iter = Counter.state(s);
  s.send({ type: "INCREMENT" });
  s.send({ type: "INCREMENT" });
  s.send({ type: "DUMMY" });
  s.send({ type: "DECREMENT" });
  s.stop();
  expect(await iter.next()).toEqual({
    done: false,
    value: { type: "VALUE", value: 0 }
  });
  expect(await iter.next()).toEqual({
    done: false,
    value: { type: "VALUE", value: 1 }
  });
  expect(await iter.next()).toEqual({
    done: false,
    value: { type: "VALUE", value: 2 }
  });
  expect(await iter.next()).toEqual({ done: false, value: { type: "DUMMY" } });
  expect(await iter.next()).toEqual({
    done: false,
    value: { type: "VALUE", value: 1 }
  });
  expect(await iter.next()).toEqual({ done: true, value: void 0 });
});

test("counterControl", async () => {
  expect.assertions(3);
  for await (const i of Counter.mainControl(controlMenuSample))
    if (i.type === "CONTROL")
      expect(renderer.create(i.value).toJSON()).toMatchSnapshot();
});

test("prepControl", async () => {
  expect.assertions(8);
  await snapshots(Counter.prepControl(controlMenuSample));
});

const itemsSample = [
  {
    type: "ITEM",
    key: 10,
    value: { type: "CONTROL", value: <span>Item 1</span> }
  },
  { type: "ITEM", key: 10, value: { type: "VALUE", value: 1 } },
  {
    type: "ITEM",
    key: 100,
    value: { type: "CONTROL", value: <span>Item 2</span> }
  },
  { type: "ITEM", key: 100, value: { type: "VALUE", value: 10 } },
  {
    type: "ITEM",
    key: 1,
    value: { type: "CONTROL", value: <span>Item 3</span> }
  },
  { type: "ITEM", key: 1, value: { type: "VALUE", value: 100 } },
  { type: "ITEM", key: 100, value: { type: "DELETE" } }
];

test("controlsList", async () => {
  expect.assertions(4);
  for await (const i of Counter.controlsList(itemsSample))
    if (i.type === "CONTROL")
      expect(renderer.create(i.value).toJSON()).toMatchSnapshot();
});

test("totals", async () => {
  expect.assertions(4);
  for await (const i of Counter.totals(itemsSample))
    if (i.type === "MENU_ITEM")
      expect(renderer.create(i.value).toJSON()).toMatchSnapshot();
});
