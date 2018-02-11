const C = require("@effectful/core")
const T = C.Transform

module.exports = function esProfile(pOpts={}) {
  const opts = Object.assign(
    {},
    C.config,
    {preset:"@effectful/js",modules:"esDefault"},
    pOpts)
  return {
    syntaxPlugins:[],
    options: opts,
    main: T.run
  }
}

