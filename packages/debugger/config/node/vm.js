const vm = require("vm");
const { compileEvalToString } = require("../../engine");
const config = require("../../config").default;
const ns = config.globalNS;
const compileFile = require("./compile");

const ScriptConstr = vm.Script;
const Sp = ScriptConstr.prototype;
const runInContextMethod = Sp.runInContext;
const runInContextStatic = vm.runInContext;
const runInNewContextStatic = vm.runInNewContext;
const savedCompileFunction = vm.compileFunction;

function compileCode(code) {
  return code.substr(0, 10) === "/*!EDBG!*/" || !global[ns]
    ? code
    : compileEvalToString(code, null);
}

Sp.runInContext = function runInContext(contextifiedSandbox, options) {
  Object.defineProperty(contextifiedSandbox, ns, {
    value: global[ns],
    configurable: true
  });
  return runInContextMethod.call(this, contextifiedSandbox, options);
};

vm.Script = function Script(code, options) {
  return new ScriptConstr(compileCode(code), options);
};

vm.compileFunction = function compileFunction(code, params, options) {
  if (code.substr(0, 10) === "/*!EDBG!*/") {
    return savedCompileFunction(code, params, options);
  }
  if (options.filename) {
    return savedCompileFunction(
      compileFile(code, options.filename) || code,
      params,
      options
    );
  }
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
  return runInContextStatic(compileCode(code), contextifiedSandbox, options);
};

vm.runInNewContext = function runInNewContext(code, sandbox, options) {
  return runInNewContextStatic(compileCode(code), sandbox, options);
};
