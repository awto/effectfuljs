/** 
 * @file control's threads management 
 */
import * as R from "@effectful/es-persist-serialization"
import {pipe, createProducer} from "./kit"

/** 
 * Runs `transducer` in separate threads.
 * 
 * Each thread is created on "NEW" message, and deleted after the
 * corresponding AsyncIterator is done or "DELETE" message is
 * received.
 * 
 * When creating the tread `input` and `dispatch` parameters passed to
 * `transducer` are modified.
 *
 * The children `dispatch` argument and their output streams values
 * are wrapped using messages with "ITEM" type. They are similar to
 * networking protocol envelopes.
 * 
 * The envelope has `key` property to specifying current thread id.
 * And the original message as `value` field value.
 *
 * On receiving a message with "ITEM" type its `value` field is
 * dispatched by `key` field value into a corresponding thread `input`
 * stream.
 *
 * If `FLUSH` message is received it is sent to all thread and
 * incoming messages receiving is suspended until all the threads
 * output `FLUSH` messages back.
 * 
 * @param {Transducer} transducer
 * @returns {Transducer}
 */
export default function fork(transducer) {
  transducer = pipe(transducer, handleDelete)
  R.regOpaqueObject(transducer)
  return async function* fork(input, dispatch) {
    let cur = 0
    const threads = new Map()
    const iter = forkMain(input, dispatch, threads, transducer)
    const main = {iter,task:iter.next()}
    const suspended = []
    try {
      for(;;) {
        const i = await R.any([main,...threads.values()].map(forkCont))
        if (i.done) {
          if (i === main)
            return i.value
          threads.delete(i.key)
          i.source.stop()
          await i.iter.return()
          continue
        }
        i.task = i.iter.next()
        if (!i.value)
          continue
        if (i === main) {
          yield i.value
        } else {
          if (i.value.type === "FLUSH") {
            if (i.value.awaiting) {
              i.value.awaiting.delete(i.key)
              if (i.value.awaiting.size)
                continue
            }
            yield {type:"FLUSH"}
          } else
            yield {type:"ITEM",value:i.value,key:i.key}
        }
      }
    } finally {
      for (const i of threads.values())
        i.source.stop();
      await R.all([...threads.values()].map(i => i.iter.return()))
    }
  }
}

function forkDispatch(dispatch, key, value) {
  return dispatch({type:"ITEM",key,value})
}

R.regOpaqueObject(forkDispatch)

async function* forkMain(input, dispatch, threads, transducer) {
  let cur = 0
  for await(const i of input) {
    if (i.type === "ITEM") {
      const thread = threads.get(i.key)
      thread.source.dispatch(i.value)
    } else if (i.type === "NEW") {
      const source = createProducer()
      const key =  i.key || ++cur
      const iter = transducer(source,R.bind(forkDispatch,null,dispatch,key))
        [Symbol.asyncIterator]()
      const thread = {iter,key,task:iter.next(),source}
      threads.set(key, thread)
      yield false
    } else if (i.type === "FLUSH" && threads.size) {
      const awaiting = new Set()
      for(const {source,key} of threads.values()) {
        awaiting.add(key)
        source.dispatch({...i,awaiting})
      }
    } else {
      yield i
    }
  }
}

class ForkCont {
  constructor(thread, cont) {
    this.thread = thread
    this.cont = cont
  }
  resume({done,value}) {
    const {thread} = this
    thread.value = value
    thread.done = done
    this.cont.resume(thread)
  }
  reject(e) {
    this.cont.reject(e)
  }
}

function forkCont(i) {
  const res = R.lock()
  i.task[R.awaitSymbol](new ForkCont(i,res))
  return res
}

R.regConstructor(ForkCont)

async function* handleDelete(input) {
  for await(const i of input) {
    yield i
    if (i.type === "DELETE") {
      for await(const i of input) {
        if (i.type === "FLUSH") {
          yield i
          return
        }
      }
    }
  }
}

