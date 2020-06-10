import config from "../config";
import { journal, Record } from "../state";

export function reset(enabled: boolean = true) {
  journal.enabled = enabled;
  journal.past = journal.now = journal.future = null;
}

/**
 * Returns an object which can be passed
 * to `undo` to restored the current state
 */
export function checkpoint(): Record {
  journal.future = null;
  const { now } = journal;
  if (now) now.prev = journal.past;
  journal.past = now;
  return (journal.now = {
    prev: null
  });
}

export interface Callable {
  call(this: any, ...args: any): any;
}

/**
 * Registers a function(`f`) to be executed on replay in backward order,
 * if time traveling is enabled
 */
export const record: <T extends Callable>(f: T) => void = config.timeTravel
  ? function record(f: any) {
      if (!f) return;
      const { now } = journal;
      if (!now) return;
      (<any>f).prev = now.operations || null;
      now.operations = f;
    }
  : function() {};
