"no-ctrl";
import { step } from "./engine";
import { Frame as DFrame, context, native, ctrlToken, token } from "./state";

export interface Frame<T=unknown> extends DFrame {
  result?: T
}

export { context }

/**
 * Makes `from` the new call stack's top and evaluates `body`
 * 
 * @param till - the new call stack's top
 * @param body - the function to evaluate on top of the new frame
 */
export function push(till: Frame, body: () => unknown) {
  try {
    if (context.call === push)
      context.call = body;
    context.value = body();
  } catch(e:any) {
    if (e === token)
      throw e;
    context.error = true;
    context.value = e;
  }
  return step(till);
}

/**
 * Pops frames untill `till` and evaluates `body`
 * 
 * @param till - the first unchnanged frame
 * @param body - the function to evaluate on top of the new frame    
 */
export function pop(till: Frame, body: () => unknown) {
  context.unwindingTill = till;
  context.unwindingBody = body;
  if (context.call === pop)
    context.call = body;
  throw ctrlToken;
}

let cloneCounter = 0;

export function copyFrame<T>(frame: Frame<T>): Frame<T> {
  const ret = {} as any;
  native.Object.assign(ret, frame);
  ret.id = `${frame.id}~${cloneCounter++}`;
  return ret;
}
