/**
 * pre-instrumenting third party libraries
 */
const path = require("path");
const fs = require("fs").promises;
const babel = require("@babel/core");

const minimatch = require("minimatch");
const { promisify } = require("util");
const rimraf = promisify(require("rimraf"));
const mkdirp = require("mkdirp").sync;
const webpack = promisify(require("webpack"));

const coreJsFeatures = {
  "es.array.concat": 1,
  "es.array.copy-within": 1,
  "es.array.every": 3,
  "es.array.fill": 3,
  "es.array.filter": 3,
  "es.array.find-index": 3,
  "es.array.find": 3,
  "es.array.flat-map": 3,
  "es.array.flat": 1,
  "es.array.for-each": 3,
  "es.array.from": 3,
  "es.array.map": 3,
  "es.array.reduce-right": 3,
  "es.array.reduce": 3,
  "es.array.slice": 1,
  "es.array.splice": 1,
  "es.array.some": 3
  /*,
  "es.typed-array.every": 3,
  "es.typed-array.filter": 3,
  "es.typed-array.find-index": 3,
  "es.typed-array.find": 3,
  "es.typed-array.for-each": 3,
  "es.typed-array.from": 3,
  "es.typed-array.map": 3,
  "es.typed-array.reduce-right": 3,
  "es.typed-array.reduce": 3,
  "es.typed-array.some": 3*/
};

async function main() {
  const alias = {};
  const depsIndexJs = await fs.readFile("./deps-index-template.js", "utf-8");

  await Promise.all([
    config({ timeTravel: true }, "-t", 1),
    config({ timeTravel: false }, "-n", 2)
  ]);

  async function config(config, tag, flag) {
    const depsFolder = path.join(__dirname, `deps${tag}`);
    try {
      await rimraf(depsFolder);
    } catch (e) {
      console.error("couldn't remove deps folder", e);
    }
    mkdirp(depsFolder, {});

    await Promise.all([
      coreJs(),
      fs.writeFile(path.join(depsFolder, "index.js"), depsIndexJs),
      (async () => {
        await lib("asap", "asap.js", "**/*.js");
        await lib("promise", "lib/index.js", "lib/**/*.js");
        await lib("lodash", "lodash.js", "**/*.js");
        await lib("lodash.sortby", "index.js", "**/*.js");
      })(),
      (async () => {
        await lib("object-assign", "index.js");
        await lib("react", "cjs/react.development.js");
        await lib("scheduler", "cjs/scheduler.development.js");
        await lib("scheduler/tracing", "cjs/scheduler-tracing.development.js");
        await lib("react-dom", "cjs/react-dom.development.js");
        await lib(
          "react-dom/server",
          "cjs/react-dom-server.node.development.js"
        );
        await lib("react-is", "cjs/react-is.development.js");
      })()
    ]);
    await fs.writeFile("deps-aliases.json", JSON.stringify(alias, null, 2));

    async function coreJs() {
      const tempFile = `tmp-core-js${tag}.js`;

      const requires = [];
      const features = [];
      for (const [name, mask] of Object.entries(coreJsFeatures)) {
        if ((flag & mask) === 0) continue;
        features.push(
          `"${name
            .replace(/-/g, "")
            .split(".")
            .slice(1)
            .join(".")}"`
        );
        requires.push(`  require("core-js-pure/modules/${name}");`);
      }
      await fs.writeFile(
        tempFile,
        `require("core-js-pure/configurator")({
          usePolyfill:[${features.join(",\n   ")}]
        });
        ${requires.join("\n")}
        require("./polyfills")
        module.exports = require("core-js-pure/internals/path");
        `
      );
      const libRoot = await fs.realpath(
        path.join(__dirname, "node_modules", "core-js-pure")
      );
      await webpack({
        mode: "none",
        node: {
          global: false,
          process: false,
          setImmediate: false
        },
        entry: [path.join(__dirname, tempFile)],
        devtool: false,
        module: {
          rules: [
            {
              test: [libRoot, path.join(__dirname, "polyfills.js")],
              use: {
                loader: "babel-loader",
                options: {
                  plugins: [
                    [
                      "./transform",
                      {
                        blackbox: true,
                        preInstrumentedLibs: false,
                        rt: "debugger-api",
                        ...config
                      }
                    ]
                  ],
                  compact: false,
                  sourceMaps: false
                }
              }
            }
          ]
        },
        externals: {
          "debugger-api": "commonjs2 ../api.js"
        },
        output: {
          library: "corejs",
          libraryTarget: "commonjs2",
          path: depsFolder,
          filename: "core-js.js"
        }
      });
    }

    async function lib(name, main, include) {
      const rootPath = name.split("/");
      const root = rootPath[0];
      if (include) {
        await dirs();
      } else {
        await file(main);
      }
      alias[name] = `${name}/${main}`;

      async function compile(relPath) {
        const src = path.join(__dirname, "node_modules", root, relPath);
        const dst = path.join(__dirname, "deps" + tag, name, relPath);
        if (process.env.EFFECTFUL_VERBOSE)
          console.log(`compiling ${src} into ${dst}`);
        mkdirp(path.dirname(dst), { recursive: true });
        const moduleAliases = {};
        const depsRoot = Array(relPath.split("/").length + rootPath.length - 1)
          .fill("..")
          .join("/");
        for (const [lib, relPath] of Object.entries(alias))
          moduleAliases[lib] = `${depsRoot}/${relPath}`;
        const libOpts = {
          plugins: [
            [
              "./transform",
              {
                blackbox: true,
                preInstrumentedLibs: false,
                moduleAliases,
                rt: `${depsRoot}/../api.js`,
                ...config
              }
            ]
          ],
          compact: false
        };
        await fs.writeFile(
          dst,
          (await babel.transformFileAsync(src, libOpts)).code
        );
        return dst;
      }

      async function file(relPath) {
        await compile(relPath);
        const pathStr = `${root}/${relPath}`;
        alias[pathStr] = pathStr;
        if (pathStr.substr(pathStr.length - 3) === ".js")
          alias[pathStr.substr(0, pathStr.length - 3)] = pathStr;
      }

      async function dirs() {
        let files;
        await walk([]);

        async function walk(relPath) {
          const src = path.join(__dirname, "node_modules", root, ...relPath);
          try {
            files = await fs.readdir(src);
          } catch (error) {
            console.log(`could not read dir ${src}`, error);
          }
          await Promise.all(
            files.map(async function(i) {
              const f = path.join(src, i);
              let s;
              try {
                s = await fs.stat(f);
              } catch (error1) {
                return;
              }
              const nextPath = [...relPath, i];
              if (s.isDirectory()) {
                await walk(nextPath);
                return;
              }
              const pathStr = nextPath.join("/");
              if (!s.isFile() || !minimatch(pathStr, include)) return;
              await file(pathStr);
            })
          );
        }
      }
    }
  }
}

main();
