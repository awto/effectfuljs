/**
 * babel plugin for common configuration
 *
 * This will replace any object expression with a value specified in its parameter.
 */
import * as Kit from "./kit";

export default Kit.babelPlugin(function* (si) {
  const s = Kit.auto(si);
  for (const i of s) {
    if (i.enter && i.type === Kit.Tag.ObjectExpression) {
      yield* Kit.emitConst(i.pos, s.opts.pluginOpts);
      Kit.skip(s.copy(i));
    } else yield i;
  }
});
