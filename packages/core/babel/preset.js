module.exports = (plugin) => (
  api,
  opts = {
    preInstrumentedLibs: true
  }
) => ({
  passPerPreset: true,
  parserOpts: {
    allowReturnOutsideFunction: true
  },
  presets: [
    {
      plugins: [
        require.resolve("@babel/plugin-transform-optional-chaining"),
        require.resolve("@babel/plugin-transform-nullish-coalescing-operator"),
        [
          require.resolve("@babel/plugin-transform-modules-commonjs"),
          {
            loose: true
          }
        ],
        require.resolve("@babel/plugin-transform-property-mutators"),
        [
          require.resolve("@babel/plugin-transform-destructuring"),
          { useBuiltIns: true }
        ],
        require.resolve("@babel/plugin-transform-shorthand-properties"),
        [
          require.resolve("@babel/plugin-transform-parameters"),
          { loose: true }
        ],
        require.resolve("@babel/plugin-transform-spread"),
        [
          require.resolve("@babel/plugin-transform-class-properties"),
          {
            loose: true
          }
        ],
        [
          require.resolve("@babel/plugin-transform-classes"),
        {
            loose: true
          }
        ],
        [
          require("@babel/plugin-transform-object-rest-spread"),
          {
            useBuiltIns: true
          }
        ],
        require.resolve("@babel/plugin-syntax-bigint"),
        require.resolve("@babel/plugin-transform-numeric-separator"),
        require.resolve("@babel/plugin-transform-export-namespace-from"),
        require.resolve("@babel/plugin-syntax-dynamic-import"),
        require.resolve("@babel/plugin-transform-template-literals"),
        [require.resolve("@babel/plugin-transform-private-methods"), {loose:true}]
      ]
    },
    {
      plugins: [[plugin, opts]]
    }
  ]
});
