const { mongoUri, port } = require("./config");
const express = require("express");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const dummyAuthRouter = require("./routes/dummyauth");
const sessionAuthRouter = require("./routes/sessionauth");
const errorController = require("./controllers/error.controller");

const app = express();

const store = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});

app.use(express.json());
app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

// Dummy auth middleware
app.use((req, res, next) => {
  // Check if the user is logged in
  const cookies = req.get("Cookie");
  if (cookies) {
    const loggedIn = cookies
      .split(";")
      .find((cookie) => cookie.trim() === "dummyLoggedIn=true");
    if (loggedIn) {
      req.isDummyLoggedIn = true;
    }
  }
  next();
});

app.get("/", function (req, res) {
  res.send("Hello " + JSON.stringify(req.session));
});

app.use("/dummyauth", dummyAuthRouter);
app.use("/sessionauth", sessionAuthRouter);
app.use(errorController.get404);

app.listen(port || 3000);
