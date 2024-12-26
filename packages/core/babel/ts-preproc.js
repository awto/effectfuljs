module.exports = function(_, opts) {
  return {
    plugins: [
      require.resolve("./ts-no-consts"),
      [require.resolve("@babel/plugin-transform-typescript"), opts]
    ]
  };
};
