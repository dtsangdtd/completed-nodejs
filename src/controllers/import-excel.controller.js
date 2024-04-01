const excelJS = require("exceljs");
const userService = require("../services/users.service");
const User = require("../models/user.model");

const importExcelListUser = async (request, response) => {
  try {
    const { file } = request;
    const workbook = new excelJS.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.getWorksheet(1);
    // If no errors, proceed with creating users
    let excelData = worksheet.getSheetValues();
    excelData = excelData.reduce(
      (prevValue, currentValue, currentIndex, arrray) => currentIndex > 2 ? [
        ...prevValue,
        {
          employeeCode: currentValue[2],
          age: currentValue[3],
        },
      ] : [],
      []
    );
    const insertedUsers = await userService.createMultipleUsers$(excelData);
    response.status(201).json({
      message: "Employees inserted successfully",
      data: insertedUsers,
    });
  } catch (error) {
    console.error("Error inserting employees:", error);
    response.status(500).json({ message: "Error inserting employees" });
  }
};
module.exports = {
  importExcelListUser,
};
