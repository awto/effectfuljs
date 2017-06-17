function* permut(c) {
  if (!c.length) {
    yield ["",{}]
    return
  }
  for(const [i,iv] of c[0]) {
    for(const [j,jv] of permut(c.slice(1))) {
      yield [`${i}${j}`,Object.assign({},iv,jv)]
    }
  }
}

function* opts() {
  const minorOpts = [
    [["",{}],["s",{state: true}]]]
  yield* permut([[["f",{chain:"leftFlat",static:true}]],
                 // [["t",{topLevel:true}],["",{}]]
                ]
                .concat(minorOpts))
}

const configs = {}

for(const [n,v] of opts())
  configs[n] = v

export default configs

