const { PREFIX_API, API_VERSION } = process.env;
const API_PREFIX_VERSION = `${PREFIX_API}${API_VERSION}`;
module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hyper backend NodeJS API with Swagger",
      version: "1.0.0",
      description: "Documentation for my Node.js API using Swagger",
      contact: {
        name: "DUONG THANH SANG", // your name
        email: "dtsangdtd@gmail.com", // your email
        url: "sangdt.com", // your website
      },
    },
    tags: [
      {
        name: "Files",
        description: "CRUD with files",
      },
      {
        name: "Hyper",
        description: "CRUD with Hyper",
      },
      {
        name: "Mutiple",
        description: "CRUD with Mutiple",
      },
    ],
    paths: {
      // [`${API_PREFIX_VERSION}/auth/google`]: {
      //   post: {
      //     tags: ["Login"],
      //     summary: "Đây là api login with google ",
      //     requestBody: {
      //       required: true,
      //       content: {
      //         "application/json": {
      //           schema: {
      //             type: "object",
      //             properties: {
      //               credential: {
      //                 type: "string",
      //               },
      //             },
      //           },
      //         },
      //       },
      //     },
      //     responses: {
      //       200: {
      //         description: "Login auth google",
      //         content: {
      //           "application/json": {
      //             example: {
      //               message: "Login successfuly!!!",
      //             },
      //           },
      //         },
      //       },
      //     },
      //   },
      // },
      [`${API_PREFIX_VERSION}/files`]: {
        get: {
          tags: ["Files"],
          summary: "Đây là api get files",
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: [
                      "1692693800759UNIT-Danh sach CLB Bong Da.xlsx",
                      "1692693800791Support.docx",
                    ],
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Files"],
          summary: "Đây là api delete file",
          parameters: [
            {
              name: "filename",
              in: "query",
              description: "Description of param1",
              required: true,
              type: "string",
            },
          ],
          responses: {
            200: {
              description: "Delete file successfully",
            },
            400: {
              description: "Bad request",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/files/upload-multiple`]: {
        post: {
          tags: ["Files"],
          summary: "Đây là api upload nhiều files",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    files: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "File uploaded successfully",
            },
            400: {
              description: "Bad request",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
        put: {
          tags: ["Files"],
          summary: "Đây là api cập nhật nhiều files",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    files: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "File uploaded successfully",
            },
            400: {
              description: "Bad request",
            },
            500: {
              description: "Internal server error",
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/users`]: {
        get: {
          tags: ["Hyper"],
          summary: "Đây là api get danh sách user hyper",
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: "Lấy danh sách thành công",
                    data: [
                      {
                        employeeCode: "sangdt",
                        age: "18",
                      },
                      {
                        employeeCode: "huytn",
                        age: "20",
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ["Hyper"],
          summary: "Đây là api tạo mới user ",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    employeeCode: {
                      type: "string",
                    },
                    age: {
                      type: "number",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    data: {
                      id: "75dfc054-e4f2-11ee-a96c-57895c3d37a5",
                      employeeCode: "string",
                      age: 0,
                      createdDate: "13:40:50.583157",
                      avatarFileData: null,
                      avatarFileName: null,
                    },
                    message: "A user created successfully",
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/users/{id}`]: {
        get: {
          tags: ["Hyper"],
          summary: "Đây là api get user by id ",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              type: "string", // Specify the type of the 'id' parameter
              description: "The ID of the user to retrieve",
              value: "e1a67174-47c8-11ee-bc6c-afa46e3a6914",
            },
          ],
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: "Lấy user id thành công!!",
                    data: {
                      id: "e1a67174-47c8-11ee-bc6c-afa46e3a6914",
                      employeeCode: "string",
                      age: "18",
                      createdDate: "13:37:39.987649",
                    },
                  },
                },
              },
            },
          },
        },
        put: {
          tags: ["Hyper"],
          summary: "Đây là api cập nhật user by id ",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              type: "string", // Specify the type of the 'id' parameter
              description: "The ID of the user to retrieve",
              value: "e1a67174-47c8-11ee-bc6c-afa46e3a6914",
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    employeeCode: {
                      type: "string",
                    },
                    age: {
                      type: "number",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: "Cập nhật user thành công!!",
                    data: {
                      id: "e1a67174-47c8-11ee-bc6c-afa46e3a6914",
                      employeeCode: "sangdt",
                      age: "55",
                      createdDate: "13:37:39.987649",
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Hyper"],
          summary: "Đây là api delete user by id ",
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              type: "string", // Specify the type of the 'id' parameter
              description: "The ID of the user to retrieve",
              value: "e1a67174-47c8-11ee-bc6c-afa46e3a6914",
            },
          ],
          responses: {
            200: {
              description: "Delete user thành công",
              content: {
                "application/json": {
                  example: {
                    message:
                      "User deleted with ID: 74d5e5ba-47c9-11ee-a56f-3b5df1ce97ff",
                    // data: {
                    //   id: "e1a67174-47c8-11ee-bc6c-afa46e3a6914",
                    //   employeeCode: "sangdt",
                    //   age: "55",
                    //   createdDate: "13:37:39.987649",
                    // },
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/users/mutiple-users`]: {
        post: {
          tags: ["Mutiple"],
          summary: "Đây là api tạo mới nhiều users cùng lúc ",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      employeeCode: {
                        type: "string",
                      },
                      age: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Employees inserted successfully",
              content: {
                "application/json": {
                  example: {
                    data: [
                      {
                        employeeCode: "sangdt",
                        age: "18",
                      },
                      {
                        employeeCode: "tuantn",
                        age: "20",
                      },
                    ],
                    message: "A user created successfully",
                  },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Mutiple"],
          summary: "Đây là api xóa nhiều users cùng lúc ",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Employees delete successfully!",
              content: {
                "application/json": {
                  example: {
                    message: "Users deleted successfully",
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/users/user-with-avatar`]: {
        post: {
          tags: ["User"],
          summary: "Đây là api tạo mới user kèm avatar ",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    employeeCode: {
                      type: "string",
                    },
                    age: {
                      type: "string",
                    },
                    avatarFileData: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "Employees inserted successfully",
              content: {
                "application/json": {
                  example: {
                    data: {
                      employeeCode: "sangdt",
                      age: "18",
                    },
                    message: "A user created successfully",
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/export-excel/users-list`]: {
        get: {
          tags: ["Excel"],
          summary: "Đây là api xuất file excel",
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: "Xuất file thành công!",
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/import-excel/users-list`]: {
        post: {
          tags: ["Excel"],
          summary: "Đây là api import file excel",
          requestBody: {
            required: true,
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    excelFile: {
                      type: "string",
                      format: "binary",
                    },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: "Read file completed!",
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/generate-pdf/example-template`]: {
        get: {
          tags: ["Generate PDF"],
          summary: "Đây là api xuất file PDF",
          responses: {
            200: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    message: "Xuất file thành công!",
                  },
                },
              },
            },
          },
        },
      },
      [`${API_PREFIX_VERSION}/category`]: {
        post: {
          tags: ["Category"],
          summary: "Đây là api tạo mới category kèm theo products",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    type: {
                      type: "string",
                    },
                    name: {
                      type: "string",
                    },
                    products: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          productName: {
                            type: "string",
                          },
                          productDescription: {
                            type: "string",
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "A successful response",
              content: {
                "application/json": {
                  example: {
                    data: {
                      id: "75dfc054-e4f2-11ee-a96c-57895c3d37a5",
                      type: "HH",
                      name: "Hàng hóa",
                      createdDate: "13:40:50.583157",
                      products: [
                        {
                          id: "75dfc054-e4f2-11ee-a96c-57895c3d37a5",
                          categoryId: "75dfc054-e4f2-11ee-a96c-57895c3d37a5",
                          productName: "Phở",
                          productDescription: "Thức ăn cho chim",
                        },
                        {
                          id: "75dfc054-e4f2-11ee-a96c-57895c3d37a5",
                          categoryId: "75dfc054-e4f2-11ee-a96c-57895c3d37a5",
                          productName: "Cơm",
                          productDescription: "Thức ăn cho người",
                        },
                      ],
                    },
                    message: "A user created successfully",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./server.js"], // Specify the path to your API routes file
};
