#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const SERVICE_WORKER_BUILD_PATH = path.resolve(
  __dirname,
  "src/oauth-service-worker.js"
);

const REDIRECT_HTML_BUILD_PATH = path.resolve(
  __dirname,
  "src/oauth-redirect.html"
);

const CWD = process.cwd();
const args = process.argv.slice(2);
const publicDir = args[1] || "./public";

// When running as a part of "postinstall" script, "cwd" equals the library's directory.
// The "postinstall" script resolves the right absolute public directory path.
const absolutePublicDir = path.isAbsolute(publicDir)
  ? publicDir
  : path.resolve(CWD, publicDir);

const dirExists = fs.existsSync(absolutePublicDir);

if (!dirExists) {
  // print error and exit
  console.log("Public directory does not exist!");
  process.exit(1);
}

console.log(
  'Initializing the OAuth2 Service Worker at "%s"...',
  absolutePublicDir
);

function copyFile(buildPath) {
  const fileName = path.basename(buildPath);
  const destinationFilePath = path.resolve(absolutePublicDir, fileName);

  fs.copyFileSync(buildPath, destinationFilePath);
}

copyFile(SERVICE_WORKER_BUILD_PATH);
console.log("oauth-service-worker successfully created!");

copyFile(REDIRECT_HTML_BUILD_PATH);
console.log("oauth-redirect.html successfully created!");
