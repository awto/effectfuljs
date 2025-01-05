module.exports = function(api) {
  api.cache(false);
  return {
    passPerPreset: true,
    presets: [
      {
        plugins: [
          [
            "@babel/plugin-transform-modules-commonjs",
            {
              loose: true
            }
          ],
          "@babel/plugin-transform-shorthand-properties",
          [
            "@babel/plugin-transform-class-properties",
            {
              loose: true
            }
          ],
          [
            "@babel/plugin-transform-classes",
            {
              loose: true
            }
          ],
          "@babel/plugin-transform-spread",
          "@babel/plugin-syntax-function-sent",
          "@babel/plugin-transform-destructuring",
          ["@babel/plugin-transform-parameters", { loose: true }]
        ]
      },
      {
        plugins: [
          [
            "../../transform",
            {
              rt: `${__dirname}/../../api`,
              preInstrumentedLibs: "../../../.."
            }
          ]
        ]
      }
    ]
  };
};
