const C = require("@effectful/core")
const config = C.config
const Policy = C.Policy
const T = C.Transform
const Tag = C.Tag
const Kit = C.Kit

module.exports = function esProfile(pOpts={}) {
  const opts = Object.assign(
    {},
    config,
    {preset:"@effectful/js",modules:"esDefault"},
    pOpts)
  return {
    syntaxPlugins:["asyncGenerators","functionSent"],
    options: opts,
    main: T.run
  }
}

