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
    console.log(req.body);
    console.log(req.files);
    const { websiteUrl, appName, primaryColor, secondaryColor } = req.body;

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
      res.json({ success: true, apkPath });
    } catch (error) {
      res.status(500).json({ error: "Failed to build APK" });
    }
  }
);

app.get("/download-apk/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, "builds", filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
    fs.remove(path.join(__dirname, 'projects', filename.replace('.apk', '')));
  } else {
    if (fs.existsSync(filePath)){
      fs.remove(path.join(__dirname, 'projects', filename.replace('.apk', '')));
    }
    res.status(404).json({ error: "APK file not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
