module.exports = (api, opts) => ({
  passPerPreset: true,
  presets: [
    {
      plugins: [
        [require("@babel/plugin-transform-modules-commonjs"), { loose: true }]
      ]
    },
    {
      plugins: [[require("./transform"), { blackbox: opts.blackbox }]]
    }
  ]
});
