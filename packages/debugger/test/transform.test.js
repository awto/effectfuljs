const babel = require("@babel/core");
const context = require("../state");

// different paths on travis
test.skip("default transpiler", function() {
  context.top = context.moduleId = null;
  expect(
    babel.transformFileSync("test/__fixtures__/code.js").code
  ).toMatchSnapshot();
  expect(
    babel.transformFileSync("test/__fixtures__/mod1.js").code
  ).toMatchSnapshot();
  expect(
    babel.transformFileSync("test/__fixtures__/mod2.js").code
  ).toMatchSnapshot();
});
