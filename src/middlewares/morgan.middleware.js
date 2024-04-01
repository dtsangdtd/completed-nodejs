const morgan = require("morgan");
const winston = require("winston");
// Create a Winston logger instance
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});
const loggerMidderware = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  logger.info(`Request params: ${JSON.stringify(req.params)}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
};
// Define a custom token for morgan
morgan.token("id", (req) => (req.id ? req.id.split("-")[0] : ""));
// Use morgan for logging HTTP requests
const morganStartMiddleware = morgan(
  "[:date[iso] #:id] Started :method :url for :remote-addr",
  {
    immediate: true,
    stream: {
      write: (message) => logger.info(message.trim()), // Use Winston's info method
    },
  }
);
const morganEndMiddleware = morgan(
  "[:date[iso] #:id] Completed :status :res[content-length] in :response-time ms",
  {
    stream: {
      write: (message) => logger.info(message.trim()), // Use Winston's info method
    },
  }
);

module.exports = {
  logger,
  loggerMidderware,
  morganStartMiddleware,
  morganEndMiddleware,
};
