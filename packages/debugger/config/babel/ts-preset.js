function makePreset(transformPlugin) {
  if (!transformPlugin)
    transformPlugin = require.resolve("../../transform");
  const res = function(_, opts) {
    return {
      passPerPreset: true,
      presets: [
        {
          plugins: [
            require.resolve("./ts-no-consts"),
            require.resolve("@babel/plugin-transform-typescript"),
            [
              require.resolve("@babel/plugin-transform-modules-commonjs"),
              {
                loose: true
              }
            ],
            [require.resolve("@babel/plugin-transform-shorthand-properties")],
            [require.resolve("@babel/plugin-transform-destructuring")],
            [require.resolve("@babel/plugin-transform-parameters")],
            [require.resolve("@babel/plugin-transform-spread")],
            [
              require.resolve("@babel/plugin-proposal-class-properties"),
              {
                loose: true
              }
            ],
            [
              require.resolve("@babel/plugin-transform-classes"),
              {
                loose: true
              }
            ]
          ]
        },
        {
          plugins: [[transformPlugin, opts]]
        }
      ]
    };
  };
  res.rebind = makePreset;
  return res;
}
module.exports = makePreset();