// uploadMiddleware.js
const excelJS = require("exceljs");
const multer = require("multer");
const helper = require("../utils/helper");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const memoryStorage = multer.memoryStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadToDisk = multer({ storage: diskStorage });

const uploadToMemory = multer({ storage: memoryStorage });

const uploadMultipleFilesMiddleware = (req, res, next) => {
  uploadToDisk.array("files", 12)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading
      return response.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading
      return response.status(500).json({ error: "An unknown error occurred" });
    }
    // Everything went fine, move to the next middleware
    next();
  });
};
const uploadFileAvatarMiddleware = async (request, response, next) => {
  try {
    // Call the multer middleware asynchronously using await
    uploadToMemory.single("avatarFileData")(request, response, (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return response.status(500).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading
        return response
          .status(500)
          .json({ error: "An unknown error occurred" });
      }
      // Everything went fine, move to the next middleware
      next();
    });
    // Once the multer middleware finishes, call next()
  } catch (error) {
    // Handle any errors that occur during file upload
    next(error);
  }
};
const uploadExcelMiddleware = (req, res, next) => {
  try {
    const { file } = req;
    uploadToMemory.single("excelFile")(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return response.status(500).json({ error: err.message });
      } else if (err) {
        // An unknown error occurred when uploading
        return response
          .status(500)
          .json({ error: "An unknown error occurred" });
      }
      const workbook = new excelJS.Workbook();
      await workbook.xlsx.load(file.buffer);
      const worksheet = workbook.getWorksheet(1);
      // If there was an error, send the modified workbook as response
      const hasError = helper.validateExcelData(workbook, worksheet);
      if (hasError) {
        const dateTime = new Date().getTime();
        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
          "Content-Disposition",
          "attachment; filename=" + `users-${dateTime}.xlsx`
        );
        // Write the workbook to the response object
        await workbook.xlsx.write(res);
        return response.end();
      }
      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadMultipleFilesMiddleware,
  uploadFileAvatarMiddleware,
  uploadExcelMiddleware,
};
