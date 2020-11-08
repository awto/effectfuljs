import config from "../config";
import * as Kit from "../kit";
import * as Scope from "../scope";
import * as Operations from "../operations";
import * as Optimization from "../optimization";
import * as CFG from "../cfg";
import * as Emit from "../emit";
import * as Meta from "../meta";
import * as Eval from "../eval";

export default function debuggerTransform(ast) {
  config.loopsSubScopes = config.timeTravel ? "always" : "closure";
  config.reuseTempVars = !config.timeTravel;
  config.expInjectTempSetters = false;
  config.debug = true;
  if (Kit.hasDirective(ast.program, "no-debug")) return;
  const root = Kit.produce(ast);
  Scope.prepare(root);
  Eval.replaceEvalDir();
  if (!config.blackbox) Meta.injectBrk();
  Scope.split();
  Operations.normalizeAssign();
  if (config.implictCalls && config.timeTravel) Operations.implicitCalls();
  CFG.build();
  if (config.timeTravel) {
    Operations.setters();
    Operations.deleters();
    if (config.inlineImplicitOps) Operations.implicitCallsInlined();
  }
  Optimization.prepare();
  if (!config.expInlineCalls) Operations.methodCalls();
  Operations.assignCall();
  Scope.forEach(Optimization.composeItems);
  Scope.forEach(CFG.prepare);
  Scope.forEach(Optimization.assignBindVar);
  Scope.injectVarGetters();
  Scope.forEach(Emit.calcFrames);
  Scope.forEach(Optimization.sortFrames);
  Scope.forEach(Meta.all);
  if (config.timeTravel) Operations.replaceSymNames();
  Emit.module();
  Kit.consume(root);
}
