/**
  * trying to get meaningful BDD description string
  */

const cut = {
  eff: "has effects",
  pure: "has no effects",
  stmt: "statement",
  last: "it is the last statement"
}

const syntaxParts = {
  if: true,
  for: true,
  break: true,
  continue: true
}

function wrap(n) {
  if (syntaxParts[n])
    return `'${n}'`
}

function filter(n) {
  return n.indexOf("test") !== -1 || !isNaN(n)
}

const specs = {
  should: true,
  when: true,
  with: true
}

export default function(ctx, name) {
  const info = []
  for (const i of name.split("-")) {
    if (!filter(i))
      info.push(cut[i] || wrap(i) || i)
  }
  if (!info.length)
    return []
  if (ctx.length && !specs[info[0]])
    info.unshift("when")
  return [info.join(" ")]
}
