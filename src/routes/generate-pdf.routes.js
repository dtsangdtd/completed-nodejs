const express = require("express");
const { generatePdfTemplate } = require("../controllers/generate-pdf.controller");

const router = express.Router();

router.get("/example-template", generatePdfTemplate)

module.exports = router;