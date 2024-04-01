const excelJS = require("exceljs");
const validateExcelData = (workbook, worksheet) => {
  let hasError = false;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 2) {
      let isValid = true;
      row.eachCell((cell, colNumbers) => {
        if (colNumbers === 2 && cell.type !== excelJS.ValueType.String) {
          console.log(cell.value);
          isValid = false;
          const cellV = worksheet.getCell(cell.address);
          cellV.value = `Cell ${cell.address} must contain a string value`;
        }
        if (colNumbers === 3 && cell.type !== excelJS.ValueType.Number) {
          console.log(cell.value);
          isValid = false;
          const cellV = worksheet.getCell(cell.address);
          cellV.value = `Cell ${cell.address} must contain a number value`;
        }
      });
      if (!isValid) {
        hasError = true;
      }
    }
  });

  return hasError;
};
const injectDataIntoTemplate = (htmlContent, fieldData) => {
  // Replace placeholders in the HTML template with field data
  for (const [key, value] of Object.entries(fieldData)) {
    htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
  }
  return htmlContent;
};
module.exports = { validateExcelData, injectDataIntoTemplate };
