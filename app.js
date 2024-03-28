const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const { mongoUri, port } = require("./config");
const authRouter = require("./routes/auth");
const errorController = require("./controllers/error.controller");

const store = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// Auth middleware
app.use((req, res, next) => {
  const cookies = req.get("Cookie");
  if (cookies) {
    // TOOO: Implement proper cookie parsing
  }
  next();
});

app.use("/auth", authRouter);
app.use(errorController.get404);

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port || 3000);
  })
  .catch((err) => {
    console.error(err);
  });
