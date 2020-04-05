const babel = require("@babel/core");
const context = require("../state");

// different paths on travis
test("default transpiler", function() {
  context.top = context.moduleId = null;
  expect(
    babel.transformFileSync("test/__fixtures__/transform/code.js").code
  ).toMatchSnapshot();
  expect(
    babel.transformFileSync("test/__fixtures__/transform/mod1.js").code
  ).toMatchSnapshot();
  expect(
    babel.transformFileSync("test/__fixtures__/transform/mod2.js").code
  ).toMatchSnapshot();
});
