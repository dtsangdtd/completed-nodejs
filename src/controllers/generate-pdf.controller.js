const fs = require("fs");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const { injectDataIntoTemplate } = require("../utils/helper");

const generatePdfTemplate = async (request, response) => {
  try {
    const templatePath = "src/shared/template/example-template.html";
    // Load the HTML template
    const htmlContent = fs.readFileSync(templatePath, "utf-8");
    const fieldData = {
      employeeCode: "sangdt",
    };
    const employees = [
      { employeeCode: "001", age: "12" },
      { employeeCode: "002", age: "23" },
      // Add more employee data as needed
    ];

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Inject field data into the HTML template
    // let injectedHtml = injectDataIntoTemplate(htmlContent, fieldData);
    // fill data into table
    let injectedHtml = handlebars.compile(htmlContent);
    const html = injectedHtml({ employees, ...fieldData });
    // Set the HTML content of the page
    await page.setContent(html);
    // Generate PDF
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    response.setHeader("Content-Type", "application/pdf");
    response.setHeader(
      "Content-Disposition",
      "attachment; filename=example.pdf"
    );
    // Send the PDF buffer as response
    response.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    response.status(500).json({ message: "Error generating PDF" });
  }
};

module.exports = { generatePdfTemplate };
