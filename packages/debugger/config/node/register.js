const config = require("../defaults");
const Persist = require("../../persist");
const path = require("path");
const deepClone = require("lodash/cloneDeep");
// const Debug = require("../../engine");
const fs = require("fs");
const cacheId = require("../cacheId");
const {
  normalizeDrive,
  saved: { Function }
} = require("../../state");

const babel = require("@babel/core");
const preset = require("../babel/preset-zero-config");

global.WebSocket = require("ws");

const Module = module.constructor;

const Mp = Module.prototype;

const savedCompile = Mp._compile;

// const savedConsole = console;

const builtIn = Module.builtinModules.filter(i => {
  switch (i) {
    case "sys":
      return false;
  }
  if (/^(?:v8|node-inspect)\//g.test(i)) return false;
  return true;
});

let babelOpts = config.babelOpts || {};

babelOpts = {
  ...babelOpts,
  caller: {
    name: "@effectful/debugger",
    ...(babelOpts.caller || {})
  }
};

const log = (...args) => console.log(...args);

function mtime(filename) {
  return +fs.statSync(filename).mtime;
}

for (const i of builtIn) {
  Persist.regModule(require(i), `node#{i}`);
}

let disabled = false;

const root = path.resolve(config.srcRoot);

const nodeModules = normalizeDrive(path.join(config.srcRoot, "node_modules"));

require.extensions[".ts"] = require.extensions[".tsx"] = require.extensions[
  ".jsx"
] = require.extensions[".js"];

const rootPath = normalizeDrive(fs.realpathSync(root));

const debuggerPath = normalizeDrive(
  fs.realpathSync(path.join(__dirname, "../../"))
);

const requirePath =
  path.sep === "\\"
    ? function requirePath(backend) {
        return config.builtInBackends[backend]
          ? path.join(debuggerPath, "backends", backend).replace(/\\/g, "/")
          : backend;
      }
    : function requirePath(backend) {
        return config.builtInBackends[backend]
          ? path.join(debuggerPath, "backends", backend)
          : backend;
      };

let cacheSaveScheduled = false;

const findCacheDir = require("find-cache-dir");
const makeDir = require("make-dir");
const os = require("os");

const DEFAULT_CACHE_DIR =
  findCacheDir({
    name: "@effectful/debugger"
  }) ||
  os.homedir() ||
  os.tmpdir();

const DEFAULT_FILENAME = path.join(
  DEFAULT_CACHE_DIR,
  `.babel.${babel.version}.${babel.getEnv()}.json`
);

const FILENAME = process.env.BABEL_CACHE_PATH || DEFAULT_FILENAME;

// copy-pasted from @babel/register but with ability to merge
function saveCache() {
  if (!cacheSaveScheduled || !config.cache) return;
  cacheSaveScheduled = false;
  let serialised = "{}";
  const data = loadCache() || {};
  Object.assign(data, cacheData);
  try {
    serialised = JSON.stringify(data, null, "  ");
  } catch (err) {
    if (err.message === "Invalid string length") {
      err.message = "Cache too large so it's been cleared.";
      console.error(err.stack);
    } else {
      throw err;
    }
  }
  try {
    makeDir.sync(path.dirname(FILENAME));
    fs.writeFileSync(FILENAME, serialised);
  } catch (e) {
    switch (e.code) {
      case "EACCES":
      case "EPERM":
        console.warn(`Babel could not write cache to file: ${FILENAME} 
due to a permission issue. Cache is disabled.`);
        config.cache = false;
        break;

      case "EROFS":
        console.warn(`Babel could not write cache to file: ${FILENAME} 
because it resides in a readonly filesystem. Cache is disabled.`);
        config.cache = false;
        break;

      default:
        throw e;
    }
  }
}

function loadCache() {
  if (!config.cache) return null;
  let cacheContent;
  try {
    cacheContent = fs.readFileSync(FILENAME);
  } catch (e) {
    switch (e.code) {
      case "EACCES":
        console.warn(`Babel could not read cache file: ${FILENAME}
due to a permission issue. Cache is disabled.`);
        config.cache = false;
      default:
        return null;
    }
  }
  try {
    return JSON.parse(cacheContent);
  } catch (_unused) {
    return null;
  }
}

const cacheData = loadCache();

Mp._compile = function _compile(content, filename) {
  filename = normalizeDrive(filename);
  const ext = path.extname(filename);
  if (
    disabled ||
    ext === ".json" ||
    (config.instrumentDeps && filename.startsWith(config.extensionRoot)) ||
    !(
      (config.instrumentDeps && filename.startsWith(nodeModules)) ||
      filename.startsWith(rootPath)
    )
  ) {
    if (config.verbose > 1)
      log(`DEBUGGER: loading without instrumentation ${filename}`);
    return savedCompile.call(this, content, filename);
  }
  const blackbox = filename.startsWith(nodeModules);
  const moduleConfig = require("../defaults");
  const rt = requirePath(moduleConfig.backend);
  if (config.verbose) {
    let msg = `DEBUGGER: compiling ${filename}, filename:${filename}, rt:${rt}`;
    if (config.verbose > 1) msg += ` content:${JSON.stringify(content)}`;
    log(msg);
  }
  disabled = true;
  let result;
  let cached;
  let code;
  let curMtime = mtime(filename);
  let opts;
  let cacheKey;
  try {
    if (config.instrument) {
      opts = new babel.OptionManager().init(
        config.zeroConfig
          ? {
              presets: [
                [
                  preset,
                  {
                    blackbox,
                    timeTravel: config.timeTravel,
                    rt,
                    staticBundler: false
                  }
                ]
              ],
              babelrc: false,
              configFile: false,
              ...babelOpts,
              filename
            }
          : {
              sourceRoot: path.dirname(filename),
              ...deepClone(babelOpts),
              filename
            }
      );
      cacheKey = `${filename}@${cacheId}`;
      const env = babel.getEnv(false);
      if (env) cacheKey += `@${env}`;
      cached = cacheData && cacheData[cacheKey];
      if (!cached || cached.mtime !== curMtime) {
        if (config.verbose) {
          let msg = "DEBUGGER: Rebuilding";
          if (!cached) {
            msg += "(not in cache)";
          } else {
            if (config.verbose > 1) msg += `, key:{${cacheKey}}`;
            else msg += ` (${cached.mtime} < ${curMtime})`;
          }
          log(msg);
        }
        cached = babel.transformSync(content, opts);
        if (cacheData) {
          cacheData[cacheKey] = cached;
          cached.mtime = mtime(filename);
        }
        if (config.cache && !cacheSaveScheduled) {
          cacheSaveScheduled = true;
          process.on("exit", saveCache);
          process.nextTick(saveCache);
        }
      } else {
        if (config.verbose) {
          let msg = "DEBUGGER: Using the cached version";
          if (config.verbose > 1) msg += `: key:{${cacheKey}}`;
          log(msg);
        }
      }
      code = cached.code;
    } else code = content;
    require("./vm");
    if (config.hot && !blackbox) {
      let reloading = 0;
      if (config.verbose)
        log(`DEBUGGER: enabling hot swapping for ${filename}`);
      fs.watch(filename, { persistent: false, encoding: "utf-8" }, type => {
        const nextMtime = mtime(filename);
        if (config.verbose)
          log(`DEBUGGER: updating ${filename}`, type, curMtime, nextMtime);
        if (type !== "change" || curMtime === nextMtime) return;
        curMtime = nextMtime;
        if (reloading) clearTimeout(reloading);
        reloading = setTimeout(() => {
          reloading = 0;
          if (config.verbose) log(`DEBUGGER: Reloading ${filename}`);
          try {
            disabled = true;
            let run;
            try {
              content = fs.readFileSync(filename, "utf-8");
              if (config.instrument) {
                cached = babel.transformSync(content, opts);
                if (cacheData) {
                  cacheData[cacheKey] = cached;
                  cached.mtime = curMtime;
                }
                code = cached.code;
              } else code = content;
              run = new Function(
                "exports",
                "require",
                "module",
                "__filename",
                "__dirname",
                code
              );
            } finally {
              disabled = false;
            }
            run(
              this.exports,
              this.__effectful_js_require,
              this,
              filename,
              path.dirname(filename)
            );
          } catch (e) {
            log(`DEBUGGER: Error on building:${filename}`, e);
          }
        }, 500);
      });
    }
    if (config.verbose) {
      if (config.verbose > 1)
        log(`DEBUGGER:compiled ${filename}: ${JSON.stringify(code)}`);
      else log(`DEBUGGER: ${filename} is compiled`);
    }
  } finally {
    disabled = false;
  }
  result = savedCompile.call(this, code, filename);
  return result;
};
