module.exports = require("@effectful/core")
  .babelPlugin((opts,{Tag,Kit,presets}) => ({
    options: {
      /** using state's numbers instead of callbacks */
      ...presets.defunct,
      name:"@effectful/react-do",
      importRT:"@effectful/react-do",
      contextBy:"this",
      contextMethodOpsSpec: {
        join: false,
        pure: false
      },
      parShare:false,
      blockDirsFunc:"profile",
      ...opts
    },
    configure(s) {
      for(const i of s) {
        if (i.enter) {
          if (i.value.func) {
            if (i.value.node.generator || i.value.node.async) {
              i.value.optsAssign = {transform: false}
              continue
            }
            const blockDirs = i.value.body && i.value.body.blockDirs
            if (blockDirs) {
              const component = blockDirs.has("component")
              if (component || blockDirs.has("effectful")) {
                i.value.optsAssign = {
                  scopeConstructor:component ? "component" : "hook",
                  wrapFunction: component && "componentFunction",
                  transform: true
                }
                continue
              }
            }
            const name = i.value.scopeName
            if (name && name.startsWith("use")) {
              i.value.optsAssign = {
                scopeConstructor:"hook",
                transform:true
              }
              continue
            }
            i.value.optsAssign = {transform: false}
          } else if (i.type === Tag.CallExpression
                     && i.value.parent.origType !== Tag.JSXExpressionContainer) {
            const {qname} = i.value
            if (!qname || !qname.length)
              continue
            const name = qname[qname.length-1]
            if (name.startsWith("use"))
              i.value.bind = true
          }
        }
      }
    }
  }))
