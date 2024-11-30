import { Frame as DFrame, context, native, ctrlToken } from "./state";

export interface Frame<T=unknown> extends DFrame {
  result?: T
}

export { context }

export function toLoop() {
  throw ctrlToken;
}

export function copyFrame<T>(frame: Frame<T>): Frame<T> {
  const ret = {} as any;
  native.Object.assign(ret, frame);
  return ret;
}
