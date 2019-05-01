module.exports = function(opts = { preInstrumentedLibs: true }) {
  return {
    passPerPreset: true,
    presets: [
      require("@babel/preset-react"),
      ...require("./preset")(opts).presets
    ]
  };
};
