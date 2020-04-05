const path = require("path");
const cp = require("child_process");
const fs = require("fs");
const ROOT = __dirname;

const downloadAndUnzipVSCode = require("vscode-test").downloadAndUnzipVSCode;

const testsWorkspace = path.resolve(ROOT, "testdata");
const testsFolder = path.resolve(ROOT, "out", "test", "extension");
const extensionsFolder = ROOT;

function runTests(executablePath) {
  const args = [
    testsWorkspace,
    "--extensionDevelopmentPath=" + extensionsFolder,
    "--extensionTestsPath=" + testsFolder,
    "--locale=en",
    "--disable-extensions"
  ];

  console.log(
    "Running extension tests: " + [executablePath, args.join(" ")].join(" ")
  );

  const cmd = cp.spawn(executablePath, args);

  cmd.stdout.on("data", function(data) {
    console.log(data.toString());
  });

  cmd.stderr.on("data", function(data) {
    console.error(data.toString());
  });

  cmd.on("error", function(data) {
    console.log("Failed to execute tests: " + data.toString());
  });

  cmd.on("close", function(code) {
    console.log("Tests exited with code: " + code);

    if (code !== 0) {
      process.exit(code); // propagate exit code to outer runner
    }
  });
}

async function downloadExecutableAndRunTests() {
  if (process.platform === "win32") {
    console.log("TODO: something is wrong on windows")
    return;
  }
  try {
    const exePath = await downloadAndUnzipVSCode();
    runTests(exePath);
  } catch (err) {
    console.error("Failed to run test with error:");
    console.log(err);
    process.exit(1);
  }
}

downloadExecutableAndRunTests();
