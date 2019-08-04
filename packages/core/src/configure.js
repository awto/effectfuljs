/**
 * babel plugin for common configuration
 *
 * This will replace any object expression with a value specified in its parameter.
 */
import * as Kit from "./kit";

export default Kit.babelPlugin(function*(si) {
  const s = Kit.auto(si);
  for (const i of s) {
    if (i.enter && i.type === Kit.Tag.ObjectExpression) {
      yield* Kit.emitConst(i.pos, s.opts.pluginOpts);
      Kit.skip(s.copy(i));
    } else yield i;
  }
});

/*
export default function(api, opts) {
  console.log("CONFIGURE 1");
  return {
    name: "@effectful/core/configure",
    visitor: {
      Program(path, state) {
        console.log("CONFIGURE 0.1");
        Kit.babelBridge(generateConfig, path, state);
      }
    }
  };
  function generateConfig(si) {
    console.log("CONFIGURE 2", opts);
    Kit.consume(walk());
    function* walk() {
      const s = Kit.auto(si);
      for (const i of s) {
        if (i.enter && i.type === Kit.Tag.ObjectExpression) {
          yield* Kit.emitConst(i.pos, opts);
          Kit.skip(s.copy(i));
        } else yield i;
      }
    }
  }
}
*/
