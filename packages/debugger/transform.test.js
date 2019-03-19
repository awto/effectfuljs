import * as babel from "@babel/core";
import * as path from "path";

test("default transpiler", function() {
  expect(
    babel.transformFileSync("__fixtures__/code.js").code
  ).toMatchSnapshot();
  expect(
    babel.transformFileSync("__fixtures__/mod1.js").code
  ).toMatchSnapshot();
  expect(
    babel.transformFileSync("__fixtures__/mod2.js").code
  ).toMatchSnapshot();
});
