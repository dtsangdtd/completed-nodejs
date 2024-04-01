const express = require("express");
const {
  getListUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  createMultipleUser,
  deleteMultipleUser,
  createUserWithAvatar,
} = require("../controllers/users.controller");
const { uploadFileAvatarMiddleware } = require("../middlewares/file.middleware");

const router = express.Router();
// phải move route con lên trên đầu thì nó mới chạy đúng function
//This issue occurs because Express evaluates routes in the order they are defined. When a request comes in, Express matches the request URL against each defined route in the order they were defined. Once a match is found, Express invokes the corresponding route handler and stops further matching.
// Tạo user kèm avatar with binary
router.post("/user-with-avatar", uploadFileAvatarMiddleware, createUserWithAvatar);
//Tạo nhiều user
router.post("/mutiple-users", createMultipleUser);
//Xóa nhiều user
router.delete("/mutiple-users", deleteMultipleUser);

//Lấy danh sách users
router.get("/", getListUsers);
//Lấy user by id theo params
router.get("/:id", getUserById);
//Tạo user
router.post("/", createUser);
//Cập nhật user
router.put("/:id", updateUser);
//Delete user
router.delete("/:id", deleteUser);

module.exports = router;
