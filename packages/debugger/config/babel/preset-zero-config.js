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
  const targets = {
    node: "current",
    ...(opts.env && opts.env.targets)
  };
  result.presets.push(
    [
      require.resolve("@babel/preset-env"),
      {
        loose: true,
        modules: false,
        targets,
        ...opts.env,
        exclude: [
          // already done or not needed
          "transform-regenerator",
          "transform-shorthand-properties",
          "transform-classes",
          "transform-typeof-symbol",
          "transform-async-to-generator",
          ...((opts.env && opts.env.exclude) || [])
        ]
      }
    ],
    {
      plugins: [
        require.resolve("@babel/plugin-syntax-dynamic-import"),
        [
          require.resolve("@babel/plugin-proposal-object-rest-spread"),
          {
            useBuiltIns: true
          }
        ],
        process.env.EFFECTFUL_DEBUGGER_NODE &&
          require.resolve("babel-plugin-dynamic-import-node")
      ].filter(Boolean)
    }
  );
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
