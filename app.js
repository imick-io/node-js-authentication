const express = require("express");
const csrf = require("csurf");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const { mongoUri, port } = require("./config");
const authRouter = require("./routes/auth");
const baseRouter = require("./routes/base");
const errorController = require("./controllers/error.controller");

const store = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});
const csrfProtection = csrf();

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    httpOnly: true,
    secure: true,
    saveUninitialized: false,
    store,
  })
);
app.use(csrfProtection);

// Add the csrf token to the response headers
app.use((req, res, next) => {
  const originalJson = res.json;
  res.json = (data) => {
    const csrf = req.csrfToken();
    if (csrf) {
      res.setHeader("X-CSRF-Token", csrf);
    }
    originalJson.call(res, data);
  };
  next();
});

app.use("/auth", authRouter);
app.use("/", baseRouter);
app.use(errorController.get404);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port || 3000);
  })
  .catch((err) => {
    console.error(err);
  });
