const inline = require("@effectful/es-inline").effectfulOpts
var opts = Object.assign(
  {},inline,
  {
    importRT: "@effectful/es-loose-rt",
    loose:true,
    wrapAsyncIteratorValue:false,
    finalizeForOf:false,
    all:Object.assign(
      {},inline.all,
      {wrapFunction:false}),
    generators:Object.assign(
      {},inline.generators,
      {inlineReentryCheck:false}),
    wrapGeneratorResult:true,
    inlineReentryCheck:false
  })

module.exports = require("@effectful/js").babelPreset(opts)
