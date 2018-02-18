module.exports = require("@effectful/js")
  .options({detectRT:"@effectful/cc",
            "scopePrefix":true,
            "contextMethodOps":true,
            "contextBy":"parameter",
            "scopeContext":true,
            "static":true,
            "coerce":false,
            "state":false,
            "shortFrameNames":false,
            "markRepeat":true
           })

