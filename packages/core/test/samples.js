import * as gen from "./kit/generators";
import * as dirs from "./kit/dirs";
import * as path from "path";
const files = dirs.read(path.join(__dirname, "samples"));
gen.mochaBdd(files);
