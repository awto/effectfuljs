import * as R from "@effectful/es-persist-serialization"
import {buildMenu,menuButton} from "./menu"
import {pipe} from "./kit"

function menuDispatch() {}

R.regOpaqueObject(menuDispatch)

test("menu", async () => {
  expect.assertions(4)
  for await(const i of pipe(menuButton(2, {type:"Menu2"}),
                            menuButton(1, {type:"Menu1"}),
                            menuButton(3, {type:"Menu3"}),
                            buildMenu)([{type:"FLUSH"}],menuDispatch)) {
    expect(R.write(i)).toMatchSnapshot()
  }
})

