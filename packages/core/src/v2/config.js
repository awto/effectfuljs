import config from "@effectful/transducers/v2/config";
Object.assign(config, {
  srcRoot: ".",
  filename: "file.js",
  rt: "@effectful/debugger",
  // information about the current scope
  evalContext: null,
  evalParams: null,
  // uses the global variable as API namespace
  ns: null,
  // assumes the output is passed to some static bandler like webpack or parcel,
  // thus avoiding dynamic `require` injections
  staticBundler: true,
  pureModule: false,
  moduleAliases: null,
  // name of a function to call after all functions are registered
  moduleExports: "moduleExports",
  iifeWrap: false,
  closureVars: ["__webpack_require__"],
  expInline: false,
  // "always" | "closure" | "never"
  loopsSubScopes: "closure",
  // optimize number of variables for storing temporal values
  reuseTempVars: false,
  // injects setters operators for temporal variables
  expInjectTempSetters: false,
  scopeDepth: 0,
  // neglects possible side effects of `next` getters
  expLooseNext: true,
  expInlineCalls: false,
  expGlobalsEnv: false,
  moduleParams: null,
  switchFallthrough: true,
  inlineTrampolineLoop: true,
  optimizeFrames: true,
  implictCalls: true,
  // adds the string (if specified) as the first file statement
  // this way compiled files can be distinguished
  outFileDirective: null
});
export default config;
