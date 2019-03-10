const fs = require("fs");
const path = require("path");

exports.read = function read(dir) {
  function walk(dir, res) {
    var files, s;
    try {
      files = fs.readdirSync(dir);
    } catch (error) {
      console.log(`could not read dir ${dir}`, error);
    }
    for (const i of files) {
      if (i[i.length - 1] === "~") continue;
      const f = path.join(dir, i);
      try {
        s = fs.statSync(f);
      } catch (error1) {
        continue;
      }
      if (s.isDirectory()) {
        walk(f, (res[i] = {}));
        continue;
      }
      if (s.isFile()) {
        try {
          res[i] = fs.readFileSync(f, "utf-8");
        } catch (error) {
          console.warn(`could not read ${f}`, error);
        }
      }
    }
    return res;
  }
  return walk(dir, {});
};
