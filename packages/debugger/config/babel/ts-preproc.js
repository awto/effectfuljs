module.exports = function(_, opts) {
  return {
    plugins: [
      require("./ts-no-consts"),
      [require("@babel/plugin-transform-typescript").default, opts]
    ]
  };
};
