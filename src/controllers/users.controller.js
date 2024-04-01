const userService = require("../services/users.service");
const User = require("../models/user.model");
const getListUsers = async (request, response) => {
  try {
    const users = await userService.getListUsers$();
    response
      .status(200)
      .json({ message: "Lấy danh sách thành công!!", data: users });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};
const getUserById = async (request, response) => {
  try {
    const { params } = request;
    const user = await userService.getUserById$(params);
    if (user[0]) {
      response.status(200).json({
        message: "Lấy user id thành công!!",
        data: user[0],
      });
    } else {
      response.status(200).json({
        message: "Không tìm thấy user id!!",
      });
    }
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};
const createUser = async (request, response) => {
  try {
    const { body } = request;
    const results = await userService.createUser$(body);
    const { rows } = results;
    if (rows[0]) {
      const user = new User(
        rows[0].id,
        rows[0].employeeCode,
        rows[0].age,
        rows[0].createdDate,
        rows[0].avatarFileName,
        rows[0].avatarFileData
      );
      response.status(201).json({
        data: user,
        message: "A user created successfully",
      });
    } else {
      response.status(400).json({
        message: "Có lỗi xẩy ra trong quá trình tạo",
      });
    }
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

const updateUser = async (request, response) => {
  try {
    const { params, body } = request;
    const { id } = params;
    const results = await userService.updateUser$(params, body);
    const { rows } = results;
    response.status(200).json({
      message: `User modified with ID: ${id}`,
    });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};
const deleteUser = async (request, response) => {
  try {
    const { params, body } = request;
    const { id } = params;
    try {
      const result = await userService.deleteUserById$(params);
      response.status(200).send(`User deleted with ID: ${id}`);
    } catch (error) {
      response.status(404).json({
        message: "Không tìm thấy user id",
      });
    }
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};
const createMultipleUser = async (request, response) => {
  try {
    const employeeDataArray = request.body;
    const insertedUsers = await userService.createMultipleUsers$(
      employeeDataArray
    );
    response.status(201).json({
      message: "Employees inserted successfully",
      data: insertedUsers,
    });
  } catch (error) {
    console.error("Error inserting employees:", error);
    response.status(500).json({ message: "Error inserting employees" });
  }
};
const deleteMultipleUser = async (request, response) => {
  try {
    const userIds = request.body;
    await userService.deleteMultipleUser$(userIds);
    response.status(200).json({ message: "Users deleted successfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    response.status(500).json({ message: "Error deleting users" });
  }
};

const createUserWithAvatar = async (request, response) => {
  try {
    let { body, file } = request;
    // this code upload file with diskStorage file.path with diskStorage and file.buffer with memoryStorage
    // const binaryData = fs.readFileSync(file.path, { encoding: "base64" });
    // upload with memory storage
    const binaryData = file.buffer.toString("base64");
    body = {
      ...body,
      avatarFileData: binaryData,
      avatarFileName: file.originalname,
    };
    const results = await userService.createUserWithAvatar$(body);
    const { rows } = results;
    if (rows[0]) {
      response.status(201).json({
        data: results.rows[0],
        message: "A user created with avatar successfully",
      });
    } else {
      response.status(400).json({
        message: "Có lỗi xẩy ra trong quá trình tạo",
      });
    }
  } catch (error) {
    response
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};
module.exports = {
  getListUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createMultipleUser,
  deleteMultipleUser,
  createUserWithAvatar,
};
