function makePreset(transformPlugin) {
  let mainPreset = require("./preset");
  if (transformPlugin)
    mainPreset.rebind(transformPlugin);
  function preset(api, opts = { preInstrumentedLibs: true }) {
    return {
      passPerPreset: true,
      presets: [
        [require.resolve("@babel/preset-react"), opts.react || {}],
        ...require("./preset")(api, opts).presets
      ]
    };
  };
  preset.rebind = makePreset;
  return preset;  
}

module.exports = makePreset();
