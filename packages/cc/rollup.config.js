import babel from "rollup-plugin-babel"

let file = "index.js"

const config = {
  input: "main.js",
  output: {file, format: "cjs"}
}

if (process.env.BABEL_ENV === "configure") {
  config.input = "src/main.js"
  config.plugins = [babel()]
}

export default config
