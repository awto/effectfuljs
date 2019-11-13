/* eslint-disable no-console */
import * as Kit from "./kit";
import * as Lib from "@effectful/transducers/v2/debug";
import generate from "@babel/generator";
const Tag = Kit.Tag;
import * as Scope from "./scope";

export const trace = Lib.traceDoc;
export const dump = Lib.dumpDoc;

export function nodeStr(node, pretty) {
  try {
    return generate(node, { compact: !pretty, comments: false }).code;
  } catch (e) {
    return "<not-JS>";
  }
}

export { Kit };

/**
 * sets temporal `node.name` for each Identifier for debug dumps outputs
 */
function tempNamesRange(from, to) {
  let i = from;
  const seen = new Set();
  do {
    if (seen.has(i)) {
      console.log(i);
      throw new Error("CYCLE!");
    }
    seen.add(i);
    if (
      i.type === Tag.Identifier &&
      i.sym != null &&
      (!i.node.name || i.node.name !== i.sym.name)
    ) {
      const sym = i.sym;
      const varSym = sym.varSym || sym;
      const node = i.node;
      if (varSym !== sym) {
        (node.trailingComments || (node.trailingComments = [])).push({
          type: "CommentBlock",
          value: sym.strict ? sym.name : sym.id
        });
      }
      node.name = varSym.name || varSym.id;
    }
  } while ((i = Kit.next(i)) !== to);
}

export function node(doc) {
  tempNamesRange(doc, Kit.after(doc));
  Kit.consumeRange(doc, Kit.after(doc));
  return doc.node;
}

export function str(doc, pretty = false) {
  const ast = node(doc);
  return Array.isArray(ast)
    ? ast.map(nodeStr).join(" # ")
    : nodeStr(ast, pretty);
}

function symStr(sym) {
  if (sym.varSym && sym.varSym !== sym) return `${sym.varSym.id}(${sym.id})`;
  return sym.id;
}

export function cfgBlock(block) {
  let i = block;
  do {
    if (!i.deb_id) i.deb_id = `B${i.id}`;
    if (i.br && i.br.ibr) i.br.deb_id = `B${i.br.id}`;
    if (i.caseTest) i.deb_case = str(i.caseTest).replace(/"/g, "'");
    for (let j = i.nextItem; j !== i; j = j.nextItem) {
      if (!j.deb_id) j.deb_id = `I${j.id}`;
      let label = "";
      if (j.lhsExpr) label += `${str(j.lhsExpr)}/*${symStr(j.sym)}*/ <- `;
      else if (j.sym) label += `${symStr(j.sym)} <- `;
      if (j.doc) {
        const code = str(j.doc).replace(/"/g, "'");
        label += code;
        j.deb_code = code;
      } else if (j.phi) {
        label += `PHI(${j.phi.map(i => symStr(i))})`;
      } else {
        label += "?";
      }
      if (j.doc) {
        label += ";";
        const ref = j.doc.refDoc;
        if (ref) label += ";";
        const loc = (ref || j.doc).node.loc;
        if (loc)
          label += `@${loc.start.line}:${loc.start.column}-${loc.end.line}:${loc.end.column}`;
      }
      j.deb_ = label;
    }
    i = i.nextBlock;
  } while (i !== block);
}

/** generates .dot for a control flow graph of function's root */
export function cfgToDot(root, name = "") {
  const lines = [`digraph ${name} {`];
  const end = root.cfgBlock;
  const beg = end.nextBlock;
  if (!end.deb_id) end.deb_id = "END";
  cfgBlock(beg);
  for (let i = beg; i !== end; i = i.nextBlock) {
    const labels = [`<<${i.id}>>:\\l`];
    for (let j = i.nextItem; j !== i; j = j.nextItem)
      labels.push(`${j.deb_}\\l`);
    let finExpr = "";
    if (i.exitExpr) finExpr = `${str(i.exitExpr)}/`;
    if (i.cond) labels.push(`${finExpr}?`);
    if (i.discrim) labels.push(`${finExpr}?*`);
    lines.push(`  ${i.deb_id}[shape="box" label="${labels.join("")}"];`);
  }
  lines.push(`  END[label="RET"];`);
  for (let i = beg; i !== end; i = i.nextBlock) {
    if (i.trueBr) lines.push(`  ${i.deb_id} -> ${i.trueBr.deb_id}[label=T];`);
    if (i.falseBr) lines.push(`  ${i.deb_id} -> ${i.falseBr.deb_id}[label=F];`);
    if (i.br) {
      if (i.br.ibr)
        lines.push(
          `  ${i.br.deb_id}[shape=diamond label="${symStr(i.br.ibr)}"];`
        );
      lines.push(
        `  ${i.deb_id} -> ${i.br.deb_id}[style="${
          i.unwind ? "dashed" : "solid"
        }",color=${i.rec ? "red" : "black"}];`
      );
    }
    if (i.handler)
      lines.push(
        `  ${i.deb_id} -> ${i.handler.deb_id}[style=dotted,color=green];`
      );
    if (i.finalizer)
      lines.push(
        `  ${i.deb_id} -> ${i.finalizer.deb_id}[style=dotted,color=blue];`
      );
    if (i.switchCases) {
      for (const j of i.switchCases)
        lines.push(
          `  ${i.deb_id} -> ${j.deb_id}[label="${j.deb_case || "*"}"];`
        );
    }
  }
  lines.push("}");
  return lines.join("\n");
}

export function cfgs(name = "G") {
  Scope.forEach(function(root) {
    console.log(cfgToDot(root, name));
  });
}
