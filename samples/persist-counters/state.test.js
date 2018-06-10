import * as R from "@effectful/es-persist-serialization"
import * as Persist from "./state"

test("persist", () => {
  let cb, ce
  const exit = { resume() { cb() }, reject(e) { ce(e) } }
  R.regOpaqueObject(exit,"persistExit");
  (async () => {
    if (!await R.managed)
      return
    expect.assertions(2)
    let i = "hi"
    const s = await Persist.save()
    expect(s).toMatchSnapshot()
    if (s && s.resume)
      await Persist.load(s, "there")
    i += ", there"
  })()[R.awaitSymbol](exit)
  return new Promise((r, e) => (cb = r, ce = e))
})


