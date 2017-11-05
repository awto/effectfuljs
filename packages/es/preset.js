module.exports = require("@effectful/js")
  .babelPreset({
    preset:"@effectful/es",
    directives:false,
    importRT: "@effectful/es-rt",
    modules:"commonjs",
    contextBy:"this",
    scopeContext:true,
    contextState:false,
    contextMethodOps:true,
    jsExpceptions:true,
    scopeContext:true,
    scopePrefix:true,
    contextState:false,
    jsExpceptions:true,
    markRec:false,
    state:false
  })

