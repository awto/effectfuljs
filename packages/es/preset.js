var opts = {
  preset:"@effectful/es",
  directives:false,
  importRT:"@effectful/es-rt",
  contextBy:"this",
  all: {
    modules:"commonjs",
    contextMethodOps:true,
    markRec:false,
    storeErrorCont:"$handle",
    storeResultCont:"$exit",
    storeCont:"$cont"
  }
}

if (process.env.EJS_DEFUNCT)
  Object.assign(opts,{
    all: Object.assign({},opts.all,{
      defunct:true
    })
  })

module.exports = require("@effectful/js").babelPreset(opts)

