import core from "./libs/core"
import generators from "./libs/generators"

export default {
  verbose: false,
  gmode: false,
  mode: false,
  state: false,
  closure: false,
  generator: false,
  generatorDo: false,
  coerce: false,
  require: null,
  ns: null,
  libs: {
    "@effectfuljs/core": core,
    "@effectfuljs/generators": generators
  },
  profiles: {},
  parser: {},
  printer: {}
}
