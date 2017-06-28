import * as Policy from "../policy"
import * as T from "../transform"
import * as R from "ramda"

export default function* generatorsInit($ns) {
  return R.pipe(
    Policy.setFuncOpts({generator:true,
                        closure:true,
                        coerce:false,
                        state:false,
                        transform:T.defaultGensTransform,
                        $ns
                       }),
    Policy.configDiffPass)
}

