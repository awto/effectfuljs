import core from "./libs/core"
import generators from "./libs/generators"

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
    "@effectful/generators": generators
  },
  profiles: {},
  parser: {},
  printer: {}
}
