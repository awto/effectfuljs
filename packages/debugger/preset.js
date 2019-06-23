module.exports = (api, opts = {
  preInstrumentedLibs: true
}) => ({
  passPerPreset: true,
  presets: [{
    plugins: [[require("@babel/plugin-transform-modules-commonjs"), {
      loose: true
    }]]
  }, {
    plugins: [[require("./transform"), opts]]
  }]
});