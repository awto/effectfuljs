import * as R from "@effectful/es-persist-serialization"
import undoRedo from "./undoredo"


test("undoRedo", () => {
  let cb, ce
  const exit = { resume() { cb() }, reject(e) { ce(e) } }
  R.regOpaqueObject(exit);
  async function* value(input) {
    let cnt = 0
    for await(const i of input) {
      if (i.type === "INCREMENT")
        cnt++
      else if (i.type === "FLUSH")
        yield {type:"VALUE",value:cnt}
      yield i
    }
  }
  R.regOpaqueObject(value)
  const producer = R.producer()
  R.regOpaqueObject(producer,"producer")
  let deb_num = 0
  for(const type of ["INCREMENT","INCREMENT","INCREMENT",
                     "UNDO","UNDO","REDO","REDO",
                     "UNDO","INCREMENT","UNDO"
                    ]) {
    producer.send({type,x:deb_num++})
    producer.send({type:"FLUSH",x:deb_num++})
  }
  producer.stop();
  (async function main()  {
    if (!await R.managed)
      return
    for await(const i of value(undoRedo(producer))) {
      if (i.type === "VALUE" || i.type === "MENU_ITEM")
        expect(R.write(i)).toMatchSnapshot()
    }
  })()[R.awaitSymbol](exit)
  return new Promise((r, e) => (cb = r, ce = e))

})

