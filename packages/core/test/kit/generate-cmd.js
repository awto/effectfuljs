import * as fs from "fs";
import * as path from "path";
import * as kit from "./generators";
import { run, pretty } from "./core";
import * as dirs from "./dirs";
import * as Kit from "../../kit";
var terminal = require("terminal-kit").terminal;
import libs from "../../config";
import configs from "./configs";
libs["./effectfuljscore"] = libs["@effectful/core"];

const root = path.join(__dirname, "..", "samples");

const PBAR = true;

let s = [
  ...Kit.pipe(
    dirs.read,
    kit.parse,
    function*(s) {
      for (const i of s) {
        switch (i.type) {
          case "exp":
            continue;
          case "inp":
            for (const j in configs) {
              yield { path: i.path.concat([j]), type: "exp", value: "/**/" };
            }
          default:
            yield i;
        }
      }
    },
    kit.prepare
  )(root)
];
fs.writeFileSync("./input.json", JSON.stringify(s, null, 2));
s = s.filter(i => i.value.inp && !i.value.skip && i.value.exp);
const errors = [];

const progressBar =
  PBAR &&
  terminal.progressBar({
    title: "Regenerating:",
    eta: true,
    percent: true,
    syncMode: true,
    items: s.length,
    minRefreshTime: 0
  });
let nn = 0;

for (const i of s) {
  let item = i.path.join(">");
  if (progressBar) progressBar.startItem(item);
  const dir = path.join(...i.path.slice(0, -2));
  const n = i.path[i.path.length - 1];
  const name = i.path[i.path.length - 2];
  const nopts = i.value;
  // nopts.filename = path.join(dir, `${name}-in.js`);
  if (nopts.require == null) nopts.require = "./effectfuljscore";
  const resName = path.join(dir, `${name}-out-${n}.js`);
  let resCode;
  try {
    resCode = run(nopts, i.value.inp);
  } catch (error) {
    errors.push(
      Object.assign(
        { resName, path: i.path },
        { message: error.message, stack: error.stack }
      )
    );
    resCode = `/* ${error.toString()} */`;
  }
  try {
    fs.writeFileSync(path.join(root, resName), resCode);
  } catch (error) {
    errors.push(Object.assign({ resName, path: i.path, onWrite: true }, error));
  }
  if (progressBar) progressBar.itemDone(item);
}

if (PBAR) {
  terminal("\nDONE ").bold(`${s.length - errors.length}`)(" cases");
  if (errors.length) {
    terminal(",")
      .red(` with ${errors.length} errors \u2639 `)
      .white(" (check err-log.json)");
  } else terminal(",").green(" without errors!");
  terminal("\n");
} else console.log("DONE", s.length, errors.length);
if (errors.length)
  fs.writeFileSync("./err-log.json", JSON.stringify(errors, null, 2));
