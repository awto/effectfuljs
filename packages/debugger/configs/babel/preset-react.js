module.exports = function(opts = { preInstrumentedLibs: true }) {
  return {
    passPerPreset: true,
    presets: [
      [require.resolve("@babel/preset-react"), opts.react || {}],
      ...require("./preset")(opts).presets
    ]
  };
};
