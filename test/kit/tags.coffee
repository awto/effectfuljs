# a function which returns default description by folder or file's base name
# ctx is a list of parent's folders name

cut =
  eff: "has effects"
  pure: "has no effects"
  stmt: "statement"
  last: "it is the last statement"

syntaxParts =
  if: true
  for: true
  break: true
  continue: true

wrap = (n) ->
  return "`#{n}`" if syntaxParts[n]

filter = (n) ->
  n.indexOf("test") isnt -1 or not isNaN n

specs =
  should: true
  when: true
  with: true

module.exports = (ctx, name) ->
  info = (cut[i] ? wrap(i) ? i for i in name.split "-" when not filter(i))
  return [] unless info.length
  info.unshift "when" if ctx.length and not specs[info[0]]
  return [info.join " "]

