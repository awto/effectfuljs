import fork from "./fork"
import * as Kit from "./kit"
import * as R from "@effectful/es-persist-serialization"

test("fork", async function() {
  expect.assertions(9)
  const main = Kit.createProducer()
  let cnt = 0
  async function* thread(input, dispatch) {
    const value = {}
    const id = cnt++
    try {
      for await(const i of input) {
        if (i.type === "FLUSH") {
          dispatch({type:"FOO",value})
          main.dispatch({type:"FLUSH"})
          yield {type:"BAR"}
          if (id)
            yield {type:"BAR2"}
          yield i
        } else if (i.type === "FOO") {
          expect(i.value).toBe(value)
          yield {type:"DELETE"}
          main.dispatch({type:"FLUSH"})
        }
      }
    } finally {
      cnt--
      main.dispatch({type:"EXIT"})
    }
  }
  main.dispatch({type:"NEW"})
  main.dispatch({type:"NEW"})
  main.dispatch({type:"FLUSH"})
  for await(const i of fork(thread)(main,main.dispatch)) {
    if (i.type === "ITEM")
      expect(R.write(i)).toMatchSnapshot()
    if (cnt === 0)
      return
  }
})

