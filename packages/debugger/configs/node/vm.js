const vm = require("vm");
const { compileIndirEval } = require("../../engine");

function precompile(code, params) {
  if (!params) params = "";
  return `(function(${params}) { ${compileIndirEval(code)} })(${params})`;
}

const Script = vm.Script;
const Sp = Script.prototype;
const runInContext = Sp.runInContext;
Sp.runInContext = function runInContext(contextifiedSandbox, options) {
  contextifiedSandbox.$effectful$debugger$lib$ =
    global.$effectful$debugger$lib$;
  return runInContext.call(this, contextifiedSandbox, options);
};

const runInNewContext = Sp.runInNewContext;
Sp.runInNewContext = function runInNewContext(sandbox, options) {
  sandbox.$effectful$debugger$lib$ = global.$effectful$debugger$lib$;
  return runInNewContext.call(this, sandbox, options);
};

vm.Script = function Script(code, options) {
  return new Script(precompile(code), options);
};

const compileFunction = vm.compileFunction;

vm.compileFunction = function compileFunction(code, params, options) {
  if (options && options.parsingContext)
    options.parsingContext.$effectful$debugger$lib$ =
      global.$effectful$debugger$lib$;
  return runInContextStatic(
    precompile(code, params && params.join()),
    params,
    options
  );
};

const runInContextStatic = vm.runInContext;

vm.runInContext = function runInContext(code, contextifiedSandbox, options) {
  contextifiedSandbox.$effectful$debugger$lib$ =
    global.$effectful$debugger$lib$;
  return runInContextStatic(precompile(code), contextifiedSandbox, options);
};

const runInNewContextStatic = vm.runInNewContext;

vm.runInNewContext = function runInNewContext(code, sandbox, options) {
  if (!sandbox) sandbox = {};
  sandbox.$effectful$debugger$lib$ = global.$effectful$debugger$lib$;
  return runInNewContext(precompile(code), sandbox, options);
};
