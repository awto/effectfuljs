import * as R from "@effectful/es-persist-serialization"
import saveLocal from "./storage"

const getItem = jest.fn()
const setItem = jest.fn()

global.localStorage = { getItem, setItem }

test("saveLocal", () => {
  let cb, ce
  const exit = { resume() { cb() }, reject(e) { cb(e) }  }
  async function* data() {
    yield {type:"FLUSH"}
  }
  R.regOpaqueObject(exit,"saveLocalExit");
  R.regOpaqueObject(data,"saveLocalIter");
  (async () => {
    if (!await R.managed)
      return
    expect.assertions(3)
    for await(const i of saveLocal(data()))
      expect(R.write(i)).toMatchSnapshot()
    expect(getItem).toHaveBeenLastCalledWith("counters")
    expect(setItem.mock.calls).toMatchSnapshot()
  })()[R.awaitSymbol](exit)
  return new Promise((r,e) => (cb = r, ce = e))
})

