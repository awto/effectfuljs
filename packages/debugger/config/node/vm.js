const vm = require("vm");
const { compileIndirEval } = require("../../engine");
const config = require("../../config").default;
const ns = config.globalNS;

function precompile(code, params) {
  if (!params) params = [];
  const iparams = params.slice(0);
  iparams.push("module");
  return `(function(${iparams}) { ${compileIndirEval(code)} })(${params})`;
}

const ScriptConstr = vm.Script;
const Sp = ScriptConstr.prototype;
const runInContextMethod = Sp.runInContext;
const compileFunctionStatic = vm.compileFunction;
const runInContextStatic = vm.runInContext;
const runInNewContextStatic = vm.runInNewContext;
const runInNewContextMethod = Sp.runInNewContext;

Sp.runInContext = function runInContext(contextifiedSandbox, options) {
  Object.defineProperty(contextifiedSandbox, ns, {
    value: global[ns],
    configurable: true
  });
  return runInContextMethod.call(this, contextifiedSandbox, options);
};

vm.Script = function Script(code, options) {
  return new ScriptConstr(precompile(code), options);
};

vm.compileFunction = function compileFunction(code, params, options) {
  if (options && options.parsingContext)
    Object.defineProperty(options.parsingContext, ns, {
      value: global[ns],
      configurable: true
    });
  return compileFunctionStatic(precompile(code, params), params, options);
};

vm.runInContext = function runInContext(code, contextifiedSandbox, options) {
  return runInContextStatic(precompile(code), contextifiedSandbox, options);
};

vm.runInNewContext = function runInNewContext(code, sandbox, options) {
  return runInNewContextStatic(precompile(code), sandbox, options);
};
