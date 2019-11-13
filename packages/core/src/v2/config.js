import config from "@effectful/transducers/v2/config";
Object.assign(config, {
  srcRoot: ".",
  filename: "file.js",
  rt: "@effectful/debugger/api",
  // information about the current scope
  evalContext: null,
  // uses the global variable as API namespace
  ns: null,
  // assumes the output is passed to some static bandler like webpack or parcel,
  // thus avoiding dynamic `require` injections
  staticBundler: true
});
export default config;
