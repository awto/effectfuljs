module.exports = (
  api,
  opts = {
    preInstrumentedLibs: true
  }
) => ({
  passPerPreset: true,
  presets: [
    {
      plugins: [
        [
          require.resolve("@babel/plugin-transform-modules-commonjs"),
          {
            loose: true
          }
        ],
        [require.resolve("@babel/plugin-transform-shorthand-properties")],
        [
          require.resolve("@Babel/plugin-proposal-class-properties"),
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
      plugins: [[require("../../transform"), opts]]
    }
  ]
});
