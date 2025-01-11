import _ctrl from "@effectful/js/macro";
import * as CC from "./main";

const prompt = CC.newPrompt("async");

/**
 * Converts a possibly thenable value into a direct plain value.
 * 
 * This is like `await` for a promise-like argument.
 * 
 * @param value - The possibly thenable value to reify.
 * @returns The reified value.
 */
export function reify<T>(value: PromiseLike<T>): T {
  return CC.shift(prompt, (cont) =>
        value.then(
          (value) => cont(() => value),
          (error) =>
            cont(() => {
              throw error;
            })
        )
      );
}

/**
 * Converts direct style function into a promise.
 * 
 * This is like marking a function `async` except it shouldn't be done for
 * every function, only to a top level one.
 *
 * @param body - The function to reflect.
 * @returns The reflected promise.
 */
export function reflect<T>(body: () => T): Promise<T> {
  let resolve: (value: T) => void;
  let reject: (error: unknown) => void;
  const promise = new Promise<T>((rs, rj) => {
    resolve = rs;
    reject = rj;
  });
  CC.pushPrompt(prompt, function () {
    try {
      resolve(body());
    } catch (e) {
      reject(e);
    }
  });
  return promise;
}
