const preset = require("./preset");
module.exports = function(api, opts = { preInstrumentedLibs: true }) {
  const result = preset(api, opts);
  if (opts.react !== false) {
    const reactOpts = {
      development: true,
      useBuiltIns: true
    };
    if (opts.jsxPragma) reactOpts.pragma = opts.jsxPragma;
    if (opts.jsxPragmaFrag) reactOpts.pragmaFrag = opts.jsxPragmaFrag;
    result.presets.unshift([require.resolve("@babel/preset-react"), reactOpts]);
  }
  const tsOpts = { allowNamespaces: opts.tsAllowNamespaces };
  if (opts.jsxPragma) tsOpts.jsxPragma = opts.jsxPragma;
  if (opts.typescript !== false) {
    result.presets.unshift(
      {
        plugins: [require.resolve("./ts-no-consts")]
      },
      [require.resolve("@babel/preset-typescript"), tsOpts]
    );
  }
  result.overrides = [
    opts.flow !== false && {
      exclude: /\.tsx?$/,
      plugins: [require.resolve("@babel/plugin-transform-flow-strip-types")]
    },
    opts.typescript !== false && {
      test: /\.tsx?$/,
      plugins: [
        [require.resolve("@babel/plugin-proposal-decorators"), { legacy: true }]
      ]
    }
  ].filter(Boolean);
  return result;
};
