const express = require("express");
const { exportExcelUser } = require("../controllers/export-excel.controller");


const router = express.Router();

router.get("/users-list", exportExcelUser)

module.exports = router;