import * as babel from "@babel/core";
import * as path from "path";

test("default transpiler", function() {
  expect(
    babel.transformFileSync("__fixtures__/code.js", {
      plugins: ["./transform"]
    }).code
  ).toMatchSnapshot();
});
