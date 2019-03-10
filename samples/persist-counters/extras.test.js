import * as R from "@effectful/es-persist-serialization";

import { incrementAsync, incrementIfOdd } from "./extras";

function extrasDispatch() {}
R.regOpaqueObject(extrasDispatch);

test("incrementIfOdd", async () => {
  expect.assertions(2);
  for await (const i of incrementIfOdd(
    [{ type: "VALUE", value: 1 }, { type: "VALUE", value: 2 }],
    extrasDispatch
  )) {
    if (i.type === "MENU_ITEM") expect(R.write(i)).toMatchSnapshot();
  }
});

test("incrementAsync", async () => {
  expect.assertions(1);
  for await (const i of incrementAsync([], extrasDispatch)) {
    if (i.type === "MENU_ITEM") expect(R.write(i)).toMatchSnapshot();
  }
});
