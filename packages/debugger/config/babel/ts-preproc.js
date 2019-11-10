/**
 * @babel/plugin-transform-typescript doesn't support const enums,
 * but for debugging purposes we can ignore this
 */
module.exports = {
  plugins: [
    function(babel) {
      return {
        name: "@effectful/debugger/ts-no-const",
        visitor: {
          TSEnumDeclaration(path) {
            path.node.const = false;
          }
        }
      };
    }
  ]
};
