export * from "../api";
import "../vscode/handlers";
import * as Debugger from "../main";
import * as State from "../state";

const ReactDom = Debugger.unwrapImport(
  require("../deps/react-dom"),
  "../deps/react-dom"
);
