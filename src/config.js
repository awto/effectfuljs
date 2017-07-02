import core from "./libs/core"
import es from "./libs/es"

export default {
  verbose: false,
  gmode: false,
  mode: false,
  state: false,
  generator: false,
  generatorDo: false,
  coerce: false,
  require: null,
  ns: null,
  libs: {
    "@effectful/core": core,
    "@effectful/es": es,
    "@effectful/generators": es
  },
  profiles: {},
  parser: {},
  printer: {}
}
