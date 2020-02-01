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
          require("@babel/plugin-transform-modules-commonjs"),
          {
            loose: true
          }
        ],
        [
          require("@babel/plugin-transform-destructuring"),
          { useBuiltIns: true }
        ],
        [require("@babel/plugin-transform-shorthand-properties")],
        [require("@babel/plugin-transform-parameters"), { loose: true }],
        [require("@babel/plugin-transform-spread")],
        [
          require("@babel/plugin-proposal-class-properties"),
          {
            loose: true
          }
        ],
        [
          require("@babel/plugin-transform-classes"),
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
