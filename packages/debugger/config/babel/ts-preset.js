module.exports = function(_, opts) {
  return {
    passPerPreset: true,
    presets: [
      {
        plugins: [
          require("./ts-no-consts"),
          require("@babel/plugin-transform-typescript").default,
          [
            require("@babel/plugin-transform-modules-commonjs"),
            {
              loose: true
            }
          ],
          [require("@babel/plugin-transform-shorthand-properties")],
          [require("@babel/plugin-transform-destructuring")],
          [require("@babel/plugin-transform-parameters")],
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
  };
};
