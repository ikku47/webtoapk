const { exec } = require("child_process");
const fs = require("fs-extra");
const path = require("path");

async function buildAPK(
  websiteUrl,
  appName,
  primaryColor,
  secondaryColor,
  applogo,
  splashScreen
) {
  const projectDir = path.join(
    __dirname,
    "projects",
    appName.replace(/\s+/g, "_").toLowerCase()
  );

  try {
    // Step 1: Create a new directory for the project
    await fs.ensureDir(projectDir);
    process.chdir(projectDir);

    // Step 2: Initialize a new Capacitor project
    await executeCommand("bun init -y");
    await executeCommand(
      "bun add @capacitor/core @capacitor/cli @capacitor/android"
    );
    await executeCommand(
      'bunx cap init "' +
        appName +
        '" com.example.' +
        appName.toLowerCase().replace(/\s+/g, "")
    );

    // Step 3: Create a simple index.html that loads the website in an iframe
    //  const res = await fetch(websiteUrl);
    //  const indexHtml = await res.text();
    const indexHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${appName}</title>
                <style>
                    body, html { margin: 0; padding: 0; height: 100%; }
                    iframe { width: 100%; height: 100%; border: none; }
                </style>
            </head>
            <body>
                <iframe src="${websiteUrl}"></iframe>
            </body>
            </html>
        `;
    const wwwDir = path.join(projectDir, "www");
    await fs.ensureDir(wwwDir);
    await fs.writeFile(path.join(wwwDir, "index.html"), indexHtml);

    await fs.ensureFile(path.join(projectDir, "public", "index.html"));
    await fs.writeFile(
      path.join(projectDir, "public", "index.html"),
      indexHtml
    );

    // Step 4: Add Android platform
    await executeCommand("bunx cap add android");

    // Step 5: Modify Android theme colors
    const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
            <resources>
                <color name="colorPrimary">${primaryColor}</color>
                <color name="colorPrimaryDark">${primaryColor}</color>
                <color name="colorAccent">${secondaryColor}</color>
            </resources>`;
    await fs.ensureFile(
      path.join(
        projectDir,
        "android",
        "app",
        "src",
        "main",
        "res",
        "values",
        "colors.xml"
      )
    );
    await fs.writeFile(
      path.join(
        projectDir,
        "android",
        "app",
        "src",
        "main",
        "res",
        "values",
        "colors.xml"
      ),
      colorsXml
    );

    // Step 6: Modify Android splash screen
    await executeCommand("bun add -D @capacitor/assets");
    // only in case of mac m1 and rest...
    process.chdir(path.join(projectDir, "node_modules","sharp"));
    await executeCommand("bun i");

    process.chdir(projectDir);
    const splashImage = path.join(__dirname, splashScreen.path);
    await fs.ensureDir(path.join(projectDir, 'assets'))
    await fs.copy(splashImage, path.join(projectDir, 'assets', 'splash.png'));
    await fs.copy(splashImage, path.join(projectDir, 'assets', 'splash-dark.png'));
    // Step 7: Modify Android app logo
    const applogoImage = path.join(__dirname, applogo.path);
    await fs.copy(applogoImage, path.join(projectDir, 'assets', 'icon-only.png'));
    await fs.copy(applogoImage, path.join(projectDir, 'assets', 'icon-foreground.png'));
    await fs.copy(applogoImage, path.join(projectDir, 'assets', 'icon-background.png'));
    await executeCommand("bunx capacitor-assets generate --android");
    

    // Step 8: Build the Android app
    await executeCommand("bunx cap sync android");
    process.chdir(path.join(projectDir, "android"));
    await executeCommand("./gradlew assembleDebug");

    // Step 9: Move the APK to a known location
    const apkSource = path.join(
      projectDir,
      "android",
      "app",
      "build",
      "outputs",
      "apk",
      "debug",
      "app-debug.apk"
    );
    const apkDestination = path.join(
      __dirname,
      "builds",
      `${appName.replace(/\s+/g, "_").toLowerCase()}.apk`
    );
    await fs.move(apkSource, apkDestination, { overwrite: true });

    return apkDestination;
  } catch (error) {
    console.error("Error building APK:", error);
    throw error;
  }
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve(stdout);
      }
    });
  });
}

module.exports = { buildAPK };
