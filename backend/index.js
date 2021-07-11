/**
 * Required External Modules
 */
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");

const { ListRouter } = require("./Routes/ListRoutes");
const { connectDb } = require("./config/connectDb");

/**
 * App Variables
 */

const app = express();

/**
 *  App Configuration
 */

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", "https://easyvipin.au.auth0.com/oauth/token"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'self'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'self'", "easyvipin.au.auth0.com"],
      },
    },
  })
);
app.use(cors());
app.use(express.json());
connectDb();
app.use("/read-api", ListRouter);

__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

/**
 * Server Activation
 */

app.listen(process.env.PORT || 6060, () =>
  console.log(`API Server listening on port ${serverPort}`)
);
