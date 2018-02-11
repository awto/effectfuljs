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
  yield* permut([[["f",{static:true,state:false,contextState:false}]],
                 [["",{}],
                  ["s",{state:true}],
                  ["t",{topLevel:true,
                        scopeContext:true,
                        contextState:true,
                        scopePrefix:true,
                        all:{
                          wrapFunction:null
                        }
                        //contextMethodOps:true
                       }],["",{}]]
                ])
}

const configs = {}

for(const [n,v] of opts())
  configs[n] = v

export default configs

