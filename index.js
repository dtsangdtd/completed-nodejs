const express = require("express");
const cors = require("cors"); // Require the cors package
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const winston = require("winston");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
require("./src/middlewares/passport.middleware");
//SWAGGER config
const swaggerOptions = require("./swaggerOptions");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpec = swaggerJSDoc(swaggerOptions);
const swaggerUi = require("swagger-ui-express");
// ROUTES
const uploadFilesRouter = require("./src/routes/upload-files.routes");
const importExcelRouter = require("./src/routes/import-excel.routes");
const exportExcelRouter = require("./src/routes/export-excel.routes");
const generateTemplateRouter = require("./src/routes/generate-pdf.routes");
const userRoutes = require("./src/routes/users.routes");
const authRoutes = require("./src/routes/auth.routes");
const categoryRouter = require("./src/routes/category.routes");
//

// Logger
const {
  logger,
  morganStartMiddleware,
  morganEndMiddleware,
  loggerMidderware,
} = require("./src/middlewares/morgan.middleware");
const { PREFIX_API, API_VERSION, PORT } = process.env;
const API_PREFIX_VERSION = `${PREFIX_API}${API_VERSION}`;
// config logger
app.use(morgan("combined", { stream: winston.stream.write }));
app.use(morganStartMiddleware);
app.use(morganEndMiddleware);
// Error notification function
const errorNotification = (err, str, req) => {
  const title = "Error in " + req.method + " " + req.url;
  notifier.notify({
    title: title,
    message: str,
  });
};

if (process.env.NODE_ENV === "development") {
  // Use errorhandler middleware in development environment
  const errorhandler = require("errorhandler");
  app.use(errorhandler({ log: errorNotification }));
}
http.createServer(function (req, res) {
  const done = finalhandler(req, res);
  logger.info(`${req.method} ${req.url}`);
  logger(req, res, function (err) {
    console.log({
      req,
      res,
    });
    if (err) return done(err);
    // respond to request
    res.setHeader("content-type", "text/plain");
    res.end("hello, world!");
  });
});
// Server Swagger documentation
app.use("/swagger/index.html", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//CREATE EXPRESS APP
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// ROUTES WILL GO HEARE
// query form postgres
//Auth Login
app.use(
  session({
    secret: "Bearer",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//
app.use(`${API_PREFIX_VERSION}/auth`, loggerMidderware, authRoutes);
//User route
app.use(`${API_PREFIX_VERSION}/users`, loggerMidderware, userRoutes);
// FILE routes
app.use(`${API_PREFIX_VERSION}/files`, loggerMidderware, uploadFilesRouter);
app.use(
  `${API_PREFIX_VERSION}/import-excel`,
  loggerMidderware,
  importExcelRouter
);
app.use(
  `${API_PREFIX_VERSION}/export-excel`,
  loggerMidderware,
  exportExcelRouter
);
app.use(
  `${API_PREFIX_VERSION}/generate-pdf`,
  loggerMidderware,
  generateTemplateRouter
);
// Category
app.use(`${API_PREFIX_VERSION}/category`, loggerMidderware, categoryRouter);

// config default swagger
app.get("/", function (req, res) {
  res.redirect("/swagger/index.html");
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
