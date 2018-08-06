/**
 * combining all the steps, more a kind of a configuration file
 */

import * as D from "./draw"
import * as S from "./state"
import {run,render} from "./kit"
import * as R from "@effectful/es-persist-serialization"

const root = document.getElementById("root")
R.regOpaqueObject(root,"root")

run(
  D.rootContainer,
  D.animateDelete({}),
  D.insertBox,
  D.collectBoxes,
  S.saveLocal,
  render(root))
