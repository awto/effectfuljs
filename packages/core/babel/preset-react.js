module.exports = function (transform) {
  const preset = require("./preset")(transform);
  return function (opts = { preInstrumentedLibs: true }) {
    return {
      passPerPreset: true,
      presets: [
        [require.resolve("@babel/preset-react"), opts.react || {}],
        ...require("./preset")(opts).presets,
      ],
    };
  };
};
