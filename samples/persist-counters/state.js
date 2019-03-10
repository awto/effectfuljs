/**
 * @file storing and restoring full application's state
 * into JSON serializable object
 */
import * as R from "@effectful/es-persist-serialization";

/**
 * Returns JSON serialiable reference to the current thread state.
 *
 * @returns {Object}
 */
export async function save() {
  const resume = await R.idle;
  if (resume && resume.resume)
    return R.write({ running: R.context().running, resume });
  return resume;
}

/**
 * Restores current application state to `from`.
 * The value is result of some former `save` invocation.
 * After calling the function the current continuation will be abort
 * and execution will continue
 * from the point where `save` was called.
 *
 * @param {Object} from
 * @param {any} param - result of `await save()` in the resumed continuation
 */
export async function load(from, param) {
  if (!from) return;
  const state = R.read(from);
  R.context().running = state.running;
  state.resume.resume(param);
  await R.abort;
}
