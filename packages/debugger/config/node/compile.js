const config = require("../defaults");
const path = require("path");
const deepClone = require("lodash/cloneDeep");
const fs = require("fs");
const cacheId = require("../cacheId");
const {
  normalizeDrive,
  normalizePath,
  cancelInterrupt,
  statusBuf
} = require("../../state");

const babel = require("@babel/core");
const preset = require("../babel/preset-zero-config");

let watch = function(filename, handler) {
  fs.watch(filename, { persistent: false, encoding: "utf-8" }, type => {
    handler(type);
  });
};
if (!process.env.EFFECTFUL_DISABLE_WATCH_WORKER) {
  try {
    const { Worker } = require("worker_threads");
    const worker = new Worker(path.join(__dirname, "reloadWorker.js"), {
      workerData: statusBuf
    });
    const status = new Int32Array(statusBuf);
    const files = new Map();
    worker.on("message", function({ type, filename }) {
      Atomics.add(status, 0, -1);
      const handler = files.get(filename);
      if (handler) handler(type);
    });
    watch = function(filename, handler) {
      files.set(filename, handler);
      worker.postMessage(filename);
    };
    worker.unref();
  } catch (e) {
    console.error("couldn't set up a file watching worker", e);
  }
}

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

let disabled = false;

require.extensions[".ts"] = require.extensions[".tsx"] = require.extensions[
  ".jsx"
] = require.extensions[".js"];

const debuggerPath = normalizeDrive(
  fs.realpathSync(path.join(__dirname, "../../"))
);

const requirePath =
  path.sep === "\\"
    ? function requirePath(rt) {
        return rt || path.join(debuggerPath, "vscode").replace(/\\/g, "/");
      }
    : function requirePath(rt) {
        return rt || path.join(debuggerPath, "vscode");
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
    if (config.verbose > 1) log("DEBUGGER: saving babel cache");
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

module.exports = function compile(content, filename, module) {
  filename = normalizeDrive(filename);
  const ext = path.extname(filename);
  const fileTest = normalizePath(filename);
  const blackbox = config.blackbox.test(fileTest);
  if (
    disabled ||
    ext === ".json" ||
    (config.instrumentDeps && fileTest.startsWith(config.runtimePackages)) ||
    (config.exclude && config.exclude.test(fileTest)) ||
    !((config.instrumentDeps && blackbox) || config.include.test(fileTest))
  ) {
    if (config.verbose > 2)
      log(`DEBUGGER: loading without instrumentation ${filename}`);
    return null;
  }
  const moduleConfig = require("../defaults");
  const rt = requirePath(moduleConfig.runtime);
  if (config.verbose > 1) {
    let msg = `DEBUGGER: compiling ${filename}, filename:${filename}, rt:${rt}`;
    if (config.verbose > 2) msg += ` content:${JSON.stringify(content)}`;
    log(msg);
  }
  disabled = true;
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
        if (config.verbose > 1) {
          let msg = "DEBUGGER: Rebuilding";
          if (!cached) {
            msg += "(not in cache)";
          } else {
            if (config.verbose > 2) msg += `, key:{${cacheKey}}`;
            else msg += ` (${cached.mtime} < ${curMtime})`;
          }
          log(msg);
        }
        const event =
          (global[config.globalNS] && global[config.globalNS].event) ||
          function() {};
        const progressId = `Compiling: ${path.relative(
          config.srcRoot,
          filename
        )}`;
        event("progressStart", { progressId, title: progressId });
        try {
          cached = babel.transformSync(content, opts);
        } finally {
          event("progressEnd", { progressId });
        }
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
        if (config.verbose > 1) {
          let msg = "DEBUGGER: Using the cached version";
          if (config.verbose > 2) msg += `: key:{${cacheKey}}`;
          log(msg);
        }
      }
      code = "/*!EDBG!*/" + cached.code;
    } else code = content;
    if (module && config.hot && !blackbox) {
      let reloading = 0;
      if (config.verbose > 1)
        console.log(`DEBUGGER: enabling hot swapping for ${filename}`);
      watch(filename, type => {
        const nextMtime = mtime(filename);
        if (config.verbose > 1)
          console.log(
            `DEBUGGER: updating ${filename}`,
            type,
            curMtime,
            nextMtime
          );
        if (type !== "change" || curMtime === nextMtime) return;
        curMtime = nextMtime;
        if (reloading) clearTimeout(reloading);
        cancelInterrupt();
        reloading = setTimeout(() => {
          reloading = 0;
          if (config.verbose) console.log(`DEBUGGER: Reloading ${filename}`);
          const progressId = `Re-compiling: ${path.relative(
            config.srcRoot,
            filename
          )}`;
          try {
            disabled = true;
            let run;
            const event =
              (global[config.globalNS] && global[config.globalNS].event) ||
              function() {};
            try {
              content = fs.readFileSync(filename, "utf-8");
              if (config.instrument) {
                event("progressStart", { progressId, title: progressId });
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
              event("progressEnd", { progressId });
              disabled = false;
            }
            run(
              module.exports,
              module.__effectful_js_require,
              module,
              filename,
              path.dirname(filename)
            );
          } catch (e) {
            console.log(`DEBUGGER: Error on building:${filename}`, e);
          }
        }, 500);
      });
    }

    if (config.verbose > 1) {
      if (config.verbose > 2)
        log(`DEBUGGER:compiled ${filename}: ${JSON.stringify(code)}`);
      else log(`DEBUGGER: ${filename} is compiled`);
    }
  } finally {
    disabled = false;
  }
  return code;
};
