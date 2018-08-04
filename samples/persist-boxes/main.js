/**
 * combining all the steps, more a kind of a configuration file
 */

import * as D from "./draw"
import {run} from "./kit"

run(
  D.rootContainer,
  D.animateDelete({}),
  D.insertBox,
  D.collectBoxes)

