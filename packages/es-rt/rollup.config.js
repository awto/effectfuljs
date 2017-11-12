import babel from "rollup-plugin-babel"

const config = {
  input: "main.js",
  output: {
    file: "index.js",
    format: "cjs"
  }
}

if (process.env.BABEL_ENV === "configure") {
  config.input = "src/main.js"
  config.plugins = [babel()]
}

export default config
