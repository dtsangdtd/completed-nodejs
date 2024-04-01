const express = require("express");
const { importExcelListUser } = require("../controllers/import-excel.controller");
const { uploadExcelMiddleware } = require("../middlewares/file.middleware");

const router = express.Router();

router.post("/users-list", uploadExcelMiddleware, importExcelListUser);

module.exports = router;
