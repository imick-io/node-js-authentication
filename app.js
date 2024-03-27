const express = require("express");
const dummyAuthRouter = require("./routes/dummyauth");
const errorController = require("./controllers/error.controller");

const app = express();
app.use(express.json());

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

app.use("/dummyauth", dummyAuthRouter);
app.use(errorController.get404);

app.listen(3000);
