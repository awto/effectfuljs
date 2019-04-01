module.exports = function(opts) {
  return {
    passPerPreset: true,
    presets: [
      require("@babel/preset-react"),
      {
        plugins: [
          [
            require("@babel/plugin-transform-modules-commonjs"),
            { loose: true }
          ],
          [require("@babel/plugin-proposal-class-properties"), { loose: true }],
          [require("@babel/plugin-transform-classes"), { loose: true }]
        ]
      },
      {
        plugins: [
          [
            require("./transform"),
            Object.assign({ blackbox: false, preInstrumentedLibs: true }, opts)
          ]
        ]
      }
    ]
  };
};
