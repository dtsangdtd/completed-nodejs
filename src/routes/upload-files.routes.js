const express = require("express");
const router = express.Router();
// 
const {  handleDeleteFiles, handleGetFiles, handleUploadMultiFiles } = require("../controllers/upload-files.controller");
const { uploadMultipleFilesMiddleware } = require("../middlewares/file.middleware");

// nên đặt middleware trước vì middleware chịu trách nhiệm kiểm tra vaidation file xử lý file dễ sử dụng lại, và handle uploading xử lý logic sau đó
router.post("/upload-multiple", uploadMultipleFilesMiddleware,handleUploadMultiFiles );

router.get("/", handleGetFiles )
router.delete("/", handleDeleteFiles);
module.exports = router;