/** @file debugging tools */
import {format as prettyFormat, plugins as prettyPlugins} from "pretty-format";
const { ReactElement } = prettyPlugins;
import * as R from "@effectful/es-persist-serialization";

/**
 * outpus a message to console for each incoming message
 * @param {string} prefix - prefix of the console message
 * @returns {Transducer}
 */
export default function trace(prefix) {
  return async function* trace(input) {
    const cur = await R.current;
    for await (const i of input) {
      console.group(`${prefix}-${i.type}`);
      console.log(
        i.value && i.value.$$typeof === Symbol.for("react.element")
          ? prettyFormat(i, { plugins: [ReactElement] })
          : i,
        R.write(cur)
      );
      console.groupEnd();
      yield i;
    }
  };
}
