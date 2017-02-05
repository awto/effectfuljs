import core from "./libs/core"
import generators from "./libs/generators"

export default {
  verbose: false,
  gmode: false,
  mode: false,
  state: false,
  closure: true,
  generator: false,
  generatorDo: false,
  coerce: true,
  require: null,
  ns: null,
  libs: {
    "@mfjs/core": core,
    "@mfjs/generators": generators
  },
  profiles: {},
  parser: {},
  printer: {}
}


