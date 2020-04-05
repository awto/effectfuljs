const vm = require("vm");
const { compileEvalToString } = require("../../engine");
const config = require("../../config").default;
const ns = config.globalNS;

const ScriptConstr = vm.Script;
const Sp = ScriptConstr.prototype;
const runInContextMethod = Sp.runInContext;
const runInContextStatic = vm.runInContext;
const runInNewContextStatic = vm.runInNewContext;

Sp.runInContext = function runInContext(contextifiedSandbox, options) {
  Object.defineProperty(contextifiedSandbox, ns, {
    value: global[ns],
    configurable: true
  });
  return runInContextMethod.call(this, contextifiedSandbox, options);
};

vm.Script = function Script(code, options) {
  return new ScriptConstr(compileEvalToString(code, null), options);
};

vm.compileFunction = function compileFunction(code, params, options) {
  if (!options) options = {};
  if (options.parsingContext)
    Object.defineProperty(options.parsingContext, ns, {
      value: global[ns],
      configurable: true
    });
  return runInNewContextStatic(
    compileEvalToString(code, params),
    options.parsingContext,
    options
  );
};

vm.runInContext = function runInContext(code, contextifiedSandbox, options) {
  return runInContextStatic(
    compileEvalToString(code, null),
    contextifiedSandbox,
    options
  );
};

vm.runInNewContext = function runInNewContext(code, sandbox, options) {
  return runInNewContextStatic(
    compileEvalToString(code, null),
    sandbox,
    options
  );
};
