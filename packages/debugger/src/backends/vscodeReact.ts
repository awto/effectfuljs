export * from "../api";
import "../vscode/handlers";
import * as Debugger from "../main";
import * as State from "../state";
const { context } = State;

context.debug = true;
const ReactDom = Debugger.unwrapImport(
  require("../deps/react-dom"),
  "../deps/react-dom"
);

const vars = ReactDom.render[Debugger.dataSymbol].$$.$;

const { propHack } = Debugger.TimeTravel;

for (const prop in vars) {
  const val = vars[prop];
  if (!val || !val.startsWith) continue;
  if (val.startsWith("_reactListenersID")) propHack(Document.prototype, val);
  else if (val.startsWith("__reactInternalInstance$"))
    propHack(Node.prototype, val);
  else if (val.startsWith("__reactEventHandlers$"))
    propHack(Node.prototype, val);
}
propHack(Node.prototype, "_reactRootContainer");
