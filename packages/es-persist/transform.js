module.exports = require("@effectful/es").options({
  name: "@effectful/es-persist",
  importRT: "@effectful/es-persist",
  topLevel: true,
  defunct: true,
  par: false,
  effectful: {
    cleanupFrameVars: true
  }
});
