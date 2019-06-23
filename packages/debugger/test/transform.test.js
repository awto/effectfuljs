const babel = require("@babel/core");

test("default transpiler", function() {
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
