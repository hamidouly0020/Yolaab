const fs = require("fs");
const path = require("path");

const distSrcMain = path.join(__dirname, "..", "dist", "src", "main.js");
const distMain = path.join(__dirname, "..", "dist", "main.js");

if (!fs.existsSync(distSrcMain)) {
  console.error(
    "Cannot create dist/main.js because dist/src/main.js is missing. Run the build first.",
  );
  process.exit(1);
}

fs.copyFileSync(distSrcMain, distMain);
console.log("Created dist/main.js from dist/src/main.js");
