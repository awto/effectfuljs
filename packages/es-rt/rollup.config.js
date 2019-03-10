import babel from "rollup-plugin-babel";

let file = "index.js";

if (process.env.EJS_OPT) {
  const opts = [];
  if (process.env.EJS_LOOSE) opts.push("loose");
  if (process.env.EJS_INLINE && !process.env.EJS_LOOSE) opts.push("inline");
  if (process.env.EJS_NO_TRAMPOLINE) opts.push("tc");
  const name = opts.length ? opts.join("-") : "default";
  file = `./opts/${name}.js`;
}

const config = {
  input: "main.js",
  output: { file, format: "cjs" }
};

if (process.env.BABEL_ENV === "configure") {
  config.input = "src/main.js";
  config.plugins = [babel()];
}

export default config;
