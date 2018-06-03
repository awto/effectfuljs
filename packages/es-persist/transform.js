module.exports = require("@effectful/es")
  .options({importRT:"@effectful/es-persist",
            topLevel:true,
            defunct:true,
            effectful:{
              cleanupFrameVars: true
            }})
