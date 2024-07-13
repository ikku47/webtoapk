const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const { buildAPK } = require("./buildAPK");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(express.static("public"));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({ extended: true,limit: '50mb' }));
fs.ensureDirSync(path.join(__dirname, "uploads"));
fs.ensureDirSync(path.join(__dirname, "builds"));
fs.ensureDirSync(path.join(__dirname, "projects"));

const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const upload = multer({storage});

app.post(
  "/build-apk",
  upload.fields([
    { name: "appLogo", maxCount: 1 },
    { name: "splashScreen", maxCount: 1 },
  ]),
  async (req, res) => {
    const { websiteUrl, appName, primaryColor, secondaryColor } = req.body;
    if (fs.existsSync(path.join(__dirname, 'builds', `${appName}.apk`))){
      const apkPath = path.join(
        __dirname,
        "builds",
        `${appName.replace(/\s+/g, "_").toLowerCase()}.apk`
      );
      return res.json({ success: true, apkPath });
    }

    if (!websiteUrl || !appName) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    try {
      const apkPath = await buildAPK(
        websiteUrl,
        appName,
        primaryColor,
        secondaryColor,
        req.files.appLogo[0],
        req.files.splashScreen[0],
      );
      fs.remove(path.join(__dirname, 'projects', appName));
      fs.remove(path.join(__dirname, req.files.appLogo[0].path));
      fs.remove(path.join(__dirname, req.files.splashScreen[0].path));
      res.json({ success: true, apkPath });
    } catch (error) {
      fs.remove(path.join(__dirname, 'projects', appName));
      res.status(500).json({ error: "Failed to build APK" });
    }
  }
);

app.get("/download-apk/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "builds", filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "APK file not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
