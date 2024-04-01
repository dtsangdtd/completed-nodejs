const pool = require("../services/database");
const excelJS = require("exceljs");

const exportExcelUser = (request, response) => {
  pool.query(
    `SELECT * FROM users ORDER BY "createdDate" ASC`,
    async (error, results) => {
      if (error) {
        throw error;
      }
      const workbook = new excelJS.Workbook();
      const worksheet = workbook.addWorksheet("Users"); // Name of the worksheet
      // Define columns in the worksheet
      worksheet.getRow(2).values = ["id", "employeeCode", "age", "createdDate"];
      worksheet.columns = [
        { header: "Id", key: "id", width: 40 },
        { header: "Code", key: "employeeCode", width: 25 },
        { header: "Age", key: "age", width: 25 },
        { header: "Created By", key: "createdDate", width: 25 },
      ];
      // Add data to the worksheet
      results.rows.forEach((user) => {
        worksheet.addRow({
          id: user.id,
          employeeCode: user.employeeCode,
          age: user.age,
          createdDate: user.createdDate,
        });
      });
      worksheet.mergeCells("A1", "D1"); // Extend cell over all column headers
      const wsTitle = `Danh sách users`;
      const titleCell = worksheet.getCell(`A1`);
      titleCell.value = wsTitle; // Assign title to cell A1
      titleCell.alignment = { horizontal: "center" };
      titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" } // Yellow background color
      };
      // Set up the response headers
      const dateTime = new Date().getTime()
      response.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      response.setHeader(
        "Content-Disposition",
        "attachment; filename=" + `users-${dateTime}.xlsx`
      );

      // Write the workbook to the response object
      await workbook.xlsx.write(response);
      response.end();
    }
  );
};
module.exports = {
  exportExcelUser,
};
