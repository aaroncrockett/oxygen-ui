const fs = require("fs").promises;

// If we use this file is because we are copying settings and or types into two or more sub dirs.
const settingsSrcFile = "./settings.ts";
// const settingsTargetFiles = ["", ""];

const typesSrcFile = "./types.ts";
// const typesTargetFiles = ["", ""];

async function copyFiles(sourceFile, targetFiles) {
  const promises = targetFiles.map(async (targetFile) => {
    try {
      await fs.copyFile(sourceFile, targetFile);
      console.log(`File copied to ${targetFile}`);
    } catch (err) {
      console.log(`Error: Could not copy file to ${targetFile}`);
      console.error(err);
    }
  });

  await Promise.all(promises);
}
