import { Frame } from "@effectful/debugger/ctrl"
export { copyFrame, push, pop } from "@effectful/debugger/ctrl"
import { context } from "@effectful/debugger/state"
export { FrameFlags } from "@effectful/debugger/state"
export { Frame, context }

let promptId = 0;

export class Prompt<A = unknown> {
  id = promptId++;
  stack: Frame[] = [];
  ___promt_tag_?: A;
  constructor(public name: string) {}
}

export class SubCont<A = unknown, B = unknown> {
  constructor(public from: Frame<A>, public till: Frame<B>) {}
}

/**
 * Creates a new prompt, distinct from all existing prompts
 */
export function newPrompt<A>(name: string = "p"): Prompt<A> {
  return new Prompt<A>(name);
}
