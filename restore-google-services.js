const fs = require("fs");
const path = require("path");

const googleServicesJsonPath = process.env.GOOGLE_SERVICES_JSON_PATH;

if (!googleServicesJsonPath) {
  throw new Error("GOOGLE_SERVICES_JSON_PATH environment variable is missing.");
}

const sourcePath = path.resolve(process.cwd(), googleServicesJsonPath);
const targetPath = path.join(process.cwd(), "google-services.json");

if (!fs.existsSync(sourcePath)) {
  throw new Error(`google-services.json not found at ${sourcePath}`);
}

fs.copyFileSync(sourcePath, targetPath);

console.log(`google-services.json has been restored to ${targetPath}`);