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
    result.presets.unshift([require("@babel/preset-react").default, reactOpts]);
  }
  const targets = {
    node: "current",
    ...(opts.env && opts.env.targets)
  };
  result.presets.push(
    [
      require("@babel/preset-env").default,
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
        require("@babel/plugin-syntax-dynamic-import").default,
        [
          require("@babel/plugin-proposal-object-rest-spread").default,
          {
            useBuiltIns: true
          }
        ],
        process.env.EFFECTFUL_DEBUGGER_NODE &&
          require("babel-plugin-dynamic-import-node")
      ].filter(Boolean)
    }
  );
  const tsOpts = { allowNamespaces: opts.tsAllowNamespaces };
  if (opts.jsxPragma) tsOpts.jsxPragma = opts.jsxPragma;
  if (opts.typescript !== false) {
    result.presets.unshift(
      {
        plugins: [require("./ts-no-consts")]
      },
      [require("@babel/preset-typescript").default, tsOpts]
    );
  }
  result.overrides = [
    opts.flow !== false && {
      exclude: /\.tsx?$/,
      plugins: [require("@babel/plugin-transform-flow-strip-types").default]
    },
    opts.typescript !== false && {
      test: /\.tsx?$/,
      plugins: [
        [require("@babel/plugin-proposal-decorators").default, { legacy: true }]
      ]
    }
  ].filter(Boolean);
  return result;
};
