const fs = require("fs");
const path = require("path");

const modules = path.join(__dirname, "node_modules");

function* files() {
  for (const i of fs.readdirSync(modules)) {
    if (i[0] === "@")
      yield* fs.readdirSync(path.join(modules, i)).map(j => path.join(i, j));
    else yield i;
  }
}

let any = false;

for (const i of files()) {
  const stat = fs.lstatSync(path.join(modules, i));
  if (stat.isSymbolicLink()) {
    console.error(`Symbolic link: "${i}"`);
    any = true;
  }
}

if (any) process.exit(-1);
