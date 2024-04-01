const fs = require("fs");
const path = require('path');

const handleDeleteFiles = (req, res, next) => {
  if (req.query.filename) {
    fs.readdirSync("./uploads").forEach((file) => {
      if (file === req.query.filename) {
        fs.rmSync(path.join("./uploads", req.query.filename));
        res.send("Xóa file thành công");
      } else {
        res.send("Không tìm thấy file để xóa");
      }
    });
  } else {
    throw err;
  }
};
const handleGetFiles = (req, res, next) => {
  console.log(req);
  fs.readdir("./uploads", (err, files) => {
    files.forEach((file) => {
      console.log(file);
    });
    if (files) {
      res.send(files);
    } else {
      throw err;
    }
  });
};
const handleUploadMultiFiles = (req, res) => {
  if (!req.files || req.files.length < 1) {
    return res.status(400).json({ error: "Vui lòng thêm ít nhất một file" });
  }
  // Check the MIME type of each file
  const allowedMimeTypes = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
  const invalidFiles = req.files.filter(file => !allowedMimeTypes.includes(file.mimetype));
  if (invalidFiles.length > 0) {
    const invalidFileNames = invalidFiles.map(file => file.originalname).join(", ");
    return res.status(400).json({ error: `Invalid file(s): ${invalidFileNames}` });
  }
  res.json({ message: "Files uploaded successfully" });
};
module.exports = {
  handleDeleteFiles,
  handleGetFiles,
  handleUploadMultiFiles
};
