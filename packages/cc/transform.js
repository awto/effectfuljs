module.exports = require("@effectful/js")
  .options({name:"@effectful/cc",
            detectRT:"@effectful/cc",
            effectful: {
              shortFrameNames:false,
              markRepeat:true,
              defunct:false,
              inlineJsExceptions:false,
              inlinePureJumps:null,
              keepLastPure:false,
              keepLastRaise:false,
              par:false,
              storeCont:null,
              static:true,
              scopeContext:true,
              contextBy:"parameter",
              defunct:false,
              contextMethodOps:true
            }})

