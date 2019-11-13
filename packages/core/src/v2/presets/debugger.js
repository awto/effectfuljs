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
  const root = Kit.produce(ast);
  Scope.prepare(root);
  Eval.replaceEvalDir();
  if (!config.blackbox) Meta.injectBrk();
  Scope.split();
  if (config.timeTravel) Operations.normalizeAssign();
  Scope.forEach(CFG.build);
  // dbg.cfgs("bld1");
  if (config.timeTravel) {
    Operations.normalizeAssign();
    Operations.setters();
    Operations.deleters();
    Operations.methodCalls();
  }
  Operations.assignCall();
  Scope.forEach(Optimization.composeItems);
  // dbg.cfgs("opt1");
  Optimization.prepare();
  Scope.forEach(CFG.prepare);
  // dbg.cfgs("prep1");
  Scope.forEach(Optimization.assignBindVar);
  // dbg.cfgs("vars1");
  Scope.injectVarGetters();
  Scope.forEach(Emit.calcFrames);
  Scope.forEach(Meta.all);
  Emit.module();
  Kit.resetNames(root);
  Kit.consume(root);
}
